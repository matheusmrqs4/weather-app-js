const iconElement = document.getElementById('icon')
const tempElement = document.getElementById('temp-value') 
const descElement = document.getElementById('temp-desc') 
const locationElement = document.getElementById('local') 
const notificationElement = document.getElementById('notf') 
const searchInput = document.getElementById('form-control')
const searchBtn = document.getElementById('botao')


const weather = {};

weather.temperature = {
    unit: 'celsius'
}

const key = '204e2b6de49f3d10ce520bfbc801bc88'
const lang = 'pt_br'

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)

} else{
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>O Navegador NÃO suporta Gelocalização</p>`
}

// pesquisar cidade

searchBtn.addEventListener('click', function(){
    searchResults(searchInput.value)
})

searchInput.addEventListener('keypress', enter)
    function enter(event) {
        if(event.key === "Enter"){
            searchResults(searchInput.value)
        }
    }

function searchResults(locationElement){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${locationElement}&appid=${key}&lang=${lang}&units=metric`
    
    fetch(api).then(function(response){
        if(!response.ok){
            throw new Error(`Cidade não encontrada, tente novamente!`)
        }
    
        return response.json()
    })

    .catch(error => {
        alert(error.message)
    })

   .then(response => {
       displayWeather(response)  
   })

}


function setPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    getWeather(latitude, longitude)
}

function showError(error){ 
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=${lang}&units=metric`
    
    fetch(api).then(function(response){
    
        return response.json()
    })

   .then(response => {
       displayWeather(response)  
   })

}

    function displayWeather(weather) {
        let iconName = weather.weather[0].icon
        iconElement.innerHTML = `<img src="icons/${iconName}.png" />`

        let temp = `${Math.round(weather.main.temp)}`
        tempElement.innerHTML = `${temp}º <span>C</span>`

        descElement.innerHTML = weather.weather[0].description

        let city = weather.name 
        let country = weather.sys.country
        locationElement.innerHTML = `${city}, ${country}`
    }

