'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','$window','$mdDialog', '$mdMedia',function($scope,$http,$window,$mdDialog, $mdMedia) {

	$scope.busca = [];
	$scope.texto ="";
	$scope.data = [];
	$scope.lista  = {};

	 $scope.buscar  =  function (texto){

	 	$http.get("http://www.omdbapi.com/?s="+texto+"&y=&plot=full&r=json&type=series&page=1")
			    .then(function(response) {
			        $scope.data = response.data;
			 		$scope.lista = $scope.data.Search;

			        console.log($scope.lista[0].Poster);
			            console.log($scope.lista);
			    });
	 }

	 $scope.cargarSeleccionado = function(id){
	 	$scope.seleccionado = [];
	 		$http.get("http://www.omdbapi.com/?i="+id+"&plot=short&r=json")
			    .then(function(response) {
			        $scope.seleccionado = response.data;
			         $scope.showAdvanced();
			 		

			        console.log($scope.seleccionado);
			    });
	 	
	 }

	 $scope.showAdvanced = function(ev) {
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/./view1/detalle.TMPL.html',
	     // parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen,
	       locals: { seleccionado  : $scope.seleccionado  

                        }
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });
	  };

	 function DialogController($scope, $mdDialog, seleccionado) {
	 	$scope.seleccionado = seleccionado;
			  $scope.hide = function() {
			    $mdDialog.hide();
			  };
			  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };
			  $scope.answer = function(answer) {
			    $mdDialog.hide(answer);
			  };
			}





}]);