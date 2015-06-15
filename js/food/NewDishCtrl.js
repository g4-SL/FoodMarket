app.controller('NewDishCtrl', ['$scope', '$location', 'Recipe', 'Ingredient', function($scope, $location, Recipe, Ingredient) {

	$scope.chosenItem = [];
	$scope.cost = [];
	$scope.id = 1;
	$scope.currVal = 1;

	$scope.cuisineList = ["Western", "Chinese", "Indian", "Mediterranean"];
	$scope.meatList = ["Chicken", "Beef", "Pork", "Lamb", "Vegetarian", "Seafood"];
	$scope.typeList = ["Brunch", "Appetizer", "Dessert", "Salad", "Soup", "Side Dish"];
	
	$scope.currIngredients = "Select an ingredient";
	$scope.currCuisine = "Select the type of cuisine";
	$scope.currMeat = "Select the type of meat";
	$scope.currType = "Select the type of dish";

	$scope.getIngredientList = function(){
		var criteria = {orderby: [{Name: 'ASC'}]};
		var tempList = [];

		Ingredient.retrieve(criteria, function(error, results, event) {
			if (error) {
				alert(error);
				return;
			}

			results.forEach(function(elem){
				tempList.push(elem.get("Name"));
			});

			console.log(tempList);
			$scope.itemList = tempList;
			$scope.$apply();
		});
	};

	$scope.setCurrentVal = function (item, scopeVar){
		$scope[scopeVar] = item;
		if(scopeVar == 'currIngredients'){
			for(var i in $scope.chosenItem){
				if($scope.chosenItem[i] == item)
					return;
			}
			$scope.chosenItem.push(item);
		}
	}

	$scope.submitNewDish = function(){
		var totalCost = 0.00;

		for(var i in $scope.cost){
			if(isNaN($scope.cost[i]))
				break;

			totalCost = totalCost + parseFloat($scope.cost[i]);
		}

		var criteria = {
			Name: $scope.InputName,
			RecipeTotalCost: parseFloat(totalCost),
			RecipeMeat: $scope.currMeat,
			RecipeCuisine: $scope.currCuisine,
			RecipeType: $scope.currType
		}

		Recipe.create(criteria, function(err, results, event) {
		    if(err) { 
		        console.log(err);
		        alert(err.message);
		    } else {
				$location.path('/');
				$scope.$apply();
		    }
		});
	}

	$scope.removeItem = function(item){
		for(var i in $scope.chosenItem){
			if($scope.chosenItem[i] == item)
				$scope.chosenItem.splice(i, 1);
		}
	}
	
	$scope.goBack = function(){
		$location.path("/");
	}

	$scope.getIngredientList();

}]);