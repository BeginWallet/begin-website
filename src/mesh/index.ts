import { checkSignature, generateNonce } from "@meshsdk/core";
import { Address } from "@emurgo/cardano-serialization-lib-browser";

async function getNonce(msg: string) {
  const nonce = generateNonce(msg);
  return nonce;
}

async function verifySignature(userAddress, nonce, signature) {
  const addressBech32 = Address.from_bytes(
    Buffer.from(userAddress, "hex")
  ).to_bech32();

  const result = checkSignature(nonce, addressBech32, signature);
  if (result) {
    // create JWT or approve certain process
  } else {
    // prompt user that signature is not correct
  }

  return result;
}

export { getNonce, verifySignature };
