#!/usr/bin/env bash
echo -e "\033[32m \n> clearing dist directory. \033[0m"
rm -rf ./dist

echo -e "\033[32m \n> building server bundle. \033[0m"
npm run build:server

echo -e "\033[32m \n> building client bundle. \033[0m"
npm run build:client

echo -e "\033[32m \n> build success! \033[0m"

node ./build/qiniu.js
echo -e "\033[32m \n> publish to cdn success! \033[0m"