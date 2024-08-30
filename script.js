// メニューの表示/非表示を切り替える関数
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

// ニュースを取得して表示する
async function fetchNews() {
    const apiKey = '1ea6cb85d8e4996c79c2702af1335e72';
    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ネットワークエラー');
        }
        const data = await response.json();
        // ニュースを日本語に翻訳して表示
        const translatedArticles = await translateArticles(data.articles);
        displayNews(translatedArticles);
    } catch (error) {
        console.error('ニュースの取得に失敗しました:', error);
    }
}

// ニュースのタイトルと説明を日本語に翻訳する
async function translateArticles(articles) {
    const translateUrl = 'https://api.example.com/translate'; // 翻訳APIのURL
    const apiKey = 'your-translate-api-key'; // 翻訳APIキー

    const translatedArticles = await Promise.all(articles.map(async article => {
        try {
            const response = await fetch(translateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    text: article.title + '\n' + article.description,
                    targetLang: 'ja' // 翻訳先の言語
                })
            });
            if (!response.ok) {
                throw new Error('翻訳エラー');
            }
            const translation = await response.json();
            const [title, description] = translation.text.split('\n');
            return {
                ...article,
                title,
                description
            };
        } catch (error) {
            console.error('翻訳に失敗しました:', error);
            return article; // 翻訳に失敗した場合は元の記事を返す
        }
    }));
    return translatedArticles;
}


// ニュースをHTMLに追加する
function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // 既存のニュースをクリア
    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">続きを読む</a>
        `;
        newsList.appendChild(listItem);
    });
}


// ニュースをHTMLに追加する
function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // 既存のニュースをクリア
    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">続きを読む</a>
        `;
        newsList.appendChild(listItem);
    });
}

// 株価データを取得して表示する (例)
async function fetchStocks() {
    const apiKey = 'h4p6gCFDsDOVVIoG5kmL5sOai7x8UcSV'; // ここに実際のAPIキーを設定
    const url = `https://api.example.com/stocks?apikey=${apiKey}`; // 実際のAPI URLに置き換えてください
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ネットワークエラー');
        }
        const data = await response.json();
        displayStocks(data.stocks); // 実際のデータ構造に合わせて変更
    } catch (error) {
        console.error('株価の取得に失敗しました:', error);
    }
}

// 株価をHTMLに追加する
function displayStocks(stocks) {
    const stocksList = document.getElementById('stocksList');
    stocksList.innerHTML = ''; // 既存の株価をクリア
    stocks.forEach(stock => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${stock.name}</h3>
            <p>現在の価格: ${stock.price}</p>
        `;
        stocksList.appendChild(listItem);
    });
}

// チャートを描画する関数
function createChart() {
    const weatherChart = document.getElementById('weatherChart').getContext('2d');
    const stockChart = document.getElementById('stockChart').getContext('2d');

    // 天気チャートの例
    new Chart(weatherChart, {
        type: 'line',
        data: {
            labels: ['日', '月', '火', '水', '木', '金', '土'],
            datasets: [{
                label: '気温',
                data: [20, 22, 19, 24, 25, 27, 28],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 株価チャートの例
    new Chart(stockChart, {
        type: 'bar',
        data: {
            labels: ['AAPL', 'GOOGL', 'AMZN', 'MSFT'],
            datasets: [{
                label: '株価',
                data: [145, 2730, 3340, 298],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ページ読み込み時にニュースと株価データを取得する
window.onload = function() {
    fetchNews();
    fetchStocks();
    createChart();
    setupGame(); // ゲームの初期化
};
