# Instructions 

Create 2 files one called .env.test and one called .env.development

Inside .env.test put PGDATABASE=nc_news_test
Inside .env.development put PGDATABASE=nc_news

Then add .env.test and .env.development to the .gitignore file so you protect the information from others also

You need do npm install to install all the dependencies which exist in the package.json file

If you want to run in the development enviroment simply do npm run seed wheras if you want to run in the test enviroment use npm run test

Doing as stated above will allow you to connect to the two databases locally and the data from the relevant databases will be used depending on whether you are in the test or the development enviroment 
