const directButtonSearch = document.getElementById('direct-button-search');
const textButtonSearch = document.getElementById('text-button-search');


// 从剪贴板查询
directButtonSearch.addEventListener('click', async () => {
    const textInputSearch = document.getElementById('text-input-search');
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

// 从搜索框查询
textButtonSearch.addEventListener('click', async () => {
    const textInputSearch = document.getElementById('text-input-search');
    try {
        console.log("textInputSearch is:" + textInputSearch.value)
        if (textInputSearch.value.length === 0){
            // 初始化主要内容的div
            const gridRowDiv = document.querySelector('.grid-row.row-3');
            gridRowDiv.innerHTML = ''

            const pTag = document.createElement('p');
            pTag.textContent = "您的搜索框为空，请确认~"
            pTag.className = 'grid-item film-p';
            gridRowDiv.appendChild(pTag);
        }else{
            requestDoDiv(textInputSearch.value);
        }
    } catch (error) {
        console.error('按钮搜索出错:', error);
    }
});

// 请求接口并替换相关div
function requestDoDiv(keyword){
    // 初始化主要内容的div
    const gridRowDiv = document.querySelector('.grid-row.row-3');
    gridRowDiv.innerHTML = ''
    // fetch('https://chromeext.usemock.com/api/douban/search', {
    fetch('https://pan.daohangpan.top/api/searchFilm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: keyword, type: 1 })
    })
        .then(response => response.json())
        .then(data => {
            console.log("remote data:")
            console.log(data.data)
            let remoteData = data.data
            if (remoteData.list.length === 0){
                const aTag = document.createElement('a');

                const textNode = document.createTextNode('抱歉没有找到...');
                aTag.appendChild(textNode);

                const spanTag = document.createElement('p');
                spanTag.textContent = '点我反馈>>>';
                spanTag.style.color = '#4990F5'; // 只给“点我反馈”设置颜色
                spanTag.style.cursor = "pointer"
                spanTag.id = "feedback"
                spanTag.addEventListener('click', handleFeedbackClick);

                aTag.appendChild(spanTag);

                gridRowDiv.appendChild(aTag);
            }
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

function handleFeedbackClick() {
    const feedbackDom = document.getElementById('feedback');
    if (feedbackDom !== null){
        const textInputSearch = document.getElementById('text-input-search');
        if (textInputSearch.value.length > 0){
            fetch('http://116.198.203.114:13001/api/ReportKeyword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword: textInputSearch })
            })
                .then(data => {
                    feedbackDom.textContent = "感谢反馈！♥"
                })
        }
    }
}

