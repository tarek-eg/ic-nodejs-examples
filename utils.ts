import { Principal } from "@dfinity/principal";
import { getCrc32 } from "@dfinity/principal/lib/cjs/utils/getCrc";
import { sha224 } from "@dfinity/principal/lib/cjs/utils/sha224.js";
import "isomorphic-fetch";

export const principalToAccountIdentifier = (
  p: string,
  s?: number[] | number,
) => {
  const padding = Buffer.from("\x0Aaccount-id");
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(p).toUint8Array(),
    ...getSubAccountArray(s),
  ]);
  const hash = sha224(array);
  const checksum = to32bits(getCrc32(hash));
  const array2 = new Uint8Array([...checksum, ...hash]);
  // return toHexString(array2);
  return array2;
};

export const getSubAccountArray = (s?: number[] | number) => {
  if (Array.isArray(s)) {
    return s.concat(Array(32 - s.length).fill(0));
  } else {
    //32 bit number only
    return Array(28)
      .fill(0)
      .concat(to32bits(s ? s : 0));
  }
};

const to32bits = (num: number) => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
};

export const toHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

export function convertCyclesDecimalsToXTC(cyclesDecimals: bigint) {
  return cyclesDecimals * BigInt(1e12);
}

export function calculateTotalXTCFromBalances(
  {
    wicpBalance,
    icpBalance,
    xtcBalance,
    cyclesBalance,
  }: {
    xtcBalance: bigint;
    cyclesBalance: bigint;
    wicpBalance: bigint;
    icpBalance: bigint;
  },
  avgRate: number,
) {
  const totalCycles = Number(xtcBalance + cyclesBalance) / 1e12;
  const totalICP = Number(wicpBalance + icpBalance) / 1e8;
  const totalInXTC = totalCycles + totalICP * (avgRate / 10_000);

  return totalInXTC;
}

export function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = +((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
