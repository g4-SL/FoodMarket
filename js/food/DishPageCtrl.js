app.controller('DishPageCtrl', ['$scope', '$location', '$routeParams', 'Recipe', 'Ingredient', 'LineItem', function($scope, $location, $routeParams, Ingredient, LineItem, Recipe) {

	$scope.ingredientList = [
		{name:"Pork", cost:(6.00).toFixed(2), quantity:"1"}, 
		{name:"Garlic", cost:(0.30).toFixed(2), quantity:"1"},
		{name:"Flour", cost:(0.27).toFixed(2), quantity:"1"},
		{name:"Chicken broth", cost:(3.50).toFixed(2), quantity:"1"},
		{name:"Buttermilk", cost:(4.25).toFixed(2), quantity:"1"},
		{name:"Vegetable oil", cost:(1.30).toFixed(2), quantity:"1"},
		{name:"Butter", cost:(2.25).toFixed(2), quantity:"1"},
		{name:"Onion", cost:(0.79).toFixed(2), quantity:"1"}
		];

/*	$scope.getIngredientList = function(){
		var criteria = {
			where: {
				Recipe.get(LineItemRecipe.Name): {eq: 'Pork Chop'}
			}, limit: 10
		};
		var tempList = [];
		LineItem.retrieve(criteria, function(error, results, event) {
			if (error) {
				alert(error);
				return;
			}

			results.forEach(function(elem){
				tempList.push({
					name: elem.get("LineItemIngredient"),
					cost: elem.get("LineItemCost"),
					quantity: elem.get("LineItemQuantity")
				});
			});
			console.log(tempList);
			$scope.ingredientList = tempList;
			$scope.$apply();
		});
	};

	$scope.getIngredientList();*/

	$scope.dishName = $routeParams.dishId;
	$scope.dishCategory = $routeParams.dishCat;

	$scope.calcTotalCost = function(){
		$scope.totalCost = parseFloat(0.00);
		for(var i in $scope.ingredientList){
			if($scope.ingredientList[i].name == "")
				break;
			$scope.totalCost = $scope.totalCost + parseFloat($scope.ingredientList[i].cost);
		}
	};

	$scope.goBack = function(){
		$location.path("/");
	}

	$scope.calcTotalCost();
}]);