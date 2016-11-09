(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffServiceProvider'];
function Config(ShoppingListCheckOffServiceProvider) {
  ShoppingListCheckOffServiceProvider.defaults.maxItems = 5;
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService, $scope) {
  var toBuy = this;

  toBuy.everythingBought = false;
  toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (itemIdex) {
    try {
      ShoppingListCheckOffService.buyItem(itemIdex);
    } catch (error) {
      toBuy.everythingBought = true;
    }
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService, $scope) {
  var alreadyBought = this;

  alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  alreadyBought.emptyList = ShoppingListCheckOffService.getEmptyList();

  $scope.$watch(function (context) {
    context.alreadyBought.emptyList = ShoppingListCheckOffService.getEmptyList();
  })

}

function ShoppingListCheckOffService(maxItems) {
  var service = this;

  // List of shopping items
  var toBuyItems = [{ name: "cookies", quantity: 10 }, { name: "breads", quantity: 7 },
  { name: "eggs", quantity: 12 }, { name: "apple", quantity: 3 }, { name: "cheese", quantity: 3 }],
  boughtItems = [],
  emptyList = true;

  service.buyItem = function (itemIdex) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (boughtItems.length < maxItems)) {
      var item = toBuyItems[itemIdex];
      toBuyItems.splice(itemIdex, 1);
      boughtItems.push(item);
    }
    if(emptyList && boughtItems.length > 0){
      emptyList = false;
    }
    if((maxItems !== undefined) && (boughtItems.length === maxItems)) {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.getEmptyList = function () {
    return emptyList;
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 2
  };

  provider.$get = function () {
    var shoppingListCheckOff = new ShoppingListCheckOffService(provider.defaults.maxItems);

    return shoppingListCheckOff;
  };
}

})();
