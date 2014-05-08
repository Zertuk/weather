//sets up the api call script and fills it when form is used
//nulls/removes script and replaces it so new search can be performed
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
		script.src = 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=' + zip + '&num_of_days=5&format=json&callback=getData&key=j8xvysb7t9jp2dvw7pwcbgs3'
		document.body.appendChild(script);

		}
		script = null;
		$(script).remove();
		script = document.createElement('script');
	})
});
//gets data from api
var getData = function(weather) {
	if ('error' in weather.data) {
		$('#error').text('LOCATION INVALID, TRY AGAIN');
		return;

	}
	else {
		weather.preventDefault;
		$('#error').text('');
		var currentTemp = weather.data.current_condition[0].temp_F;
		var cloud = weather.data.current_condition[0].cloudcover;
		var condition = weather.data.current_condition[0].weatherDesc[0].value.toUpperCase();
		console.log(condition);
		var sky = ["#6698FF", "#8C8C8B", "#98AFC7"];
		var i = 0;
		var weatherArray = [];
		for (var i = 0; i < 5; i++) {
			weatherArray[i] = weather.data.weather[i];
			console.log(weatherArray[i].weatherDesc);
		}
		var test = weather.data.weather[1].tempMaxF;
		console.log(test);
		$("#fetch").animate({			
			"margin-top": "0px"
		}, 750, 'linear')

		//chooses message and bg-color based on the current condition, then displays message
		if (cloud > 75) {
			$('body').css("background-color", sky[1]);
			$('#other').text(condition + " , HOW BORING");

		}
		else if (cloud > 40) {
			$('body').css("background-color", sky[2]);
			$('#other').text(condition + " , PRETTY GOOD");

		}
		else {
			$('body').css("background-color", sky[0]);
			$('#other').text(condition + " , PRETTY BRIGHT");

		}
		//chooses warm/cold color for font depending on temp
		var tempColor = function() {
			if (currentTemp >= 50) {
				$('#current_temp').css("color", "#FFA600");
				$('#other').css("color", "#FFA600");

			}
			else {
				$('#current_temp').css("color", "#00A2FF");
				$('#other').css("color", "#00A2FF");

			}
		}
		tempColor();
		$('#current_temp').text(currentTemp + '\u00B0');

	}
}