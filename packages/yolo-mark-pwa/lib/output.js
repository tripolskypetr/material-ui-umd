const fs = require('fs');
const binary = fs.readFileSync('./export.wasm');

const toArrayBuffer = (buf) => {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

const data = [...new Uint8Array(toArrayBuffer(binary))];
fs.writeFileSync('export.json', JSON.stringify(data));
