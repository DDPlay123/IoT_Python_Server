# 物聯網期末專題
### 設定SQL資料庫。
```
create database gps;
```
```
use gps;
```
```
create table parameter(
```
```
id int(20) not null auto_increment,
```
```
longitude double(22,12) not null,
```
```
latitude double(22,12) not null,
```
```
temp int(11) not null,
```
```
humid int(11) not null,
```
```
primary key(id));
```
![image](https://github.com/DDPlay123/IoT_Python_Server/blob/main/public/images/Dataset.png)
### 設定Google Map API金鑰
位置在view/web/map.ejs
![image](https://github.com/DDPlay123/IoT_Python_Server/blob/main/public/images/key.png)
### 執行Server
```
cd .../IoT_Python_Server
```
```
node app.js
```
