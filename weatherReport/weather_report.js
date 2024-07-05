
// const GeocodingURL1 = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;
// console.log(GeocodingURL1);

function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = ''; // Replace 'YOUR_API_KEY' with your actual API key
    const GeocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    let LatLan;
    let apiUrl;


    fetch(GeocodingURL)
        .then(response => response.json())
        .then(data => {
            console.log("geo", data);
            LatLan = data;
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LatLan[0].lat}&lon=${LatLan[0].lon}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                      <p>Temperature: ${data.main.temp} &#8451;</p>
                                      <p>Weather: ${data.weather[0].description}</p>`;
                }).catch(error => {
                    console.error('Error fetching weather:', error);
                    const weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
                });
        }).catch(error => {
            console.error('Error fetching geocoding:', error);
        });


}

document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
