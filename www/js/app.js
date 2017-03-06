var factoriesServicesDemo = angular.module('factoriesServicesDemo', ['ionic']);

factoriesServicesDemo.factory('User', function() {

  return function(userId, firstName, lastName, email) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;

    this.updateUserAttributes = function(userId, firstName, lastName, email) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }

});

factoriesServicesDemo.controller('factoriesServicesDemoCtrl', function($scope, User, $ionicLoading) {

  // Setup users array for holding instances of factories
  $scope.users = {}
  $scope.firstName = 'John';
  $scope.lastName = 'Doe';
  $scope.email = 'johndoe@gmail.com';
  $scope.usersAddedCount = 0;

  // This function is run upon initialization/load of the controller (it is called "init" for convention)
  $scope.init = function() {
    // Setup initial user for instantiation of factory
    /* TODO: Create instance of factory User and set to var */
    /* Hint: use usersAddedCount as userId attribute for User factory instance.. so each instance
     /* has a unique identifier */
    var user = new User($scope.usersAddedCount, $scope.firstName, $scope.lastName, $scope.email);  // New instance of factory is created
    $scope.users[$scope.usersAddedCount] = user;
    $scope.currentUser = user;
    $scope.usersAddedCount = $scope.usersAddedCount + 1;
  };

  // Here the init function is called (which happens the first time the controller is loaded)
  $scope.init();

  $scope.addUser = function() {
    /* TODO: Create instance of factory User and set to var */
    var user = new User($scope.usersAddedCount, $scope.firstName, $scope.lastName, $scope.email);
    $scope.firstName = ''; //
    $scope.lastName = '';
    $scope.email = '';
    $scope.users[$scope.usersAddedCount] = user; // Put variable into users dictionary like in lab 1
    $scope.usersAddedCount = $scope.usersAddedCount + 1;
    // Show popover
    $ionicLoading.show({ template: 'User Added!', noBackdrop: true, duration: 1000 });
  }

  $scope.updateUser = function() {
    $scope.currentUser = $scope.users[$scope.currentUser.userId];
    /* Get current user from $scope.users array using $scope.currentUser.userId
     and set to $scope.currentUser */
    $scope.currentUser = $scope.currentUser.updateUserAttributes($scope.currentUser.userId, $scope.firstName, $scope.lastName, $scope.email);
    /* Call updateUserAttributes on current user and update firstname, lastname, and email but keep userId same and set return value to $scope.currentUser */
    $scope.users[$scope.currentUser.userId] = $scope.currentUser;
    /* Put updated user (now in $scope.currentUser) using userId attribute */
    $ionicLoading.show({ template: 'User Updated!', noBackdrop: true, duration: 1000 });
  };

  $scope.updateUser_new = function() {
    $scope.currentUser = $scope.users[$scope.currentUser.userId];
    /* Get current user from $scope.users array using $scope.currentUser.userId
     and set to $scope.currentUser */
    $scope.currentUser.firstName = $scope.firstName;
    $scope.currentUser.lastName = $scope.lastName;
    $scope.currentUser.email = $scope.email;
    /* Call updateUserAttributes on current user and update firstname, lastname, and email but keep userId same and set return value to $scope.currentUser */
    $scope.users[$scope.currentUser.userId] = $scope.currentUser;
    /* Put updated user (now in $scope.currentUser) using userId attribute */
    $ionicLoading.show({ template: 'User Updated!', noBackdrop: true, duration: 1000 });
  };

  $scope.selectUser = function(selectedUser) {
    $scope.currentUser = selectedUser;
    $scope.firstName = $scope.currentUser.firstName;
    $scope.lastName = $scope.currentUser.lastName;
    $scope.email = $scope.currentUser.email;
    $ionicLoading.show({ template: 'User Selected!', noBackdrop: true, duration: 1000 });
  };

  $scope.deleteUser = function() {
    delete $scope.users[$scope.currentUser.userId]; // Delete user from dictionary using unique identifier
    $ionicLoading.show({ template: 'User Deleted!', noBackdrop: true, duration: 1000 });
  };

});
