#!/bin/bash

php -S localhost:8000 -t ./backend &

cd backend

if [ ! -d ./storage ]
then
echo "creating storage folder"
mkdir storage
fi

cd ../frontend

if [ ! -d ./node_modules ]
then
echo "installing node modules"
npm i
fi

npm start
