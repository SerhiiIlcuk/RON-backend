<div align="center">
  <h3>nestjs-mongoose-jwt-auth-roles-and-permission</h3>
  <hr>
</div>

# Getting started

## Installation

Clone the repository

    git clone https://github.com/SerhiiIlcuk/RON-backend.git

Switch to the repo folder

    cd Ron-backend
    
Install dependencies
    
    npm install

Create a .env file and write it as follows

    MONGO_URI='mongodb://localhost/YOURMONGODBNAME'
    JWT_SECRET='YOURJWTSECRETCHANGEIT'
    ENCRYPT_JWT_SECRET='YOURJWTENCRIPTINGPASSCHANGEIT'
    JWT_EXPIRATION=30m
 
----------

## Database

The example codebase uses [Mongoose](https://mongoosejs.com/).

----------

## NPM scripts
- `npm run start:watch` - Start application in watch mode

----------
# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication.
This app uses <strong>refresh-Token</strong> mechanism to refresh jsonwebtoken after 30 minutes.

----------
 
# Swagger API docs

Visit http://127.0.0.1:5000/api in your browser

This example repo uses the NestJS swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)

## Authors

 **Serhii Ilchuk**
