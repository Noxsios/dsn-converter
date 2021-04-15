const prefixes = require("./phone_prefixes_formatted.json");
const fs = require("fs");
const path = require("path");
const phoneArray = [];

for (const key in prefixes) {
  if (Object.hasOwnProperty.call(prefixes, key)) {
    const { number, location } = prefixes[key];
    const element = {
      prefix: Number(key),
      number: number,
      location: location,
    };
    phoneArray.push(element);
  }
}

fs.writeFileSync(path.join(__dirname, "dsn_index.json"), JSON.stringify(phoneArray, null, 2));
