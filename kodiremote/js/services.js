'use strict';

/* Services */

var kodiRemoteServices = angular.module('kodiRemoteServices', []);

kodiRemoteServices.factory('KodiApiConnector', ['$http',
  function($http){
	  var service = {
	  	start : function() {
		  	var promise = $http.post('/jsonrpc',{ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "partymode": "music" } }, "id": 1 })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	startSong : function(songId) {
		  	var promise = $http.post('/jsonrpc',{ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "songid": songId } }, "id": 1 })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	startAlbum : function(albumId) {
		  	var promise = $http.post('/jsonrpc',{ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "albumid": albumId } }, "id": 1 })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	startArtist : function(artistId) {
		  	var promise = $http.post('/jsonrpc',{ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "artistId": artistId } }, "id": 1 })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	clear : function() {
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"Playlist.Clear","id":1,"params":{"playlistid":0}})
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	getPlayQueue : function() {
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"Playlist.GetItems","id":1,"params":{"playlistid":0, "properties":["album","artist","thumbnail","duration"]} })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	removeItemFromPlayQueue : function(index) {
			var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"Playlist.Remove","id":1,"params":{"playlistid":0, "position":index} })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	addItemToPlayQueue : function(item) {
			var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"Playlist.Insert","id":1,"params":{"playlistid":0, "position":1,"item":item} })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	playerAction : function(action,input) {
			input.playerid=0
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"Player."+action,"id":1,"params":input })
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	getSongDetails : function(songId) {
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"AudioLibrary.GetSongDetails","id":1,"params":{"songid":songId,"properties":["duration","album","albumid","thumbnail","artist","artistid","year","playcount","lastplayed"]}})
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	getAlbumDetails : function(albumId) {
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"AudioLibrary.GetAlbumDetails","id":1,"params":{"albumid":albumId,"properties":["thumbnail","artist","artistid","playcount","albumlabel","year"]}})
				.then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	getSongs : function(filter,sortMethod) {
			var params={"properties":["album","artist","artistid","thumbnail","duration"],"sort":{ "order": "ascending", "method": sortMethod, "ignorearticle": true }};
			if(filter){
				params.filter=filter;
			}
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"AudioLibrary.GetSongs","id":1,"params":params}).then(function(response) {
					return response.data;
				});
			return promise;
	  	},

	  	getAlbums : function(filter,sortMethod) {
			var params={"properties":["artist","artistid","thumbnail"],"sort":{ "order": "ascending", "method": sortMethod, "ignorearticle": true }};
			if(filter){
				params.filter=filter;
			}
		  	var promise = $http.post('/jsonrpc',{"jsonrpc":"2.0","method":"AudioLibrary.GetAlbums","id":1,"params":params}).then(function(response) {
					return response.data;
				});
			return promise;
	  	}

	  }
	  return service;
    }
  ]);
