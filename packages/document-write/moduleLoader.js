(function(global) {
  const template = (url) => `\x3Cscript type="text/javascript" src="${url}">\x3C/script>`;
  global.load = (url) => document.write(template(url));
})(window);
