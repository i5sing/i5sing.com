#!/usr/bin/env bash
echo -e "\033[32m \n> clearing dist directory. \033[0m"
rm -rf ./dist

echo -e "\033[32m \n> building server bundle. \033[0m"
npm run build:server

echo -e "\033[32m \n> building client bundle. \033[0m"
npm run build:client

cp ./src/resources/images/favicon.ico ./dist

echo -e "\033[32m \n> build success! \033[0m"
