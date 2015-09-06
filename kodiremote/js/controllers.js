'use strict';

/* Controllers */

var kodiRemoteControllers = angular.module('kodiRemoteControllers', []);

kodiRemoteControllers.controller('KodiRemoteQueueCtrl', ['$scope', 'KodiApiConnector',
  function($scope, KodiApiConnector) {
	$scope.refreshPlayQueue = function() {
		KodiApiConnector.getPlayQueue().
			then(function(d) {
				$scope.kodiresponse = d;
			});
	}

	$scope.removeItemFromPlayQueue = function(index) {
		KodiApiConnector.removeItemFromPlayQueue(index).
	                then(function(d) {
	                        $scope.refreshPlayQueue();
	                });
	}

	$scope.clear = function() {
		KodiApiConnector.clear().
			then(function(e) {
				$scope.refreshPlayQueue();
			});
	}
	
	$scope.start = function() {
		KodiApiConnector.start().
	                then(function(d) {
	                        $scope.refreshPlayQueue();
	                });
	}

	$scope.stop = function() {
		KodiApiConnector.playerAction('Stop',{}).
	                then(function(d) {
				$scope.clear();
	                });
	}

	$scope.playerAction = function(action,input) {
		KodiApiConnector.playerAction(action,input).
	                then(function(d) {
	                        $scope.refreshPlayQueue();
	                });
	}

	$scope.refreshPlayQueue();

	var refreshInterval = setInterval($scope.refreshPlayQueue,5000);
	$scope.$on("$destroy", function(){
	        clearTimeout(refreshInterval);
	});
	$scope.refreshPlayQueue();
  }]);

kodiRemoteControllers.controller('KodiRemoteSongCtrl', ['$scope', '$routeParams','KodiApiConnector',
  function($scope, $routeParams, KodiApiConnector) {
	KodiApiConnector.getSongDetails(parseInt($routeParams.songId)).
	        then(function(d) {
			$scope.songDetail = d.result.songdetails;
			// adding an extra array that combines the artist name and id for easy use in the page
			$scope.songDetail.artistExtended=arrayMerge([{"array":d.result.songdetails.artist,"key":"label"},{"array":d.result.songdetails.artistid,"key":"id"}]);
	        });
  }]);

kodiRemoteControllers.controller('KodiRemoteAlbumCtrl', ['$scope', '$routeParams','KodiApiConnector',
  function($scope, $routeParams, KodiApiConnector) {
	KodiApiConnector.getAlbumDetails(parseInt($routeParams.albumId)).
	        then(function(d) {
			$scope.albumDetail = d.result.albumdetails;
			// adding an extra array that combines the artist name and id for easy use in the page
			$scope.albumDetail.artistExtended=arrayMerge([{"array":d.result.albumdetails.artist,"key":"label"},{"array":d.result.albumdetails.artistid,"key":"id"}]);
	        });
	KodiApiConnector.getSongs({"albumid":parseInt($routeParams.albumId)},"track").
	        then(function(d) {
			$scope.albumSongs = d.result.songs;
	        });

	$scope.addItemToPlayQueue = function(item) {
		KodiApiConnector.addItemToPlayQueue(item);
	}

	$scope.startAlbum = function(albumId) {
		KodiApiConnector.startAlbum(albumId);
	}
  }]);

kodiRemoteControllers.controller('KodiRemoteArtistCtrl', ['$scope', '$routeParams','KodiApiConnector',
  function($scope, $routeParams, KodiApiConnector) {
	KodiApiConnector.getArtistDetails(parseInt($routeParams.artistId)).
	        then(function(d) {
			$scope.artistDetail = d.result.artistdetails;
	        });
  }]);

kodiRemoteControllers.controller('KodiRemoteSearchCtrl', ['$scope', 'KodiApiConnector',
  function($scope, KodiApiConnector) {
	KodiApiConnector.getAlbums(undefined,"album").
		then(function(d) {
			$scope.allAlbums = d.result.albums;
		});
	/*KodiApiConnector.getSongs(undefined,"label").
		then(function(d) {
			$scope.allSongs = d.result.songs;
		});*/
	$scope.addItemToPlayQueue = function(item) {
		KodiApiConnector.addItemToPlayQueue(item);
	}
  }]);
