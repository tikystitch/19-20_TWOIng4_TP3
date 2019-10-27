// API : https://openweathermap.org/api

// Clé api
const API_KEY = "4081444b7b90198136fefe6ed4ccf35b";
// Url API
const API_URL_Today = "https://api.openweathermap.org/data/2.5/weather";  //today
// Base source icon
const API_URL_ICON = "http://openweathermap.org/img/wn/";

//URL API
//https://api.openweathermap.org/data/2.5/forecast/daily?q=paris&units=metric&cnt=4&appid=4081444b7b90198136fefe6ed4ccf35b
const API_URL_3 = "https://api.openweathermap.org/data/2.5/forecast/daily" //3jours


class API_WEATHER{
    constructor(city) {
    // Si la ville n'est pas définit alors la ville par défault est Paris
    if(city === undefined){
      city = "paris";
        }
    this.city = city;
  }

  // Faire la requete à l'API openweathermap
  // Retourne une promise
  fetchTodayForecast(){
      return axios
        //get data throught API 
        //Pour trois jours: &cnt=4&appid=4081444b7b90198136fefe6ed4ccf35b
          .get(`${API_URL_Today}?q=${this.city}&units=metric&appid=${API_KEY}`, {
      crossdomain: true
    })
    }
   
  fetchThreeForecast(){
      return axios
        //get data throught API 
        //Pour 7 jours: ?q=paris &units=metric &cnt=3& appid=4081444b7b90198136fefe6ed4ccf35b
          .get(`${API_URL_3}?q=${this.city}&units=metric&cnt=16&appid=${API_KEY}`, {
      crossdomain: true
    })
  }

  getCity() {
      return this.city; 
  }

  // Retourne l'element HTML de l'icon symbolisant la méteo.
  getHTMLElementFromIcon(icon){
    return `<img src=${API_URL_ICON}${icon}@2x.png class="weather-icon"/>`
    }

  //Set city
  setCity() {
      this.city = document.getElementById('city-input').value;
       
    }


}