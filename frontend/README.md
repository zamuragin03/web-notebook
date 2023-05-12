# SETUP

### 1. install dependencies inside ./frontend

###### npm install

### 2. determine proxy backend server in package.json 

{
  ...
  "proxy": "base api route(http://127.0.0.1:25565/api/)",
  ...
}

### 3. run app

###### yarn start | npm start


##### in case of error, make sure backend server is launched and api route set correct(http://127.0.0.1:25565/api/)
