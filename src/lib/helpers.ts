// import { Address } from "@emurgo/cardano-serialization-lib-browser";

import { add } from "date-fns";

export const formatShortAddress = (addr: String) => {
  return addr.substring(0, 8) + "..." + addr.substring(addr.length - 6);
};

export const addressToBech32 = (addr) => {
  // const addressBech32 = Address.from_bytes(
  //   Buffer.from(addr, "hex")
  // ).to_bech32();

  return addr; //addressBech32;
}

export const parseAddress = (addr) => {
  // const addressBech32 = Address.from_bytes(
  //   Buffer.from(addr, "hex")
  // ).to_bech32();

  return formatShortAddress(addr);
}