echo "> Watching transpiling ES2015 & React"
echo ""
./node_modules/.bin/babel --plugins "transform-runtime transform-es2015-modules-umd" src --ignore __tests__ --out-dir ./dist --watch

