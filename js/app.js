var app = angular.module('FoodMarket',[
  	'ngRoute',
	'ui.bootstrap'
	]);

app.constant('resourceUrl', '/resource/'+Date.now()+'/FOODMARKET/js');
//app.constant('resourceUrl', 'js');

app.config(['$routeProvider', 'resourceUrl', function($routeProvider, resourceUrl){
	$routeProvider

		.when('/', {
			templateUrl: resourceUrl + '/food/foodList.html',
			controller: 'FoodListCtrl'
		})

		.when('/dish/:dishId/:dishCat', {
			templateUrl: resourceUrl + '/food/dishPage.html',
			controller: 'DishPageCtrl'
		})

		.when('/new', {
			templateUrl: resourceUrl + '/food/newDish.html',
			controller: 'NewDishCtrl'
		})

		.otherwise({
			redirectTo: '/'
		});
}]);

app
	.service('Recipe', SObjectModel.Recipe)
	.service('Ingredient', SObjectModel.Ingredient)
	.service('LineItem', SObjectModel.LineItem);