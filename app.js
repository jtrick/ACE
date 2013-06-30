var http = require("http"),
  // app = http.createServer(handler),
	// io = require('socket.io').listen(app)
	fs = require("fs"),
	_ = require("underscore"),
	API = require("./api.js").api,
	// tester = require("./test.js").test;
	// _ = API._||function(){API.output._='ERROR';};
	_var = null;  // Placeholder

	
	// app.listen(80);
	
	
	function handler (req, res) {
		// fs.readFile(__dirname + '/index.html',
		// 	function (err, data) {
		// 	if (err) {
		// 		res.writeHead(500);
		// 		return res.end('Error loading index.html');
		// 	}
		// 	res.writeHead(200);
		// 	res.end(data);
		// });
	}
	
	// io.sockets.on('connection', function (socket) {
	// 	socket.emit('news', { hello: 'world' });
	// 	socket.on('my other event', function (data) {
	// 		console.log(data);
	// 	});
	// });


	function getHtm() {
		return '<h1>ACE API Test.</h1>';
		
	}

	
	function getJs() {
		var outputObj = {},
		testObj = new TestObj();
		
		// outputObj.API = API;  // ((API && API.output) || 'ERROR');
		// API = API.api;
		
		
		
		outputObj.testObj = testObj;
		outputObj['get'] = testObj.api({cmd:'get',key:'key',val:'val'});
		outputObj['set'] = testObj.api({cmd:'set',key:'key',val:'val'});
		outputObj['add'] = testObj.api({cmd:'add',key:'add',val:'add'});
		outputObj['rem'] = testObj.api({cmd:'rem',key:'tst',val:'val'});
		outputObj['new'] = testObj.api({cmd:'new',key:'key',val:'val'});
		outputObj['del'] = testObj.api({cmd:'del',key:'key',val:'val'});
		outputObj['exe'] = testObj.api({cmd:'exe',key:'key',val:'val'});
		
		return "\tvar outputObj = " + (JSON.stringify(outputObj)||'{}') + ";\n\tconsole.log(outputObj);\n\n";  
	}//getJs()
    
    
    
// Application Objects /////////////////////
	
    
    
    // Test object for API.
    function TestObj(obj) {
		var _this = this, api, v, f;
		
		this.api = API(  // Instantiate API
		
			v = {  // Protected Vars:
				key: 'key',
				tst: 'tst',
				test: 'test'
			},
			
			f = {  // Protected Functions:
				key: function(val){return'key('+val+')';},
				
				test: 'return "Called test() with arg "+val;',
				
				// An example protected function.
				func: function(val) {
					return 'Called protected func() with arg'+val;
				}
			},
			
			api = {  // Public API Methods:
				"get": function(key,val) {
					return (key in v) && v[key];
				},
				"set": function(key,val) {
					return (key in v) && (v[key]=val);
				},
				"add": function(key,val) {
					return (key in v) || (v[key]=val);
				},
				"rem": function(key,val) {
					return (key in v) && delete v[key];
				},
				"new": function(key,val) {
					return new TestObj(val).key=val;
				},
				"exe": function(key,val) {
					return (typeof f[key]=='function') && f[key](val);
				}
			},
			
		this);//API
		
		
		// Private Functions:
		
		
		// An example private function.
		function privateFunc(val) {	
			return 'Called privateFunc() with arg '+val;
		}
		
    }//TestObj;
    


// Core App Server: /////////////////////


// create server and test using supervisor <appname>
http.createServer(function(req, res) {
	var htm = getHtm();
	var js = getJs() || '';
	var outputStr = '<!DOCTYPE html><html><head><title>ACE api Test Page</title></head><body><div id="static">'+htm+'</div><div id="content"></div>';
	outputStr += '<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>';
	outputStr += "<script>\n$(function scriptStart() {\n"+js+"\n});\n\n</script>\n</body></html>";
	res.end(outputStr);
}).listen(process.env.PORT, process.env.IP);



// Utility Functions /////////////////////


	// Performs basic checks for JSON structure and returns the extracted object if applicable, returns the original string otherwise.
	function jsonToObj(str) {  // Fix? Remove these from global scope.
		if (!_.isString(str)) { return str; }
		str = $.trim(str);
		var b = str.charAt(0),
			e = str.charAt(str.length-1);
		
		if (!(b=='{'&&e=='}')&&!(b=='['&&e==']')) { 
			flagError('Invalid JSON str', str);
			return str;  // Fix? Return null?
		}
		// Fix. Complete these checks.
		var obj = JSON.parse(str);
		return obj || str;  // (obj && !_.isString(obj)) ? obj : str;
	}
	
	
	// Performs basic checks for JSON qualified object structure and returns the stringified JSON object if applicable, returns the original object otherwise.
	function jsonToStr(obj, format) {  // Fix? Remove these from global scope.
		if (!_.isObject(obj)) { return obj; }
		
		function convertFuncs(obj) {
			_.each(obj, function(val,key,obj){
				if (_.isFunction(val)) { 
					obj[key] = {
						typ: 'fnc',
						bod: val.toString(),
						arg: val.arguments
					};
				} else {
					obj[key] = JSON.stringify(val);
				}
				// Fix. Complete safety checks, prevent infinite recursion from looped references.
			});
		}
		
		var str = JSON.stringify(obj);
		return _.isString(str) ? str : obj;
	}




// Residual Functions /////////////////////



// function serveHtml(pathAndFile) {
//     pathAndFile = pathAndFile || 'index.html';
        
//     _res.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.readFile(__dirname + pathAndFile, "utf8", function(err, data) {
//         if (err)
//             _res.write("Shit is broken.");
//         else
//             _res.write(data);
//         _res.end();
//     });
// }


// function render_template (res, req, view) 
// {
//     fs.readFile(__dirname + '/' + view.path + '/' + view.template, function (error, template) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
        
//         if (!error) {
//             template = template.toString();
//             res.write(mustache.to_html(template, view.context || null));
//         } else console.log("Template not found.");
        
//         res.end();
//     });
// }

// function about() 
// {
//     render_template(this.res, this.req, {
//         path: "views",
//         template: "about.html",
//         context: {
//             name: "John",
//             age: function () { return "120"; }
//         }        
//     });
// }


// // Access Data
// function db(exe) {
    
    
// }


// function index() {
//    serveHtml('/index.html');
// }


// function test() {
//    _res.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.readFile(__dirname + '/views/test.html', "utf8", function(err, data) {
//         if (err) {
//             _res.write("Shit is broken.");
//         } else {
//             _res.write(data);
//             fs.readFile(__dirname + '/static/js/script.js', "utf8", function(err, script) {
//                 if (err) {
//                     _res.write("<h3>Script didn't load.</h3>");
//                 } else {
//                     var js = '';  // testFunc() || '';
//                     _res.write("<script>\n$(function scriptStart() {\n"+script+js+"\n});\n\n</script>\n");
//                 }
//                 _res.write("</body></html>");
//                 _res.end();
//             });
//         }
//     });
    
    
// }//test()





