(function () {
'use strict';

angular.module('assignment1App', [])
.controller('Assignment1Controller', Assignment1Controller);

Assignment1Controller.$inject = ['$scope'];

function Assignment1Controller ($scope) {
  $scope.lunchMenuItems = "";
  $scope.message = "";

  $scope.doCheckMenu = function(){
	  if($scope.lunchMenuItems == null || $scope.lunchMenuItems === ""){
        $scope.message = "Please enter data first";
        return;
    }
    var list = $scope.lunchMenuItems.split(","),
        size = 0;
    console.log("The elements are : " + list);

    for(var i = 0; i < list.length; i++){
        if(list[i].trim() !== ""){
          size++;
        }
    }

    console.log("The size of the elements is : " + size);
    if(size === 0){
      $scope.message = "Empty items!";
      return;
    }

    if(size <= 3){
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }

  };

}

})();
