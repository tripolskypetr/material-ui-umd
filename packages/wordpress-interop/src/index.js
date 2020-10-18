#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ignoreList = new Set(['index.js', 'loader.js', '.DS_Store']);

function printTree(root) {
  printTree.prototype.space = printTree.prototype.space || 0;
  var line = [];
  for (var i = 0; i != printTree.prototype.space; i++) {
    if (i % 2 == 0) {
      line.push("|");
    } else if (printTree.prototype.space - 1 != i) {
      line.push(" ");
    } else {
      line.push("-");
    }
  }
  line.push(root.name);
  console.log(line.join(""));
  if (root.child) {
    printTree.prototype.space += 2;
    for (var i = 0; i != root.child.length; i++) {
      printTree(root.child[i]);
    }
    printTree.prototype.space -= 2;
  }
  else {
    return;
  }
}

function buildTree(folder) {
  return fs.readdirSync(folder)
    .filter(f => f != "." && f != "..")
    .map(f => {
      const file = path.join(folder, f);
      if (ignoreList.has(f)) {
        return null;
      } else if (fs.lstatSync(file).isFile()) {
        return { name: f }
      } else {
        return {
          name: f,
          child: buildTree(file)
        };
      }
    })
    .filter(v => v !== null);
}

function buildOne(tree) {
  const obj = {};
  if ('length' in tree) {
    return tree
      .sort((f) => !f.child)
      .map((f) => buildOne(f));
  } else if ('child' in tree) {
    obj.type = 'group';
    obj.fields = [
      { type: 'line', title: tree.name },
      ...tree.child.sort((f) => !f.child)
        .map((f) => buildOne(f))
    ];
  } else {
    obj.title = tree.name;
    obj.type = 'string';
    obj.name = tree.name;
  }
  return obj;
}

function buildFields(folder) {
  return buildOne(buildTree(folder));
}

if (require.main === module) {
  printTree({
    name: process.cwd(),
    child: buildTree(process.cwd())
  })
} else {
  module.exports = {buildTree, buildFields};
}
