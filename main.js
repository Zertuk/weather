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
		console.log(currentTemp);
	}
}