angular.module('Instagram')
	.controller('LoginCtrl', function($scope, $window, $location, $rootScope, $auth) {

		$scope.instragramLogin = function() {
			$auth.authenticate('instagram')
				.then(function(response) {
					$window.localStorage.currentUser = JSON.stringify(response.data.user);
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
				})
				.catch(function(response) {
					console.log(response);
				});
		};

		$scope.emailLogin = function() {
			$auth.login({ email: $scope.email, password: $scope.password })
				.then(function(response) {
					$window.localStorage.currentUser = JSON.stringify(response.data.user);
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
				});
				.catch(function(response) {
					$scope.errorMessage = {};
					angular.forEach(response.data.message, function(message, field) {
						$scope.loginForm[field].$setValidity('server', false);
						$scope.errorMessage[field] = response.data.message[field];
					});
				});
		};

	});

	google: {
		url: '/auth/google',
		authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
		redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
		scope: ['profile', 'email'],
		scopePrefix: 'openid',
		scopeDelimiter: ' ',
		requiredUrlParams: ['scope'],
		optionalUrlParams: ['display'],
		display: 'popup',
		type: '2.0',
		popupOptions: { width: 452, height: 633 }
	}