# Summary of what the project is

The project so far is the backend for a news website called NC (Northcoders) News 

# Instructions to use project

Create 2 files one called .env.test and one called .env.development

Inside .env.test put PGDATABASE=nc_news_test
Inside .env.development put PGDATABASE=nc_news

Then add .env.test and .env.development to the .gitignore file so you protect the information from others also

You need do npm install to install all the dependencies which exist in the package.json file

If you want to run in the development enviroment simply do npm run seed wheras if you want to run in the test enviroment use npm run test

Doing as stated above will allow you to connect to the two databases locally and the data from the relevant databases will be used depending on whether you are in the test or the development enviroment 

To run tests you will want to use the npm test command in the terminal 

Use npm test endpoints.test.js to run that file and check what happens with different requests to the database 
Use npm test utils.test.js to run that file and check what happens with different requests to the database 


# A link to the hosted version

https://dashboard.render.com/web/srv-cpc654m3e1ms739g8nvg/deploys/dep-cpc69t3tg9os73cvlcjg

# Minimum versions of packages 
Node.js: "v8.11.5"

Postgres:"v20.14.0"


