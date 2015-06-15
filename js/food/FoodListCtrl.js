app.controller('FoodListCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe) {

  	$scope.reverseSort = false;
  	$scope.dishList = [];
  	var init = true;

  	$scope.show = function(len){
  		if(init == true){
  			return false;
  		}
  		else if(!len)
  			return true;
  		else
  			return false;
  	}

	$scope.populateFoodList = function(){
		var criteria = {orderby: [{Name: 'ASC'}]};
		var tempList = [];

		Recipe.retrieve(criteria, function(error, results, event) {
			if (error) {
				alert(error);
				return;
			}

			results.forEach(function(elem){
				tempList.push({
					name: decode(elem.get("Name")),
					cost: (elem.get("RecipeTotalCost")).toFixed(2),
					cuisine: elem.get("RecipeCuisine"),
					meat: elem.get("RecipeMeat"),
					type: elem.get("RecipeType")
				});
			});
			$scope.dishList = tempList;
			init = false;
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

function decode(str){
	var div = document.createElement('div');
	div.innerHTML = str
	var decoded = div.firstChild.nodeValue;
	console.log(decoded);
	return decoded;
}