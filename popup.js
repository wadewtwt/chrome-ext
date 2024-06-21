const directButtonSearch = document.getElementById('direct-button-search');
const textButtonSearch = document.getElementById('text-button-search');
const textInputSearch = document.getElementById('text-input-search');

directButtonSearch.addEventListener('click', async () => {
    try {
        // 读取剪贴板内容
        const clipboardText = await navigator.clipboard.readText();
        textInputSearch.value = clipboardText;

        if (clipboardText.length === 0){
            // 初始化主要内容的div
            const gridRowDiv = document.querySelector('.grid-row.row-3');
            gridRowDiv.innerHTML = ''

            const pTag = document.createElement('p');
            pTag.textContent = "您的粘贴板为空，请确认~"
            pTag.className = 'grid-item film-p';
            gridRowDiv.appendChild(pTag);
        }else{
            requestDoDiv(clipboardText);
        }

    } catch (error) {
        console.error('粘贴搜索出错:', error);
    }
});

textButtonSearch.addEventListener('click', async () => {
    try {
        console.log("textInputSearch is:" + textInputSearch)
        if (textInputSearch.value.length === 0){
            // 初始化主要内容的div
            const gridRowDiv = document.querySelector('.grid-row.row-3');
            gridRowDiv.innerHTML = ''

            const pTag = document.createElement('p');
            pTag.textContent = "您的搜索框为空，请确认~"
            pTag.className = 'grid-item film-p';
            gridRowDiv.appendChild(pTag);
        }else{
            requestDoDiv(textInputSearch);
        }
    } catch (error) {
        console.error('按钮搜索出错:', error);
    }
});

function requestDoDiv(keyword){
    // 初始化主要内容的div
    const gridRowDiv = document.querySelector('.grid-row.row-3');
    gridRowDiv.innerHTML = ''
    fetch('https://chromeext.usemock.com/api/douban/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: keyword, type: 1 })
    })
        .then(response => response.json())
        .then(data => {
            console.log("remote data:")
            console.log(data.data)
            let remoteData = data.data

            remoteData.list.forEach(movie => {
                // 创建一个新的a标签
                const aTag = document.createElement('a');
                aTag.className = 'grid-item film-a';
                aTag.href = movie.url;
                aTag.target = '_blank';

                // 创建img标签并设置属性
                const imgTag = document.createElement('img');
                imgTag.className = 'film-img';
                imgTag.src = movie.cover;
                imgTag.alt = '图片';

                // 创建标题h2标签
                const titleTag = document.createElement('h2');
                titleTag.textContent = movie.title;

                // 创建评分p标签
                const ratingTag = document.createElement('p');
                ratingTag.textContent = `评分：${movie.rating}`;

                // 将img、h2和p标签添加到a标签中
                aTag.appendChild(imgTag);
                aTag.appendChild(titleTag);
                aTag.appendChild(ratingTag);

                // 将a标签添加到div中
                gridRowDiv.appendChild(aTag);
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

