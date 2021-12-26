localStorage.clear();

function getCity() {
    var cityName = $("#cityName")[0].value.trim();


    //getting city date
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                $("#city-name")[0].textContent = cityName + " (" + moment().format('M/D/YYYY') + ")";
              //getting geographical coordinates
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                //getting current weather
                apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

                fetch(apiURL).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (Data) {
                            getWeather(Data);
                        })
                    }
                })
            })
        } else {
            alert("Cannot find city!");
        }
    })
}


function getWeather(data) {
    $(".results-panel").addClass("visible");

    $("#temperature")[0].textContent = "Temperature: " + data.current.temp + " \u2109";

    // getFutureWeather(data);
}

//button handler
$("#search-button").on("click", function (event) {
    event.preventDefault();

    getCity();
    $("#city-name")[0].textContent = $(this)[0].textContent + " (" + moment().format('M/D/YYYY') + ")";


    $("form")[0].reset();
})


// function getFutureWeather(data) {
//     for (var i = 0; i < 5; i++) {
//         var futureWeather = {
//             date: convertUnixTime(data, i),
//             temp: data.daily[i + 1].temp.day.toFixed(1),
//         }

//         var currentSelector = "#day-" + i;
//         $(currentSelector)[0].textContent = futureWeather.date;
//         currentSelector = "#img-" + i;
//         $(currentSelector)[0].src = futureWeather.icon;
//         currentSelector = "#temp-" + i;
//         $(currentSelector)[0].textContent = "Temp: " + futureWeather.temp + " \u2109";
//         currentSelector = "#hum-" + i;
//         $(currentSelector)[0].textContent = "Humidity: " + futureWeather.humidity + "%";
//     }
// }



// $(".city-list-box").on("click", ".city-name", function () {

//     var coordinates = (localStorage.getItem($(this)[0].textContent)).split(" ");
//     coordinates[0] = parseFloat(coordinates[0]);
//     coordinates[1] = parseFloat(coordinates[1]);

//     $("#city-name")[0].textContent = $(this)[0].textContent + " (" + moment().format('M/D/YYYY') + ")";

//     getListCity(coordinates);
// })