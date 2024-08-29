// ニュースAPIキーとURL
const newsApiKey = 'pub_52029e67944ed57d05729b9424dc003476213';
const newsUrl = `https://newsdata.io/api/1/latest?apikey=${newsApiKey}&q=joe%20biden&country=us&domainurl=news.google.com`;

// 天気APIキーとURL（東京の天気）
const weatherApiKey = 'd5d3fdcd5ab1c58049c54abd5d5038a2';
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&hourly=temperature_2m&timezone=Asia%2FTokyo`;

// 株価APIのURL
const stockApiUrl = 'https://api.polygon.io/v3/reference/conditions?asset_class=stocks&limit=10&apiKey=h4p6gCFDsDOVVIoG5kmL5sOai7x8UcSV';

// ニュースを取得して表示する関数
async function fetchNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        
        console.log(data); // レスポンスをコンソールに出力
        
        if (data && data.results) {
            const newsList = document.getElementById('newsList');
            newsList.innerHTML = ''; // 現在のリストをクリア
            
            data.results.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsList.appendChild(li);
            });
        } else {
            console.error('ニュースデータが取得できませんでした。');
        }
    } catch (error) {
        console.error('ニュース取得中にエラーが発生しました:', error);
    }
}

// 天気予報を取得して表示する関数
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        console.log(data); // レスポンスをコンソールに出力
        
        const temperatures = data.hourly.temperature_2m;
        const labels = temperatures.map((_, index) => index + '時');
        const dataSet = {
            labels: labels,
            datasets: [{
                label: '気温',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('weatherChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: dataSet,
            options: {
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
    } catch (error) {
        console.error('天気予報取得中にエラーが発生しました:', error);
    }
}

// 株価情報を取得して表示する関数
async function fetchStockConditions() {
    try {
        const response = await fetch(stockApiUrl);
        const data = await response.json();
        
        console.log(data); // コンソールにデータを表示

        if (data && data.results) {
            const stockConditionsList = document.getElementById('stocksList');
            stockConditionsList.innerHTML = ''; // 現在のリストをクリア

            // データの形式に合わせて修正が必要です。ここでは仮のデータ処理を行っています。
            const stockLabels = data.results.map(item => item.ticker);
            const stockValues = data.results.map(item => item.close); // 仮のデータとして閉じる値を使用

            const stockData = {
                labels: stockLabels,
                datasets: [{
                    label: '株価',
                    data: stockValues,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1
                }]
            };

            const ctx = document.getElementById('stockChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: stockData,
                options: {
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
        } else {
            console.error('株価データが取得できませんでした。');
        }
    } catch (error) {
        console.error('株価取得中にエラーが発生しました:', error);
    }
}

// ページがロードされた時にデータを取得して表示
window.onload = () => {
    fetchNews();
    fetchWeather();
    fetchStockConditions();
};

