'use strict';

/* App Module */

var kodiRemoteApp = angular.module('kodiRemoteApp', [
  'ngRoute',
  'kodiRemoteControllers',
  'kodiRemoteFilters',
  'kodiRemoteServices'
]);

kodiRemoteApp.config(['$routeProvider',
  function($routeProvider) {
	  $routeProvider.
		when('/queue', {
			templateUrl: 'partials/kodiremote-queue.html',
			controller: 'KodiRemoteQueueCtrl'
		}).
		when('/song/:songId', {
			templateUrl: 'partials/kodiremote-song.html',
			controller: 'KodiRemoteSongCtrl'
		}).
		when('/album/:albumId', {
			templateUrl: 'partials/kodiremote-album.html',
			controller: 'KodiRemoteAlbumCtrl'
		}).
		when('/artist/:artistId', {
			templateUrl: 'partials/kodiremote-artist.html',
			controller: 'KodiRemoteArtistCtrl'
		}).
		when('/search', {
			templateUrl: 'partials/kodiremote-search.html',
			controller: 'KodiRemoteSearchCtrl'
		}).
		otherwise({
			redirectTo: '/queue'
      		});
  }]);
