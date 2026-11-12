import { verifyPassword } from "./password";

// One-time setup code for creating the first dashboard admin. Only its scrypt hash is stored
// here, so the code itself isn't in the repo. Setup only works while there are no users at all;
// after the first admin exists, everyone else is added from the Team page.
const SETUP_CODE_HASH = "scrypt$16384$8$1$zM_TS67BBFMh8pOkEPCzUQ$62Dw3Df6LR5G8MQz7XAyoqxz3sKDaXSJi_5vsUt69zo";

export function checkSetupCode(code: string) {
  const normalized = code.trim().toUpperCase().replace(/\s+/g, "");
  return verifyPassword(normalized, SETUP_CODE_HASH);
}
