const fs = require("fs");
const path = require("path");
const prefixesRip = require("./src/prefixes/phone_prefixes.json");
// Ripped from devTools on https://github.com/gzd2032/dsn_converter

const formattedPrefixes = {};

for (const key in prefixesRip) {
  const [phoneNum, location] = prefixesRip[key].split(":");
  formattedPrefixes[key] = {
    number: phoneNum,
    location: location,
  };
}

const swiftRip = fs
  .readFileSync(path.join(__dirname, "src/prefixes/PhoneCallViewController.swift"), { encoding: "utf8", flag: "r" })
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("let") && line.includes("Ext") && !line.includes("No"))
  .map((line) =>
    line
      .slice(4)
      .split("=")
      .map((element) => {
        if (element.startsWith("Ext")) {
          return element.replace(/Ext/g, "").replace(/Lbl/g, "").trim();
        } else {
          return element.trim().replace(/"/g, "");
        }
      })
  );

for (const key in formattedPrefixes) {
  if (!swiftRip.some((ele) => ele[0] === key)) {
    console.log("missing key in rip:", key);
  }
}

console.log("------");

const formattedPrefixesKeys = Object.keys(formattedPrefixes);

swiftRip.forEach((ele) => {
  const key = ele[0];
  if (!formattedPrefixesKeys.some((ele) => ele === key)) {
    console.log("missing key in json:", key);
  }
});
