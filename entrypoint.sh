#!/bin/sh
yarn install
if [ $NODE_ENV == "production" ]
then
  yarn build
fi
node server/server.js --ignore client