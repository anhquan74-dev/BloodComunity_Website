# BloodComunity_Website
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Hướng dẫn run project BackEnd

#### Cài Đặt

- Cài đặt MySQL Workbench theo link hướng dẫn [Link](https://www.youtube.com/watch?v=DqVDsoG4HXg&t=6s&ab_channel=H%E1%BB%8DcL%E1%BA%ADpTr%C3%ACnhOnline) 
- Setup user và password trong mySQL Workbench: 
```
    user: root 
    password: 1234
```
- Thực hiện Query:
```
    create database blood_community;
    
    use database blood_community; 
    
    alter table allcodes 
    modify column updatedAt datetime on update current_timestamp; 
    
    alter table allcodes
    modify column createdAt datetime default current_timestamp;
```
- Clone Source Backend
> Note: Rename file .env.example -> .env

- Cài đặt các phụ thuộc và devDependencies và khởi động máy chủ.
```sh
cd backend
npm i
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
- Chạy Project
```sh
npm start
```
