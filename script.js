
// ニュースAPIキーとURL
const newsApiKey = '440f439297b7463f9411a7ef46cf4cd4';
const newsUrl = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${newsApiKey}`;

// 天気APIキーとURL（東京の天気）
const weatherApiKey = 'd5d3fdcd5ab1c58049c54abd5d5038a2';
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&hourly=temperature_2m&timezone=Asia%2FTokyo`;

// ニュースを取得して表示する関数
async function fetchNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        
        console.log(data); // レスポンスをコンソールに出力
        
        if (data.articles) {
            const newsList = document.getElementById('newsList');
            newsList.innerHTML = ''; // 現在のリストをクリア
            
            data.articles.forEach(article => {
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

// ページがロードされた時にデータを取得
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    fetchWeather();
});

