import { isString } from "util";

// @flow

// This function adds spaces around text to fix an issue with double-clicking to select it
// when it's rendered inside of a floated element. Without the spaces, double-clicking will
// highlight floated text that comes before or after it in the DOM.
export function addSpacingAroundText(s) {
  return " " + s + " ";
}

// restrictToStdDecimalChars returns a new version of the string s, removing
// all non-decimal chars and converting "," to "." and making sure the number
// is a decimal-looking number (123.456)
export function restrictToStdDecimalNumber(s) {
  return s
    .replace(/,/g, ".") // comma to period
    .replace(/[^\d.]/g, "") // remove non-numbers
    .replace(/\.[.]+/g, ".") // remove repetitive periods
    .replace(/^\.(.*)$/, "0.$1") // prepend 0 when starting with period
    .replace(/^([\d]*)(\.?[\d]*).*/, "$1$2"); // use only the first run of numbers
}

// Restricts the given stdDecimalString (ie, a string projected by
// restrictToStdDecimalNumber) to the given amount of fractional digits (ie,
// digits after the decimal point).
//
// This function does **not** pad the string if less than maxFracDigits are
// present.
export function limitFractionalDigits(s, maxFracDigits) {
  if (!isString(s)) return s;

  const match = s.match(/(\d+)\.(\d*)/);
  if (!match) return s;
  if (!maxFracDigits) return s[1]; // no fractional digits, return just the int part
  if (match[2].length <= maxFracDigits) return s;
  return match[1] + "." + match[2].substr(0, maxFracDigits);
}

// makeRandomString makes a random string. We use it as a generator to
// rpcuser and rpcpass when starting dcrd with no conf file.
export function makeRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
