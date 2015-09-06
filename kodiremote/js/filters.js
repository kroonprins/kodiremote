'use strict';

var KODI_HOST="http://192.168.1.101/";
var KODI_IMAGES_ROOT=KODI_HOST+"image/";

/* Filters */

angular.module('kodiRemoteFilters', []).filter('thumbnailer', function() {
	  return function(input) {
		      return input ? KODI_IMAGES_ROOT+encodeURIComponent(input) : "img/thumb.png";
		        };
}).filter('duration_SecondsToFormatted', function() {
	  return function(seconds) {
		  var date = new Date(null);
		  date.setSeconds(seconds);
		  var text = date.toISOString();
		  if(text.substr(11,2) === "00") {
			  return text.substr(14,5);
		  } else {
			  return text .substr(11, 8);
		  }
	  };
}).filter('listToString', function() {
	  return function(list) {
		  if(!list){
			  return list;
		  }
		  return list.join(", ");
	  };
}).filter('formatKodiDateTime', function() {
	  return function(dateTime) {
		  // Date time format used by Kodi is YYYY-MM-DD HH:MM:SS. For reasons unknown to mankind standard javascript does not seem to manage this format :-s. So just quick hard coded formatting here.
		  if(!dateTime){
			  return dateTime;
		  }
		  var arr = dateTime.split(" ");
		  var arr2 = arr[0].split("-");
		  return arr2[2]+"/"+arr2[1]+"/"+arr2[0]+" ("+arr[1]+")";
	  };
});
