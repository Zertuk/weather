$(document).ready(function() {

	$('#location_input').select();

	var script = document.createElement('script');

	$('form').on('submit', function (inp) {
		var locInput = $.trim($('#location_input').val().toString());
		inp.preventDefault();
		var zip = locInput;

		if (locInput == '') {
			$('#error').text('PLEASE ENTER A LOCATION OR A ZIPCODE');
		}	
		else {
		script.src = 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=' + zip + '&format=json&callback=getData&key=j8xvysb7t9jp2dvw7pwcbgs3'
		document.body.appendChild(script);
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
		var areaName = weather.data.areaName;
		console.log(areaName);
		$('#fetch').remove();
		var sky = ["#6698FF", "#B6B6B4", "#98AFC7"];
		console.log(cloud);
		if (cloud > 75) {
			$('body').css("background-color", sky[1]);
			$('#other').text("HOW BORING");
		}
		else if (cloud > 40) {
			$('body').css("background-color", sky[2]);
			$('#other').text("PRETTY GOOD");
		}
		else {
			$('body').css("background-color", sky[0]);
			$('#other').text("PRETTY BRIGHT");
		}
		$('#ground').css("background-color", "#4AA02C");		
		console.log(time);
		$('#location').text(areaName);
		$('#current_temp').text(currentTemp + '\u00B0');
	}
}