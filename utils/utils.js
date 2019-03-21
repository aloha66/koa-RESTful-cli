const fs = require("fs");
const path = require("path");

const routes_record_file = (dir, fileName) =>
  path.join(__dirname, "../", dir, fileName);

function cleanAndInitRouterRecord(dir, fileName) {
  fs.readFileSync(routes_record_file(dir, fileName), {
    flag: "w+",
    encoding: "utf8"
  });
}

function appendDataIntoRecord(dir, data, fileName) {
  fs.writeFileSync(routes_record_file(dir, fileName), data, {
    flag: "a",
    encoding: "utf8"
  });
}

module.exports = {
  cleanAndInitRouterRecord,
  appendDataIntoRecord
};
