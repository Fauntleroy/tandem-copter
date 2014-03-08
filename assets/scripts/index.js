var $ = require('jquery');
var io = require('socket.io-client');

var socket = io.connect('/');

socket.on( 'connect', function(){
	console.log('socket connected');
});

$(function(){
	var $takeoff = $('#takeoff');
	var $land = $('#land');
	var $stop = $('#stop');
	var $disableEmergency = $('#disableEmergency');
	var $forward = $('#forward');
	var $backward = $('#backward');
	var $left = $('#left');
	var $right = $('#right');
	var $up = $('#up');
	var $down = $('#down');
	$takeoff.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('takeoff');
	});
	$land.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('land');
	});
	$stop.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('stop');
	});
	$forward.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('forward');
	});
	$backward.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('backward');
	});
	$left.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('left');
	});
	$right.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('right');
	});
	$up.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('up');
	});
	$down.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('down');
	});
	$disableEmergency.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('disableEmergency');
	});
});