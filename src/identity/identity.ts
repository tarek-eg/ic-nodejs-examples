import { Secp256k1KeyIdentity } from "@dfinity/identity";
import sha256 from "sha256";
import { readFileSync } from "fs";

const initIdentity = () => {
  const rawKey = readFileSync(process.env.PATH_TO_PRIVATE_KEY!)
    .toString()
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .trim();

  //@ts-expect-error  Argument of type 'ArrayBufferLike' is not assignable to parameter of type 'Message'.ts(2769)
  const rawBuffer = Uint8Array.from(rawKey).buffer;

  //@ts-expect-error Argument of type 'ArrayBufferLike' is not assignable to parameter of type 'Message'.ts(2769)
  const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));
  // Secp256k1KeyIdentity.fromSecretKey
  const identity = Secp256k1KeyIdentity.fromSecretKey(
    Uint8Array.from(privKey).buffer,
  );
  return identity;
};

export const identity = initIdentity();

export const principal = identity.getPrincipal();
