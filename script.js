// ニュースAPIキーとURL
const newsApiKey = 'pub_52029e67944ed57d05729b9424dc003476213';
const newsUrl = `https://newsdata.io/api/1/latest?apikey=${newsApiKey}&q=joe%20biden&country=us&domainurl=news.google.com`;

// 天気APIキーとURL（東京の天気）
const weatherApiKey = 'd5d3fdcd5ab1c58049c54abd5d5038a2';
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&hourly=temperature_2m&timezone=Asia%2FTokyo`;

// 株価APIキーとURL
const stockApiKey = 'h4p6gCFDsDOVVIoG5kmL5sOai7x8UcSV';
const stockId = '12bcb638-ac88-44f9-bbba-5eaf9c4033e0';
const stockUrl = `https://api.stockapi.net/api/v1/stocks?apikey=${stockApiKey}&id=${stockId}`;

// ニュースを取得して表示する関数
async function fetchNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        
        if (data.results) {
            const newsList = document.getElementById('newsList');
            newsList.innerHTML = ''; // 現在のリストをクリア
            
            data.results.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a>`;
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

// 株価を取得して表示する関数
async function fetchStocks() {
    try {
        const response = await fetch(stockUrl);
        const data = await response.json();
        
        if (data.stocks) {
            const stocksList = document.getElementById('stocksList');
            stocksList.innerHTML = ''; // 現在のリストをクリア
            
            data.stocks.forEach(stock => {
                const li = document.createElement('li');
                li.innerHTML = `${stock.name}: ${stock.price}円`;
                stocksList.appendChild(li);
            });
        } else {
            console.error('株価データが取得できませんでした。');
        }
    } catch (error) {
        console.error('株価取得中にエラーが発生しました:', error);
    }
}

// ページがロードされた時にデータを取得
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    fetchWeather();
    fetchStocks();
});

