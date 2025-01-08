# Упражнение 13

## 08.01.25
Използвайте task manager-a от [упражнение 10](https://github.com/FMIjs/advanced-javascript-2024-2025/tree/master/week10/exercise) 10, където да добавите логика за authentication=удостоверяване с помощта на  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) и [cookieparser](https://www.npmjs.com/package/cookie-parser)

1. Нека началната страница е login екран - в случай на първоначален достъп, user-a ще трябва да въведе мейл адрес, срещу който да се сдобие с token, който да се съхранява в бисквитка и да е валиден един час. В случай, че вече потребителят е удостоверен, нека се показва поздрав - от сорта 'Hello, fmi@sofia.bg'

2. Нека достъп до тасковете и операциите с тях има само удостоверен потребител
