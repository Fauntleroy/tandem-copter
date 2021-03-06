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
	var $turnLeft = $('#turnLeft');
	var $turnRight = $('#turnRight');
	var $up = $('#up');
	var $down = $('#down');
	// show the sweet vid
	new NodecopterStream( document.getElementById('droneStream'), { port: 9090 } );
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
	$turnLeft.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('turnLeft');
	});
	$turnRight.on( 'click', function( e ){
		e.preventDefault();
		socket.emit('turnRight');
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
	$(window).on( 'keydown', function( e ){
		switch( e.which ){
		case 38: // up
			if( e.shiftKey ){ // go up
				socket.emit('up');
			}
			else { // go forward
				socket.emit('forward');
			}
		break;
		case 40: // down
			if( e.shiftKey ){ // go down
				socket.emit('down');
			}
			else { // go backward
				socket.emit('backward');
			}
		break;
		case 37: // left
			if( e.shiftKey ){
				socket.emit('turnLeft');
			}
			else {
				socket.emit('left');
			}
		break;
		case 39: // right
			if( e.shiftKey ){
				socket.emit('turnRight');
			}
			else {
				socket.emit('right');
			}
		break;
		}
	});
});