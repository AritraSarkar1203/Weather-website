const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherImg=document.querySelector(".weather-img");
const changeColor=document.querySelector(".card");

const apiKey="fecc35b0a74f57d2938d17a78381aec0";

async function fetchLatLon(city) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        return { lat, lon };
    } else {
        throw new Error('Invalid city name');
    }
}

async function fetchWeather(){
	const city=document.getElementById('city').value;
	
		const {lat,lon}=await fetchLatLon(city);
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
		const response = await fetch(weatherUrl);
        const weatherData = await response.json();
		displayWeather(weatherData);
	
	

}

function displayWeather(data){

	document.querySelector(".city").innerHTML=data.name;
	document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
	document.querySelector(".wind").innerHTML=Math.round(data.wind.speed)+"km/h";
	document.querySelector(".humidity").innerHTML=data.main.humidity+"%";

	if(data.weather[0].main=="Clouds"){
		weatherImg.src="images/clouds.png";
		changeColor.style.background="linear-gradient(178.6deg, rgb(20, 36, 50) 11.8%, rgb(124, 143, 161) 83.8%)";
	}
	else if((data.weather[0].main=="Clear")){
		weatherImg.src="images/clear.png";
		changeColor.style.background="radial-gradient(circle at 10% 20%, rgb(228, 110, 0) 0%, rgb(247, 189, 2) 90%)";
		
	}
	else if((data.weather[0].main=="Drizzle")){
		weatherImg.src="images/drizzle.png";
		changeColor.style.background="linear-gradient(109.6deg, rgb(27, 27, 79) 11.2%, rgb(120, 201, 244) 100.2%)";
	}
	else if((data.weather[0].main=="Mist")){
		weatherImg.src="images/mist.png";
		changeColor.style.background="linear-gradient(91.3deg, rgb(135, 174, 220) 1.5%, rgb(255, 255, 255) 100.3%)";
	}
	else if((data.weather[0].main=="Thunderstorm")){
		weatherImg.src="images/thunderstorm.png";
		document.querySelector(".crad").style.backgroundColor="linear-gradient(to top, #09203f 0%, #537895 100%)";
	}
	else if((data.weather[0].main=="Rain")){
		weatherImg.src="images/rain.png";
		changeColor.style.background="linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)";
	}
	else if((data.weather[0].main=="Snow")){
		weatherImg.src="images/snow.png";
		changeColor.style.background="linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%)";
	}
	
	document.querySelector(".weather").style.display="block";
	

}
searchBtn.addEventListener("click",()=>{
	fetchWeather(searchBox.value);
})