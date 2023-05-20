function11("bury");
const button = document.querySelector('.button');
const inputValue = document.querySelector('.inputValue');
const cityName = document.querySelector('.name');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.icon');
const humi = document.querySelector('.humi');
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const wind = document.querySelector('.wind');
const feelsLike = document.querySelector('.feelslike');



button.addEventListener('click', function12)

function function12(){
    function11(inputValue.value)
}
// This function takes a city name as a parameter and fetches the weather data using the OpenWeatherMap API
function function11(name){
    console.log("data from api")
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+'&units=metric&appid=a996fdcd6c4f2a16fd83338c84ab0236')
  .then(response => response.json())
  .then(data => {
    
    localStorage.setItem(name.toLowerCase(),JSON.stringify(data))
    console.log(data)
    let lat=data["coord"]["lat"]
    let lon=data["coord"]["lon"]
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=a996fdcd6c4f2a16fd83338c84ab0236')
    .then(res=>res.json())
    .then(dat=>{
        console.log("data is",dat)
        let rain=dat["rain"]["1h"];
        document.getElementById("rain").innerHTML = '<i class="fa-solid fa-cloud-rain"></i>' + rain + 'mm';
    })
    .catch(error=>document.getElementById("rain").innerHTML='<i class="fa-solid fa-cloud-rain"></i> Rain: N/A')
    // These variables store various pieces of weather data from the API response
    var humidity=data['main']['humidity']
    var windSpeed = data['wind']['speed'];
    var nameValue = data['name'];
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description']
    var iconValue = data['weather'][0]['icon']
    var feelsLikeValue = data['main']['feels_like'];
    // These lines of code update the HTML elements on the page with the weather data
    cityName.innerHTML = nameValue;
    temp.innerHTML = tempValue+"°C";
    desc.innerHTML = descValue;
    humi.innerHTML ='<i class="fas fa-tint"></i> Humidity:' +humidity+"%";
    wind.innerHTML = '<i class="fa-sharp fa-solid fa-wind"></i>Wind Speed:' +windSpeed + "m/s";
    feelsLike.innerHTML='<i class="fa-solid fa-temperature-half"></i> Feels Like : '+feelsLikeValue+"°C";
    
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate); // "2022-06-17"
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    let dayt = weekday[d.getDay()];
    console.log(dayt)
    day.innerHTML=dayt+", "+currentDate;
    
    icon.src = 'http://openweathermap.org/img/w/'+ iconValue +'.png';
  })
  .catch(err => {
    
    console.log("Data from local storage");
    ashok=localStorage.getItem(name.toLowerCase())
    final=JSON.parse(ashok)
    var humidity=final['main']['humidity']
    var windSpeed = final['wind']['speed'];
    var nameValue = final['name'];
    var tempValue = final['main']['temp'];
    var descValue = final['weather'][0]['description']
    
    var feelsLikeValue = final['main']['feels_like'];
    cityName.innerHTML = nameValue;
    temp.innerHTML = tempValue+"°C";
    desc.innerHTML = descValue;
    humi.innerHTML ='<i class="fas fa-tint"></i> Humidity:' +humidity+"%";
    wind.innerHTML = '<i class="fa-sharp fa-solid fa-wind"></i>Wind Speed:' +windSpeed + "m/s";
    feelsLike.innerHTML='<i class="fa-solid fa-temperature-half"></i> Feels Like : '+feelsLikeValue+"°C";
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate); // "2022-06-17"
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    let dayt = weekday[d.getDay()];
    console.log(dayt)
    day.innerHTML=dayt+", "+currentDate;
    
    icon.alt = 'No image found';
})
}