# BloodComunity_Website

--Khiem--
Các bước chạy code backend: 
-B1: Tải và cài đặt mySQL Workbench trong link hướng dẫn sau: https://www.youtube.com/watch?v=DqVDsoG4HXg&t=6s&ab_channel=H%E1%BB%8DcL%E1%BA%ADpTr%C3%ACnhOnline
-B2: Setup user và password trong mySQL Workbench: user: root , password: 1234
-B3: Tạo query: 
    create database blood_community; 
    use database blood_community; 
    alter table allcodes
    modify column updatedAt datetime on update current_timestamp;
    alter table allcodes
    modify column createdAt datetime default current_timestamp;
-B4: Clone source backend
-B5: Rename file .env.example ----> .env
-B6: Click chuột phải vào file package.json trong folder backend và chọn: Open in integrated terminal
-B7: Trong terminal nhập: npm install
-B8: Sau khi chạy install xong thì nhập vào terminal: npx sequelize-cli db:migrate (Enter) xong nhập: npx sequelize-cli db:seed:all (Enter)
-B9: Nhập vào terminal: npm start -> Enter ->>>>>>>> Done!!!!
