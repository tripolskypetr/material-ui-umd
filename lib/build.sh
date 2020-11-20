#!/bin/bash
for D in `find . -maxdepth 1 -not -path "." -not -path "./.*" -type d`
do
    cd $D
    tsc
    cd ..
done
