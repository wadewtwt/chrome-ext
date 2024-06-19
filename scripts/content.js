document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        console.log("选中内容：" + selectedText)
        localStorage.setItem('selectedText', selectedText);
        var imageContainerDom = document.getElementById('image-container');
        imageContainerDom.style.color = 'red'
    }
})

// document.addEventListener('mouseup', function() {
//     var selectedText = window.getSelection().toString();
//     var imageContainerDom = document.getElementById('image-container');
//
//     if (imageContainerDom){
//         imageContainerDom.innerHTML = '<p>1212</p>'
//     }
// });

function showPopup(x, y) {
    let popup = document.getElementById('custom-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'custom-popup';
        popup.innerHTML = '<p>自定义内容</p>';
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

    popup.addEventListener('mouseover', function() {
        popup.style.display = 'block';
    });

    popup.addEventListener('mouseout', function() {
        popup.style.display = 'none';
    });
}

// document.addEventListener('mousedown', function(event) {
//     console.log("23232")
// })
