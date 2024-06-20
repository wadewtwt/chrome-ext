let popupVisible = false;

document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString().trim();
    console.log("selectedText is:" + selectedText)
    if (selectedText.length > 0) {
        // 发送消息到background.js
        // chrome.runtime.sendMessage({text: selectedText});
        // showIcon(event.pageX, event.pageY);
        // showPopup(event.pageX, event.pageY, selectedText);
    }
});

function showIcon(x, y) {
    let iconPopup = document.getElementById('icon-popup');
    console.log("iconPopup is:" + iconPopup)
    if (!iconPopup) {
        console.log("iconPopup 没有，来新建个")
        const iconPopup = document.createElement('img');
        iconPopup.src = 'https://cdn2.jianshu.io/assets/default_avatar/12-aeeea4bedf10f2a12c0d50d626951489.jpg'; // 替换为你的图片URL
        console.log("iconPopup:" + iconPopup)
        iconPopup.style.left = x + 'px';
        iconPopup.style.top = y + 'px';
        iconPopup.style.display = 'block';
        // 将图片添加到页面
        document.body.appendChild(iconPopup);
    }

}

function showPopup(x, y, selectedText) {popup
    let popup = document.getElementById('custom-popup');
    if (!popup) {
        console.log("生成了一个custom-popup元素")
        popup = document.createElement('div');
        popup.id = 'custom-popup';
        popup.innerHTML = '<div id="popup-content"><p>Loading...</p><ul id="options-list"></ul></div>';
        popup.style.position = 'absolute';
        popup.style.backgroundColor = 'white';
        popup.style.border = '1px solid #ccc';
        popup.style.padding = '10px';
        popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
        popup.style.zIndex = '1000';
        document.body.appendChild(popup);
    }
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.display = 'block';
    popupVisible = true;

    const data = {
        options: ['选项1', '选项2', '选项3'] // 这是一个字符串数组，替换为你想要显示的内容
    };
    updateOptionsList(data);
}

function updateOptionsList(data) {
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = ''; // 清空现有选项
    data.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        optionsList.appendChild(li);
    });


    // 加的
    const popupContentDom = document.getElementById('popup-content');
    if (popupContentDom !== null){
        popupContentDom.style.display = 'block';
    }
    optionsList.style.display = 'block';

}

document.addEventListener('mousedown', function(event) {
    const popup = document.getElementById('custom-popup');
    console.log("last popup:" + popup + ",popupVisible:" + popupVisible)
    if (popup && popupVisible) {
        const isClickInsidePopup = popup.contains(event.target);
        console.log("last isClickInsidePopup:" + isClickInsidePopup)
        if (!isClickInsidePopup) {
            popup.style.display = 'none';
            popupVisible = false;
        }
    }

});
