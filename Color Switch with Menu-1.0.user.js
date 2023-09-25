// ==UserScript==
// @name         Color Switch with Menu
// @namespace    https://www.example.com/
// @version      1.0
// @description  Tự động chuyển đổi màu trên mọi trang web và kiểm soát tính năng bằng menu.
// @author       Your Name
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var colorElement = document.createElement('div');
    colorElement.style.position = 'fixed';
    colorElement.style.top = '20px';
    colorElement.style.left = '20px';
    colorElement.style.fontSize = '20px';
    colorElement.style.transition = 'color 0.5s ease-in-out';

    var menuElement = document.createElement('div');
    menuElement.style.position = 'fixed';
    menuElement.style.top = '20px';
    menuElement.style.left = '60px';
    menuElement.style.fontSize = '20px';

    var timeElement = document.createElement('div');
    timeElement.style.position = 'fixed';
    timeElement.style.bottom = '20px';
    timeElement.style.left = '20px';
    timeElement.style.fontSize = '20px';

    // Kiểm tra trạng thái màu hiện tại
    var isRedEnabled = GM_getValue('redStatus', false);

    // Hàm bật/tắt màu
    function toggleColor() {
        isRedEnabled = !isRedEnabled;
        GM_setValue('redStatus', isRedEnabled);
        updateMenu();
        updateColor();
    }

    // Cập nhật giao diện menu
    function updateMenu() {
        var redText = isRedEnabled ? 'Màu đỏ: Bật' : 'Màu đỏ: Tắt';
        var greenText = isRedEnabled ? 'Màu xanh: Tắt' : 'Màu xanh: Bật';

        GM_registerMenuCommand(redText, toggleColor);
        GM_registerMenuCommand(greenText, toggleColor);

        var currentTime = new Date().toLocaleTimeString();
        menuElement.innerHTML = `
          <div style="color:${isRedEnabled ? 'red' : 'green'}">${redText}</div>
          <div style="color:${isRedEnabled ? 'green' : 'red'}">${greenText}</div>
        `;

        timeElement.style.color = isRedEnabled ? 'red' : 'green';
        timeElement.textContent = currentTime;
    }

    // Cập nhật màu
    function updateColor() {
        if (isRedEnabled) {
            colorElement.style.color = 'red';
        } else {
            colorElement.style.color = 'green';
        }
    }

    // Cập nhật menu ban đầu
    updateMenu();

    // Cập nhật màu ban đầu
    updateColor();

    // Thêm bộ đếm màu vào trang web
    document.body.appendChild(colorElement);

    // Thêm menu vào trang web
    document.body.appendChild(menuElement);

    // Thêm ô đếm thời gian vào trang web
    document.body.appendChild(timeElement);

    // Kiểm tra URL hiện tại
    var currentUrl = window.location.href;
    if (currentUrl.indexOf('whatismyipaddress.com') !== -1) {
        isRedEnabled = false; // Tắt màu đỏ
        GM_setValue('redStatus', false);
        updateMenu();
        updateColor();
    } else if (currentUrl.indexOf('checkip.com.vn') !== -1) {
        isRedEnabled = true; // Bật màu đỏ
        GM_setValue('redStatus', true);
        updateMenu();
        updateColor();
    }

    // Hàm cập nhật thời gian
    function updateTime() {
        var currentTime = new Date().toLocaleTimeString();
        timeElement.textContent = currentTime;
        timeElement.style.color = isRedEnabled ? 'red' : 'green';
    }

    // Cập nhật thời gian ban đầu và cập nhật mỗi giây
    updateTime();
    setInterval(updateTime, 1000);
})();
