const COMMAND_DELAY = 250;

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
	socket.on( 'up', function(){
		console.log('up');
		copter.up( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after up');
			this.stop();
		});
	});
	socket.on( 'down', function(){
		console.log('down');
		copter.down( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after down');
			this.stop();
		});
	});
	socket.on( 'forward', function(){
		console.log('forward');
		copter.front( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after forward');
			this.stop();
		});
	});
	socket.on( 'backward', function(){
		console.log('backward');
		copter.back( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after backward');
			this.stop();
		});
	});
	socket.on( 'left', function(){
		console.log('left');
		copter.left( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after left');
			this.stop();
		});
	});
	socket.on( 'right', function(){
		console.log('right');
		copter.right( 0.1 );
		copter.after( COMMAND_DELAY, function(){
			console.log('after right');
			this.stop();
		});
	});
	socket.on( 'disableEmergency', copter.disableEmergency.bind( copter ) );
});