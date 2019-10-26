

const apiWeather = new API_WEATHER();

// Fonction appelée lors du click du bouton
function start() {
  // Création de l'objet apiWeather
  //const apiWeather = new API_WEATHER();
  // Appel de la fonction fetchTodayForecast 
  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;


      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
    
      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
        })

    getThreeDayForecast(); 

}

function newCity() {
    // Création de l'objet apiWeather
    apiWeather.setCity();
    start(); 

}
 
function getThreeDayForecast() {

    // Appel de la fonction fetchTodayForecast

    apiWeather
        .fetchThreeForecast()
        .then(function (response) {
            // Récupère la donnée d'une API
            const data = response.data;

            /*
            //Pour filtrer: 
            const filtreSup3 = data.filter(list => {
                if (list > 3) return true; 
                return false
            })
            */

            //On prend uniquement les 3 premiers jours
            for (let pas = 0; pas < 3; pas++) {
                // On récupère l'information principal
                const main = data.list[pas].weather[0].main;
                const description = data.list[pas].weather[0].description;
                const temp = data.list[pas].temp.day;
                const icon = apiWeather.getHTMLElementFromIcon(data.list[pas].weather[0].icon);

                if (pas === 0) {
                    // Modifier le DOM
                    document.getElementById('tomorrow-forecast-main').innerHTML = main;
                    document.getElementById('tomorrow-forecast-more-info').innerHTML = description;
                    document.getElementById('tomorrow-icon-weather-container').innerHTML = icon;
                    document.getElementById('tomorrow-forecast-temp').innerHTML = `${temp}°C`;
                }
                if (pas === 1) {
                    // Modifier le DOM
                    document.getElementById('AD-forecast-main').innerHTML = main;
                    document.getElementById('AD-forecast-more-info').innerHTML = description;
                    document.getElementById('AD-icon-weather-container').innerHTML = icon;
                    document.getElementById('AD-forecast-temp').innerHTML = `${temp}°C`;
                }
                if (pas === 2) {
                    // Modifier le DOM
                    document.getElementById('AAD-forecast-main').innerHTML = main;
                    document.getElementById('AAD-forecast-more-info').innerHTML = description;
                    document.getElementById('AAD-icon-weather-container').innerHTML = icon;
                    document.getElementById('AAD-forecast-temp').innerHTML = `${temp}°C`;
                }
            }
        })
        .catch(function (error) {
            // Affiche une erreur
            console.error(error);
        })
}
