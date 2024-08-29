// 天気予報のデータを取得してチャートを表示する関数
async function fetchWeatherData() {
    const weatherApiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=YOUR_WEATHER_API_KEY&q=Tokyo&days=7';

    try {
        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        const ctx = document.getElementById('weatherChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.forecast.forecastday.map(day => day.date),
                datasets: [{
                    label: 'Temperature (°C)',
                    data: data.forecast.forecastday.map(day => day.day.avgtemp_c),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }]
            },
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
        console.error('天気データの取得中にエラーが発生しました:', error);
    }
}

// ニュースのデータを取得して表示する関数
async function fetchNewsData() {
    const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=jp&apiKey=YOUR_NEWS_API_KEY';

    try {
        const response = await fetch(newsApiUrl);
        const data = await response.json();

        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';

        data.articles.forEach(article => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
            newsList.appendChild(li);
        });
    } catch (error) {
        console.error('ニュースデータの取得中にエラーが発生しました:', error);
    }
}

// 株価の条件を取得して表示する関数
async function fetchStockConditions() {
    const stockApiUrl = `https://api.polygon.io/v3/reference/conditions?asset_class=stocks&limit=10&apiKey=cr88fbpr01qmmifq0tggcr88fbpr01qmmifq0th0`;

    try {
        const response = await fetch(stockApiUrl);
        const data = await response.json();

        if (data.results) {
            const stockConditionsList = document.getElementById('stocksList');
            stockConditionsList.innerHTML = '';

            data.results.forEach(condition => {
                const li = document.createElement('li');
                li.innerHTML = `Condition: ${condition.name}, Abbreviation: ${condition.abbreviation}`;
                stockConditionsList.appendChild(li);
            });
        } else {
            console.error('株価データが取得できませんでした。');
        }
    } catch (error) {
        console.error('株価条件の取得中にエラーが発生しました:', error);
    }
}

// ページがロードされた時にデータを取得
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchNewsData();
    fetchStockConditions();
});
