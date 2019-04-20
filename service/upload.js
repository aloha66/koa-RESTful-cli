const os = require('os');
const fs = require('fs');
const path = require("path")
const upload = async (ctx, next) => {
  try {
    const file = ctx.request.files.file;
    // const reader = fs.createReadStream(file.path);
    // const stream = fs.createWriteStream(path.join(file.path, Math.random().toString()));
    // reader.pipe(stream);
    // console.log('uploading %s -> %s', file.name, stream.path);
  } catch (error) {
    debugger
  }
 

};

module.exports = { upload };
