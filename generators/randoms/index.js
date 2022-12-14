const randomString = require("./string");
const randomDate = require("./date");

const getRange = (range, dateRange) => {
  const output = [];
  const ignore = "{}";
  const accept = "+-0123456789" + (dateRange ? "smhd" : "");

  let buffer = " ";
  for (let c of range) {
    if (ignore.includes(c)) continue;
    else if (buffer === " " && c === " ") continue;
    else if (accept.includes(c)) buffer += c;
    else if (c === ",") {
      output.push(+buffer || buffer.trim());
      buffer = " ";
    } else {
      throw new Error("3");
    }
  }
  if (buffer) output.push(+buffer || buffer.trim());
  if (output.length < 1 || output.length > 2) throw new Error("4");
  return output;
};

const generateRandom = (type, min, max) => {
  const length = Math.floor(Math.random() * (max - min)) + +min;

  if (type === "string") return randomString(length);
  if (type === "date") return randomDate(min, max);
  if (type === "integer") return length;
  if (type === "number") return Math.random() * (max - min) + +min;
};

module.exports = input => {
  const value = input.slice(1);
  const [type, range] = value.split("{");
  const [min, max] = getRange(range, type === "date");

  return generateRandom(type, min, max || min);
};
