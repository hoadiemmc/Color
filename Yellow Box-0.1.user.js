// ==UserScript==
// @name         Yellow Box
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hiển thị một ô màu vàng ở góc trái bên trên màn hình
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tạo phần tử div cho ô màu vàng
    var yellowBox = document.createElement('div');
    yellowBox.style.position = 'fixed';
    yellowBox.style.top = '0';
    yellowBox.style.left = '0';
    yellowBox.style.width = '100px'; // Độ rộng của ô màu vàng
    yellowBox.style.height = '50px'; // Độ cao của ô màu vàng
    yellowBox.style.backgroundColor = 'yellow'; // Màu vàng

    // Thêm ô màu vàng vào trang web
    document.body.appendChild(yellowBox);
})();
