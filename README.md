# Loopback 4 Auth Passport + Role

## from this tutorial :
https://medium.com/@iqbaldjulfri/role-based-authentication-with-jwt-in-loopback-4-4f9ab63daa52

## Modified :
- Using Mysql Datasource
- update Get Token from Header of Request
- Hash password in database (Encrypt)
- token expiration time

## Result :
- we can create new User
- hit to endpoint with auth system
- identify user role and give permission to each endpoint (HAS_ANY_ROLE)
- extract access_token from header request

## Things to be Done :
- fix database structure (using int instead of varchar in every "id" field)

# How to use :

### 1. Clone this project
### 2. open project folder and execute "npm i"
### 3. create new Mysql Database
### 4. Create 3 Table
1. user
- id (varchar, allow null, default null)
- password (varchar, allow null, default null),
- email (varchar, allow null, default null),

2. role
- id (varchar, allow null, default null)
- description (varchar, allow null, default null)

3. userrole
- id (int, Auto Increment, Primary Key)
- userid (varchar, allow null, default null)
- roleid (varchar, allow null, default null)

### 5. execute npm start
### 6. add some endpoint to postman / insomnia
### 7. hit /users endpoint to create new user
### 8. hit /users/login endpoint with raw data username and passowrd to login and get token
### 9. add access_token to header for all "ping" endpoint to test the Auth and Role system
