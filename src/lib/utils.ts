// import { getAddress } from "ethers";

// export function sleep(ms: number): Promise<void> {
//   return new Promise((r) => setTimeout(r, ms));
// }

// export function awaitProperties<T, O extends { [key: string]: T }>(
//   obj: O
// ): Promise<{ [k in keyof O]: Awaited<O[k]> }> {
//   return Promise.all(
//     (Object.entries(obj) as { [k in keyof O]: [k, O[k]] }[keyof O][]).map(
//       async ([k, v]) => [k, await v]
//     )
//   ).then(Object.fromEntries);
// }

// export const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

// export const TOKEN_ADDRESS = getAddress(process.env.NEXT_PUBLIC_TOKEN_ADDRESS!);
// export const TOKEN_DECIMALS = Number(
//   process.env.NEXT_PUBLIC_TOKEN_DECIMALS || "2"
// );
// export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

// export function formatAmount(
//   amount: bigint | string,
//   includeThousandsSeparators = true
// ): string {
//   if (typeof amount == "string") amount = BigInt(amount);
//   const integerPart = amount / 10n ** BigInt(TOKEN_DECIMALS);
//   const integerPartStr = includeThousandsSeparators
//     ? integerPart.toLocaleString("en")
//     : integerPart.toString();
//   const centDigits = Math.min(TOKEN_DECIMALS, 2);
//   const oneCent = 10n ** BigInt(TOKEN_DECIMALS - centDigits);
//   const cents = (amount / oneCent) % 10n ** BigInt(centDigits);
//   const centsStr =
//     cents == 0n
//       ? ""
//       : "." + cents.toString().replace("-", "").padStart(centDigits, "0");
//   if (
//     amount != 0n &&
//     integerPart == 0n &&
//     cents == 0n &&
//     includeThousandsSeparators
//   )
//     return "< 0." + "1".padStart(centDigits, "0");
//   return integerPartStr + centsStr;
// }

// export function abbreviate(s: string, chars: number): string {
//   if (s.length <= chars) return s;
//   return (
//     s.slice(0, Math.ceil(chars / 2)) +
//     "..." +
//     s.slice(s.length - Math.floor(chars / 2))
//   );
// }

export function getCookieClientSide(name: string): string | undefined {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="))
    ?.replace(name + "=", "");
}

export function setCookieClientSide(
  name: string,
  value: string,
  expires?: Date
) {
  document.cookie =
    name +
    "=" +
    value +
    ";path=/;samesite=strict" +
    (expires ? `;expires=${expires.toUTCString()}` : "");
}
