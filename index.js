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
		copter.up( 0.1 );
		copter.after( 500, function(){
			this.up( 0 );
		});
	});
	socket.on( 'down', function(){
		copter.down( 0.1 );
		copter.after( 500, function(){
			this.down( 0 );
		});
	});
	socket.on( 'forward', function(){
		copter.front( 0.1 );
		copter.after( 500, function(){
			this.front( 0 );
		});
	});
	socket.on( 'backward', function(){
		copter.back( 0.1 );
		copter.after( 500, function(){
			this.back( 0 );
		});
	});
	socket.on( 'left', function(){
		copter.left( 0.1 );
		copter.after( 500, function(){
			this.left( 0 );
		});
	});
	socket.on( 'right', function(){
		copter.right( 0.1 );
		copter.after( 500, function(){
			this.right( 0 );
		});
	});
	socket.on( 'disableEmergency', copter.disableEmergency.bind( copter ) );
});