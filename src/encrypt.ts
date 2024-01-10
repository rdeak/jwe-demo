import { createJWK } from "./createJWK";
import * as jose from "jose";
import { compress } from "./compression";

export async function encrypt<
  PAYLOAD extends Record<string, unknown> = Record<string, unknown>,
>(payload: PAYLOAD, secret: string) {
  const compressedContent = await compress(payload);

  let builder = new jose.CompactEncrypt(
    new TextEncoder().encode(compressedContent),
  ).setProtectedHeader({ alg: "dir", enc: "A128GCM" });

  return builder.encrypt(await createJWK(secret));
}