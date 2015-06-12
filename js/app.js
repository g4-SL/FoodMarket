var app = angular.module('FoodMarket',[
  	'ui.router',
	'ui.bootstrap'
	]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'js/food/foodList.html',
			controller: 'FoodListCtrl'
		})

		.state('dishPage',{
		});

    $urlRouterProvider.otherwise('/');
});

app.controller('FoodListCtrl', ['$scope',function($scope) {
	
/*	$scope.category = ["Chinese", "Indian", "Western"];
	$scope.currCategory = "Category";
	$scope.setCurrentVal = function (item){
		$scope.currCategory = item;
	}*/

	$scope.dishList = [
		{name:"Pork Chop", cost:"$10", category:"Western", meat:"Pork"}, 
		{name:"Mac & Cheese", cost:"$23", category:"Western", meat:"Vegetarian"},
		{name:"Garlic Chicken", cost:"$13", category:"Chinese", meat:"Chicken"},
		{name:"BLT Sandwich", cost:"$8", category:"Western", meat:"Pork"},
		{name:"Curry Chicken", cost:"$45", category:"Indian", meat:"Chicken"},
		{name:"Stir Fry Noodles", cost:"$14", category:"Chinese", meat:"Vegetarian"},
		{name:"Shepherd's Pie", cost:"$8", category:"Western", meat:"Beef"},
		{name:"Seafood Carbonara", cost:"$11", category:"Western", meat:"Seafood"}
		];

	$scope.getSelectedDish = function(dish){
		console.log("getting this dish " + dish.name);
	}


}]);