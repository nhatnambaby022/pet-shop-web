# pet-shop-web

## GET THIS REPOSITORY
- Clone or Download this repository

## SETUP MOGODB
- Register mogodb account
- Create cluster and get CLUSTER NAME, USER NAME, PASSWORD
- In "server" folder, edit .env 
  + DB_USERNAME=<yourClusterUsername>
  + DB_PASSWORD=<yourClusterPassword>
  + DB_CLUSTERNAME=<yourClusterName>
  
## SETUP FIREBASE
- Register firebase and storage project
- Get your config storage
- In "client/src/component/dashboard/firebase/firebase.js" change "firebaseConfig" with your storage config.

  
## RUN APP WITH CLI
  - In "server" folder: _npm run start_
  - In "client" folder: _npm run start_

## GET GUEST ACCOUNT AND ADMIN
  - In page /register: create user with username
    + guest: get guest _id and change "GUESTID" in "client/src/contexts/constants.js"
    + admin: this is a admin user
  
