#!/bin/sh
for D in `find . -maxdepth 1 -not -path "." -not -path "./.*" -type d`
do
    cd $D
    rm ./dist/*
    touch ./dist/meow.txt
    cd ..
done
