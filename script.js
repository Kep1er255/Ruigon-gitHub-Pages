const weatherApiKey = 'd5d3fdcd5ab1c58049c54abd5d5038a2'; // 天気APIキー
const newsApiKey = 'pub_52029e67944ed57d05729b9424dc003476213'; // ニュースAPIキー

function fetchWeatherData() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo`)
        .then(response => response.json())
        .then(data => {
            const temperatures = data.hourly.temperature_2m;
            const labels = temperatures.map((_, i) => `Hour ${i + 1}`);
            const ctx = document.getElementById('weatherChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature',
                        data: temperatures,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Temperature (°C)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Failed to fetch weather data:', error));
}

function fetchNewsData() {
    fetch(`https://newsdata.io/api/1/news?apikey=${newsApiKey}&country=jp`)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('newsList');
            data.results.forEach(article => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Failed to fetch news data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchNewsData();
});
