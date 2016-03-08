angular.module('Instagram', ['ngRoute', 'ngMessages', 'satellizer'])
	.config(function($routeProvider, $authProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/signup', {
				templateUrl: 'views/signup.html',
				controller: 'SignupCtrl'
			})
			.when('photo/:id', {
				templateUrl: 'views/detail.html',
				controller: 'DetailCtrl'
			})
			.otherwise('/');
			
		$authProvider.loginUrl = 'http://localhost:3000/auth/login';
		$authProvider.signupUrl = 'http://localhost:3000/auth/signup';
		$authProvider.oauth2({
			name: 'instagram',
			url: 'http://localhost:3000/auth/instagram',
			redirectUri: 'http://localhost:8000',
			clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1',
			requiredUrlParams: ['scope'],
			scope: ['likes'],
			scopeDelimiter: '+',
			authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
		});
	});

	
	Is the following code in the right file, or should it be in server.js?
	
	var config = require('./config');

	var User = mongoose.model('User', new mongoose.Schema({
		instagramId: { type: String, index: true },
		email: { type: String, unique: true, lowercase: true },
		password: { type: String, select: false },
		username: String,
		fullName: String,
		picture: String,
		accessToken: String
	}));

	mongoose.connect(config.db);

	oauth2.exchangeForToken = function(oauthData, userData) {
		var data = angular.extend({}, userData, {
			code: oauthData.code,
			clientId: defaults.clientId,
			redirectUri: defaults.redirectUri
		});

		return $http.post(defaults.url, data);
	};

	app.post('/auth/instagram', function(req, res) {
  var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.clientSecret,
    code: req.body.code,
    grant_type: 'authorization_code'
  };

});

	app.post('/auth/instagram', function(req, res) {
  var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.clientSecret,
    code: req.body.code,
    grant_type: 'authorization_code'
  };

 // Step 1\. Exchange authorization code for access token.
 request.post({ url: accessTokenUrl, form: params, json: true }, function(e, r, body) {
   // Step 2a. Link user accounts.
   if (req.headers.authorization) {

   } else { // Step 2b. Create a new user account or return an existing one.

   }
 });
});

	app.post('/auth/instagram', function(req, res) {
  var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.clientSecret,
    code: req.body.code,
    grant_type: 'authorization_code'
  };

  // Step 1\. Exchange authorization code for access token.
  request.post({ url: accessTokenUrl, form: params, json: true }, function(e, r, body) {
    // Step 2a. Link user accounts.
    if (req.headers.authorization) {

    } else { // Step 2b. Create a new user account or return an existing one.
      User.findOne({ instagramId: body.user.id }, function(err, existingUser) {
        if (existingUser) {
          var token = createToken(existingUser);
          return res.send({ token: token, user: existingUser });
        }

        var user = new User({
          instagramId: body.user.id,
          username: body.user.username,
          fullName: body.user.full_name,
          picture: body.user.profile_picture,
          accessToken: body.access_token
        });

        user.save(function() {
          var token = createToken(user);
          res.send({ token: token, user: user });
        });
      });
    }
  });
});

User.findOne({ instagramId: body.user.id }, function(err, existingUser) {

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.tokenSecret);

  User.findById(payload.sub, '+password', function(err, localUser) {
    if (!localUser) {
      return res.status(400).send({ message: 'User not found.' });
    }

    // Merge two accounts.
    if (existingUser) {

      existingUser.email = localUser.email;
      existingUser.password = localUser.password;

      localUser.remove();

      existingUser.save(function() {
        var token = createToken(existingUser);
        return res.send({ token: token, user: existingUser });
      });

    } else {
      // Link current email account with the Instagram profile information.
      localUser.instagramId = body.user.id;
      localUser.username = body.user.username;
      localUser.fullName = body.user.full_name;
      localUser.picture = body.user.profile_picture;
      localUser.accessToken = body.access_token;

      localUser.save(function() {
        var token = createToken(localUser);
        res.send({ token: token, user: localUser });
      });

    }
  });
});