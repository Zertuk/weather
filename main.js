$(document).ready(function() {

	$('#location_input').select();

	var script = document.createElement('script');

	$('form').on('submit', function (inp) {
		var locInput = $.trim($('#location_input').val().toString());
		console.log(locInput);
		inp.preventDefault();
		var zip = locInput;

		if (locInput == '') {
			$('#error').text('PLEASE ENTER A LOCATION OR A ZIPCODE');
		}	
		else {
		script.src = 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=' + zip + '&format=json&callback=getData&key=j8xvysb7t9jp2dvw7pwcbgs3'
		document.body.appendChild(script);
		console.log(script);
		}
	})
});

var getData = function(weather) {
	if ('error' in weather.data) {
		$('#error').text('LOCATION INVALID, TRY AGAIN');
	}
	else {
		var currentTemp = weather.data.current_condition[0].temp_F;
		var cloud = weather.data.current_condition[0].cloudcover;
		var time = weather.data.current_condition[0].observation_time;
		$('#fetch').remove();
		var sky = ["#6698FF", "#B6B6B4", "#98AFC7"];
		var ground = ["#4AA02C", "#387821", "#84a02c"]
		console.log(cloud);
		if (cloud > 75) {
			$('body').css("background-color", sky[1]);
			$('#ground').css("background-color", ground[2]);
		}
		else if (cloud > 40) {
			$('body').css("background-color", sky[2]);
			$('#ground').css("background-color", ground[1]);
		}
		else {
			$('body').css("background-color", sky[0]);
			$('#ground').css("background-color", ground[0]);
			$('#sun').css("display", "block");
		}
		$('#ground').css("background-color", "#4AA02C");		
		console.log(time);
		$('#current_temp').text(currentTemp + '\u00B0');
	}
}