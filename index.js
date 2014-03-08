const COMMAND_DELAY = 1000;
const COMMAND_POWER = 0.25;

var http = require('http');

var ecstatic = require('ecstatic');
var socket_io = require('socket.io');
var ar_drone = require('ar-drone');
var dronestream = require('dronestream');

var copter  = ar_drone.createClient();
var ecstatic_server = ecstatic({
	root: __dirname +'/assets'
});
var server = http.createServer( ecstatic_server );
var dronestream_server = http.createServer();
var io = socket_io.listen( server );
dronestream.listen( dronestream_server );
server.listen( 8080 );
dronestream_server.listen( 9090 );

io.sockets.on( 'connection', function( socket ){
	console.log('socket connected');
	socket.on( 'takeoff', copter.takeoff.bind( copter ) );
	socket.on( 'land', copter.land.bind( copter ) );
	socket.on( 'stop', copter.stop.bind( copter ) );
	socket.on( 'up', function(){
		console.log('up');
		copter.up( COMMAND_POWER );
		setTimeout( function(){
			console.log('after up');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'down', function(){
		console.log('down');
		copter.down( COMMAND_POWER );
		setTimeout( function(){
			console.log('after down');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'forward', function(){
		console.log('forward');
		copter.front( COMMAND_POWER );
		setTimeout( function(){
			console.log('after forward');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'backward', function(){
		console.log('backward');
		copter.back( COMMAND_POWER );
		setTimeout( function(){
			console.log('after backward');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'left', function(){
		console.log('left');
		copter.left( COMMAND_POWER );
		copter.after( COMMAND_DELAY, function(){
			console.log('after left');
			copter.stop();
		});
	});
	socket.on( 'right', function(){
		console.log('right');
		copter.right( COMMAND_POWER );
		setTimeout( function(){
			console.log('after right');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'turnRight', function(){
		console.log('turn right');
		copter.clockwise( COMMAND_POWER );
		setTimeout( function(){
			console.log('after turn right');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'turnLeft', function(){
		console.log('turn left');
		copter.counterClockwise( COMMAND_POWER );
		setTimeout( function(){
			console.log('after turn left');
			copter.stop();
		}, COMMAND_DELAY );
	});
	socket.on( 'disableEmergency', copter.disableEmergency.bind( copter ) );
});