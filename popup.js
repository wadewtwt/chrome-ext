const directButtonSearch = document.getElementById('direct-button-search');
const textInputSearch = document.getElementById('text-input-search');

directButtonSearch.addEventListener('click', async () => {
    try {
        // 读取剪贴板内容
        const clipboardText = await navigator.clipboard.readText();
        textInputSearch.value = clipboardText;


        fetch('https://chromeext.usemock.com/api/douban/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: clipboardText, type: 1 })
        })
            .then(response => response.json())
        //     .then(data => {
        //         const popupContent = document.getElementById('popup-content');
        //         popupContent.innerHTML = ''; // 清空现有内容
        //         data.forEach(item => {
        //             const div = document.createElement('div');
        //             div.innerHTML = `
        //   <img src="${item.image}" alt="${item.description}">
        //   <p>${item.description}</p>
        // `;
        //             popupContent.appendChild(div);
        //         });
        //     })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    } catch (error) {
        console.error('无法读取剪贴板内容:', error);
    }
});

