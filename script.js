//make a request to get user's location. an alert is made if location cannot be found
var location_coords = [];

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(
	function(position){
		//console.log(position);

		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		location_coords.push(lat);
		location_coords.push(lon);

		locationResults();
	});
} else {
	alert("Make sure you have geolocation enabled.")
}

function selectIcon(weather_desc){

}

function locationResults(){
	var weather_api = "http://api.openweathermap.org/data/2.5/weather?lat="+String(location_coords[0])+"&lon="+String(location_coords[1])+"&APPID=d611f1a941d93732129e3e616b741bb7";

	console.log(weather_api);

	$.ajax({
		url: weather_api,
		type: "GET",
		dataType: "json",
		success: function(response){
			console.log(response);

			var temp_kelvin = response.main.temp;
			var temp_celsius = Math.round(temp_kelvin-273.15);
			var temp_farhenheit = Math.round(temp_kelvin*(9/5)-459.67)
			var weather_location = response.name;
			var weather_desc = response.weather[0].description;


			$(".change_unit").click(
				function(){
					let current_unit = $(".change_unit button").text();
					if(current_unit === "Celsius"){
					$(".change_unit button").text("Farhenheit");
					$(".temperature").text(temp_farhenheit+"° "+"F")
					} 
					else if(current_unit === "Farhenheit"){
					$(".change_unit button").text("Celsius");
					$(".temperature").text(temp_celsius+"° "+"C");
					}
				})

			$(".temperature").text(temp_celsius+"° "+"C");

			$(".condition").text(weather_desc);

			$(".location").text(weather_location);

		},
		error: function(){
			alert("We couldn't obtain weather information for your area.")
		}
	});
}