# Library Management System
This project is about managing the library including listing and burrowing books ...
This is the api server of [frontend repo] link to frontend api

You can visit [Here]()

## How to use
1. Clone the project by running `git clone https://github.com/rabin9087/library-backend.git` in your terminal'
2. Run `cd <foldername>` to go inside the project folder or noen the project in your fab code editor
3. Install dependecies  `npm i` from the terminal with in the root directory of the project
4. Rename `.env.sample` to `.env` and pass the value accordingly
5. Run the project `npm run dev` for the dev environment and `npm start` in the production . Please note that `npm run dev` will use `nodemon` behind. So, run `npm i nodemon -g` to install nodemon package in your system level if you do not have yet.
6. The server should be running at [`http://localhost:8000`](http://localhost:8000)

## Available APIs
All the apis segmentation path are followed by `http://localhost:8000/api/v1`

### User API
User api will follow the following pattern `http://localhost:8000/api/v1/users`





| #  | PATH | METHODS | PRIVATE | DESCRIPTION |
|----|------|---------|---------|-------------|
|1.  | `/`  |  `GET`  |  TRUE    | It returns the user object |
|2.  | `/`  |  `POST` |  FALSE  | Server expects the user object and create a new user in the db |
|3.  | `/admin-user`  |  `POST` |  TRUE  | Server expects the user object and create a new user in the db. Only Authenticated admin can create another admin |

### Books API
Book api will follow the following pattern `http://localhost:8000/api/v1/books`

| #  | PATH | METHODS | PRIVATE | DESCRIPTION |
|----|------|---------|---------|-------------|
|---|---|---|---|---|