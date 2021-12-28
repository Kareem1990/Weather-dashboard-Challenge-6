function getCity() {
    var cityName = $("#cityName")[0].value.trim();

    //getting city date
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=37e7b26f2f66efa0ec22ead551624da8";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

              //getting geographical coordinates
      
                apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";
                
                $("#city-name")[0].textContent = cityName + " (" + moment().format('M/D/YYYY') + ")";

                fetch(apiURL).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (Data) {
                            getWeather(Data);
                        })
                    }
                })
            })
        } else {
            alert("Plese enter a correct city name!");
        }
    })
}


function getWeather(data) {
    $(".results-panel").addClass("visible");

    $("#temperature")[0].textContent = "Temperature: " + data.current.temp + " \u2109";

    getFutureWeather(data);
}

var getFutureWeather = function (data) {
    for (var i = 0; i < 5; i++) {
        var futureWeather = {
            date: convertUnixTime(data, i),
            temp: data.daily[i + 1].temp.day
        }

        var selector = "#day-" + i;
        $(selector)[0].textContent = futureWeather.date;
        selector = "#temp-" + i;
        $(selector)[0].textContent = "Temp: " + futureWeather.temp + " \u2109";

    }
}

function convertUnixTime(data, index) {
    const dateConvert = new Date(data.daily[index + 1].dt * 1000);

    return (dateConvert.toLocaleDateString());
}

//button handler
$("#search-button").on("click", function (event) {
    event.preventDefault();

    getCity();
    $("#city-name")[0].textContent = $(this)[0].textContent + " (" + moment().format('M/D/YYYY') + ")";
    $("#user-form")[0].reset();
})

