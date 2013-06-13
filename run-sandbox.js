'use strict';

var http = require('http');
var fs = require('fs');
var cp = require('child_process');

console.log("STARTING SERVER");
 
http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
	var pid = cp.spawn(process.env['ProgramFiles(x86)'] + '\\Git\\bin\\git.exe', {detached:true});
	
	var stdout;
	var stderr;
	var err;
	var cod;
	
	pid.stdout.on("data", function(data) {
		stdout += data;	
	});
	
	pid.stderr.on("data", function(data) {
		stderr += data;
	});
	
	pid.on("error", function(error) {
		err = error;
		
		var result = 'Hello World from node: ' + process.version +  ' with node: ' + fs.statSync('D:\\home\\site\\wwwroot\\node.exe').isFile() +  '\n';
		result+= 'Stdout: ' + stdout + '\n';
		result+= 'Stderr: ' + stderr + '\n';
		result+= 'Error: ' + err + '\n';
		result+= 'Code: ' + cod + '\n';
		
		res.end(result);
	});
	
	pid.on("exit", function(code) {
		cod = code;
		
		var result = 'Hello World from node: ' + process.version +  ' with node: ' + fs.statSync('D:\\home\\site\\wwwroot\\node.exe').isFile() +  '\n';
		result+= 'Stdout: ' + stdout + '\n';
		result+= 'Stderr: ' + stderr + '\n';
		result+= 'Error: ' + err + '\n';
		result+= 'Code: ' + cod + '\n';
		
		res.end(result);
	});
	
    
}).listen(process.env.PORT || 3000, process.env.HOST);