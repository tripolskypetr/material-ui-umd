#!/bin/sh

rm dist/*

npm run build:umd
npm run build:types
npm run build:lib

cp ./lib/**/dist/*.js ./dist
cp ./lib/**/dist/*.d.ts ./dist

for D in `find ./dist -type f -not -name "*.min.js" -name "*.js"`
do
npx google-closure-compiler --js $D --js_output_file $D.tmp
rm $D
mv $D.tmp $D
done
