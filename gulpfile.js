'use strict';

var gulp = require('gulp');
var DUMMY_PORT = 8001;
var SERVER_PORT = 8000;

gulp.task('watch', function() {
    var livereload = require('gulp-livereload');
    livereload.listen();
    gulp.watch(['**/js/*.js', '**/index.html','**/partials/*.html', '**/css/*.css']).on('change', livereload.changed);
});

gulp.task('server', function() {
    // real application server (will handle all requests except for those that need to be proxied. No direct request to tis server from the client)
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname));
    app.listen(DUMMY_PORT);

    // proxy server (the one invoked by the client and decides to forward it the real application server or a specific other server)
    var server = require('http');
    var httpProxy = require('./node_modules/http-proxy');
    var httpProxyServer = httpProxy.createProxyServer({});
    server.createServer(function(req,res){
                var proxy = 'http://localhost:8001'
                if('/jsonrpc' == req.url){
                        proxy = 'http://192.168.1.101'
                } 
                res = httpProxyServer.web(req, res, { target: proxy }); 
        }).listen(SERVER_PORT)
});

gulp.task('open', ['server'], function() {
    var open = require('gulp-open');
    var options = {
      uri: 'http://localhost:'+SERVER_PORT+"/kodiremote"
    };
    gulp.src(__filename)
       .pipe(open(options));
});

gulp.task('default', ['open', 'watch'], function() {
});
