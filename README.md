# Fullstack Developer Test

This project was developed for the [Umanni Fullstack Developer Test](https://github.com/umanni/Fullstack-Developer) using the Ruby-on-Rails and ReactJS.


## Environment Docker

Ruby: 2.7.2

Rails: 6.0.3

Database: PostgreSQL

## Project API

This project was build using the **devise** gem for authentication an user session control, all of its routes was build inside de /api scope.
If you want to take a look at the api routes you may import the **fullstackdeveloper_api.json** at the project root at your insomnia or postman client.

## Running the project

First of all you may clone it using
```
git clone https://github.com/jamesqw/Full-Stack-Test.git
```
This will bring you all the project structure and its dependencies files, so after that run
```
docker-compose build

docker-compose up -d
```
to turn up the container and then execute
```
docker exec fullstackdeveloper_web_1 rails db:create db:migrate db:seed
```
This will create the database, Users table and a **admin user** to manage the rest of created users.

Now we are ready to go! Access
```
localhost:3000
// On my environment I needed to use the 192.168.99.100:3000 // Windows
```
You can login as **admin** using
```
User: admin@admin.com
Password: 123456
```

## Spreadsheet import (csv)

The upload file uses the default csv configuration, the columns must be separated by **;** and the header must be included at the file. You can use the **import_template.csv** on the project root as an example.


## Tests environment

The tests was build using RSpec gem for basic model tests. To execute it run
```
docker exec fullstackdeveloper_web_1 rails db:migrate RAILS_ENV=test
```
And run the tests with
```
docker exec fullstackdeveloper_web_1 bundle exec rspec
```

### Tests

The tests run through the creation of a fake user and validate its fields:
```
is valid with full_name, email, avatar_image, admin, password and password confirmation
is invalid without full_name
is invalid without email
is invalid without avatar_image
is invalid without password
is valid without admin value
is valid if the user is not admin
```
