

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

/*
 * var elementsInvalides = 0;

function filtrerParID(obj) {
  // Si c'est un nombre
  if (obj.id !== undefined && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
    return true;
  } else {
    elementsInvalides++;
    return false;
  }
}

var arrByID = arr.filter(filtrerParID);

 * 
 * 
*/

/*
 * Sort number: a et b sont des datas. genre 
 * function sortNumber(a, b) {
  return a - b;
}

homes.sort(function(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
});

var numArray = [140000, 104, 99];
numArray.sort(sortNumber);

*/


function filtrerParSunrise(data) {

    for (let i; i < 3; i++) {
        if (data.list[i].humidity > 90 ){
            return true; 
        } else {
        return false; 
        }
    }      
}


//Filter en fonction de la température moy > 20°C 
//Les jours avec une temp > 20°C sont: J+


//Utilisation du Sort 
function sortHumidity(arr) {

    //Pour tester les valeurs d'humidité pour les 3 prochains jours
    /*alert(arr[0].humidity);
    alert(arr[1].humidity);
    alert(arr[2].humidity);
    */

    //Pour le sort
    //Du plus petit au plus grand
    arr.sort(function (a, b) {
        return b.humidity - a.humidity
    });
    //test la sortie 
    //alert("Le jour avec le plus d'humidité est le " + arr[0].index);

    //Modifier le DOM
    document.getElementById('Humidity-forecast-main').innerHTML = `J+${arr[0].index}`;
    document.getElementById('Humidity-forecast-temp').innerHTML = `${arr[0].humidity}%`;
}

//Filtrer temp min > 5°C
function filterTempMin(arr) {

    /*Pour le test 
    alert(arr[0].temp.min);
    alert(arr[1].temp.min);
    alert(arr[2].temp.min);
    */

    //Pour stocker les index 
    let res = new Array();

    const result = arr.filter(arr => arr.temp.min > 5);

    if (result.length == 0) {
        document.getElementById('Filter-forecast-main').innerHTML = `Aucun`;
    }
    else {

        for (let i = 0; i < result.length; i++) {
            res.push(result[i].index);
        }
        document.getElementById('Filter-forecast-main').innerHTML = `Oui: J+${res.join("/  J+")}`;
    }
}


//Get les données pour les 3 prochains jours
function getThreeDayForecast() {

    // Appel de la fonction fetchTodayForecast

    apiWeather
        .fetchThreeForecast()
        .then(function (response) {
            // Récupère la donnée d'une API
            const data = response.data;
            var i = 0;
            let arr = new Array(); //

            //On prend uniquement les 3 premiers jours
            for (let pas = 0; pas < 3; pas++) {
                // On récupère l'information principal
                const main = data.list[pas].weather[0].main;
                const description = data.list[pas].weather[0].description;
                const temp = data.list[pas].temp.day;
                const icon = apiWeather.getHTMLElementFromIcon(data.list[pas].weather[0].icon);

                //création d'un array pour sort etc accès donnée plus simple. 
                arr.push(data.list[pas]);
                arr[pas].index = pas+1;

                i= i + 1;  
                // Modifier le DOM
                document.getElementById(i+'-forecast-main').innerHTML = main;
                document.getElementById(i+'-forecast-more-info').innerHTML = description;
                document.getElementById(i+'-icon-weather-container').innerHTML = icon;
                document.getElementById(i+'-forecast-temp').innerHTML = `${temp}°C`;
            }

            //Sort 
            sortHumidity(arr);
            //Filter
            filterTempMin(arr); 
            

        })
        .catch(function (error) {
            // Affiche une erreur
            console.error(error);
        })
}
