# MentorAid
Mentor Aid is a meeting Scheduler portal designed for Conestoga College students and teachers.
![Conestoga LOGO](/app-public/src/assets/images/conestoga.png)

As their is only one medium for teachers and student to communicate which is E-mail and sometimes students missed reading the email. So here comes mentor Aid. 
>Carpie Diem, Sieze the Day

## How to install it. 
To install it you must have some prerequisite which is given below. 

### Prerequiste
* Node js
* Express
* Angular
* Mongo DB
* JSON Web Token
* Angular-Calendar

## How to Contribute. 
1. Download the project 
2. Create an CONSTANT. js file as below

``` javascript
'use strict';
let CONSTANT = {
  URL: '<LDAPSERVER_ADDRESS>',
  BINDDN: '<Admin_DOMAIN>',
  CREDENTIALS: '<password>'
  };
  module.exports = Object.freeze(CONSTANT);
  ```
  3. Create a folder named .key
  in which create two files named public.key and private.key where you will write their public and private key. 
  4. run npm install in both angular(app-public) and node directory. 
  5. run npm start in both the directory. 
  
  
