var http = require('http');

var ecstatic = require('ecstatic');
var socket_io = require('socket.io');
var ar_drone = require('ar-drone');

var copter  = ar_drone.createClient();
var ecstatic_server = ecstatic({
	root: __dirname +'/assets'
});
var server = http.createServer( ecstatic_server );
var io = socket_io.listen( server );
server.listen( 8080 );

io.sockets.on( 'connection', function( socket ){
	console.log('socket connected');
	socket.on( 'takeoff', copter.takeoff.bind( copter ) );
	socket.on( 'land', copter.land.bind( copter ) );
	socket.on( 'stop', copter.stop.bind( copter ) );
	var upTimer;
	socket.on( 'up', function(){
		clearTimeout( upTimer );
		copter.up( 0.1 );
		upTimer = setTimeout( function(){
			copter.up( 0 );
		}, 250 );
	});
	var downTimer;
	socket.on( 'down', function(){
		clearTimeout( downTimer );
		copter.down( 0.1 );
		downTimer = setTimeout( function(){
			copter.down( 0 );
		}, 250 );
	});
	var frontTimer;
	socket.on( 'forward', function(){
		clearTimeout( frontTimer );
		copter.front( 0.1 );
		frontTimer = setTimeout( function(){
			copter.front( 0 );
		}, 250 );
	});
	var backTimer;
	socket.on( 'backward', function(){
		clearTimeout( backTimer );
		copter.back( 0.1 );
		backTimer = setTimeout( function(){
			copter.back( 0 );
		}, 250 );
	});
	var leftTimer;
	socket.on( 'left', function(){
		clearTimeout( leftTimer );
		copter.left( 0.1 );
		leftTimer = setTimeout( function(){
			copter.left( 0 );
		}, 250 );
	});
	var rightTimer;
	socket.on( 'right', function(){
		clearTimeout( rightTimer );
		copter.right( 0.1 );
		rightTimer = setTimeout( function(){
			copter.right( 0 );
		}, 250 );
	});
	socket.on( 'disableEmergency', copter.disableEmergency.bind( copter ) );
});