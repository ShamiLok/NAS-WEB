#!/bin/bash

php -S localhost:8000 -t ./backend &

cd frontend
if [ ! -d ./node_modules ]
then
echo "installing node modules"
npm i
fi

npm start
