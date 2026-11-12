import { randomBytes } from "crypto";
import { ensureSchema, getPool } from "@/lib/leads/db";

// Leads dashboard logins, stored in the leads database (admin_users table).
//   admin:  everything, including delete, CSV export and managing users
//   viewer: sees leads and can update status and notes

export const ROLES = ["admin", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export type AdminUser = {
  id: number;
  username: string;
  name: string;
  role: Role;
  active: boolean;
  session_version: number;
  created_at: string;
  created_by: string | null;
  last_login_at: string | null;
};

const COLUMNS = "id, username, name, role, active, session_version, created_at, created_by, last_login_at";

function mapUser(row: Record<string, unknown>): AdminUser {
  return {
    ...(row as unknown as AdminUser),
    id: Number(row.id),
    created_at: new Date(row.created_at as string).toISOString(),
    last_login_at: row.last_login_at ? new Date(row.last_login_at as string).toISOString() : null,
  };
}

export const USERNAME_RE = /^[a-z0-9._-]{3,40}$/;

export function normalizeUsername(raw: unknown) {
  return String(raw ?? "").trim().toLowerCase();
}

export function isRole(value: unknown): value is Role {
  return ROLES.includes(value as Role);
}

export async function countUsers() {
  await ensureSchema();
  const res = await getPool().query<{ count: string }>("SELECT count(*) FROM admin_users");
  return Number(res.rows[0]?.count || 0);
}

export async function listUsers() {
  await ensureSchema();
  const res = await getPool().query(`SELECT ${COLUMNS} FROM admin_users ORDER BY active DESC, role, lower(name)`);
  return res.rows.map(mapUser);
}

export async function getUserById(id: number) {
  await ensureSchema();
  const res = await getPool().query(`SELECT ${COLUMNS} FROM admin_users WHERE id = $1`, [id]);
  return res.rows[0] ? mapUser(res.rows[0]) : null;
}

/** For login only: includes the password hash. */
export async function getUserForLogin(username: string) {
  await ensureSchema();
  const res = await getPool().query(`SELECT ${COLUMNS}, password_hash FROM admin_users WHERE username = $1`, [username]);
  const row = res.rows[0];
  return row ? { user: mapUser(row), passwordHash: row.password_hash as string } : null;
}

export async function getPasswordHash(id: number) {
  await ensureSchema();
  const res = await getPool().query<{ password_hash: string }>("SELECT password_hash FROM admin_users WHERE id = $1", [id]);
  return res.rows[0]?.password_hash ?? null;
}

/** Returns the new user, or null if the username is taken. */
export async function createUser(input: {
  username: string;
  name: string;
  passwordHash: string;
  role: Role;
  createdBy: string | null;
  onlyIfNoUsers?: boolean;
}) {
  await ensureSchema();
  // onlyIfNoUsers makes first-time setup safe against two people submitting at once.
  const res = await getPool().query(
    `INSERT INTO admin_users (username, name, password_hash, role, created_by)
     SELECT $1, $2, $3, $4, $5
     ${input.onlyIfNoUsers ? "WHERE NOT EXISTS (SELECT 1 FROM admin_users)" : ""}
     ON CONFLICT (username) DO NOTHING
     RETURNING ${COLUMNS}`,
    [input.username, input.name, input.passwordHash, input.role, input.createdBy]
  );
  return res.rows[0] ? mapUser(res.rows[0]) : null;
}

/** Any change here except a name change signs the user out everywhere (session_version + 1). */
export async function updateUser(
  id: number,
  changes: { name?: string; role?: Role; active?: boolean; passwordHash?: string }
) {
  await ensureSchema();
  const sets: string[] = [];
  const params: unknown[] = [];
  const set = (col: string, value: unknown) => {
    params.push(value);
    sets.push(`${col} = $${params.length}`);
  };
  if (changes.name !== undefined) set("name", changes.name);
  if (changes.role !== undefined) set("role", changes.role);
  if (changes.active !== undefined) set("active", changes.active);
  if (changes.passwordHash !== undefined) set("password_hash", changes.passwordHash);
  if (!sets.length) return null;
  if (changes.role !== undefined || changes.active !== undefined || changes.passwordHash !== undefined) {
    sets.push("session_version = session_version + 1");
  }
  params.push(id);
  const res = await getPool().query(
    `UPDATE admin_users SET ${sets.join(", ")} WHERE id = $${params.length} RETURNING ${COLUMNS}`,
    params
  );
  return res.rows[0] ? mapUser(res.rows[0]) : null;
}

export async function deleteUser(id: number) {
  await ensureSchema();
  const res = await getPool().query("DELETE FROM admin_users WHERE id = $1", [id]);
  return (res.rowCount || 0) > 0;
}

export async function countActiveAdmins() {
  await ensureSchema();
  const res = await getPool().query<{ count: string }>(
    "SELECT count(*) FROM admin_users WHERE role = 'admin' AND active"
  );
  return Number(res.rows[0]?.count || 0);
}

export async function recordLogin(id: number) {
  await getPool().query("UPDATE admin_users SET last_login_at = now() WHERE id = $1", [id]);
}

const globalForSecret = globalThis as unknown as { ccAdminSecret?: Promise<Buffer> };

/** Random key that signs dashboard sessions, created once and kept in admin_settings. */
export function getSigningSecret() {
  if (!globalForSecret.ccAdminSecret) {
    globalForSecret.ccAdminSecret = (async () => {
      await ensureSchema();
      const pool = getPool();
      await pool.query(
        "INSERT INTO admin_settings (key, value) VALUES ('session_secret', $1) ON CONFLICT (key) DO NOTHING",
        [randomBytes(32).toString("base64url")]
      );
      const res = await pool.query<{ value: string }>("SELECT value FROM admin_settings WHERE key = 'session_secret'");
      return Buffer.from(res.rows[0].value, "base64url");
    })().catch((err) => {
      globalForSecret.ccAdminSecret = undefined; // retry next time
      throw err;
    });
  }
  return globalForSecret.ccAdminSecret;
}
