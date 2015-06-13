var app = angular.module('FoodMarket',[
  	'ui.router',
	'ui.bootstrap'
	]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'js/food/foodList.html',
			params: {dishId: null},
			controller: 'FoodListCtrl'
		})

		.state('dishPage', {
			url: '/dish/:dishId',
			templateUrl: 'js/food/dishPage.html',
			controller: 'DishPageCtrl'
		})

		.state('newDish', {
			url: '/new',
			templateUrl: 'js/food/newDish.html',
			params: {new_dish: null},
			controller: 'NewDishCtrl'
		});

    $urlRouterProvider.otherwise('/');
});

app
	.controller('FoodListCtrl', ['$scope', '$state', '$stateParams',function($scope, $state, $stateParams) {

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
			$state.go("dishPage", {dishId: dish.name});
		};

		$scope.addNew = function(){
			$state.go("newDish");
		}

	}])

	.controller('DishPageCtrl', ['$scope', '$state', '$stateParams',function($scope, $state, $stateParams) {

		$scope.ingredientList = [
			{name:"Pork", cost:6, quantity:"1"}, 
			{name:"Garlic", cost:0.3, quantity:"1"},
			{name:"Flour", cost:0.27, quantity:"1"},
			{name:"Chicken broth", cost:3.5, quantity:"1"},
			{name:"Buttermilk", cost:4.25, quantity:"1"},
			{name:"Vegetable oil", cost:1.3, quantity:"1"},
			{name:"Butter", cost:2.25, quantity:"1"},
			{name:"Onion", cost:0.79, quantity:"1"}
			];

		$scope.dishPage = $stateParams.dishId;

		calcTotalCost = function(){
			var totalCost = 0;
			for(var i in $scope.ingredientList){
				totalCost = totalCost + $scope.ingredientList[i].cost;
			}
			return totalCost;
		};

		$scope.goBack = function(){
			$state.go("home");
		}

		$scope.totalCost = calcTotalCost();

	}])

	.controller('NewDishCtrl', ['$scope', '$state',function($scope, $state) {

		$scope.chosenItem = [];
		$scope.cost = [];
		$scope.id = 1;
		$scope.currVal = 1;

		$scope.itemList = ["Onion", "Butter", "Garlic", "Flour", "Chicken broth", "Buttermilk", "Vegetable oil", "Ginger", "Chicken", "Pork", "Beef", "Bacon", "Broccoli", "Brussel sprouts"];
		$scope.currCategory = "Select an ingredient";
		
		$scope.setCurrentVal = function (item){
			$scope.currCategory = item;
			for(var i in $scope.chosenItem){
				if($scope.chosenItem[i] == item)
					return;
			}
			$scope.chosenItem.push(item);
		}

		$scope.submitNewDish = function(){
			var totalCost = 0;
			var tempArr = [];

			for(var i in $scope.cost){
				totalCost = totalCost + $scope.cost[i];
			}

			tempArr.push({name: $scope.InputName, cost: totalCost, category: $scope.InputCategory, meat: $scope.InputMeat});

			console.log(tempArr);

			$state.go("home", {new_dish: tempArr});
		}

	}])

;