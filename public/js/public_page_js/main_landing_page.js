'use strict';
angular.module('landingPage', ['landingPage.system']);

angular.module('landingPage.system',['ui.bootstrap']);


angular.module('landingPage.system').controller('landingCtrl', ['$scope','$http','$window','$location','$modal',function ($scope,$http,$window,$location,$modal) {


	$scope.videoUrlUnwanted = false;




	$scope.grabeYoutube = function(){
		
			$http({'method' : 'post', url: '/users/grabeYoutube', data: {'url' : $scope.youtube_url}}).
			success(function(data)
			{
				console.log(data)
				if(data.success == false)
				{
					$scope.videoUrlUnwanted = true;
				}
				else
				{
					$scope.youtube = data.info;
					$scope.showYTinfo = true;

				}


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

		$http({'method' : 'post', url: '/users/uploadYoutube', data: {'url' : $scope.youtube_url, 'video_name': $scope.youtube._filename}}).
			success(function(data){
				console.error("Youtube Video Download")
				console.log(data)
				$scope.downloadLink = data.video;


				window.location.href = '/download?uri='+$scope.downloadLink+'&filename='+$scope.youtube._filename;

				
			}).
			error(function(data){

			})
	}
    
}]);

angular.module('landingPage.system').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});