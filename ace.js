// ace.js Copyright (c) The New Waters Foundation, all rights reserved.  For license see: http://OpenAce.org/license?id=ace.js


//$.getScript("http://crypto-js.googlecode.com/files/CryptoJS%20v3.0.2.zip");  // Fix. Encryption algorithms. Include core in download code to eliminate dependencies and optimize efficiency.


/* Fix.  Testing.
var ACE = ace();

var testObj = ace({
	"command" : "new",
	"aceType" : "task"
});

//ace._ACE = "Modified";
ace('testID');
*/

//log("ACE LOADING");




// The ace function. Use ace(aceID) to return the object represented by aceID. aceType can be used to restrict the type(s) of entity that are acceptable to return, and can be a single or space-separated string representing the aceID or an alias of the specified aceType(s).
function ace(aceID, aceType) {
	ace._ACE = ace._ACE || new AceAPI();  // Will establish a persistent refernce to the single instance of the aceAPI object.
	var ACE = ace._ACE,  // The var used globally within the ace() member objects.
		caller = ace.caller,  // Fix.  This should be made more useful.
		argType = typeOf(aceID),
		result = null;
		
	ace.fixACE = ace.fixACE || ((function holdScope() {  // Form a closure to maintain the scope of a single aceAPI object as ace._ACE.
		var scope_ACE;
		if (ace._ACE instanceof AceAPI) { 
			ACE = scope_ACE = ace._ACE;
		} else {
			// Fix. Notify Security Alert.
			//ace._ACE = ACE = scope_ACE;
		}
		return (function() { return scope_ACE; });
	})())
	
	if (ace._ACE instanceof AceAPI) {  // Fix.  Implement some mechanism to prevent ace._ACE from being modified from outside the ace() function. Add listener, etc?
		// Fix. Does nothing but ensure lack of modifications to prototype..
	} else {
		// Fix. Notify Security Alert.
		ace._ACE = ACE = ace.fixACE();
	}
	
	
	/*
	window.ACE = window.ACE || new AceAPI(getUserLoginObj());  // Fix! Fold this into a closure to protect within ace.
	var ACE = window.ACE;    // Fix! Remove global reference!
	
	(function() {  // Closure to hold a static instance of the AceAPI object.
		var typeVal = typeOf(ACE);
		log(typeVal, "typeVal");
		ACE = ACE || new AceAPI();
		return function() { return ACE; };
	})();   // Fix! Correct all of this when time is not quite as of the essence.
	if (this != window) {  // Fix.  Use best way to see if this was instantiated using new ace(); and return null if so.
		return;  // Fix? Should re-assign this to the correct object type and return that.
	}
	*/
	

	if (argType == "string") {
		if (aceID == "rand") {
			return randString((_.isNumber(aceType)) || 32);  // Fix. Ensure Integer, also may not end up using aceType.
		} else if (_.isAceID(aceID)) {  // Fix?  Perform this here?
			return ACE.ace(aceID);
		} else {
			return;  // Fix. Error handling, Notification.
		}
	} else if (argType == 'object') {
		if ((aceID.command) || aceID.aceCall) {
			result = ACE.aceCall(aceID);
		} else if (aceID.login) {
			result = ACE.userLogin(aceID);  // Fix? Handle login result additionally?
			return ((result)?(ACE):(null));
		} else {
			return;  // Fix. Error handling.
		}
		//ACE.aceCall(aceID);  // Fix. Integrity checking and ensure only single AceObj is returned.
	} else if (argType == 'undefined') {
		result = ACE.aceCall();  // Fix. What should we do here?
	} else {
		return;  // Fix. Error handling and default behavior.
	}
	
	if (typeOf(result) == "array") {
		if (result.length == 1) {
			return result[0];
		} else if (result.length > 1) {
			return result;  // Fix.  Figure out best way to return multiple objs asynchronously.  Make AceObj act as container for other AceObjs for multiples?
		} else {
			// Fix. Error handling.
		}
	} else {
		// Fix. Error handling.
	}
	
	
	// Private methods
	
	
	// Returns the primary aceType of the entity associated with aceID.  
	function aceType(aceID) {
		// Fix.
	}
	
	
	// Converts an aceID into an array of name segments, as separated by '-' and '_'.
	function aceIDtoArray(aceID) {
		aceID = aceIDchop(aceID);
		var segs = aceID.split("_");
		var idArray = segs[0].split("-");
		if (segs[1]) {
			// Fix. Complete behavior for concatenated system IDs.
		}
		return segs;
	}	
	
	
	// Generates random string for salting and hash generation, etc.
	function randString(length, chars) {
		if (!chars) { chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"; }
		if (!length) { length = 256; }
		var charString = '',
			charsL = chars.length;
		for (var i=0; i<length; i++) {
			charString += chars.charAt(Math.floor(Math.random()*charsL));
		}
		return charString;
	}
	
	// Drops the ace_ prefix from an aceID and returns the modified string for consistent usage.
	function aceIDchop(aceID, prefix) {
		//console.log("aceIDchop() aceID: "+aceID);  // Fix.
		if (typeof(aceID) != 'string' || !aceID.length) { return false; }  // Fix. Return as string? Error handling.
		if (prefix) { aceID = aceIDChop(aceID); } else { prefix = "ace_"; }
		if ((aceID.length > prefix.length) && (aceID.substr(0,prefix.length) == prefix)) { 
			return aceID.substr(prefix.length);
		} else {
			return aceID;
		}
		// Fix.  The following was an original hack combining this with what became aceIDtoArray().
		// var segs = aceID.split("_");
		// if (segs[0] == 'ace') { segs.shift(); }  // segs.splice(0, 1); }
		// if (segs[1]) {
			// return segs.join('_');
		// } else {
			// return segs[0];
		// }
	}
	
	
	// Boolean check to determine whether aceID represents a 'typ' entity structure by using simple name prefix check. Returns true or false.
	function isTyp(aceID) {
		if ((!(aceID = aceIDchop(aceID))) || (aceID.length < 5)) { return false; }
		return (aceID.substr(0,3) == "typ") ? (true) : (false);
	}
		
		
	// Objects available for privilaged use to this object.
	
	
	// The abstraction used to communicate with the central ACE system. The connection is abstracted and can be a local system call, across a network, or any other mechanism.
	function AceAPI() {
		var _AceAPI = this,
			userID = null,
			userName = null,
			markedTimes = [],
			uiArray = [],  // Used to track all AceUI instances currently loaded.
			data = null,  // The object abstraction used to interact with data locally, which automatically conveys through the ACE network.		
			keyCheck = {};  // Used by aceCheck to verify mutual access to this specific AceAPI for authentication.
			
		function initialize() {
			data = new AceData(_AceAPI);
		}
		
		// Authenticates user and returns their userID if successful, else null. Receives an object containing {"login":TRUE|FALSE, "userName":user, ("password":pass || "key":keyHash)}
		this.userLogin = function userLogin(loginObj) {
			loginObj = {  // Fix! Drop this.
				"login" : 1,
				"userName" : "testUser",
				"passHash" : "1234567890",
				"keyHash" : "0987654321"
			}
			userName = loginObj.userName;
			//var passHash = loginObj.passHash;
			//var keyHash = loginObj.keyHash;
			
			userID = "usr-test";  // Fix!!! Quick hack for testing. Should check local storage for auto-login, and connect through comm if desired. Else should request username and password.
			userName = "TestUser";  // Fix! Just for testing. 
			// Fix! Set userID and loginObj to fixed state here. Perform remaining login tasks!
			return userID;
		}
		
		
		// Returns the userID of the current user if logged in, null otherwise. If name is set, the userName will be returned.
		this.loggedIn = function loggedIn(name) {  // Fix. Identify best way to pass name into this, Remove auto-call?
			if (name) {
				return userName;  // Fix? Error handling, check access?
			} else if (userID) {
				return userID;  // Fix! Ensure this is passed by value.
			}
			return null;
			//return ((userID)?(ace().get('Name')):(null));
		}
		
		
		// Used to securely pass calls and data access scope between objects.  
		function callKey(callObj) {
			return function callPass(localACE) {
				// Fix.
			}
		}
		
		
		// Verifies a correct match between two key pairs. Used to authenticate mutual simultaneous access to this specific AceAPI by objects not sharing the same scope.
		this.aceCheck = function AceAPI_aceCheck(keyString) {
			var value = null;
			if (typeof(keyString) == "string") {
				value = keyCheck[keyString];
				if (value) {
					delete keyCheck[keyString];
					if (value != "verified") {
						keyCheck[value] = "verified";
					}
					return value;
				}
			} else if (!keyString) {
				//keyString = randString();  // Fix. Ensure doesn't already exist. Miniscule odds but theoretically possible.
				keyCheck[keyString = randString()] = randString();
				return keyString;
			}
		}
		
		
		// The universal shortcut method for returning an aceObj represented by aceID. Actually just calls data.ace(); loadRadius sets the number of peripheral load steps to take in loading lnk and sub-entities.
		this.ace = function AceAPI_ace(aceID, loadDepth) {
			if (typeof(aceID) == "string") { return data.ace(aceID, loadDepth); }
		}
		
		
		// The universal access method for the ACE API. Accepts an object using the ReSTful ACE communications protocols, as single or batch requests. See http://openace
		this.aceCall = function AceAPI_aceCall(callObj, caller) {  // Fix.  This function needs re-optimized since converting the call process.
			var aceID, key, value, commandBlock, callType, aceType, result, typ;
			var resultsArray = [];
			callType = typeOf(callObj);
			if (callType == "undefined") { return data.ace("_system_", "sys"); }  // Creates and returns an AceObj with no aceID, typically used to create an access point for system and retain a closure reference of the AceAPI object.
			if (callType == "string") { return data.ace(callObj); }  // Allow single string arg for possibility to make "get" aceCall using it as an aceID. 
			if (callType == "array") { return data.aceCall(callObj, "container"); }  // Creates and returns an AceObj with no aceID that serves as a collection of AceObjs to handle batch operations on or route to other processes.
			if (callType != 'object') { return; }  // Fix.  Error handling.
			
			// Call Redirections 
			if (callObj["aceCall"]) {
			//	return ACE.aceCall(value);
			} else if (callObj["command"]) {
				return [data.aceCall(callObj)];
			}
			
			// Iterate through the acceptable callObj command types:  
			if (value = callObj["get"]) {  				// Analogous to ReST: GET, or CRUD: load.
				//log("aceCall to ACE 'get': "+value);
				callType = typeOf(value);
				if (callType == 'string') {  // Can be in form { "get" : "{aceID}" (, aceType:"aceType")}
					result = data.aceCall({
						"command" : "get",
						"aceID" : value,
						"typ" : callObj.aceType
					}); 
					resultsArray.push(result);
				} else if (callType == 'object') {  
					if (aceID = value["aceID"]) {  // Single nested call { "get" : { "aceID":"{aceID}" } }
						result = data.aceCall({
							"command" : "get",
							"aceID" : aceID
						});
					}
					resultsArray.push(result);
				} else if (callType == 'array') { // Multiple get calls, can take several forms: 
					var thisItem;
					for (key in value) {
						callType = typeOf(thisItem = value[key]);
						if (callType == 'string') {  // { "get" : [ "{aceID}", "{aceID}", ... ] }
							result = data.aceCall({
								"command" : "get",
								"aceID" : thisItem
							});
							resultsArray.push(result);
						} else if (callType == 'object') {  // { "get" : [ {"aceID":"{aceID}"}, {"aceID":"{aceID}"}, ... ] }
							if (thisItem["aceID"]) {
								result = data.aceCall({
									"command" : "get",
									"aceID" : thisItem["aceID"]
								});
								resultsArray.push(result);
							} else {
								// Fix? Other possibilities?
							}
						} else {
							// Fix. Error handling.
						}
						/*result = data.aceCall({  // Fix.  Left from previos structure, check.
							"command" : "get",
							"aceID" : value[key]
						}); */
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["set"]) {  				// Analogous to ReST: PUT, or CRUD: update.
				//log("aceCall to value 'set': "+value);
				callType = typeOf(value);
				if (callType == 'object') {  // Nested call { "set" : { "{aceID}":{"property":"value"}, "{aceID}":{"property":"value"}, ...} }
					for (aceID in value) { 
						if (typeOf(commandBlock = value[aceID]) == 'object') {
							result = data.aceCall({
								"command" : "set",
								"aceID" : aceID,
								"items" : value[aceID]  // Fix? Parse the individual prop:value pairs here?
							}); 
							resultsArray.push(result);
						} else {
							// Fix. Error handling, Other options?
						}
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["new"]) {  				// Analogous to ReST: POST, or CRUD: create.
				var i=0, len=0;
				//log("aceCall to value 'new': "+value);
				callType = typeOf(value);
				if (callType == 'object') {  // Nested call { "new" : { "{aceType}":[{"aceID":"value", "property":"value", ...}, {"alias":"value", ...}, ...], "{aceType}":{"aceID":{"property":"value", ...}, "alias":{"property":"value", ...}, ...} } }
					for (aceType in value) {
						if (typeOf(commandBlock = value[aceType]) == 'array') {  // Nested array call  { "new" : { "{aceType}":[{"aceID":"value", "property":"value", ...}, {"alias":"value", ...}, ...] }, ... }
							if (len = commandBlock.length) { 
								for (i=0; i<len; i++) {
									if (typeOf(key = commandBlock[i]) == 'object') {
										aceID = (key.aceID || key.alias || _AceAPI.nextAceID());  // Fix. Remove alias and aceID items from commandBlock, resolve conflicts, duplicates, etc.
										result = data.aceCall({
											"command" : "new",
											"typ" : aceType,
											"aceID" : aceID,
											"items" : key  // Fix? Parse the individual prop:value pairs here?
										});
										resultsArray.push(result);
									} else {
										// Fix. Error handling.
									}
								}
							} else {
								// Fix. Error handling.
							}
						} else if (typeOf(commandBlock) == 'object') {  // Nested objects with proposed alias as keys { "new" : { "{aceType}":{"aceID":{"property":"value", ...}, "alias":{"property":"value", ...}, ...} } }
							for (aceID in commandBlock) {
								result = data.aceCall({
									"command" : "new",
									"typ" : aceType,
									"aceID" : aceID,
									"items" : commandBlock[aceID]
								});
								resultsArray.push(result);
							}
						} else {
							// Fix. Error handling, Other options?
						}
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["del"]) {  				// Analogous to ReST: DELETE, or CRUD: delete.
				//log("aceCall to value 'del': "+value);
				callType = typeOf(value);
				if (callType == 'string') { 						
					result = data.aceCall({
						"command" : "del",
						"aceID" : value
					});
					resultsArray.push(result);
				} else if (callType == 'object') {
					for (key in value) { 
						result = data.aceCall({
							"command" : "del",
							"aceID" : value[key]
						}); 
						resultsArray.push(result);
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["dat"]) {  				// If loading from a file, stream, or other data source. Imports the object but does not propogate new or get calls.
				if (_.isObject(value)) {
					_.each(value, function(items,id) {
						result = data.aceCall({
							"command" : "dat",
							"aceID" : id,
							"items" : items
						});
						resultsArray.push(result);
					});
				} else {
					// Fix.  Error handling.
				}
			}
			
			if ((value = resultsArray.length) > 1) {
				return data.ace(resultsArray);
			} else if (value = 1) {
				return resultsArray[0];
			} else {
				// Fix.  Error handling.
			}
		}
		
		
		// Returns an incremented aceID.  Does nothing to any actual aceObjs, just performs the increment.
		this.nextAceID = function AceAPI_nextAceId(aceID) {
			if (!aceID || aceID == "") { return "A"; }  // Fix? aceIDs start with a letter.
			if (typeof(aceID) != 'string') { return false; }
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			var lastChar = aceID.charAt(aceID.length - 1);
			if (lastChar == '_') { return aceID + "a"; }  // Fix? Handle this behavior.
			if (lastChar == 'Z') { return (aceID + '0'); }
			var newID = aceID[(aceID.length - 1)] = (chars.charAt(chars.indexOf(lastChar) + 1));
			//log("aceID: |"+aceID+"|,  newID: |"+newID+"|");
			return newID;
		}
	
	
		// Used to gauge server load times across operations. eventNote is a string to associate with the event.
		this.markTime = function AceAPI_markTime(eventNote) {
			var timeNow = Date.now();
			var thisEvent = { time:timeNow, note:eventNote }
			if (markedTimes.length > 0) {
				var slotNum = (markedTimes.length - 1);
				var lastEvent = markedTimes[slotNum];
				var firstEvent = markedTimes[0];
				thisEvent.elapsed = (timeNow - lastEvent.time);
				thisEvent.total = (timeNow - firstEvent.time);
			} else {
				thisEvent.total = thisEvent.elapsed = 0;
			}
			markedTimes.push(thisEvent);
		}
		
		// Used to register and remove AceUI elements, send commands to and otherwise access the UI system associated with this ACE login.
		this.ui = function AceAPI_ui(callObj) {
			if (!_.isObject(callObj)) { return; }
			var command = callObj.command,
				uiType = callObj.uiType,
				domElement = callObj.domElement,
				uiID = callObj.uiID,
				aceID = callObj.aceID;
			
		}
		
		// Creates (if referTo is set) or resolves (if !referTo) an alias and propogates the call across this node.
		this.als = this.alias = function AceAPI_als(alias, referTo) {
			if (referTo) {
				return data.setAlias(alias, referTo);
			} else {
				return data.getAlias(alias);
			}
		}
		
		// Resolves a variable to a string output. Used to handle items that may be strings, aceID's, or even aceObjs.
		var toStr = this.toStr = function AceAPI_toStr(objStr) {
			if (!objStr) { return null; }
			return data.toStr(objStr);
		}
		
		// Returns an empty object template structure for the entity represented by aceID.
		this.aceTyp = function AceAPI_aceTyp(aceID) {
			return data.aceTyp(aceID);
		}
		
		// These allow functions defined within ace() to be accessed outside of its scope.  Fix.
		this.aceIDChop = aceIDchop;
		
		initialize();
	}//AceAPI
	
	
	// The object abstraction used to interact with data locally, which automatically propogates through the ACE network.
	function AceData(ACE) {
		_AceData = this;
		var db = new DatabaseObj();  // An abstraction used for local database access.
		var comm = new AceComm(aceDataCallBack);  // Used for all communications with servers, other clients, and systems across network interfaces.
		var cryptObj = new AceCryptObj();
		var memObj = {  // An object representation of all data currently in local memory.
			"items" : {  // Contains all aceIDs stored locally, and links them to the object data associated with their internal items var.
				"aceID" : "AceObj.items"
			},
			"alias" : {  // Contains all Alias aceIDs stored locally that refer to a System aceID or another alias.
				"aliasID" : "aceID"
			},
			"aceObj" : {  // All aceObjs currently loaded in system memory.
				"aceID" : "aceObj"
			},
			"typ" : {  // The alias calls of entity types maintained locally, used to instantiate complex objects using layering via aceObj's "typ" fields.
				
			},
			"tempIDs" : {  // All aceObjs with temporary aceIDs (tmp-0Aa...) currently loaded in system memory and referenced by that ID.
				"tmp-max" : "maxID"  // The highest tempID currently issued by this system.
			}, 
			"que" : {  // Stores requests to be made to server and items returned but not loaded yet.
				"out" : {  // an object containing calls to be sent to the server in a batch call; divided by API commands.
					"get" : {
					
					},
					"set" : {
					
					},
					"new" : {
					
					},
					"del" : {
					
					}
				},
				"in" : {  // a collection of JSON objects representing sequential batches of returned call results.
					
				}
			},
			"sys" : {  // Used to hold system objects in memory for storing to disk between page loads rather than having to re-instantiate everything.  // Fix? Security risk?
				"db" : db,
				"comm" : comm
				//"userID" : _AceAPI.loggedIn()  // Fix.
			}
		}
		
		
		// Used to grab existing aceObj with aceID or instantiate a new one. If aceID represents a 'typ' structure, a new aceObj of that type will be instantiated and returned. If aceID is an array of aceIDs or aceObjs, a new container aceObj will be instantiated to hold them. loadDepth sets the number of peripheral load steps to take in loading lnk and sub-entities.
		var _ace = this.ace = function AceData_ace(aceID, loadDepth) {
			//if (!securityCheck(aceID, caller, "ace")) { return false; }  // Fix! Handle for cases of comm latency. Return AceObj. Error handling and notification.
			if (typeof(aceID) == "string") {
				if (!(aceID = aceIDchop(aceID))) {  // If this is an invalid aceID, return a bad object.
					return badCall();
				} else if (false) {  // Fix.  isTyp(aceID)) {  // If calling a 'typ' aceID, create a new AceObj of that typ. There are many instances where we may want the typ object structure for quick checks, so removed this.
					return newCall({  // Fix. Remove this. Eliminated reliance on 'typ' designation. 
						"command" : "new",
						"typ" : aceID
						//"caller" : caller
					});
				} else if (memObj.aceObj[aceID]) {  // If this AceObj exists in memory, return it.
					return memObj.aceObj[aceID];
				} else if (result = db.ace(aceID)) {  // If we find this aceID in the local db, instantiate it.
					return datCall({
						"command" : "dat",
						"aceID" : aceID,
						"items" : result,
						"loadDepth" : loadDepth,
						"source" : "db"
					});
				} else {  // Otherwise, send a 'get' call through to comm which returns a waiting AceObj.
					return comCall({
						"command" : "get",
						"aceID" : aceID,
						"loadDepth" : loadDepth,
						"caller" : caller
					});
				}
			} else if (typeOf(aceID) == 'array') {  // Fix. Do we want this?
				//return new AceObj(aceID, 'container');
			} else {
				return badCall();
			}
		}//AceData_ace()
		
		
		// Used to call the AceData abstraction for a single AceObj, handles logic and safety for calls. Attempts local action, propogating to the local db, and then sends to aceComm for central server transmission. Ultimately it makes more sense to centralize the security checking, decision-making, and propogation within this function because the object reference is never passed outside of AceAPI or AceObj so we can focus on ensuring integrity of these structures mere dependably than for those objects which we pass back to the user applications.
		this.aceCall = function AceData_aceCall(callObj) {
			if ((typeOf(callObj) != 'object') || (!safetyCheck(callObj))) { return; }  // Fix.  Error handling.
			//if (callObj.caller != AceData_aceCall.caller) { callObj.caller = AceData_aceCall.caller; } // Fix. This was from before structuring aceObj as the central logic point.
			callObj.dataCallTime = Date.now();
			
			var command = callObj.command;
			// Fix.  This was all removed when local functions were established for each call type
				// aceObj = null,
				// result = null,
				// aceType = callObj.aceType,
				// items = callObj.items;  // Fix. If setting or creating a new typ, corresponds to aceObj items structure.
				
			// if (typeof(aceID) == 'string') {  // All calls should have an associated aceID...
				// aceObj = _AceData.ace(aceID);  // This handles decision-making for memory check versus instantiating new aceObj.
				// if (!aceObj) { return; }  // Returns on security check failure or no retreived object.  // Fix. Notification, error handling, security alert
			// } else {
				// return; // Fix. Error handling and notification.
			// }
			
			// if (typeof(items) == "array") {  // If specifying properties for 'set' or 'new'
				// // Fix.
				// //if (callObj.props) { ; }  // Fix. Choose best structure for passing props.
			// }
			
			if (!command) { 
				// Fix. Behavior here?
			} else if (command == "get") {							// command == "get"
				return getCall(callObj);
			} else if (command == "set") {							// command == "set"
				return setCall(callObj);
			} else if (command == "new") {							// command == "new"
				return newCall(callObj);
			} else if (command == "del") {							// command == "del" 
				return delCall(callObj);
			} else if (command == "dat") {							// command == "dat" 
				return datCall(callObj);
			} else {
				// Fix. Handling for incorrect commands.
			}
			return result;
			
		}//AceData_aceCall()
		
		
		// The central handler for AceObj calls of 'command'=='get'.
		function getCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			return _ace(callObj.aceID, callObj.caller);
			// Fix? Complete this as a way of returning AceObj props? May not even need it though, as this function could sensibly be put in AceObj?
		}
		
		
		// The central handler for AceObj calls of 'command'=='set'.
		function setCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			if (!callObj.aceID) { return; }  // Fix?
			var resultObj = {},
				callItems = callObj.items,
				objItems = memObj.items[callObj.aceID];
			if (callItems) {
				for (var item in callItems) {
					resultObj[item] = {  // Fix. Use best callObj identifier (time, user.sub-aceID, etc. to stamp call and include sub-portion of entity that was modified.  Include also the previous value before the mod? 
						"userID" : ACE.loggedIn(),
						"sect" : "cor",
						"new" : callItems.item
					}
					if (item=="props") {  // Fix? Add more... // Check for illegal item names and skip them.
						// Fix? Do anything here?
					} else if (objItems.cor.item != undefined) {  // Fix! Needs converted from old structure.
						resultObj[item].old = objItems.cor.item;
						objItems.cor.item = callItems.item;
					} else if (objItems.cor.props.item != undefined) {  // Fix! Needs converted from old structure.
						resultObj[item].sect = "cor.props";
						resultObj[item].old = objItems.cor.props.item;
						objItems.cor.props.item = callItems.item;
					}
					// Fix. Include other possible sub-modules.
				}
			} else {
				// Fix. Error handling, other options?
			}
			//memObj.que.out.// Fix. Complete this.
			return memObj.aceObj[callObj.aceID];
			db.aceCall(callObj);
			comm.aceCall(callObj);
		}
		
		
		// The central handler for AceObj calls of 'command'=='new'. Returns the newly generated AceObj.
		function newCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			callObj.status = callObj.command = "new";
			if (!callObj.aceID) { callObj.aceID = _AceData.nextAceID(); }
			if (!callObj.typ) { callObj.typ = "typ-ent"; }
			var aceID = callObj.aceID,
				typID = callObj.typ,
				typObj = _ace(typID),
				items = aceTyp();
				
			items.als.push(aceID);
			items.cor.aceID = aceID;
			items.cor.typ = typID;
			items.sys.topSubID = "a";
			items.sys.created = Date.now();
			items.sys.creator = ACE.loggedIn();
			memObj.tempIDs[aceID] = null;
			
			
			//if (!isTyp(callObj.aceID)) { 
				// Fix. Handle this case. Clone AceObj represented by aceID? New AceObj of that typ?
			//} 
			// if (!memObj.items[aceID]) {  // Fix. Handle special cases that can occur if not in memory.
				// var testObj = null;
				// _ace(callObj.aceID);
				// _AceData.aceType(callObj.aceID);
				// if (aceID.status() != "loaded") {
					// return; // Fix. Handle this case. Must ensure we don't asynchronously duplicate an aceID. Probably que the command and set the return call for the above object 
				// }
			// } 
			if (callObj.items) {
				// Fix. Complete this. Safety checking, special considerations.
			} else { callObj.items = undefined; }  // Fix? Ensure $.extend() will ignore it.
			
			if (!memObj.items[typID]) { memObj.items[typID] = null; }  // Fix? Should never happen.
			if (typObj.status() == "loaded") { 
				memObj.items[aceID] = _.extend({}, items, memObj.items[typID], callObj.items);  // Fix? Ensure this works correctly in all cases. Should secure a closure and be passed by reference into the AceObj.
			} else {  
				// Fix. Pass callback to this object to execute once it's loaded completely. Also account for bad objects, offline, etc.
			}
			memObj.aceObj[aceID] = new AceObj(callObj, memObj.items[aceID]);
			callObj.items = packItems(callObj.aceID);
			dbCall(callObj);
			comCall(callObj);
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// The central handler for AceObj calls of 'command'=='del'.
		function delCall(callObj) {
			// Fix. Complete this. 
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// Used when loading existing data into local system as from comm return calls or files.
		function datCall(callObj, queIDs) {  // Fix. Error checking.
			if (!_.isObject(callObj)) { return; }  // Fix?
			var caller = callObj.caller,
				aceID = callObj.aceID,
				items = callObj.items,
				typ = (items.cor && items.cor.typ) ? (items.cor.typ) : ("typ-ent"),
				lnkTypes = ["als","cor","itm","typ","has","lnk"],  // Fix! Obtain programmatically.
				obj = null;
				
			if (!_.isObject(items)) { return false; }  // Fix. Error handling, notification.
			if (memObj.items[aceID]) {
				return memObj.aceObj[aceID];  // Fix! Handle case where object already exists in memory. Alert, merge options, fork, etc.
				obj = objCollision(callObj);
				aceID = obj.cor.ace;
			} else {
				obj = memObj.items[aceID] = aceTyp(aceID);
				obj.cor.ace = aceID;
				// Fix! Handle latency.
			}
			
			_.each(items, function(itms,itm) {
				if (_.indexOf(lnkTypes,itm)) {  // If this is a lnk-typ category
					if (itm = "als") {
						_.each(itms, function(als) {
							if (!setAlias(als, aceID)) {
								// Fix! Handle alias collisions.
							}
						});
					} else {
						_.each(itms, function(lnk, cat) {
							cat = "cat_"+cat;  // Fix?
							if () {
								
							} else if (memObj.items[aceID]) {
								// Fix! Handle alias collisions.
							}
						});
					}
					_.each(val, function(val,itm) {
						result = data.aceCall({
							"command" : "set",
							"aceID" : id,
							"items" : val
						}); 
					});
				} else {
					obj.itm = itms;  // Fix! Error, security checking, Merging, etc.
				}
				
				
				
			});
			
			memObj.aceObj[aceID] = new AceObj(callObj, memObj.items[aceID]);  // Fix! Experiment with this to determine best method for passing items.
			unpackItems(aceID, callObj.items);  // Fix. Check for error, inflate from string and ensure not passed by reference.
			return memObj.aceObj[aceID];
		}
		
		
		// Used to return an empty or faulty AceObj when appropriate.
		function badCall(callObj) {
			var typChk = null;
			callObj = {
				"callObj" : callObj,  // Fix? Stringify?
				"status" : "bad"
			};
			return new AceObj(callObj, {});
		}
		
		
		// Used to handle calls made to the local AceDatabase object.
		function dbCall(callObj) {  // Fix! Ensure caller security of this operation
			var result = null;
			
			if (typeOf(callObj) != "object") { return; }  // Fix?
			if (!callObj.aceID) { 
				// Fix. Error handling. Do anything here?
			}
			if (!memObj.aceObj[callObj.aceID]) {
				// Fix. Error handling. Create new?
			}
			if (!callObj.command || callObj.command == "db") { callObj.command = "get"; }  // Fix? May want to return rather than defaulting to 'get' call?
			result = db.aceCall(callObj);
			if (callObj.command == "get") {  // Fix? Place logic elsewhere?
				memObj.aceObj[callObj.aceID] = result;
			}
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// Used to handle calls made to the comm object.
		function comCall(callObj) {  // Fix! Ensure caller security of this operation
			if (typeOf(callObj) != "object") { return; }  // Fix?
			var aceID = callObj.aceID;
			if (!aceID) { 
				// Fix.  What to do here?
			}
			if (!memObj.aceObj[aceID]) {  // Fix. Complete this.
				memObj.items[aceID] = aceTyp();
				memObj.aceObj[aceID] = new AceObj({
					"aceID" : aceID,
					"status" : "waiting",
					"command" : "com"
				}, memObj.items[aceID]);
			}
			if (!callObj.command || callObj.command == "com") { callObj.command = "get"; }
			comm.aceCall({
				"command" : "get",
				"aceID" : aceID,
				"caller" : memObj.aceObj[aceID]  // Fix. Pass callBack to handle latency.
			});
			memObj.tempIDs[aceID] = null;  // Fix? Address duplicates only on collision rather than here?
			return memObj.aceObj[aceID];
		}
		
		
		// Cycles through all of the AceObj items for aceID and performs an ace() call on their aceID's to instantiate those not already loaded.
		function loadCall(aceID) {
			// Fix. This has been transitioned directly into the AceObj.
			// if (!aceID) { return; }
			// var items = memObj.items[aceID],
				// itemName = null,
				// itemObj = null,
				// subName = null,
				// subItem = null;
			// itemObj = 
			// for (itemName in items["ext"]) {
				// _ace(item);
				// _ace(memObj.items[aceID]["ext"][item]);
			// }
			// for (item in memObj.items[aceID]["asp"]) {
				// _ace(item);
				// _ace(memObj.items[aceID]["ext"][item]);
			// }
		}
		
		
		// Resolves a variable to a string output. Used to handle items that may be strings, aceID's, or even aceObjs.
		var toStr = this.toStr = function toStr(objStr) {
			if (!objStr) { 
				return null;
			} else if (_.isAceID(objStr)) {
				return toStr(_ace(objStr));
			} else if (_.isAceObj(objStr)) {
				return objStr.toStr();
			} else if (_.isString(objStr)) {
				return objStr;
			} else {
				return objStr.toString();  // Fix? Default to error, null, or other options?
			}
		}
		
		
		// Creates a new alias and propogates the call across this node.
		var setAlias = this.setAlias = function AceData_setAlias(alias, referTo) {
			if (!_.isAceID(alias) || !_.isAceID(referTo)) { return; }
			var existing = getAlias(alias);  // Fix? Will resolve recursive links, which breaks simple check below...
			if (existing) {
				if (existing == referTo) {
					// Fix! Determine best behavior for recursive aliases.
					return true;  // Fix?
				} else {
					// Fix! Handle behavior if alias already exists towards aceID other than referTo.
				}
				return false;  // Fix?
			} else {
				memObj.alias[alias] = referTo;  // Fix. Error checking, handle latency, etc.
				return true;  // Fix?
			}
		}
		
		
		// Checks for an alias and propogates the call across this node. On latency, ...
		this.getAlias = getAlias; function getAlias(alias) {
			if (!_.isAceID(alias)) { return; }
			var resolved = memObj.alias[alias];
			return getAlias(resolved) || resolved;  // For recursive references.
			
			// if (resolved) {
				 // again = 
			// } else {
			
			// }
		}
		
		
		// Occurs when multiple instances of same AceObj exist, as when loaded through a aceCall(dat) call or due to changes made to temporary object during latency, etc. 
		function objCollision(callObj) {
			var aceID = callObj.aceID,
				items = callObj.items,
				newID = 'tmp-'+_AceData.nextAceID(),
				action = {  // Fix. Identify best protocols here.
					"act" : null,
					"state" : "sta-conflict",
					"var-memID" : aceID,
					"var-datID" : newID
				};
			
			
			_ace(aceID).alt(newID);
			memObj.tempIDs[newID] = aceID;
			ACE.ui({
				"act" : "msg",
				"msg" : "msg-aceObj-conflict",
				"choice" : {
					"btn-merge" : act,
					"btn-fork" : forkObj()
				}
				
			});
		}
		
		
		// Used on AceObj collision to merge multiple instances of same AceObj into single profile. 
		function mergeObjs(callObj) {
			if (!_.isAceID(callObj.aceID)) { return; }
			var aceID = callObj.aceID,
				realID = getAlias(aceID),
				thisObj = _ace(aceID),
				tmpObj = null, 
				alsArray = []; 
				
			//if (memObj.tempIDs) { ; }
		}
		
		
		// Forks an instance of an AceObj to be substituted for another under the context of a given entity.
		function forkObj(callObj) {
			var aceID = callObj.aceID,
				forkID = (callObj.forkID || _AceData.nextAceID());
		}
		
		
		// Registers an alternative to an AceObj as aceID and altID, and cross-links the two.
		function altObj(callObj) {
			var aceID = callObj.aceID,
				altID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
				
			if (memObj.aceObj[aceID]) {
				if (memObj.aceObj[altID]) {
					// Fix. Special handling?
				} else {
					newCall({
						"aceID" : altID,
						"typ" : aceID,
						"items" : callObj.items
					});
				}
			} else {
				// Fix. Handle this case.
			}
				
			thisObj = memObj.items[altID];
			if (thisObj) {
				if (!thisObj.itm) { thisObj.itm = {}; }
				if (!thisObj.itm.alt) { 
					thisObj.itm.alt = newLnk({
						
					}); 
				} else {
					// Fix. Add alt to existing lnk.
				}
			}
		}
		
		
		// Resolves *callObj* items to the target aceID if using alias IDs (Does not affect memory items). Can also pass an aceID directly as a string callObj if it is an aliasID.
		function alsToID(callObj) {  // Fix.
			//if (!memObj.aceObj[aceID]) { return callObj; }
			var alias = callObj.alias || callObj.als || null,
				aceID = callObj.aceID || alias;
			callObj.aceID = (getAlias(aceID) || getAlias(alias) || aceID);
			return callObj;
		}
		
		
		// Returns empty object template structure taken from the AceData instance abstraction. Attempts local action, propogating to the local db, and then sends to aceComm for central server transmission.  Will callBack to the instantiated object if latency exists.
		var aceTyp = this.aceTyp = function AceData_aceTyp(aceID) {
			if (!aceID || !_.isAceID(aceID)) { aceID = "typ-ent"; }  // Fix?
			var result = memObj.typ[aceID];
			if (_.isObject(result)) {
				return _.extend({}, result);
			} else if (_.isObject(memObj.aceObj[aceID]) && memObj.aceObj[aceID].ready()) {
				return _.extend({}, memObj.typ[aceID] = objStruct(memObj.items[altID]));
			} else {
				comm.ace(aceID, function(){  // Fix. Handle latency via callBack.
					
				});
				return _.extend({}, memObj.typ[aceID] = entityCore(aceID));  // Fix. Specific handling for waiting on response? Handle via collision?
			}
		}//AceData_aceTyp()
		
		
		// Special case for creating new aceType 'typ' classes.
		this.newTyp = function AceData_newTyp(aceID) {
			if (!aceID || !_.isAceID(aceID)) { return; }
			var newID = "typ-"+aceID;
			if (memObj.typ[aceID]) {
				return;  // Fix. Handle typ collisions.
			}
			_.extend({}, memObj.typ[newID] = objStruct(memObj.items[altID]));
			memObj.aceObj[aceID] = new AceObj({"typ":typ}, memObj.items[newID]);
			callObj.items = packItems(callObj.aceID);
			dbCall(callObj);
			comCall(callObj);
			return memObj.aceObj[callObj.aceID];
		}//AceData_newType()
		
		
		// Creates a new lnk object to connect an aspect of an AceObj to another.
		function newLnk(callObj) {
			var aceID = callObj.aceID,
				typLnk = callObj.typLnk,
				itmCat = (lnkCat(callObj) || "lnk"),
				lnkID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
		}
		
		
		// Adds an internl lnk reference to AceObj represented by lnkID for typLnk aspect of aceID.
		function lnkTo(callObj) {
			var aceID = callObj.aceID,
				typLnk = callObj.typLnk,
				itmCat = (lnkCat(callObj) || "lnk"),
				lnkID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
		}
		
		
		// Checks for the existence of a lnk referenced by typLnk and returns the itm-cat designation for it. Returns null if no lnk of type typLnk exists in any of the item categories.
		function lnkCat(callObj) {
			var typLnk = callObj.typLnk,
				itemsObj = memObj.items[callObj.aceID],
				chkArray = ["cor","typ","has","lnk"],  // Fix. Obtain programmatically.
				lnks = null;
			if (!typLnk || !_.isObject(itemsObj)) { return; }
			_.each(chkArray, function(cat,num) {  // Fix? Mechanism to address multiple instances in different categories?
				lnks = itemsObj[cat];
				if (_.isObject(lnks)) {
					_.each(lnks, function(lnk,typ) {
						if (typ == typLnk) { return cat; }
					});
				}
			});
		}
		
		
		// Parses through an object's structure and makes a copy of the keys but with null values.  Used by aceTyp.
		function objStruct(srcObj) {
			var newObj = {};
			_.each(srcObj, function(val,key) {
				if (_.isObject(val)) {
					if (key=="sec" || key=="lds") {  // Fix? Other special cases? Handle differently?
						newObj[key] = _.extend({}, val);
					} else {
						newObj[key] = objStruct(val);
					}
				} else if (_.isArray(val)) {
					newObj[key] = [];
				} else {
					newObj[key] = null;
				}
			});
			return newObj;
		}
		
		
		// Returns a copy of the core entity structure. In rare case where basic entity structure is not held in memory or local storage, the basic itm structure will be returned via this function and added to the central memObj.typ record.
		function entityCore() {  // Fix! Replace this and ensure new instance generated for waiting comm calls, later replaced during collision.
			if (!memObj.typ["typ-ent"]) { 
				memObj.typ["typ-ent"] = {  // Fix. Ensure object structure matches that in db.
					"cor":{"aceID":"typ-ent","typ":"typ-ent"},
					"als":["typ-ent"],"itm":{},"typ":{},"has":{},
					"sys":{"topSubID":"a"},
					"lnk":{"par":{},"chd":{},"fnd":{},"ctr":{},"pri":{},"deb":{},"tag":{}},
					"lds":{"gui":["cor","itm","typ","has",{"lnk":["chd","pri","deb","tag","par"]}]},
					"sec":{"read":"*","write":"*","block":null}
				};
			}
			// Fix? Check integrity of entity structure in memory?
			return _.extend({}, memObj.typ["typ-ent"]);
		}
		
		
		// Returns a converted version of live object items for aceObj with aceID as a JSON string for transmission to db and comm. Based on security settings, the string will also be encrypted through cryptObj for security.
		function packItems(aceID) {
			if (!memObj.items[aceID]) { return false; }  // Fix. error handling, notification.
			var items = JSON.stringify(memObj.items[aceID]),
				security = memObj.items[aceID].sec["read"];  // Fix. Establish security protol standard.
			if (security && security != "*") {  // Fix. Handle most effectively, Establish security protol keywords, etc.
				items = cryptObj.encrypt(items, aceID);
			}
			return items;
		}//packItems()
		
		
		// Converts an AceObj JSON string into the items entry for its aceID. If a key exists for the aceID in cryptObj, the string will also be decrypted first.
		function unpackItems(aceID, itemsString) {
			if (typeof(itemsString) != "string") { return false; }  // Fix. error handling, notification.
			if (cryptObj.checkID(aceID)) {  // If there is an encryption key for this aceID, decrypt it.
				itemsString = cryptObj.decrypt(itemsString, aceID);
			}
			return memObj.items[aceID] = JSON.parse(itemsString);  // Fix! Error checking, handling, aceID integrity, Verify whether we should set in memory, etc.
		}//unpackItems()
		
		
		// Performs alias resolution and surface-level safety checking operations for each of the various call types in relation to the user calling the function. Returns callObj, with modifications if appropriate.
		function safetyCheck(callObj) {
			// Fix! This currently does almost nothing.  May also want to include arguments.caller functionality from the point of the initial ace() call and pass into this to protect from malignant access.
			if (!callObj.typ) { callObj.typ = callObj.aceTyp || callObj.aceType || null; }
			callObj = alsToID(callObj);
			callObj.aceID = aceIDchop(callObj.aceID);
			var caller = callObj.caller,
				aceID = callObj.aceID,
				aceObj = callObj.aceObj,
				command = callObj.command;
			
			if (!command) { 
				// Fix. Behavior here?
			} else if (command == "get") {
				
			} else if (command == "set") {
				
			} else if (command == "new") {
				//if (!callObj.aceType) { callObj.aceType = 'typ-entity'; }  // Fix! Check whether this update is passed by reference to the callObj itself.
				
			} else if (command == "del") {
				
			} else if (command == "dat") {  // Fix? May never call this from here.
				
			} else {
				// Fix! Abort or correct.
			}
			
			if (typeOf(aceObj) == 'object') {  // Fix? May no longer be relevant. Used to designate an aceObj as the specific caller for safety.
				if (!aceObj.aceType()) { callObj.aceObj = null; }  // Fix. Tighten this.
			}
			
			return callObj;
		}//safetyCheck()
		
		
		// Checks user-specific access privilages for the entity represented by aceID, accounting for the calling function and command.
		function securityCheck(aceID, caller, command) {
			var userID = ACE.loggedIn();
			if (!userID) { 
				// Fix!
			}
			return true;  // Fix! This currently does nothing!
		}
		
		
		// Returns the combined userName and password as an encrypted hash.  Used to check against logins and other security encrypted functions.
		function getUserHash(userID) {
			var caller = getUserHash.caller;
			if (!securityCheck(userID, caller, "getUserHash")) { return false; }
			var userItems = memObj.items[userID];
			return CryptoJS.SHA256(userItems.userName+userItems.userPass);
		}
		
		
		// Used during response calls to load data into the aceData object. Passed into comm during instantiation to provide mechanism for handling latency.
		function aceDataCallBack(data) {
			var userID = ACE.loggedIn();
			if (!userID) { }  // Fix!
			if (aceCallBack.caller != comm) { } // Fix. Test for all scenarios. Handle security actions and notification.
			return true;  // Fix! This currently does nothing!
		}
		
		
		// Used to obtain to the next step in the ACE ID sequence after aceID. If !aceID, returns the next aceID stored within the que of this AceAPI
		this.nextAceID = function AceData_nextAceID(aceID) {
			var aceObj = _AceData.ace(aceID);
			if (!aceObj) {
				aceID = ACE.loggedIn();
				aceObj = _AceData.ace(aceID);
			}
			if (!aceObj) { return false; }  // Fix. Error handling, notification.
			return aceObj.nextAceID();
		}
		
		
		// Objects available for privilaged use to this object.
		
		
		// Security object, used to encrypt and decrypt data.
		function AceCryptObj() {
			var _AceCryptObj = this,
				//encryptionStack = {},  // Fix? This was originally used in conjunction with salt values and the userHash, but was dropped due to CryptoJS internally generating salts automatically.
				keyRing = {},
				log = [];
			
			function initialize() {
				var userID = ACE.loggedIn(), 
					userHash,
					result;
				if (!userID) { return; }  // Fix! Security handling, alert.
				userHash = getUserHash(userID);
				result = db.aceCall({  // Save pertinent objects to local db to secure AceCryptObj items.
					"command" : "get",
					"key" : "sys-AceCryptObj"
				});
				if (!result) { return false; }  // Fix. Error handling, notification alert for cases where existing obj structure is expected.
				result = CryptoJS.AES.decrypt(result, CryptoJS.SHA256(userHash).toString(CryptoJS.enc.Base64));
				if (result) {  // Fix? Explicitly convert to string if necessary. 
					result = JSON.parse(result);
					if (typeOf(result) == "array") {  // Fix? May want to store these as object rather than array?
						//encryptionStack = result[0];  // Fix. Remove this if not needed. See object vars above.
						keyRing = result[0];
						log = result[1];
					}
				}
			}
			
			// Encrypts data to be sent to processes. callKey is used to reference the encrypted data later, so should be unique and stored by entity intended for future access.
			this.encrypt = function encrypt(item, callKey) {
				var cryptStart = Date.now(),
					userID = ACE.loggedIn(),
					result = null;
				if (!userID) { return; }  // Fix! Security handling, alert.
				if (typeOf(item) != "string") { item = JSON.stringify(item); }  // Fix? Handle differently?
				if (keyRing.callKey) {
					// Fix! Handle case when callKey already exists for encrypted data.
				}
				keyRing.callKey = randString()+cryptStart;
				result = CryptoJS.AES.encrypt(item, keyRing.callKey);  // Fix? This originally used a salt, but it seems that CryptoJS.AES.encrypt does this automatically? Check to ensure this is true.
				// Fix? Originally also operated on encryptionStack, removed due to above. See obj vars.
				log.push({
					"dateTime" : cryptStart,
					"userID" : userID,
					"command" : "encrypt",
					"callKey" : "callKey",
					"timeSpent" : (cryptStart - Date.now())
				});
				db.aceCall({  // Save pertinent objects to local db to secure AceCryptObj items.
					"command" : "set",
					"key" : "sys-AceCryptObj",
					"value" : CryptoJS.AES.encrypt(JSON.stringify([keyRing,log]), CryptoJS.SHA256(getUserHash(userID)).toString(CryptoJS.enc.Base64))  // Fix? Originally had encryptionStack as 1st item in array. See obj vars above.
				});
				return result;
			}
						
			// Decrypts data returned from processes.
			this.decrypt = function decrypt(item, callKey) {
				var cryptStart = Date.now(),
					userID = ACE.loggedIn(),
					result = null;
				if (!userID) { return; }  // Fix! Security handling, alert.
				if (!keyRing.callKey) { return; }  // Fix! Security handling, alert.
				result = CryptoJS.AES.decrypt(item, keyRing.callKey);  // Fix! Cleanup and integrity checks.
				log.push({
					"dateTime" : cryptStart,
					"userID" : userID,
					"command" : "decrypt",
					"callKey" : "callKey",
					"success" : ((result)?(true):(false)),  // Fix? Ensure result !true when invalid pass.
					"timeSpent" : (cryptStart - Date.now())
				});
				if (result) {  // Fix. Further checking and ensure this should be parsed to an object in all cases.
					return JSON.parse(result);  // Fix? Explicitly convert to string if necessary. 
				}
			}
			
			initialize();
		};//AceCryptObj
		
		
		// An abstraction used for local database access.
		function DatabaseObj() {
			var _DatabaseObj = this;
			//log(_DatabaseObj, "_DatabaseObj");
			var dbID;  // The ID for this Database, if applicable.
			var dbAPI = new LocalDbApi();  // An interface used to abstract single-item data calls to the local database.
			var isLoaded;  // Bool, indicates whether this Database loaded successfully or not.
			var dbName;  // The name of the database to load objects from.
			var dbHost;  // The host location of this database.
			var dbDescription;  // The Description property for this database.
			
			var db = {  // The data structure mirroring the local db for quicker access.
				"aceID" : {  // Contains all aceIDs stored locally, and links them to the full name of the table they are stored in.
					"aceID" : "tableName"
				},
				"alias" : {  // Contains all Alias aceIDs stored locally that refer to a System aceID.
					"aliasID" : "aceID"
				},
				"tables" : {
					"tableName" : "tableTypeCode"
				},
				"dbStruct" : {  // The core database functionality used for object referencing and abstraction. 
					"pri" : {  // Primary tables used to register inique primary keys and inherent singular properties.
						"tableName" : "objName"
					},
					"ref" : {  // Used to associate tables in lists.
						"tableName" : "objName"
					},
					"typ" : {  // All tables which identify various singular categories that can be associated with _pri items.
						"tableName" : "objName"
					},
					"lnk" : {  // All tables tracking abstract links between items.
						"tableName" : "objName"
					},
					"tag" : {  // All tables containing specific entity or aspect associated tags
						"tableName" : "objName"
					},
					"log" : {  // All tables used for storing system activity.
						"tableName" : "objName"
					},
					"mod" : {  // All tables used for tracking individual changes made to entries in other tables.
						"tableName" : "objName"
					},
					"bad" : {  // Tables used for tracking bad links or otherwise corrupt data.
						"tableName" : "objName"
					}
				}
			}
		
		
			function initialize() {
				// Fix.  The following are remnants from the earlier approach of saving db objects as the entire data block in a single entry.
				// if (!loadTable("aceID")) { writeLists(db); }
				// loadLocalDb();
			}
			
			
			// Writes the default contents of the empty db object to the local database.
			function writeLists() {
				for (var tableName in db) {
					var result = dbAPI.aceCall({
						"command" : "new",
						"key" : tableName,
						"value" : {}
					});
				}
			}
			
			
			// Loads the local database into memory. Overwrites any existing object data so use carefully.
			function loadLocalDb() {  
				return;  // Fix!
				for (var tableName in db) {
					var result = dbAPI.aceCall({
						"command" : "new",
						"key" : tableName,
						"value" : {}
					});
				}
			}
			
			
			// Writes the table hash in the db object to the local database.
			function writeTable(tableName) {
				if (!db[tableName]) { return; }
				var result = dbAPI.aceCall({
					"command" : "set",
					"key" : tableName,
					"value" : db[tableName]
				});
			}
			
			
			// Loads a new copy of table tableName from the local database into memory. Ignores request if that table does not exist in db.
			function loadTable(tableName) {
				var tableObj = dbAPI.aceCall({
					"command" : "get",
					"key" : tableName
				});
				return;  // Fix!
			}
			
			
			// Adds a priRoot name to those being tracked by this ACE instance. Can be single value, an array of values, or a proposal to change the root name of an existing priRoot using {"priExisting":"priProposed", ...}
			function priAdd(priRoot) {
				var varTyp = typeOf(priRoot);
				if (varTyp == 'string') {
					if (priGet()) { return; }  // Fix. Error handling and notification.
				} else if (varTyp == 'array') {
					for (var key in writeObj) {
						priAdd(writeObj[key]);  // Fix. Error handling and notification.
					}
				} else if (varTyp == 'object') {
					for (var key in writeObj) {
						// Fix!
					}
				} else { 
					return;  // Fix. Error handling.
				}
			}
			
			function priGet(priRoot) {
				
			}
			
			
			// Serves as a local database abstraction object used to decouple the db API from its implementation. Due to cross-browser db limitations, we are writing entire contents of a table to the database, not individual objects. Changes are made to the db object, then store the entire table.
			function LocalDbApi(localDbType) {
				var thisDb = null;  // The interface to the actual mechanism used for storing data locally.
				
				if (!localDbType) {
					if (typeof appAPI != 'undefined') {  // This is the API set internally by CrossRider if activated.
						localDbType = "CrossRider";
					} else if (localStorage) {  // Checks for the native localStorage mechanism.
						localDbType = "localStorage";
					} else {  // Ah, that's not great...
						// Fix. Handle for obsolete browsers.
					}
				}
				
				if (localDbType == "CrossRider") {
					thisDb = new CrossRiderDb();
				} else if (localDbType == "localStorage") {
					thisDb = new localStorageDb();
				} else if (localDbType == "sqlLite") {
					thisDb = new SqlLiteDb();  // Fix? This has currently been dropped from the w3c specification.
				}
				//log(thisDb, "thisDb");
				
				
				// Used to call the localStorage abstraction for a single AceObj. 
				this.aceCall = function localDbApi_aceCall(callObj) {
					if (typeOf(callObj) != 'object') { return; }  // || (!safetyCheck(callObj))) { return; }  // Fix? No checks for safety, etc.  Fix. Error handling.
					var command = callObj.command,
						key = aceIDchop(callObj.aceID),
						value = callObj.items;
					
					if (!command || !key) { 
						return null;  // Fix? Behavior here?
					} else if (command == "get") {							// command == "get"
						if (key == "*") { command = "all"; }  // Fix?
					} else if (command == "set") {							// command == "set"
						// Fix? Special handling?
					} else if (command == "new") {							// command == "new"
						// Fix? Special handling?
					} else if (command == "del") {							// command == "del" 
						if (key == "*") { command = "clr"; }  // Fix?
					} else {
						return null;  // Fix. Error handling
					}
					return thisDb.aceCall({
						"command" : command,
						"key" : key,
						"value" : value
					});
				}//localDbApi_aceCall()
		
		
				
				// Following are abstract interfaces for supported database types.
				
				// Abstraction used to write simple key-value references to the local db, sandboxed for use in CrossRider extension applications. (http://crossrider.com)
				function CrossRiderDb() {
					this.aceCall = function CrossRiderDb_aceCall(callObj) { 
						if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
						var command = callObj.command;
						var key = callObj.key;
						var value = callObj.value;
						if (command == "get") { return appAPI.db.get(key); }
						if (command == "set") { return appAPI.db.set(key, value); }
						if (command == "new") {	return appAPI.db.set(key, value); }
						if (command == "del") {	return appAPI.db.remove(key); }
						if (command == "clr") { return appAPI.db.removeAll(); }  // Erases the entire db. Fix. Safety mechanisms?
						if (command == "all") { return appAPI.db.list(); }
					}
				}
				
				// Abstraction for the standard localStorage object. This should be reliable for non-extension use.
				function localStorageDb() {
					this.aceCall = function localStorageDb_aceCall(callObj) { 
						if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
						var command = callObj.command;
						var key = callObj.key;
						var value = callObj.value;
						if (command == "get") { return localStorage.getItem(key); }
						if (command == "set") { return localStorage.setItem(key, value); }
						if (command == "new") {	return localStorage.setItem(key, value); }
						if (command == "del") {	return localStorage.removeItem(key); }
						if (command == "clr") { return localStorage.clear(); }  // Erases the entire db. Fix. Safety mechanisms?
						if (command == "all") {	return getAllItems(); }
						/*  // Fix? Perform JSON operations here so as to unify handling of calls and results format? If better performance from keeping as string, then remove this code.
						if (command == "get") { 
							command = localStorage.getItem(key);
							return JSON.parse(command); 
						} else if (command == "set") { 
							return localStorage.setItem(key, JSON.stringify(value)); 
						} else if (command == "new") { 
							return localStorage.setItem(key, JSON.stringify(value)); 
						} else if (command == "del") { 
							return JSON.parse(localStorage.removeItem(key)); 
						}*/
					}
					
					function getAllItems() {
						var tblArray = [];
						for (var tblName in localStorage) { tblArray.push(tblName); }  // Fix? Is this valid?
						return tblArray; 
					}
				}
				
				// Abstraction for the sqlLite db, which has been removed from the w3c html5 specification but comes standard on some browsers.
				function SqlLiteDb() {
					this.aceCall = function SqlLiteDb_aceCall(callObj) { 
						// Fix. Implement?
					}
				}
				
			}//LocalDbApi
			
			
			// Public methods
			
			
			// Executes command and returns results from single calls to the local database.
			this.aceCall = function DatabaseObj_aceCall(callObj) {  // Fix! Determine best behavior for handling this callObj structure.
				if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
				var key = callObj.aceID || callObj.key,  // Fix?
					command = callObj.command,
					result = null;
				
				//if (isTyp(key)) { callObj["forceString"] = true; }  // Fix? Handle this mechanism in best way possible.  // Fix? Removed 
				callObj["forceString"] = false;  // Fix. Determine conclusively whether any advantage exists for keeping typ as JSON form.
				callObj.key = key;  // Fix? May not be necessary if strict in callObj.
				result = dbAPI.aceCall(callObj);
				if (typeof(result) == 'string') {  // Fix? Handle return type checking and conversion mechanism in best way possible. May want to internalize this to dbAPI.
					if (!callObj.forceString) { result = JSON.parse(result); }
				} else if (typeOf(result) == 'object') {
					//if (callObj.forceString) { result = JSON.stringify(result); }  // Fix. Determine conclusively whether any advantage exists for keeping typ as JSON form.
				} else {
					result = null;  // Fix. Error handling, notification. Other results?
				}
				return result;
			}
			
			
			// Calls basic single aceID get call to db.
			this.ace = function DatabaseObj_ace(aceID) {
				if (typeof(aceID) != 'string') { return null; }  // Fix.  Error handling, notification.
				return _DatabaseObj.aceCall({
					"command" : "get",
					"key" : aceID
				});
			}
			
			
		}//DatabaseObj
	
		
	}//AceData
		
	
	// The generic base object used to instantiate all other objects used in the ACE system. callObj can represent a single aceID to load the AceObj from. If callObj is an array, this aceObj will function as a container holding aceIDs passed in that array.
	function AceObj(callObj, items) {  // Fix! This all needs rebuilt. 
		var _AceObj = this,
			_ACE = ACE,  // A local instance of the closure-held ACE var from ace(). Referenced here for clarity and efficiency.
			owner = AceObj.caller;  // Used to restrict calls to this AceObj's functions.
		var aceID = null,
			typeChk = typeOf(callObj),
			loadDepth = 1;
		if (typeChk == "string") {  // Fix? May want to always ensure callObj is an object?
			aceID = aceIDchop(callObj);  // new String(callObj);  // Fix. May not be necessary to duplicate this. Check whether simple string will track by value rather than by reference for all environments.
		} else if (typeChk == "object") {
			aceID = ((typeof(callObj.aceID)=="string")?(aceIDchop(callObj.aceID)):(null));
			if (callObj.loadDepth) { loadDepth = callObj.loadDepth; }
			_AceObj.typ = items.cor.typ = callObj.typ;  // Fix.
		}
		_AceObj.aceID = aceID;  // Used for loose checking.
		
		
		var objItems = {  // Items relevant only to the instantiated object. Will not be saved to memory.
			"aceID" : aceID,
			"status" : "initializing",  // 'loaded', 'bad', 'new', 'waiting', 'offline', 'container', 'mismatch', 'sys', etc. On loading, this status will be modified by various events.
			"contains" : [],  // Used to store application-associated aceIDs and their representative aceObj's if being used as a container.
			"count" : 0,  // If being used as a container, this will store a running count of "contains".
			"aceObjs" : { }, // All aceObj items linked to by this aceObj, referenced by their aceID. Used to quicken resolution calls to aceObjs held in the primary memObj.
			"modified" : false
		};
		
		// DO NOT RELY ON THIS STRUCTURE!  Shifted the following into data format, leaving here for reference.  
		// items["als"] = [];  // Any alias IDs that have been registered to represent this entity. Highest priority will have a lower index number, eg alias[0] is default.
		// items["cor"] = {  // Core individual properties associated with all ace entities, and established internally by system. Fix? Change name of property set from 'cor'?
			// "aceID" : aceID,
			// "name" : "",
			// "description" : "",
			// "typ" : "typ-entity",  // The aceID for the primary class of entity this AceObj falls under. Defaults to 'typ-entity'.
			// "value" : 0
		// };
		// items["sys"] = {  // System properties used internally by ACE for this aceType, not typically visible to an application interface, and that don't resolve as individual entities.
			// "topSubID" : "a",
			// "created" : null,
			// "modified" : null
		// },
		// items["itm"] = {  // Additional properties specific to this aceType that don't resolve as individual entities.
			
		// },
		// items["typ"] = {  // Additional layers of aspects that extend the entity (is-a relationships).
			// "typID" : "aceID"  // typID references the typ, with the particulars of this specific entity contained in the structured object it references.
		// };
		// items["has"] = {  // Sub-components of this entity that resolve to an aceID. (has-a relationships).
			// "typID" : "aceID"  // typID references the typ, with the particulars of this specific entity contained in the structured object it references. Multiple aspects are contained in a space-separated string rather than an object reference.
		// };
		// items["lnk"] = {  // All symbolic abstractions connecting this entity to other entities. Each key:value pair will stand as typLnk:{aceID:{lnkProp:lnkVal,...},...} as applicable. Because of the naming scheme for reserved types, the 'lnk-' segment of the aceID as lnk-name will be removed and the remainder will be used to reference the item in the containing list
			// "linkName" : { "aceID":"lnkID" },  // Example of link formatting.
			// "parents" : {},  // Parent entities for this entity. 
			// "children" : {},  // Child entities for this entity.
			// "founders" : {},  // Founding member(s) for this entity.
			// "contributions" : {},  // All recorded contributions for this entity.
			// "principles" : {},  // All principles adopted by this entity as goals.
			// "debates" : {},  // All debates that focus on an aspect of this entity.
			// "tags" : {},  // Any tags associated with this entity.
			// "lists" : {},  // Used to store simple lists of item references
		// };
		// items["sec"] = {  // All access privileges information for this entity.  // Fix! Identify best method and protocol for this.
			// "read" : "*",  // Fix. Establish default based on prefs.
			// "write" : [aceID],
			// "block" : [],
		// };
		// items["lds"] = {  // Fix.  Tracks which items to load for this entity automatically using a numerical priority system. Theoretically contains all lnk tables that apply such as ancestor or descendent but they are set at a low priority so that this entity is aware of them but does not waste resources by loading them into memory unless specificically directed to.
			// "all" : ["cor","itm","typ","has",{"lnk":["children","principles","debates","tags","parents"]}],
			// "gui" : ["cor","itm","typ","has",{"lnk":["children","principles","debates","tags","parents"]}],
			// "parent" : 1,
			// "child" : 1
		// };
		
		
		// Initializes the object.
		function initialize() {
			
			return _AceObj.state = objItems.status = "loaded";  // Fix. Integrate new structure.
			
			
			var status = null;
			
			if (typeChk == 'object') {  // Used for passing callObjs directly into aceObjs.
				_AceObj.load(callObj);
				_AceObj.state = objItems.status = "initialized";
			} else if (!aceID || aceID == "_system_" || status == "sys") {  // Fix. This may now be pointless. Determine best reaction.
				aceID = "_system_";  // Fix?
				status = "sys";
				// Fix.  Complete this.
			} else if (status == "bad") {
				// Fix. Complete this.
			} else {
				_AceObj.state = objItems.status = "bad";  // Fix. Error handling, default behavior.
			}
		}
		
		
		// This function is passed into comm callObjs as 'caller', to be executed by comm on receipt of a reply object.
		var caller = (function returnCall(callObj) {  // Fix. Closure would be passed into comm with this aceObj scope, is this a security vulnerability?
			return 1;  // Fix!  This all needs worked through. Should probably put in top-level ace() scope and record calls at each step in process.
			//var callTo = callObj.caller;
			if (callObj.msg) {
				
			}
			if (callObj.aceID) {
				
			}
			if (callObj.aceObj) {
				
			}
			
		})();
		
		
		// Performs a security check for this AceObj for the user logged in and ensuring the call is not being instantiated maliciously from some external source. Trims items from props that this user is not authorized for and returns true if access is granted overall.
		function securityCheck(userID, props) {
			return true;  // Fix! Currently does nothing. 
		}
		
		
		// Used to pass a restricted callObj directly into this object.
		function AceObj_call(callObj) {  // Fix? Better way to achieve this functionality? 
			
			// if (!callObj = safetyCheck(callObj)) {
				// return;  // Fix. Error handling, security.
			// }
		}
		
		// Splits a char-divided string itemStr into a sub-object structure.
		function splitItemStr(itemStr, subChar) {
			if (!subChar) { subChar = "."; }  // Fix. Settle on best char for symbolic sub-obj traversal through strings.
			var keyObj = {}, tmpObj = keyObj,
				propArray = itemStr.split(subChar),
				len = propArray.length;
			for (var i=len; i; i--) { 
				tmpObj[propArray[len-i]] = {};
				tmpObj = tmpObj[propArray[len-i]];
			}
			return keyObj;
		}
		
		// This will return an AceObj represented by aceID (Essentially just a shortcut to ACE.ace() unless reference exists for aceID in objItems["aceObjs"]. loadDepth sets the number of peripheral load steps to take in loading lnk and sub-entities.
		var _ace = this.ace = function AceObj_ace(aceID, loadDepth) {
			if (objItems["aceObjs"][aceID]) { return objItems["aceObjs"][aceID]; }  // Fix? Security and better checking?
			return ACE.ace(aceID, loadDepth);
			// if (!aceObj.aceType(aceType)) {   // Fix?  Is this useful?
				// objItems.status = "mismatch";
				// // Fix. Determine best behavior here.  Clear items?
			// }
		}
		
		// Used to get internal properties for this entity.
		this.get = function AceObj_get(prop) {
			if (!items || !items.cor || !items.cor.aceID || !securityCheck(items.cor.aceID, prop)) { return false; }
			if (!prop) { prop == "gui"; }  // Fix. User and context-established default.
			if (typeof(prop) == "string") {
				if (!prop || prop == "*") {  // Fix? Ideal syntax.
					return $.extend(true, {}, items); 
				} else if (prop.indexOf(".") >= 1) {  // Fix. Settle on best char for symbolic sub-obj traversal through strings.
					return getItems(splitItemStr(prop), items);
				} else if (items.lds[prop]) {  // Fix? Ideal mechanism for achieving this.
					return getItems(items.lds[prop], items);
				} else if (items[prop]) {
						return getItems(prop, items);
				} else {
					if (items.cor[prop]) {
						return items.cor[prop];
					} else if (items.itm[prop]) {
						return items.itm[prop];
					} else if (items.typ[prop]) {
						return items.typ[prop];
					} else if (items.has[prop]) {
						return items.has[prop];
					} else if (items.lnk[prop]) {
						return items.lnk[prop];
					} else {
						return null;  // Fix. Error handling, notification.
					}
				}
			} else if (typeOf(prop) == "object") {
				return getItems(prop, items);
				
				if (Object.keys(prop).length == 1) {
					return $.extend(true, prop, items);
				} else {
					return $.extend(true, prop, items[prop]);
				}
			}
			
			var keys = Object.keys(items);
			// Fix. Perform also for objItems.
			log("AceObj.get() called for entity with aceID "+aceID);
		}
		
		// Returns the object values in valsObj that match up with the object property structure of keysObj. subStr can be used to specify the object sub-key path, with property names separated by strDiv which defaults to "|".  // Fix? May want better method for this?
		function getItems(keysObj, valsObj, strDiv) {
			var key = "",
				substr = "",
				tmpObj = {},
				strArray = null;
			
			if (!valsObj) { return; }
			key = typeOf(keysObj);
			if (key == "string") {
				if (keysObj == "*") {  // Fix? Do we ever want this?
					return $.extend(true, {}, valsObj);  // Fix? Just keep this internal?
				} else if (valsObj[keysObj]) { 
					return $.extend(true, {}, valsObj[keysObj]);  // Fix? Keep this internal?  // getItems(Object.keys(valsObj), valsObj);  // tmpObj[keysObj] = valsObj[keysObj];
				} else {
					return;  // Fix. Error handling, notification.
				}
			} else if (key == "array") {
				for (var i=keysObj.length; i; i--) {
					key = keysObj[i-1];
					substr = typeOf(key);
					if (substr == "object") {
						for (substr in key) { tmpObj[substr] = getItems(key[substr], valsObj[substr]); }
					} else if (substr == "string") {
						tmpObj[key] = $.extend(true, {}, valsObj[key]);  // Fix? Keep this internal?
					} else {
						// Fix. Error handling, notification.
					}
				}
				return tmpObj;
			} else if (key == "object") {
				for (key in keysObj) {
					substr = typeOf(keysObj[key]);
					if (substr == "object" || substr == "array") {
						tmpObj[key] = getItems(keysObj[key], valsObj[key]);
					} else if (substr == "string") {
						tmpObj[key] = $.extend(true, {}, valsObj[key]);  // Fix? Keep this internal?
					} else {
						// Fix. Error handling, notification.
					}
				}
				return tmpObj;
			} else {
				return;  // Fix. Error handling, notification.
			}
			
			// if (typeOf(keysObj) != "object") { return keysObj; }  // Fix? Return null? When would this happen?
			// if (!strDiv) { strDiv = ":"; }  // Fix? Best char for this.
			// if (!subStr) { subStr = ""; }
			// strArray = subStr.split(strDiv);
			// for (var i=strArray.length; i; i--) { tmpObj = tmpObj[strArray[i-1]] = {}; }  // Fix.	
		}
		
		// Returns the most basic text form of this AceObj.
		this.toStr = function AceObj_toStr(itemName) {
			var str = items.itm.str;
			if (!itemName) {
				if (str && _.isString(str)) { return str; }  // Fix. Determine best way to do this.
				str = _ACE.toStr(items.cor.description);
				if (str) { return str; }
				str = _ACE.toStr(items.cor.name);
				if (str) { return str; }
			} else {
				str = _AceObj.get(itemName);
				if (str) {
					return _ACE.toStr(str);
				} else {
					// Fix? Take other action?
				}
			}
			return null;  // Fix. Alert, error handling. Fix? Default return val, etc?
			//return _AceObj.get(itemName).toStr();  // Fix. Ensure best outcome.
		}
		
		// Returns an html form of this AceObj. Experimental.
		this.toHtm = function AceObj_toHtm(itemName) {
			if (!itemName) {
				return items.itm.htm || null;  // Fix. Determine best way to do this.
			}
		}
		
		// Used to set internal properties for this entity. propObj contains key-val pairs as {"name":value, "lnk-child_{aceID}":value, ...} or a string or array to be set equal to value.
		this.set = function AceObj_set(propObj, value) {
			if (!securityCheck(items.cor.aceID)) { return false; }
			
			var keys = Object.keys(items);
			objItems.modified = true;
			log("AceObj.set() called for entity with aceID "+aceID);
		}
		
		// Checks for the existence of itemName in the pref obj of this aceObj. Returns the category name if it does exist, and null if not.
		function segmentItem(itemName) {  // Fix! Finish converting this.
			if (typeof(itemName) != 'string') { return false; }  // Fix. Error handling.
			var segs = itemName.split("_");
			if (segs[0] == 'ace') { segs.shift(); }  // segs.splice(0, 1); }
			segs = segs[0].split("-");
			
			for (var item in items) {
				if (item == segs[0]) {  // If the first segment matches an items category
				
				}
				var itemsArray = pvt.prefs[item];
				for (var catPrefName in itemsArray) {
					if (catPrefName == itemName) { 
						return item;
					}
				}
			}
		}
		
		// Sends a request to create a new Entity of type aceType, using a sub-alias of this Entity's aceID by default. If rootAlias is defined, it will return alias[0], or that alias if set for this entity, or default to the userID. 
		this.new = function AceObj_new(aceType, rootAlias) {
			return;  // Fix! This is all under the old structure.
			
			var aceID = null,
				aceObj = null;
			var result = _AceData.aceType(aceType, _AceObj);
			if (!result || rootAlias == "user" || rootAlias == "userID") {
				aceID = _AceData.nextAceID();
			} else {
				aceID = _AceObj.nextAceID(rootAlias);
			}
			aceObj = new AceObj(aceType, aceID);
			if (result) {
				// Fix.  Compare the following results to see which is faster (Holding template as string and instantiating, or copying the object held in memory)
				//items = memObj.items[aceID] = jQuery.extend(true, {}, result);  // Make a copy of the template for this entity aceType.
				newItems = memObj.items[aceID] = JSON.parse(result);
				_AceObj.state = objItems.status = "new";
			} else {
				_AceObj.state = objItems.status = "waiting";
			}
			//items.als.push(aceID);
			//items.cor.aceID = aceID;
			memObj.aceObj[aceID] = _AceObj;
			
			var callObj = {
				"command" : "new",
				"alias" : aceID,
				"aceType" : aceType,
				"items" : items,
				"caller" : caller,
			};
			db.aceCall(callObj);
			comm.aceCall(callObj);
			_AceObj.state = objItems.status = callObj.status;  // Fix? Address conflicts?
			return _AceObj;
		}
		
		// Sends a request to delete this entity from public reference. The associated history remains in the core dbs, but from an access perspective, this entity will no longer be available.
		this.del = function AceObj_del() {
			log("AceObj.del() called for entity with aceID "+aceID);
		}
		
		// Performs the operation passed in doFunc on each item under the focus specifier. If !focus, defaults to applying only to this AceObj; focus can be a space-separated string with identifiers such as "all ext asp lst tag lnk" and any "lnk" types will be handled directly under that item using its lnk-typ shorthand. 
		this.do = function AceObj_do(doFunc, focus) {
			if (!focus) { focus = "this"; }  // Fix?
			if (typeof(focus) != "string") { return; }  // Fix. Error, notification, handle differently?
		}
		
		// 
		this.act = function AceObj_act() {
			
		}
		
		// Specialized to return items accessible in the given context. Defaults to "gui"
		this.itm = function AceObj_itm(callObj) {
			// Fix! Complete this.
		}
		
		// Automatically creates a parent-child relationship between this entity and another existing or newly created entity.
		this.add = function AceObj_add() {
			if (!rootAlias) { rootAlias = als[0] || ACE.loggedIn(); }  // Fix? May need to remove auto-execute from ACE.loggedIn / define as getter, etc.
			log("AceObj.add() called for entity with aceID "+aceID);
		}
		
		this.rem = function AceObj_rem() {
			log("AceObj.rem() called for entity with aceID "+aceID);
		}
		
		this.lnk = function AceObj_lnk() {
			log("AceObj.lnk() called for entity with aceID "+aceID);
		}
		
		// Creates a new typ instance for this entity and performs necessary linking operations. 
		this.ext = function AceObj_ext() {
			log("AceObj.lnk() called for entity with aceID "+aceID);
		}
		
		// Registers an alternative version of this AceObj. 
		this.alt = function AceObj_alt(altID) {
			if (false) {
				
			}
		}
		
		// Loads the most current version of this entity, or if called by aceData can be used to assign new items to this object.
		this.load = function AceObj_load(callObj) {
			var caller = AceObj_load.caller;
			if (!callObj) {
				var itemName = null,
					itemObj = null,
					subName = null,
					subItem = null,
					i=0, len = null;
					
				for (itemName in items["typ"]) {
					_ace(itemName);
					_ace(items["typ"][itemName], loadDepth);
				}
				
				for (itemName in items["has"]) {
					_ace(itemName);
					itemObj = items["has"][itemName];
					for (i=itemObj.length; i; i--) {
						_ace(itemObj[i-1], loadDepth);
					}
				}
				
				if (loadDepth--) {  // Load links if loadDepth indicates appropriate.
					for (itemName in items["lnk"]) {
						itemObj = items["lnk"][itemName];
						for (subName in itemObj) {
							_ace(subName, loadDepth);
							_ace(itemObj[subName]);
						}
					}
				}
				
				// Fix. Include other items...
				
			} else {  // Fix. Determine best behavior for loading, if we even want this here.
				if ((caller != _AceObj) && (caller != owner)) { return; } // Fix! This may not be helpful (nor reliable)...
				// objItems.modified = false;
			}
			
			
		}
		
		// Saves the characteristics of this entity instance to memory and propogates the image to the core dbs.
		this.save = function AceObj_save() {
			if (!objItems.modified) { return; }  // Fix! Ensure this is implemented well!
			ACE.aceCall({
				"command" : "set",
				"aceID" : aceID,
				"items" : JSON.stringify(items),
			});
			objItems.modified = false;
			return _AceObj;  // Fix? Returning _AceObj makes statements chainable, but may want optimal way to verify?
		}
		
		// Used to propose a new alias for this entity or return an array of existing aliases if called with no arguments. command can be "to", "check", "from", "del", defaults to "to". 
		this.als = this.alias = function AceObj_alias(alsID, command) {  // Fix. 
			var alsArray = items.als;
			if (!command && !command) { return ((_.isArray(alsArray))?(alsArray.slice(0)):([])); }  // Fix?
			if (!command) { command = "to"; }
			if (!alsID || alsID == "auto") { alsID = _AceObj.nextAceID(); }
			if (!_isArray(alsArray)) { alsArray = items.als = []; }
			if (command == "to") {
				alsArray.push(alsID);  // Fix. Sorting order?
				if (!ACE.als(alsID)) { ACE.als(alsID, aceID); }
			} else if (command == "check") {
				return (_.indexOf(alsArray, alsID)) ? (true) : (false);
			} else if (command == "del") {
				// Fix. Handle this. Should never actually remove an alias, as it's useful for obscure references. (Unless replacing for new requested use?)
			} else if (command == "from") {
				// Fix. Handle options. Move this object to the new position? Remove it? 
			} else {
				// Fix. Error handling, notification.
			}
		}
		
		// Returns the aceID of this entity.
		this.aceID = function AceObj_aceID() {  // Fix? Establish as getter before altering that as a method? 
			return objItems.aceID = items.cor.aceID;  // Fix? Security check? Are there cases where this should be private?
		}
		
		// Returns the status of this AceObj.
		this.status = function AceObj_status() {  // Fix. Establish as frozen getter.
			return _AceObj.state = objItems.status;
		}
		
		// Returns boolean true if this AceObj has loaded successfully, false otherwise.
		this.ready = function AceObj_ready() {  // Fix. Establish as frozen getter.
			return (_AceObj.status() == "loaded") ? (true) : (false);
		}
		
		// Returns the primary aceType of this entity. If aceType is set it can be set to "all" which will return an array of all types, or it can be a single or space-separated string, in which case it will return false if this aceObj's aceType does not match one of thos in the string.
		this.aceType = function AceObj_aceType(aceType) {
			var objType = items.cor.typ;
			if (typeof(aceType) == "string") {
				if (aceType == "all") {  // Fix. Update function description.
					objType = [objType];
					_.each(items.typ, function(val,key) {
						objType.push(key);
					});
					return objType;
				} else {
					var types = aceType.split(" ");
					for (aceType in types) {  // Fix? Trace this to check for unwanted array props being included...
						if (objType == aceType) { return aceType; }
					}
					return false;
				}
			} else {
				return objType;  // Fix? Security check? Are there cases where this should be private?
			}
		}
		
		// Returns an incremented highest subID registered for this entity and replaces it for the new highest value.   If rootAlias is defined, it will return alias[0], or that alias if set for this entity.  Doesn't matter if the new AceID is actually used or not bc they are cheap.
		this.nextAceID = function AceObj_nextAceID(rootAlias) {
			var newAceID = null;
			if (newAceID) {  // Fix. (typeof(rootAlias) == 'string') && (items.als.length)) {  // Fix? Disabled this because of possible conflicts.
				rootAlias = ((items.als.indexOf(rootAlias))?(rootAlias):(items.als[0]));
			} else {
				rootAlias = items.cor.aceID;
			}
			items.sys.topSubAlias = ACE.nextAceID(items.sys.topSubAlias);
			newAceID = rootAlias+'_'+items.sys.topSubAlias;
			objItems.modified = true;
			return newAceID;
		}
		
		//log(this, "AceObj with aceID "+aceID);
		//log(ACE, "ACE from inside this AceObj");
		initialize();
	}//AceObj
	
	
	// Used for all communications with servers, other clients, and systems across network interfaces.
	function AceComm(aceDataCallBack) {
		_AceComm = this;
		var aceSrc = getSrcUrl();
		var connectionObj = {
			"connected" : null,
			"url" : aceSrc
		};
		var objIndex = {  // Tracks all loaded aceObjs that have sent calls to the server. In form { 'callTime+|+aceID' : aceObj }
			
		}
		var que = {  // Stores requests to be made to server and items returned but not loaded yet.
			"wait" : [  // a JSON containing callObjs that are to be sent to the server but in wait due to lack of connectivity or other cases. Ordered by time placed.
				
			],
			"out" : [  // a JSON containing callObjs that have been sent to the server, ordered by time placed.
				
			],
			"in" : [  // a JSON object containing returned aceObjs, to be sent to their callers.
				
			]
		};
		
		
		// Checks to see whether this is connected to a server.  
		this.isConnected = function AceComm_isConnected() {
			return (connectionObj["connected"]) ? (true) : (false);
		}
		
		
		// Used as the wrapper to make ajax calls to the ace server. callObj is a json object with properties matching those to be used in the server call url arguments.
		this.aceCall = function AceComm_aceCall(callObj) {
			ACE.markTime('aceCall()');
			if (!_AceComm.isConnected()) {
				callObj.status = "offline";
				// Fix!  Alert, logging, and storing data for future call, returning message to caller.
				que.wait.push(callObj);
				return; 
			}  
			if (typeOf(callObj) != 'object') { return; }  // Fix. Error handling.
			/*if (!callObj.caller) { return; }  // Fix. Error handling.
			var caller = callObj.caller;
			callObj.callType = callObj.callType || 'undefined';	*/
			var callString = "";  // JSON.stringify(callObj);
			console.log("AceComm_aceCall() called. callString: "+callString);
			for (key in callObj) {
				if (key) {
					// Fix? May want to address special behavior here.
				}
				callString += key + '=' + callObj[key] + '&'; 
			}
			var callTime = Date.now();
			var data = aceEncrypt(callString+'callTime='+callTime);
			var xhrObj = $.ajax({"data":data});  
			xhrObj.callTime = callTime;  // Used to reference the call in callStack during aceCallback().
			que.out[callTime] = callObj;  // Fix! Subdivide by caller for use in objIndex as well.
			ACE.markTime('/aceCall()');
		}
		
		
		// Used as a shortcut for making basic ace calls to this object's aceCall function.
		this.ace = function AceComm_ace(aceID, caller) {
			_AceComm.aceCall({
				"command" : "get",
				"aceID" : aceID,
				"caller" : caller  // Message handling is returned to the caller via this method.
			});
		}
		
		
		// Used as a shortcut for making basic ace calls to this object's aceCall function.
		this.aceType = function AceComm_aceType(aceType, caller) {
			_AceComm.aceCall({
				"command" : "get",
				"aceType" : aceType,
				"aceID" : aceType,
				"forceString" : true,  // Fix. Handle this mechanism in best way possible.
				"caller" : caller
			});
		}
		
		
		// Handles call placement in que.  queType can be 'wait', 'out', or 'in'.
		function queCall(callObj, queType) {
			
		}
		
		
		// Get default server location for system communications. Will eventually use entity membership, client geographic location, and server load to determine best option.
		function getSrcUrl() {
			var aceUrls = [  // Fix. This should be populated dynamically.
				"tasktracker.us/get.php",
				"openace.org",
				""
			];
			return "http://"+aceUrls[0];  // Fix.  This is just a temporary solution for prototype.
		}
		
		
		// Sets ajax defaults and establishes generic connection with an appropriate ACE server.
		function initializeConnection() {
			ACE.markTime('initializeConnection()');
			$.ajaxSetup({
				url: aceSrc,
				dataType: 'json',  // Fix? Determine optimal methods for handling this.
				beforeSend: acePreCall,
				success: aceCallback
			});
			ACE.callStack = {}; // Used to track open server calls and response time.
			aceCall({
				caller: 'ace',  // Used for central system communications with server.
				callType: 'handshake',  // Used to track open server calls and response time.
				signature: '1234567'  // Fix!  Use this to create hash keys for secure communications with server. 
			})
			ACE.callLog = Array();  // Used to store call times for internal performance checking.
		}


		// Used for low level ajax call tracking and error handling.
		function acePreCall(xhrObj) {
			ACE.jqXHRobjStack = ACE.jqXHRobjStack || new Array();
			var callObj = { 
				"callTime" : xhrObj.callTime,
				"xhrObj" : xhrObj,
				"dataHash" : xhrObj.dataHash,
				"dataSalt" : xhrObj.dataSalt,
			};
			ACE.jqXHRobjStack.push(xhrObj);
		}


		// Called on completion of each ajax request to handle returned data.
		function aceCallback(data, status, xhrObj) {
			//alert('aceCallback() data: '+data);
			//data = $.parseJSON(data);  // fix.	
			data = testData();  // Fix!
			var callTime = xhrObj.callTime;
			//delete data.callTime;
			var callData = ACE.callStack[callTime];
			var caller = callData.caller;
			var consoleObj = null;
			if (caller == 'ace') {  // For handling centralized system calls and cache loading.
				if (data.callType == 'handshake') {
					dataLoad(data);
				} else if (data.callType == 'aceLoad') {
					dataLoad(data);
				} else {
					// Fix. Error handling.
				}
			} else if ((consoleObj = objIndex[caller]) != null) {
				consoleObj.module.load(data);
			} else {
				// Fix. Error handling
			}
			aceDataCallBack(data);
		}
	
	}//AceComm
	
	//initialize();
}//ace
//Object.freeze(ace);  // Fix?



// *************************** Load Files **************************************** //



/*
$.getScript("http://openace.org/js/jQueryUI.js", function() {
	$.getScript("http://openace.org/js/ace.ui.js", function() {
		var loaded = true;
		log('hello');
	});
});
*/


// *************************** Tools **************************************** //



// WEAK checks to verify whether a variable represents an AceObj, AceID, AceUI, etc. Returns true if thisObj is the checked type, false otherwise.
_.mixin({  // Fix? To keep from polluting global namespace, added to _ but may be better options? Remove this and move withing ace if necessary.
	"isAceID" : function(thisObj) {  // Fix! These are all too weak. Check if exists via ace();
		if (!_.isString(thisObj) || thisObj.length > 100) { return false; }  // Fix. Ensure maxVal is sufficiently large. 
		if (thisObj.indexOf("_ace")!=0 && !thisObj.indexOf("_", 1)) { return false; }
		return true;
	},
	"isAceObj" : function(thisObj) {  // Fix! Pretty flimsy.
		if (!_.isObject(thisObj)) { return false; }
		if (!_.has(thisObj,ace) || !_.has(thisObj,aceCall) || !_.has(thisObj,aceID)) { return false; }
		return true;
	},
	"isAceUI" : function(thisObj) {  // Fix! Pretty flimsy.
		if (!_.isObject(thisObj)) { return false; }
		if (!_.has(thisObj,ace) || !_.has(thisObj,aceCall) || !_.has(thisObj,updateUI)) { return false; }
		return true;
	},
	"isAce" : function(thisObj) {  // Fix? All functionality here?
		if (!_.isObject(thisObj)) { return false; }
		if (!_.isAceID(thisObj) && !_.isAceObj(thisObj) && !_.isAceUI(thisObj)) { return false; }
		return true;
	}
});



// Logs logVal to the console, along with the caller function chain, and varName if set.
function log(logVal, varName) {
	var callingInfo = "";
	var funcCaller = log.caller;
	while (funcCaller) {
		callingInfo = ((funcCaller.name)||("{Anonymous}")) + "->" + callingInfo;
		funcCaller = funcCaller.caller;
	}
	callingInfo += "TaskTracker.log()"+((varName)?(" {"+varName+"}"):(""))+": ";			
	if (console.log) {  // Fix. In case of IE.
		console.log(callingInfo);
		console.log(logVal);
	} else {
		alert('TaskTracker.log() No browser console.log available!');
		// Fix. For IE.
	}
}
		
		
// Converts an object into a readable string. Returns null if thisObj is not an object.
function objToString(thisObj) {
	var objType = typeOf(thisObj);
	if (objType == 'object') {
		//alert('objToString() thisObj is objType: ' + objType);
	} else if (objType == 'string') {
		return thisObj;
	} else {
		return objType;
	}
	var outputString = 'objToString()  thisObj: { ';
	var undefinedList = new Array();
	var functionList = new Array();
	var objectList = new Array();
	for (key in thisObj) {
		var keyValue = thisObj[key];
		var thisType = typeOf(keyValue);
		//alert('objToString() key: '+key+', keyValue: '+keyValue+', thisType: '+thisType);
		if (thisType == 'undefined') {
			undefinedList.push(key);
		} else if (thisType == 'function') {
			functionList.push(key);
		}else if (thisType == 'object') {
			objectList.push(key);
		} else {
			outputString += key + ' : ' + keyValue + ', ';
		}
	}
	outputString += '}';
	if (functionList.length) { outputString += "\n     Functions: [ " + functionList.toString() + ' ] '; }
	if (objectList.length) { outputString += "\n     Object: [ " + objectList.toString() + ' ] '; }
	if (undefinedList.length) { outputString += "\n     Undefined: [ " + undefinedList.toString() + ' ] '; }
	return outputString;
}


// Dynamically adds a new script directly to the head of the page. 
function AddJs(scriptSrc) {
	var scriptRef = document.createElement('script');
	scriptRef.setAttribute("type","text/javascript");
	scriptRef.setAttribute("src", scriptSrc);
	document.getElementsByTagName("head")[0].appendChild(scriptRef); 
}


// An improved version of typeof that handles null and arrays in a useful way.
function typeOf(value) {
	if (value == null) { return 'null'; }
	var v = typeof value;
	if (v === 'object') { if (Array.isArray(value)) { return 'array'; } }
	if (v == 'string') { return v; }  // Fix? Additional functionality?
	// Fix. Check for modified 'undefined' object?
	return v;
}


// Does enhanced typeOf() checking and includes some minimal ACE functionality by checking for aceID and aceObj types.
function typeAce(value) {
	if (value == null) { return 'null'; }
	var v = typeof value;
	if (v === 'object') {
		if (Array.isArray(value)) {
			return 'array';
		} else if (typeof(value.aceID) != 'undefined') {  // Fix. Make more failsafe.
			return 'aceObj';
		}
	} else if (v == 'string') {
		if (value.slice(0,3) == 'ace_') {  // Fix. Make more failsafe.
			return 'aceID';
		}
	}
	return v;
}


// Returns TRUE if the string varName passed is defined in that scope, FALSE if not.
function isDefined(varName) {
    return ((typeof(this[varName]) == "undefined") ? (false) : (true));  // Probably just better to use typeof.
}


// Appends the Array object to utilze inArray() function. Returns the array location if exists, false if not.
Array.prototype.inArray = function(value) {
	var max = this.length;
	for (var i=0; i<max; i++) { if (this[i] == value) return i; }
	return false;
}


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}


// Implements Array.indexOf for browsers that don't support it.
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}


// Implements basic string trimming.  From http://www.electrictoolbox.com/javascript-trim-ltrim-rtrim/ 
function trim(text) { return text.replace(/^\s+|\s+$/g, ""); }
function ltrim(text) { return text.replace(/^\s+/g, ""); }
function rtrim(text) { return text.replace(/\s+$/g, ""); }


