const apiKeyWeather = 'd5d3fdcd5ab1c58049c54abd5d5038a2';
const apiKeyNews = 'pub_52029e67944ed57d05729b9424dc003476213';
const cityId = '1850147'; // 東京の都市ID

document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    getNews();
});

function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKeyWeather}&units=metric&lang=ja`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data); // デバッグ用

            const labels = [];
            const temperatures = [];
            
            let currentDate = '';
            let dailyTemps = [];
            
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toDateString();
                
                if (currentDate !== day) {
                    if (currentDate !== '') {
                        const avgTemp = dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length;
                        labels.push(currentDate);
                        temperatures.push(avgTemp);
                    }
                    currentDate = day;
                    dailyTemps = [];
                }
                
                dailyTemps.push(forecast.main.temp);
            });

            if (dailyTemps.length > 0) {
                const avgTemp = dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length;
                labels.push(currentDate);
                temperatures.push(avgTemp);
            }

            if (temperatures.length === 0) {
                alert('データがありません。');
                return;
            }

            document.getElementById('weatherCard').style.display = 'block';

            const ctx = document.getElementById('weatherChart').getContext('2d');
            const existingChart = Chart.getChart(ctx); // 既存のチャートがあれば削除
            if (existingChart) {
                existingChart.destroy();
            }

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '1日の平均気温 (°C)',
                        data: temperatures,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            suggestedMin: Math.min(...temperatures) - 5,
                            suggestedMax: Math.max(...temperatures) + 5,
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getNews() {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKeyNews}&country=jp`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('News data:', data); // デバッグ用

            const newsList = document.getElementById('newsList');
            newsList.innerHTML = '';

            data.results.forEach((article, index) => {
                if (index < 3) { // 最新の3件を表示
                    const newsItem = document.createElement('li');
                    newsItem.innerHTML = `<strong>${article.title}</strong><br>${article.description}`;
                    newsList.appendChild(newsItem);
                }
            });
        })
        .catch(error => console.error('Error fetching news data:', error));
}
