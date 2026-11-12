import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from "crypto";

// Password hashing with scrypt (built into Node, no extra package).
// Stored format: scrypt$N$r$p$<salt base64url>$<hash base64url>

const N = 16384;
const R = 8;
const P = 1;
const KEY_LEN = 32;

function scrypt(password: string, salt: Buffer, keyLen: number, options: ScryptOptions) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCb(password, salt, keyLen, options, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, n, r, p, saltB64, hashB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64url");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64url"), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Checked when the username doesn't exist, so a wrong username takes as long as a wrong password.
const DUMMY_HASH = "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export async function verifyDummyPassword(password: string) {
  await verifyPassword(password, DUMMY_HASH);
  return false;
}

export const PASSWORD_MIN = 8;

export function passwordProblem(password: string) {
  if (password.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (password.length > 200) return "Password is too long.";
  return null;
}
