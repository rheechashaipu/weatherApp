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
} else{
	alert("Make sure you have geolocation enabled.")
	}



function locationResults(){
	var weather_api = "http://api.openweathermap.org/data/2.5/weather?lat="+String(location_coords[0])+"&lon="+String(location_coords[1])+"&APPID=d611f1a941d93732129e3e616b741bb7";

	//console.log(weather_api);

	$.ajax({
		url: weather_api,
		type: "GET",
		dataType: "json",
		success: function(response){
			console.log(response);

			var temp_kelvin = response.main.temp;
			var temp_celsius = Math.round(temp_kelvin-273.15);
			var weather_location = response.name;
			console.log(temp_kelvin);
			console.log(temp_celsius);
			$(".temperature").text(temp_celsius+"°"+"Celsius");

			$(".location").text(weather_location);
		},
		error: function(){
			alert("We couldn't obtain weather information for your area.")
		}
	});
}



//weather_api is used in the url attr of our ajax req.

