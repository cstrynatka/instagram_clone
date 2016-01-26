// Simple Angular directive with a primary purpose to clear error messages such as "Invalid Username 
// or Password" and then reset form validity whenever the user starts typing again. Otherwise, the 
// user will get an error message back from the server that they will not be able to re-submit the 
// form with the current implementation.

angular.module('Instagram')
	.directive('serverError', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				element.on('keydown', function() {
					ctrl.$setValidity('server', true)
				});
			}
		}
	});