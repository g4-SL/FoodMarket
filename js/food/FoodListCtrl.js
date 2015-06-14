app.controller('FoodListCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe) {

  	$scope.reverseSort = false;

	$scope.populateFoodList = function(){
		var criteria = {orderby: [{Name: 'ASC'}], limit: 10};
		var tempList = [];

		Recipe.retrieve(criteria, function(error, results, event) {
			if (error) {
				alert(error);
				return;
			}

			results.forEach(function(elem){
				tempList.push({
					name: elem.get("Name"),
					cost: (elem.get("RecipeTotalCost")).toFixed(2),
					cuisine: elem.get("RecipeCuisine"),
					meat: elem.get("RecipeMeat"),
					type: elem.get("RecipeType")
				});
			});
			$scope.dishList = tempList;
			$scope.$apply();
		});
	};

	$scope.getSelectedDish = function(dish){
		$location.path("/dish/" + dish.name + "/" + dish.cuisine);
	};

	$scope.addNew = function(){
		$location.path("/new");
	}

	$scope.clear = function(){
		$scope.searchFood = "";
	}

	$scope.populateFoodList();

}]);