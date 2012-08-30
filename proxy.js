var http = require('http');

var forwardUrl = process.env.ForwardUrl;
var listenPort = process.env.PORT;

http.createServer(function(req, res) {
	var headers = {};
	// TODO: I probably don't want to remove _all_ of the other headers...
	for (var header in req.headers) {
		if (header.indexOf('x-zumo') == 0) {
			headers[header] = req.headers[header];
		}
	}
	
	var zumo_request = http.request({
		host: forwardUrl,
		port: 80,
		path: req.url.substring('/zumo'.length),
		method: req.method,
		headers: headers
	}, function(zumo_response) {
		zumo_response.on('data', function(chunk) {
			res.write(chunk, 'binary');
		});
		
		zumo_response.on('end', function() {
			res.end();
		});
		res.writeHead(zumo_response.statusCode, zumo_response.headers);
	});
	
	zumo_request.on('error', function(err) {
		console.log(err);
	});
	
	req.on('data', function(chunk) {
		zumo_request.write(chunk, 'binary');
	});
	
	req.on('end', function() {
		zumo_request.end();
	});
}).listen(listenPort);