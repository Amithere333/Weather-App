const apiKey='c54c21c8e77b23284c178051ede70bd8';

const apiUrl='https://api.openweathermap.org/data/2.5/weather';

const locationInput=document.getElementById('location-input'); //input field 

const searchButton=document.getElementById('searchButton'); //search button 


const locationElement=document.getElementById('location');

const temperatureElement=document.getElementById('temperature');

const descriptionElement=document.getElementById('description');

//click event for  search button
searchButton.addEventListener('click',()=>{
    const location=locationInput.value;
    if(location){
        fetchWeather(location);
        
    }
    locationInput.value='';
});

//enter  key will work same as search button
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
            locationInput.value = ''; // Clear input field after fetching
        }
    }
});


function fetchWeather(location){
    const url=`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    //Fetching weather data from Weathermap API
    fetch(url)
    .then(Response=>Response.json())
    .then(data=>{
        //Updating the UI with weather detail
        locationElement.textContent=`City: ${data.name}, ${data.sys.country}`;
        temperatureElement.textContent=`Temperature: ${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent='Atmosphere: '+ data.weather[0].description;
    })
    //Handles error during fetching the data
    .catch(error=>{
        console.error('Error fetching weather data:',error);
        locationElement.textContent = "";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "⚠️ Unable to find the city data! Please try again";
        
    })
}