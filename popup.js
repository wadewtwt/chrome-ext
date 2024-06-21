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
            .then(data => {
                console.log("remote data:")
                console.log(data.data)
                let remoteData = data.data

                const gridRowDiv = document.querySelector('.grid-row.row-3');
                gridRowDiv.innerHTML = ''
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


    } catch (error) {
        console.error('无法读取剪贴板内容:', error);
    }
});

