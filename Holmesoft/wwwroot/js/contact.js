
var onContactUsSubmit = function () {
	$(document).ready(function () {
		// Contact Form AJAX Submission

		// Get the form.
		var form = $('#contact-form');

		// Get the messages span.
		var formMessages = $('#postMessage');

		$.validator.unobtrusive.parse(form);
		form.validate();

		if (!form.valid()) {
			$.each(form.validate().errorList, function (key, value) {
				$errorSpan = $("span[data-valmsg-for='" + value.element.id + "']");
				$errorSpan.html("<span style='color:red'>" + value.message + "</span>");
				$errorSpan.show();
			});
		}
		else {
			// Serialize the form data.
			var formData = $(form).serialize();
			var name = $("#name").val();
			var email = $("#email").val();
			var message = $("#message").val();
			var grecaptcharesponse = $("#contact-form textarea[name='g-recaptcha-response']").val();
			var data = {
				name: name,
				email: email,
				message: message,
				grecaptcharesponse: grecaptcharesponse
			};

			data = JSON.stringify(data);
			//console.log(data);

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: "https://nwp70p9mfe.execute-api.us-east-1.amazonaws.com/prod/contact-me",
				data: data,
				dataType: 'json',
				contentType: 'application/json',
				success: function (data, textStatus, jqXHR) {
					console.log(data);
					// clear form and show a success message
					document.getElementById("contact-form").reset();
					$(formMessages).html("- " + data.message).fadeIn('slow')
					$(formMessages).delay(5000).fadeOut('slow');

					// Clear the form.
					form.trigger("reset");

				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(errorThrown);
					// show an error message
					if (jqXHR.responseText !== '') {
						var responseJson = JSON.parse(jqXHR.responseText);
						if (responseJson.message) {
							$(formMessages).html(responseJson.message);
						} else {
							$(formMessages).html(jqXHR.responseText);
						}
					} else {
						$(formMessages).html("- Error. Message not sent").fadeIn('slow')
					}
					$(formMessages).delay(5000).fadeOut('slow');
				}
			});
		}
	});
};