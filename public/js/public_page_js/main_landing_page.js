'use strict';
angular.module('landingPage', ['landingPage.system']);

angular.module('landingPage.system',['ui.bootstrap']);


angular.module('landingPage.system').controller('landingCtrl', ['$scope','$http','$window','$location','$modal',function ($scope,$http,$window,$location,$modal) {


	$scope.videoUrlUnwanted = false;

	$scope.loading = false;


	$scope.grabeYoutube = function(){

		$scope.loading = true;
		$scope.showYTinfo = false;
		$scope.youtube = "";
		
			$http({'method' : 'post', url: '/video/grabeYoutube', data: {'url' : $scope.youtube_url}}).
			success(function(data)
			{
				console.log('Download Successfull');
				$scope.youtube = data.info;
				$scope.downloadLink = data.video;
				$scope.showYTinfo = true;
				$scope.loading = false;


			}).
			error(function(data){

			})
	}

	$scope.cancelUploadAnyway = function(fly){
		$scope.youtube = "";
		$scope.youtube_url = "";
		$scope.showYTinfo = false;

	}
	$scope.uploadYoutube = function()
	{

		window.location.href = '/download?uri='+$scope.downloadLink+'&filename='+$scope.youtube._filename;

	}
    
}]);

// angular.module('landingPage.system').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// });