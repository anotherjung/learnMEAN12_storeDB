//5 inject the ngRoute dependency in the module
var myApp = angular.module('myApp', ['ngRoute']);
//5 use the config method to set up routing
myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/view1.html'
	})
	//7 
	.when('/partials2',{
		templateUrl: 'partials/view2.html'
	})
	.otherwise({
		redirectTo: '/'
	});
})//ends config


myApp.controller('customerController', function ($scope, customerFactory) { 
	//3 create scope for array 
	$scope.customers = [];
	//3 get data from factory
	customerFactory.getCustomers(function (data){
		$scope.customers = data;
	})

	//2a ng-click add
	$scope.addCustomer = function () {				
		console.log('con addCustomer',$scope.newCustomer);
		customerFactory.addCustomer($scope.newCustomer);
		//clear form values by giving it an empty object
		$scope.newCustomer = {};
	}

	//5c ng-click delete
	$scope.removeCustomer = function (customer) {
		// $scope.heros.splice($index, 1);
		//  indexOf() calculates the index of the item whose value matches what we pass it.  Look it up!
		$scope.customers.splice($scope.customers.indexOf(customer), 1);
	}

}); //ends controller



//5b add controller for heros
myApp.controller('orderController', function ($scope, customerFactory) { 
	//3 create scope for array 
	$scope.customers = [];
	//3 get data from factory
	customerFactory.getCustomers(function (data){
		$scope.customers = data;
	})

	$scope.orders = [];
	customerFactory.getOrders(function (data) {
		$scope.orders = data;
		console.log('fac getOrders', data);
	})

	//2a ng-click add
	$scope.addOrder = function () {				
		console.log('con addOrder',$scope.newOrder);
		customerFactory.addOrder($scope.newOrder);
		//clear form values by giving it an empty object
		$scope.newOrder = {};

	}


}); //ends controller

//5b add factory to provide data to controller
myApp.factory('customerFactory', function () {
	//3 factory is a function that returns an object literal
	//7 add some data
	var customers = [
				{name:'batman'}, 
				{name:'superman'},
				{name:'ironman'}, 
				{name:'hulk'} 
	];

	var orders = [];

	var factory = {};

	factory.getOrders = function (callback) {
		console.log('here in factory');
		callback(orders);
	}

	//3 create getHeros method to a callback 
	factory.getCustomers = function (callback) {
		console.log('here in factory');
		//pass the heros object to callback
		callback(customers);
	}

	factory.addCustomer = function(info) {
		console.log('fac addCustomer', info);
		customers.push({
			name: info.name,
			created: Date.now()

		})
	}	

	factory.addOrder = function(info) {
		console.log('fac addOrder', info);
		orders.push({
			customer: info.customer,
			product: info.product,
			qty: info.qty,
			created: Date.now()

		})
	}
	//6 check array to see if customer name exists

	factory.checkCustomer = function(newCustomerName) {
		console.log('fac checkCustomer', newCustomerName);
		for (var i = 0; i < customers.length; i++) {
			console.log('1');
			if (customers[i].name == newCustomerName) {
				return true;
			}
		}
		return false;
	}

	return factory
}) //ends factory