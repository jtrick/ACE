// ace.ui.js Copyright (c) The New Waters Foundation, all rights reserved.  For license see: http://OpenAce.org/license?id=ace.ui.js


//var loadAceUI = null;


// This block performs any page-load preparations, including initializing all AceObj widgets and other admin tasks.
$(document).ready(function aceUI_ready() {
	
	// These are being loaded for testing only. Should call this from within the application.
	//var ACE = ace({login:1});  // Fix!
	loadAceUI();  // {"ACE":ACE});  // Fix!
	
	
	// Used to load aceUI objs based on data values for elements assigned with class type aceObj. elementStr is an css/ID/class class selector to be used by (jQuery) to limit aceUI loading to within that part of the DOM.
	function loadAceUI(loadObj, elementStr) {  // Fix?  loadAceUI = 
		var ACE;  // Be very careful with this, as the active AceApi object will have the full access credentials for the user logged into the app. 
		if (!loadObj) {
			loadObj = {  // Fix? May want to handle this differently.
				"loginObj" : {
					"login" : 1,
					"userName" : "anon",
					"passHash" : "public"
				}
			};
		}
		
		if (loadObj.ACE) {
			ACE = loadObj.ACE;
		} else if (loadObj.loginObj) {
			ACE = ace(loadObj.loginObj);
		}
		
		//if (!ACE || (!ACE.loggedIn())) { return; }  // Fix. Handle this scenario. Does no good to instantiate anything if not logged in; provide login point in that case.
		var widgetArray = [],  // Used to hold and return a list of resulting AceUI objects.
			elemObj = null,
			parentUI = (elementStr) || null;
		
		elementStr = (elementStr) ? (elementStr+" .aceUI") : (".aceUI");
		$(elementStr).each(function() {
			elemObj = $(this);
			var uiID = elemObj.data('aui') || elemObj.data('ui') || elemObj.data('aceUI') || elemObj.data('aceUi') || 'gui-aceObj',  // Fix? Work out best aceUI naming protocol. for handling on page, narrow to one technique?
				aceID = elemObj.data('aid') || elemObj.data('id') || elemObj.data('aceID') || elemObj.data('aceId') || null;  // Fix? Same as above. w3c protocol mandates element attributes convert to lowercase, with dashes converting to camel-case automatically. So, aceID must be data-ace-i-d, etc.
			
			//if (parentUI && $)
			widgetArray.push(new AceUI({ 
				"ACE": ACE,
				"domElement": elemObj,
				"uiID": uiID,
				"aceID": aceID
			}));
			//newAceUI({ "uiType":uiType, "aceID":aceID });
			
			
			//aceObjUI = elemObj.data("AceObjUI").login({ "ACE":ACE });
			// widgetArray.push(aceObjUI = elemObj.data("AceObjUI"));
			// aceObjUI.aceCall({
				// "command" : "login",
				// "ACE" : "ACE"
			// });
			// if (aceID) {				
				// aceObjUI.aceCall({
					// "command" : "get",
					// "ACE" : ACE,
					// "aceID" : aceID
				// });
			// } else {
				// Fix. Determine best behavior here.
			// }
		});
		
		return widgetArray;
	}
	
	
	// Non-exposed mechanisms for internal use to achieve system interaction without compromising security.  //////////////////////////////////////////////
	
	
	// Used to form an internal private closure to store protected references to the AceAPI and aceObj that drive this AceObjUI's functionality.
	function AceUI(callObj) {
		var caller = AceUI.caller,  // Fix?
			_this = this,
			ACE, aceObj, aceID, uiID, uiObj, uiType, domElement, domID, uiWidget, opt, items, userID, userName, internalCall, verifyAuth, status, 
			actions = {},  // The actions that can be performed on this AceUI.
			aceObjPrev = [];  // Stores the previous chain of loaded aceObjs for easy traversal.
		
		// Called when this AceObjUI is initially established.
		function initialize() {
			if (typeOf(callObj) != 'object') { return; }
			aceLogin(callObj);
			status = "initializing";
			domElement = callObj.domElement;
			domID = $(domElement).attr("id") || ($(domElement).attr("id", ace("rand")));  // Fix.
			uiID = callObj.uiID;
			uiObj = ACE.ace(uiID);  // Fix. Account for bad id,  latency, lack of connection, etc.
			uiType = uiObj.aceType();
			aceID = callObj.aceID;
			if (aceID) { aceObjLoad(aceID); }
			uiWidget = newAceUIw({ "uiType":uiType, "aceUI":_this, "domElement":domElement });
			// _.each(uiObj.get("actions"), function(val, key) {  // Fix! get() not working correctly under new paradigm.
				// actions[key] = val;
			// })
			actions = ["update","click","hover","drag","drop","load","input"];  // Fix! Correct AceObj.get() for new protocol.
		}
		
		// Passes ace() calls directly to this AceObj, returning the AceObj represented by this aceID. Does not replace the currently loaded entity.
		this.ace = function AceUI_ace(aceID) {
			// Fix! Security.
			return aceObj.ace(aceID);
		}
		
		// Used internally to pass calls into this AceObj.
		this.aceCall = function AceUI_aceCall(callObj) {
			// Fix! Security.
			var thisCaller = aceCall.caller,
				result = null;
			
			if (thisCaller != caller) {  // Fix? Intended to ensure that only the creator widget is granted call access to the ACE and AceObj instances.
				// Fix! return; Error, Security, Notification handling. Disabled for testing.
			}
			if (typeof(callObj) == 'string') { // For single aceID calls to the aceObj
				// Fix.  Do we want this functionality? aceObjLoad(callObj);
			} else if (typeOf(callObj) == 'object') {
				var command = callObj.command;  // Fix?  Although these vars should technically be instantiated at top of function automatically, does placing them here cause issues?
								
				if (!command) {
					return false;  // Fix. Error, Notification handling.
				} else if (command == 'login') {
					userName = aceLogin(callObj);
					if (userName) {
						// Fix. Update login-relevant UI items.
						return true;
					}
					return false;
				} else if (command == 'load') {
					return aceObjLoad(callObj.aceID);
				} else {
					if (aceObj && _.isObject(aceObj) && aceObj.aceCall) {
						result = aceObj.aceCall(callObj);
					} else {
						result = ACE.aceCall(callObj);
					}
				}
				if (result) {
					// Fix. Perform relevant operations.
				}
			} else {
				return null;  // Fix. Error handling, notification.
			}
		}
		
		// Loads AceObj elements present within this AceUI's associated element.
		this.ui = function AceUI_ui() {
			loadAceUI({"ACE":ACE}, "#"+domID);
			// $("#"+domID+" .aceUI").each(function(i,e) {
				// ACE.ui();
			// }
		}
		
		// Executes AceUI actions on this UI element.
		this.act = function AceUI_act(callObj) {
			if (!_.isObject(callObj)) { return null; }  // Fix. Error handling, notification.
			var action = (callObj.act || callObj.action),
				event = (callObj.evt || callObj.event),
				str = (callObj.str || callObj.msg),  // Fix.  Translate aceID to string.
				items = callObj.items;
			
			if (!callObj.aceID) { callObj.aceID = aceID; }  // Fix?
			
			if (action=="aceCall" || action=="ace" || action=="call") { 
				return ACE.aceCall(callObj); 
			} else if (action == "load") { 
				return aceObjLoad(callObj.aceID); 
			} else if (action == "login") { 
				return aceLogin(callObj);  // Fix. Handle updated ACE and repercussions. 
			} else if (action == "aceCall") { 
				return ACE.aceCall(); 
			} else {
				// Fix. Error handling, notification.
			}
		}
		
		// Used to return predefined AceUI actions to be performed by safe buttons and other UI elements without exposing the API itself.
		this.action = function aceUI_action(callObj) {
			var allowNew = callObj.allowNew || ["aceID", "str", "items"];  // Used to restrict items later defined in addCall during the execution of the created function.
			return (function(addCall){
				if (_.isObject(addCall)) {
					_.each(addCall, function(value, key) { 
						if (_.indexOf(allowNew, key)) {
							callObj[key] = value;
						}
					})
				}
				return _this.act(callObj);  // Fix?  AceUI_act(callObj);
			})(addCall);
		}
		
		
		// Internal Functions:
		
		
		// Logs in using a credentialed ACE object or a passed loginObj within callObj.
		function aceLogin(callObj) {
			var loginObj;
			if (callObj.ACE) {
				ACE = callObj.ACE;  // Fix? Ensure consistency between ACE and that in aceObj?
			} else if (callObj.loginObj) {
				ACE = ace(loginObj = callObj.loginObj);
			} else if (callObj.passHash || callObj.keyHash) {
				loginObj = {  // Fix?
					"login" : 1,
					"caller" : caller,
					"userName" : callObj.userName,
					"passHash" : callObj.passHash,
					"keyHash" : callObj.keyHash
				};
				ACE = ace(loginObj);
			} else {
				loadObj = {  // Fix? May want to handle this differently.
					"loginObj" : {
						"login" : 1,
						"userName" : "anon",
						"passHash" : "public"
					}
				};
				ACE = ace(loginObj);
			}
			
			// if (!ACE) { 
				// ACE = ace(loginObj);
			// } else if (ACE.userLogin) {  // Fix? If logging in while already logged in.
				// // Fix. Perform user notifications for secondary user login. Skip or update interface.
				// if (ACE.userLogin(loginObj)) {
					// // Fix! Complete this.
				// }
			// } else {
				// // Fix. Error handling.
			// }
			return ACE.loggedIn("name");
		}
		
		// Swaps a passed aceObj or instantiated aceID out with the current one and adds the previous one to the history que.
		function aceObjLoad(aceID, loadDepth) {  // loadAceID  // Fix. Test impact of this on closure scope aceID.
			if (!loadDepth) { loadDepth = 2; }  // Fix. Get from prefs.
			if (aceObj) { aceObjPrev.push(aceObj); }
			if (typeof(aceID) == "string") {
				if (aceObj) {
					aceObj = aceObj.ace(aceID, loadDepth--);
				} else if (ACE) {
					aceObj = ACE.ace(aceID, loadDepth--);
				} else {
					// Fix. Set trigger to load aceID once aceObj is available. Error handling, notification?
				}
			} else if (typeOf(aceID) == "object") {  // Fix. Do we want this possibility?
				//aceObj = aceID;
			}
			//opt.struct = items = aceObj.get("gui");  // Fix. Latency cases.
			//var objLen = aceObj.get("sys.length");  // Fix. Testing.
			//if (status != "initializing") { updateUI(); } // Fix? Added this check to circumvent ACE loading issue before first instantiation.
			items = aceObj.get("gui");
			_.each(items, function(thisItm, itmName) {
				if (_.isObject(thisItm) || isArray(thisItm)) {
					_.each(thisItm, function(value, key) {
						if (_.isAceObj(value)) {
							
						} else if (_.isAceID(value)) {
							
						} else {
							// Fix. Error handling, notification.
						}
					});
				} else {
				
				}
			});
			status = "loaded";
		}
		
		// Updates the core attributes of this aceObjUI object based on the properties of the loaded aceObj.
		function updateUI() {
			var cor;
			if (!aceObj) { return false; }
			_AceUI.uiLoad();
			return true;
			
			// this.name = aceObj.get("name");
			// this.description = aceObj.get("description");
			// this.aceType = aceObj.get("aceType");
			// this.value = aceObj.get("value");
			// return this.aceID;  // Fix?
		}
		
		
		// Public methods:
		
		
		this.loggedIn = function _AceUI_LoginObj_loggedIn(callObj) {
			if (typeOf(ACE) == "object" && ACE.loggedIn) {
				userID = ACE.loggedIn();
				return userID;
			}
		}
		
		// Used to restrict possible items accessible to widget.  // Fix. Can be more efficient, and ideally should use items["sec"] settings of AceObj.
		this.get = function(itemName) {  // Fix. Ensure this returns these indirectly by value to avoid possible modification.
			if (!itemName || itemName == "items") {
				return items;  // Fix! Security settings.
			} else if (itemName == "typeUI") {
				return typeUI;
			} else if (itemName == "aceID") {
				return aceID;
			} else if (itemName == "userName") {
				return userName;  // Fix? Security issue?
			} else if (itemName == "aceObj") {
				return aceObj;  // Fix. Security issue.
			} else if (itemName == "item") {
				return aceID;
			} else {
				// Fix. Error handling, notification.
			}
		}
		
		// Used to verify access to identical AceAPI objects. Caller passes the value returned by their own ACE.aceCheck(); If it's returned as "verified" here, the two ACE instances match.
		this.aceCheck = function _AceUI_LoginObj_aceCheck(keyString) {
			return localACE.aceCheck(keyString);
		}
			
		
		initialize();
	}; //AceUI
	
	
	// Loads the aceUI into memory and calls it on domElement. If uiType is not registered, it will add the function to jQueryUI and then call it.
	function newAceUIw(callObj) {
		var aceUI = callObj.aceUI,
			aceID = callObj.aceID,
			uiType = callObj.uiType,
			domElement = callObj.domElement,
			uiWidgetObj = ACE.ace(uiType);
			
		var widgetName = uiWidgetObj.get("objName"),
			widgetLib = "jquery";  // uiWidgetObj.get("library");  // Fix. Include alternative widget libraries.
		
		if (widgetLib == "jquery") {  // Fix. Full widget code should be associated with the relevant uiType and instantiated automatically.
			// Fix! This should check/import the code and register it to jQueryUI, calling it afterwards.
			if (widgetName == "AceObjUI") {
				domElement.AceObjUI({"aceUI":aceUI});
			} else if (widgetName == "AceBtnUI") {
				domElement.AceBtnUI({"aceUI":aceUI});
			} else if (widgetName == "AceHovUI") {
				domElement.AceHovUI({"aceUI":aceUI});
			} else if (widgetName == "AceEditUI") {
				domElement.AceEditUI({"aceUI":aceUI});
			} else if (widgetName == "AceExportBtnUI") {
				domElement.AceExportBtnUI({"aceUI":aceUI});
			} else {
				
			}
		} else if (widgetLib == "dojo") {
			// Fix. Complete this.
		} else {
			// Fix. Default functionality, error handling, notification.
		}
		
		return domElement.data(widgetName);  // Fix. Error checking, ensure returns correctly.
	}
	
	
});  //aceUI_ready()


/////////////////////   The Actual AceObjUI Widgets:  //////////////////////////////////////////////////////////////////////////////////////////



// The base individual widgits used to associate aceObjs to page structures and achieve specific behaviors depending on conditions.
(function($) {

	// The fundamental UI element used to represent an AceObj Entity.  Can be extended for different functionality and behavior style.
	$.widget("ace.AceObjUI", {
		
		// The default options for an AceObjUI object when instantiated.
		options: {
			buttons: [  // Buttons inherent to the widget. Options are: id, classes, img, title, command, hover, , 
				{ img: "up_symbol.png",  title: "View Goals", command: "goals" },
				{ img: "search.png", title: "Browse Entity", command: "entities" }, 
				{ img: "star.png",  title: "Get Help", command: "help" },
				{ img: "x_symbol.png",  title: "Remove This ACE Widget", command: "remove" },
				{ img: "ichat.png", title: "Enter Debates", command: "debates" },
				{ img: "plus_symbol.png", title: "Make a Proposal", command: "proposal" },
				{ img: "radioactive.png", title: "Note an Issue", command: "issue" }
			],
			// ACE: null,  // Used to hold the closure established in uiCreate() and serves as an AceAccessObj instance.
			aceUI: null,
			html: null,
			struct: null,
			status: null,
			userName: null,
			aceID: null,
			name: null,
			description: null,
			value: null,
			aceType: null,
			hinge: null,  // The attribute used as the hinge dimension for the submenu items.
			mod: null,
			aceTypeUI: "gui-aceObj"
		}, //options
		
		// The initial steps taken for an AceObjUI object when instantiated.
		_create: function() {
			var self = this,
				options = this.options;
			
			//var options = self.options;
			// var domElem = self.element;  // The dom object that this widget is assigned to.
			// var elemID = $(domElem).attr("id");
			// var html = $(domElem).html();
			// var start, end, uiCall;
			// if (html && ((start=html.indexOf("{")) != -1) && ((end=html.lastIndexOf("}")) != -1)) {
				// uiCall = html.slice(start,end+1);  // Fix? Check for matching order and number of brackets?
				// $(domElem).html(html=html.replace(uiCall,""));
				// uiCall = JSON.parse(uiCall);  // Fix? Security and error checking?
			// } else { uiCall = null; }
			
			
			// // Used to verify this AceObjUI is authenticated and represents the expected object in interactions with its AceObj. Created here to ensure accessible only to the relevant AceObj.
			// function verifyAuth() {
				// // aceID string parsing format: |=ace-ent-entity=|
			// }
			
			// // Used to access internal 'hidden' functions for this AceObjUI.
			// function internalCall() {
				
			// }
			
			
			// options.ACE = new AceAccessObj({  // Solidifies a closure to this function and prevents external access by setting to new AceAccessObj().
				// "command" : "create",
				// "ACE" : options.ACE,  // Fix. Security threat before re-established as new AceAccessObj().
				// "aceID" : options.aceID,
				// "typeUI" : options.aceTypeUI,
				// "_AceUI" : self,
				// "internalCall" : internalCall,
				// "verifyAuth" : verifyAuth,
				// "uiCall" : uiObjParse(self)
			// });
			self.uiLoad();
		}, //_create()
		
		
		// Sends a login request to the core AceObjUI aceCall handler.
		login: function(callObj) {
			callObj.command = "login";
			this.options.userName = this.aceCall(callObj);
			return (this.options.userName) ? (this) : (null);
		},
		
		// Loads the stored items into the html elements for this AceObjUI widget. If specific element is to be specified, its name can be passed in item.
		uiLoad: function(items, opts) {  // Fix. Address potential for malicious manipulation of widgets.
			var self = this,
				domElem = self.element,
				elemID = $(domElem).attr("id"),
				opt = self.options,
				aceUI = opt.aceUI,
				itemArray = [],
				html, item, nameEditHash, descriptionEditHash;
			
			var aceID = aceUI.get("aceID");
			
			if (!items) {
				items = aceUI.get("items");  // items = this.aceCall({"command":"load"});  // Fix. This creates endless loop. Obtain items or remove as option.
			} else {
				// Fix. Finish this. Various methods for specifying items to load.
			}
			
						
			// var headerT = _.template(''  // Fix.  Load via ace().
				// +'<div class="aceObj-head-div">'
					// +'<h2 class="aceObj-name">{{entityName}} </h2>'  // Fix.  
					// +'<h3 class="aceObj-description"><i>{{entityDescription}}</i></h3>'
				// +'</div><!--/.aceObj-head-div-->'
				// +'<div class="aceObj-body-div">'  // Starting body here.
			// );
			
			var headerT = _.template(''  // Fix.  Load via ace().
				+'<div class="aceObj-head-div">'
					+'<span class="aceObj-name-div">'
						//+'<span class="aceObj-name-lbl">Name: </span>'
						+'<span class="aceObj-name">{{entityName}}</span><br>'  // Fix.  
						// +'<span class="aceUI" data-ui="gui-edt">{{nameEditHash}}</span>'
					+'</span>'
					+'<span class="aceObj-description-div"> (<i>'
						+'<span class="aceObj-description">{{entityDescription}}</span>'
						// +'<h3 class="aceUI" data-ui="gui-edt">{{descriptionEditHash}}</h3>'
					+'</i>)</span>'
				+'</div><!--/.aceObj-head-div-->'
			);
			
			var itmHeadT = _.template(''  // Fix.  Load via ace().
				+'<div class="aceObj-itm-head"><a href="?id={{aceID}}&itm={{itemID}}">'  
					+'<span class="aceObj-itm-name">{{itemName}}</span>'
					// +'<span class="aceUI" data-ui="gui-edt">{{nameEditHash}}</span>'
					+'<span class="aceObj-itm-description-div"> (<i>'
						+'<span class="aceObj-itm-description">{{itemDescription}}</span>'
						// +'<span class="aceUI" data-ui="gui-edt">{{descriptionEditHash}}</span>'
					+'</i>)</span>'
				+'</a></div><!--/.aceObj-itm-head-->'
			);
			
			var subItmHeadT =  _.template(''  // Fix.  Load via ace().
				+'<div class="aceObj-itm-sub-head">'  
					+'<a href="?id={{aceID}}&itm={{itemID}}&sub={{subID}}">'
						+'<span class="aceObj-itm-sub-name">{{subName}}</span>'
						+'<span class="aceUI" data-ui="gui-edt" data-id="{{subID}}"></span>'
						+'<span class="aceObj-itm-sub-description-div"> (<i>'
							+'<span class="aceObj-itm-sub-description">{{subDescription}}</span>'
							+'<span class="aceUI" data-ui="gui-edt" data-id="{{subID}}"></span>'
						+'</i>)</span>'
					+'</a>'
				+'</div><!--/.aceObj-itm-sub-head-->'
			);
			
			var itmObjT = _.template(''  // Fix.  Load via ace().
				+'<div class="aceObj-itm-obj-div">'  
					+'<a class="aceObj" data-ui="ui-btn" data-id="{{objID}}" href="?itm={{objID}}">'
						+'<span class="aceObj-itm-obj-name">{{objName}}</span>'
						// +'<span class="aceUI" data-ui="gui-edt" data-id="{{objID}}"></span>'
						+'<span class="aceObj-itm-obj-description-div"> (<i>'
							+'<span class="aceObj-itm-obj-description">{{objDescription}}</span>'
							// +'<span class="aceUI" data-ui="gui-edt" data-id="{{objID}}"></span>'
						+'</i>)</span>'
					+'</a>'
				+'</div><!--/.aceObj-itm-obj-div-->'
			);
			
			// nameEditHash = {
				// "aceID" : aceID,
				// "aspect" : "cor.name",
				// "current" : items.cor.name,
			// };
			
			html = headerT({
				"entityName" : items.cor.name,
				// "nameEditHash" : nameEditHash,
				"entityDescription" : items.cor.description
				// "descriptionEditHash" : descriptionEditHash
			});  // , {variable: 'o'}  // Fix. Utilize _.'s variable option to optimize rendering.
			
			html += '<div class="aceObj-body-div">'  // Starting body here.
			_.each(items, function(subList, item) {
				var itemID = "itm-"+item,
					typObj = self._ace(itemID);
					
				if (typObj.status() != "bad") {
					html += itmHeadT({			// Item head
						"aceID" : aceID,
						"itemID" : itemID,
						"itemName" : (typObj.get("name") || item),
						"itemDescription" : (typObj.get("description") || "No description available for this AceObj Item.")
					});
					
				html += '<div class="aceObj-itm-body">';  // Start item body
					
					if (subList && _.isObject(subList) && _.size(subList)) {
						_.each(subList, function(objList, sub) {
							var subID = "sub-"+sub,
								subObj = self._ace(subID);
								
							html += subItmHeadT({
								"aceID" : aceID,
								"itemID" : item,
								"subID" : subID,
								"subName" : (subObj.get("name") || subID),
								"subDescription" : (subObj.get("description") || "A currently undefined aspect of this entity.")
							});
							
							html += '<div class="aceObj-itm-sub-body">';  // Start sub-item body
							if (objList && _.isObject(objList) && _.size(objList)) {
								_.each(objList, function(objInst, objID) {
									var itmObj = self._ace(objID);
										
									html += itmObjT({
										"objID" : objID,
										"objName" : (subObj.get("name") || subID),
										"objDescription" : (subObj.get("description") || "A currently undefined aspect of this entity.")
									});
									
								});
							} else {
								html += '<div class="ace-msg"><b>There are no items under this sub-category.</b></div>';
							}
							html += '</div><!--/.aceObj-itm-sub-body-->';  // End sub-item body
						});	
					} else {
						html += '<div class="ace-msg"><h3>There are no items under this category.</h3></div>';
					}
				
				html += '</div><!--/.aceObj-itm-body-->';  // End item body
				}
			});
			html += '</div><!--/.aceObj-body-div-->';  // Ending body here.
			
			
			$(domElem).html("").addClass("ui-widget-content  ui-corner-all").css({"border":"2px solid black"});
			$(html).appendTo(domElem).css("text-align", "center");
			$(".aceObj-body-div")
				.accordion({
					event: "click hoverintent",  // Fix. Set via prefs.
					fillSpace: true,
					collapsible: true
				})
				// .sortable({
					// axis: "y",
					// handle: "h3",
					// stop: function( event, ui ) {
						// // IE doesn't register the blur when sorting
						// // so trigger focusout handlers to remove .ui-state-focus
						// ui.item.children( "h3" ).triggerHandler( "focusout" );
					// }
				// })
			;
			$(".aceObj-itm-body")
				.accordion({
					event: "click hoverintent",  // Fix. Set via prefs.
					fillSpace: true
				})
				.width("90%")
			;
			
			aceUI.ui();  // Load newly added AceUI elements.
			//loadAceUI({"":ACE}, "#"+elemID)
			
			
			
			/*
			for (item in items) {
				var typObj = self._ace("itm-"+item),
					thisList = items[item],
					sub, content;
				// Fix. Sorting order, Special behaviors, etc.
				
				content = '<div class="ace-obj-sub-list">';
				for (sub in thisList) {
					var subObj = self._ace("itm-"+sub),
						subN = subObj.get("name") || sub,
						subD = subObj.get("description") || "No description available.",
						help = '<div class="help"></div>';
					
					content += '\n\t<h4><a href="'+item+'-'+sub+'">'+subN+"</a></h4>";
					content += "<div><i>"+subD+"</i></div>\n";
				}
				content += "</div>";
				itemArray.push({
					"href" : item,
					"title" : typObj.get("name"),
					"help" : typObj.get("description"),
					"content" : content
				});
			}*/
			
			
			
			// Fix. All of the following was a quick hack. Remove once functionality is converted.
			
					// +'<span class="aceObj info-btn" data-ui="btn">{'
						// +'"label": "Info"'
						// +'"hover": "{{entityHelp}}"'
					// +'}</span>'
				// +'</div>';  // Fix.  This is not modular enough. Implementing templating solution.
			
			// var tplObj = [
				// {	
					// "htm": htmType,
					// "id": thisID,
					// "class": className,
					// "txt" : [],
					
				// }
			// ];  // Fix. This will be implemented for each element via ace().
				
			// $(domElem).html("").addClass("ui-widget-content  ui-corner-tl ui-corner-tr");//.height("1000px");
			// var nameDiv = $('<div id="'+elemID+'-obj-name"><h2>AceObj Name: <b>'+items.cor.name+'</b></h2></div>').addClass("ui-corner-tl ui-corner-tr");
			// var descDiv = '<div id="'+elemID+'-obj-description"><h3>Description: <i>'+items.cor.description+'</i></h3></div>';
			// var headDiv = $(headString).appendTo(domElem).css("text-align", "center");  // $('<div id="'+elemID+'-head">'+nameDiv.html()+descDiv+'</div>').appendTo(domElem).css("text-align", "center");
		    // var bodyDiv = $('<div id="'+elemID+'-body"></div>').appendTo(domElem);//.height("700px");
			// $(headDiv).addClass("ui-widget-header ui-corner-tl ui-corner-tr");
			// bodyDiv.addClass("ui-widget-content").width("90%");  // .position({
				// of: $(headDiv),
				// my: "center top",
				// at: "center bottom"
			// });
			
			// $(domElem)
				// .resizable({
					// minHeight: 140,
					// alsoResize: $(bodyDiv), // elemID+"-body",  // $(bodyDiv)
					// resize: function() {
						
					// }
				// })
			// ;
			
			
			// for (item in items) {
				// var typObj = self._ace("itm-"+item),
					// thisList = items[item],
					// sub, content;
				// // Fix. Sorting order, Special behaviors, etc.
				
				// content = '<div class="ace-obj-sub-list">';
				// for (sub in thisList) {
					// var subObj = self._ace("itm-"+sub),
						// subN = subObj.get("name") || sub,
						// subD = subObj.get("name") || "No description available.",
						// help = '<div class="help"></div>';
					
					// content += '\n\t<h4><a href="'+item+'-'+sub+'">'+subN+"</a></h4>";
					// content += "<div><i>"+subD+"</i></div>\n";
				// }
				// content += "</div>";
				// itemArray.push({
					// "href" : item,
					// "title" : typObj.get("name"),
					// "help" : typObj.get("description"),
					// "content" : content
				// });
			// }
			
			// if (self.options.status == "loaded") {
				// // Fix. Finish this. Ensure DOM elements are eliminated and memory is freed up. Cycle through persistent items for efficiency?
				// var html = $(domElem).html("");
			// }
			
			// var props = null;  // Fix. Set props via user prefs.
			// uiExpandDivs(itemArray, props);
			// $(".ace-obj-sub-list").accordion({
				// event: "click hoverintent",  // Fix. Set via prefs.
				// collapsible: true,
			// });
			// this.options.status = "loaded";
			
			
			// // Generates html for loading info into an accordian. props can be used to specify options of the accordian.
			// function uiExpandDivs(loadArray, props) {
				// var seg = null,
					// html = "",
					// len = loadArray.length;
				
				// if (!props) {
					// props = {
						// // Fix. Complete this.
					// };
				// }
				// for (var i=0; i<len; i++) { 
					// seg = loadArray[i];
					// html += '<h3><a href="'+seg.href+'">'+seg.title+"</a></h3>\n";
					// html += "<div><p><i>"+seg.help+"</i></p>"+seg.content+"</div>";
				// }
				
				// $(bodyDiv)
					// .html(html)
					// .accordion({
						// event: "click hoverintent",  // Fix. Set via prefs.
						// fillSpace: true
					// })
					// .addClass("ui-widget-header")
				// ;
			// }
			
		},
		
		// Sends a login request to the core AceObjUI aceCall handler.
		aceCheck: function(keyString) {
			if (!keyString) { return; }
			return this.options.aceUI.aceCheck(keyString);
		},
		
		// References AceUI.aceCall().
		aceCall: function AceObjUI_aceCall(callObj) {
			// Fix! Security protections.   callObj.caller = AceObjUI_aceCall.caller;
			return this.options.aceUI.aceCall(callObj);
		},
		
		// Abstracts the call to this AceObj's access point to return the AceObj represented by aceID if accessible under these conditions.
		_ace: function AceObjUI_ace(aceID) {
			// Fix! Security protections. 
			return this.options.aceUI.ace(aceID);
		},
		
		// Returns the currently open AceObj after performing security checking for this user and conditions.
		 _aceObj: function() {
			// Fix!  There is currently no security here.
			return this.options.aceUI.item("aceObj");  // Fix.
		},
		
		// When a user hovers over the page element that instantiated this object.
		_hover: function() {
			
		},
		
		// Used to specify properties for this object.
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
		  switch(key) {
			case "length":
			  break;
		  }
		  $.Widget.prototype._setOption.apply(this,arguments)
		},
		
		// Closes this object, removes traces from memory and DOM.
		destroy: function() {
		  // Use the destroy method to reverse everything your plugin has applied
		  $.Widget.prototype.destroy.call(this);
		} //destroy
		
	});//widget("ace.AceObjUI")
	
	
	// Enhanced UI button widget designed for ACE system interaction.
	$.widget("ace.AceBtnUI", $.ui.button, {
		
		// The default options for an AceObjUI object when instantiated.
		options: {
			aceUI: null,  // Used to hold the closure established in uiCreate() and serves as an AceAccessObj instance.
			html: null,
			domID : null,
			struct: null,
			status: null,
			userName: null,
			aceID: null,
			label: null,
			name: null,
			description: null,
			value: null,
			aceType: null,
			action: null,  // The command or aceCall that will be executed on click.
			mod: null,
			tpl: null,  // The _.js precompiled template used to populate this btn's <a> tag structure. 
			aceTypeUI: "gui-btn"
		}, //options
		
		// The initial steps taken for an AceUI object when instantiated.
		_create: function() {
			var self = this,
				opt = this.options,
				aceUI = opt.opt,
				domElem = self.element,
				domID = opt.domID = $(domElem).attr("id"),
				o = opt.struct = {};
				
			opt.value = aceUI.get('value'),			// Fix! This whole process is idiotic. Identify best standard and use it.
			opt.aceType = aceUI.get('aceType'),
			o.label = opt.label = aceUI.get('label'),
			o.name = opt.name = aceUI.get('name'),
			o.description = opt.description = aceUI.get('description'),
			o.action = opt.action = aceUI.get('action'),
			o.target = opt.target = aceUI.get('target');
			
			opt.tpl = _.template(''  // Fix.  Load via ace().
				+'<a class="aceBtn-lnk-div" >'  
					+'<span class="aceBtn-lbl">{{o.label}}</span>'
				+'</a><!--/.aceBtn-lnk-div-->'
			);
			
			// opt.AceUI = new AceAccessObj({  // Solidifies a closure to this function and prevents external access by setting to new AceAccessObj().
				// "command" : "create",
				// "ACE" : opt.ACE,  // Fix. Security threat before re-established as new AceAccessObj().
				// "aceID" : opt.aceID,
				// "typeUI" : opt.aceTypeUI,
				// "_AceUI" : self,
				// "domID" : domID,
				// "domElem" : domElem,
				// "uiCall" : uiObjParse(self)
			// });
			self.uiLoad();
		}, //_create()
		
		// Sends a login request to the core AceObjUI aceCall handler.
		login: function(callObj) {
			callObj.command = "login";
			return (this.options.userName = this.aceCall(callObj)) ? (this) : (null);
		},
		
		// Loads the stored items into the html elements for this AceObjUI widget. If specific element is to be specified, its name can be passed in item.
		uiLoad: function(opts) {  // Fix. Address potential for malicious manipulation of widgets.
			var self = this,
				opt = this.options,
				domElem = self.element;
				
			// this._super()
			opt.tpl(opt.struct);
			
			$(domElem)
				.button()
				.click(function() {
					
				})
			;
		},
		
		// Sends a login request to the core AceObjUI aceCall handler.
		aceCheck: function(keyString) {
			if (!keyString) { return; }
			return this.options.ACE.aceCheck(keyString);
		},
		
		// Contains closure that holds ACE and aceObj references within the function scope defined below.
		aceCall: function AceBtn_aceCall(callObj) {
			callObj.caller = AceBtn_aceCall.caller;
			return this.options.ACE.aceCall(callObj);
		},
		
		// Abstracts the call to this AceObj's access point to return the AceObj represented by aceID if accessible under these conditions.
		_ace: function AceBtn_ace(aceID) {
			// Fix! Security protections. 
			return this.options.ACE.ace(aceID);
		},
		
		// Returns the currently open AceObj after performing security checking for this user and conditions.
		 _aceObj: function AceBtn_aceObj() {
			callObj.caller = AceBtn_aceCall.caller;
			// Fix!  There is currently no security here.
			return this.options.ACE.item("aceObj");  // Fix.
		},
		
		// When a user hovers over the page element that instantiated this object.
		_hover: function() {
			
		},
		
		// Used to specify properties for this object.
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
		  switch(key) {
			case "length":
			  break;
		  }
		  $.Widget.prototype._setOption.apply(this,arguments)
		},
		
		// Closes this object, removes traces from memory and DOM.
		destroy: function() {
		  // Use the destroy method to reverse everything your plugin has applied
		  $.Widget.prototype.destroy.call(this);
		} //destroy
		
	});//widget("ace.AceBtnUI")
	
	
	// Enhanced UI button widget designed for ACE system interaction.
	$.widget("ace.AceTstBtn", $.ui.button, {
		
		// The default options for an AceObjUI object when instantiated.
		options: {
			ACE: null,  // Used to hold the closure established in uiCreate() and serves as an AceAccessObj instance.
			html: null,
			domID : null,
			struct: null,
			status: null,
			userName: null,
			aceID: null,
			label: null,
			name: null,
			description: null,
			value: null,
			aceType: null,
			action: null,  // The command or aceCall that will be executed on click.
			mod: null,
			tpl: null,  // The _.js precompiled template used to populate this btn's <a> tag structure. 
			aceTypeUI: "gui-btn"
		}, //options
		
		// The initial steps taken for an AceObjUI object when instantiated.
		_create: function() {
			var self = this,
				opt = this.options,
				domElem = self.element;
				domID = opt.domID = $(domElem).attr("id");
			
			//this._super("_create");  // Fix! Why doesn't this work?
			
			// opt.ACE = new AceAccessObj({  // Solidifies a closure to this function and prevents external access by setting to new AceAccessObj().
				// "command" : "create",
				// "ACE" : opt.ACE,  // Fix. Security threat before re-established as new AceAccessObj().
				// "aceID" : opt.aceID,
				// "typeUI" : opt.aceTypeUI,
				// "_AceUI" : self,
				// "domID" : domID,
				// "domElem" : domElem,
				// "uiCall" : uiObjParse(self)
			// });
			// self.uiLoad();
			
		}, //_create()
		
		// Sends a login request to the core AceObjUI aceCall handler.
		login: function(callObj) {
			callObj.command = "login";
			return (this.options.userName = this.aceCall(callObj)) ? (this) : (null);
		},
		
		// Loads the stored items into the html elements for this AceObjUI widget. If specific element is to be specified, its name can be passed in item.
		uiLoad: function(opts) {  // Fix. Address potential for malicious manipulation of widgets.
			var self = this,
				opt = this.options,
				domElem = self.element;
				
			// this._super()
			opt.tpl = _.template(''  // Fix.  Load via ace().
				+'<a class="aceBtn-lnk-div" >'  
					+'<span class="aceObj-name-div">'
						+'<span class="aceObj-name-lbl">Name: </span>'
						+'<span class="aceObj-name">{{entityName}} </span>'
					+'</span>'
					+'<span class="aceObj-description-div"> (<i>'
						+'<span class="aceObj-description">{{entityDescription}}</span>'
					+'</i>)</span>'
				+'</a><!--/.aceBtn-lnk-div-->'
			);
			
			$(domElem).button();
		},
		
		// Sends a login request to the core AceObjUI aceCall handler.
		aceCheck: function(keyString) {
			if (!keyString) { return; }
			return this.options.ACE.aceCheck(keyString);
		},
		
		// Contains closure that holds ACE and aceObj references within the function scope defined below.
		aceCall: function AceBtn_aceCall(callObj) {
			callObj.caller = AceBtn_aceCall.caller;
			return this.options.ACE.aceCall(callObj);
		},
		
		// Abstracts the call to this AceObj's access point to return the AceObj represented by aceID if accessible under these conditions.
		_ace: function AceBtn_ace(aceID) {
			// Fix! Security protections. 
			return this.options.ACE.ace(aceID);
		},
		
		// Returns the currently open AceObj after performing security checking for this user and conditions.
		 _aceObj: function AceBtn_aceObj() {
			callObj.caller = AceBtn_aceCall.caller;
			// Fix!  There is currently no security here.
			return this.options.ACE.item("aceObj");  // Fix.
		},
		
		// When a user hovers over the page element that instantiated this object.
		_hover: function() {
			
		},
		
		// Used to specify properties for this object.
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
		  switch(key) {
			case "length":
			  break;
		  }
		  $.Widget.prototype._setOption.apply(this,arguments)
		},
		
		// Closes this object, removes traces from memory and DOM.
		destroy: function() {
		  // Use the destroy method to reverse everything your plugin has applied
		  $.Widget.prototype.destroy.call(this);
		} //destroy
		
	});//widget("ace.AceTstBtn")
	
	
	// Enhanced UI button widget designed for ACE system interaction.
	$.widget("ace.AceHovUI", $.ui.button, {
		
		// The default options for an AceObjUI object when instantiated.
		options: {
			ACE: null,  // Used to hold the closure established in uiCreate() and serves as an AceAccessObj instance.
			html: null,
			domID : null,
			struct: null,
			status: null,
			aceID: null,
			name: null,
			description: null,
			value: null,
			aceType: null,
			action: null,  // The command or aceCall that will be executed on click.
			mod: null,
			aceTypeUI: "gui-aceHover"
		}, //options
		
		// The initial steps taken for an AceObjUI object when instantiated.
		_create: function() {
			var self = this,
				opt = this.options,
				domElem = self.element;
				domID = opt.domID = $(domElem).attr("id");
			
			opt.ACE = new AceAccessObj({  // Solidifies a closure to this function and prevents external access by setting to new AceAccessObj().
				"command" : "create",
				"ACE" : opt.ACE,  // Fix. Security threat before re-established as new AceAccessObj().
				"aceID" : opt.aceID,
				"typeUI" : opt.aceTypeUI,
				"_AceUI" : self,
				"domID" : domID,
				"domElem" : domElem,
				"uiCall" : uiObjParse(self)
			});
			self.uiLoad();
		}, //_create()
		
		// Sends a login request to the core AceObjUI aceCall handler.
		login: function(callObj) {
			callObj.command = "login";
			return (this.options.userName = this.aceCall(callObj)) ? (this) : (null);
		},
		
		// Loads the stored items into the html elements for this AceObjUI widget. If specific element is to be specified, its name can be passed in item.
		uiLoad: function(opts) {  // Fix. Address potential for malicious manipulation of widgets.
			var self = this,
				opt = this.options,
				domElem = self.element;
				
		},
		
		// Sends a login request to the core AceObjUI aceCall handler.
		aceCheck: function(keyString) {
			if (!keyString) { return; }
			return this.options.ACE.aceCheck(keyString);
		},
		
		// Contains closure that holds ACE and aceObj references within the function scope defined below.
		aceCall: function AceBtn_aceCall(callObj) {
			callObj.caller = AceBtn_aceCall.caller;
			return this.options.ACE.aceCall(callObj);
		},
		
		// Abstracts the call to this AceObj's access point to return the AceObj represented by aceID if accessible under these conditions.
		_ace: function AceBtn_ace(aceID) {
			// Fix! Security protections. 
			return this.options.ACE.ace(aceID);
		},
		
		// Returns the currently open AceObj after performing security checking for this user and conditions.
		 _aceObj: function AceBtn_aceObj() {
			callObj.caller = AceBtn_aceCall.caller;
			// Fix!  There is currently no security here.
			return this.options.ACE.item("aceObj");  // Fix.
		},
		
		// Initializes all of the template structures for this widget.
		_initializeUI: function() {
			var widgetObj,
				thisHtml,
				msg;
			
			widgetObj = _ace(this.options.ACE.item("typeUI"));  // Fix.  This is really cumbersome syntax.  //_ace(options.typeUI);
			thisHtml = widgetObj.get("html");
			thisHtml = "<div class=\"name\">TestDiv</div><div class=\"description\">Example div for AceObjUI testing.</div>";  // Fix. Just for testing.
			
			//var domElem = self.element;  // The dom object that this widget is assigned to.
			$(domElem)
				.empty()
				.html(thisHtml)
				//{|ace_ent-ksdhfkj40jlfvkl|}
			;
		},
		
		// When a user hovers over the page element that instantiated this object.
		_hover: function() {
			
		},
		
		// Used to specify properties for this object.
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
		  switch(key) {
			case "length":
			  break;
		  }
		  $.Widget.prototype._setOption.apply(this,arguments)
		},
		
		// Closes this object, removes traces from memory and DOM.
		destroy: function() {
		  // Use the destroy method to reverse everything your plugin has applied
		  $.Widget.prototype.destroy.call(this);
		} //destroy
		
	});//widget("ace.AceHovUI")
	
	
	// Enhanced UI button widget designed for ACE system interaction.
	$.widget("ace.AceExportBtnUI", $.ui.button, {
		
		// The default options for an AceObjUI object when instantiated.
		options: {
			ACE: null,  // Used to hold the closure established in uiCreate() and serves as an AceAccessObj instance.
			html: null,
			domID : null,
			struct: null,
			status: null,
			aceID: null,
			name: null,
			description: null,
			value: null,
			aceType: null,
			action: null,  // The command or aceCall that will be executed on click.
			mod: null,
			aceTypeUI: "gui-aceHover"
		}, //options
		
		// The initial steps taken for an AceObjUI object when instantiated.
		_create: function() {
			var self = this,
				opt = this.options,
				domElem = self.element;
				domID = opt.domID = $(domElem).attr("id");
			
			opt.ACE = new AceAccessObj({  // Solidifies a closure to this function and prevents external access by setting to new AceAccessObj().
				"command" : "create",
				"ACE" : opt.ACE,  // Fix. Security threat before re-established as new AceAccessObj().
				"aceID" : opt.aceID,
				"typeUI" : opt.aceTypeUI,
				"_AceUI" : self,
				"domID" : domID,
				"domElem" : domElem,
				"uiCall" : uiObjParse(self)
			});
			self.uiLoad();
		}, //_create()
		
		// Sends a login request to the core AceObjUI aceCall handler.
		login: function(callObj) {
			callObj.command = "login";
			return (this.options.userName = this.aceCall(callObj)) ? (this) : (null);
		},
		
		// Loads the stored items into the html elements for this AceObjUI widget. If specific element is to be specified, its name can be passed in item.
		uiLoad: function(opts) {  // Fix. Address potential for malicious manipulation of widgets.
			var self = this,
				opt = this.options,
				domElem = self.element;
				
		},
		
		// Sends a login request to the core AceObjUI aceCall handler.
		aceCheck: function(keyString) {
			if (!keyString) { return; }
			return this.options.ACE.aceCheck(keyString);
		},
		
		// Contains closure that holds ACE and aceObj references within the function scope defined below.
		aceCall: function AceBtn_aceCall(callObj) {
			callObj.caller = AceBtn_aceCall.caller;
			return this.options.ACE.aceCall(callObj);
		},
		
		// Abstracts the call to this AceObj's access point to return the AceObj represented by aceID if accessible under these conditions.
		_ace: function AceBtn_ace(aceID) {
			// Fix! Security protections. 
			return this.options.ACE.ace(aceID);
		},
		
		// Returns the currently open AceObj after performing security checking for this user and conditions.
		 _aceObj: function AceBtn_aceObj() {
			callObj.caller = AceBtn_aceCall.caller;
			// Fix!  There is currently no security here.
			return this.options.ACE.item("aceObj");  // Fix.
		},
		
		// Initializes all of the template structures for this widget.
		_initializeUI: function() {
			var widgetObj,
				thisHtml,
				msg;
			
			widgetObj = _ace(this.options.ACE.item("typeUI"));  // Fix.  This is really cumbersome syntax.  //_ace(options.typeUI);
			thisHtml = widgetObj.get("html");
			thisHtml = "<div class=\"name\">TestDiv</div><div class=\"description\">Example div for AceObjUI testing.</div>";  // Fix. Just for testing.
			
			//var domElem = self.element;  // The dom object that this widget is assigned to.
			$(domElem)
				.empty()
				.html(thisHtml)
				//{|ace_ent-ksdhfkj40jlfvkl|}
			;
		},
		
		// When a user hovers over the page element that instantiated this object.
		_hover: function() {
			
		},
		
		// Used to specify properties for this object.
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
		  switch(key) {
			case "length":
			  break;
		  }
		  $.Widget.prototype._setOption.apply(this,arguments)
		},
		
		// Closes this object, removes traces from memory and DOM.
		destroy: function() {
		  // Use the destroy method to reverse everything your plugin has applied
		  $.Widget.prototype.destroy.call(this);
		} //destroy
		
	});//widget("ace.AceExportBtnUI")
	
	
	
// Non-exposed mechanisms for internal use to achieve system interaction without compromising security.  //////////////////////////////////////////////
	
	
	// Fix.  DEPRECIATED for AceUI.  // Used to form an internal private closure to store protected references to the AceAPI and aceObj that drive this AceObjUI's functionality.
	function AceAccessObj(callObj) {
		var caller = AceAccessObj.caller,  // Fix?
			_this = this,
			_AceUI, ACE, typeUI, opt, aceID, aceObj, items, userID, userName, internalCall, verifyAuth, status,
			aceObjPrev = [];  // Stores the previous chain of loaded aceObjs for easy traversal.
		
		// Called when this AceObjUI is initially established.
		function initialize() {
			if (typeOf(callObj) != 'object') { return; }
			status = "initializing";
			internalCall = callObj.internalCall;
			verifyAuth = callObj.verifyAuth;
			_AceUI = callObj._AceUI;
			opt = _AceUI.options;
			typeUI = callObj.typeUI;
			aceID = callObj.aceID;
			if (callObj.ACE || callObj.loginObj) { aceLogin(callObj); }
			if (aceID) { aceObjLoad(aceID); }
		}
		
		// Passes ace() calls directly to this AceObj, returning the AceObj represented by this aceID. Does not replace the currently loaded entity.
		this.ace = function AceAccessObj_ace(aceID) {
			return aceObj.ace(aceID);
		}
		
		// Used internally to pass calls into this AceObj.
		this.aceCall = function aceCall(callObj) {
			var thisCaller = aceCall.caller;
			if (thisCaller != caller) {  // Fix? Intended to ensure that only the creator widget is granted call access to the ACE and AceObj instances.
				// Fix! return; Error, Security, Notification handling. Disabled for testing.
			}
			if (typeof(callObj) == 'string') { // For single aceID calls to the aceObj
				aceObjLoad(callObj);
			} else if (typeOf(callObj) == 'object') {
				var command = callObj.command,  // Fix?  Although these vars should technically be instantiated at top of function automatically, does placing them here cause issues?
					domObj = null,
					jqrObj = null;
				
				if (!command) {
					return false;  // Fix. Error, Notification handling.
				} else if (command == 'login') {
					userName = aceLogin(callObj);
					if (userName) {
						
					}
				} else if (command == 'load') {
					return aceObjLoad(callObj.aceID);
				}
			} else {
				return null;  // Fix. Error handling, notification.
			}
		}
		
		
		// Internal Functions:
		
		
		// Logs in using a credentialed ACE object or a passed loginObj within callObj.
		function aceLogin(callObj) {
			var loginObj;
			if (callObj.ACE) {
				ACE = callObj.ACE;  // Fix? Ensure consistency between ACE and that in aceObj?
			} else if (callObj.loginObj) {
				ACE = ace(loginObj = callObj.loginObj);
			} else if (callObj.passHash || callObj.keyHash) {
				loginObj = {  // Fix?
					"login" : 1,
					"caller" : caller,
					"userName" : callObj.userName,
					"passHash" : callObj.passHash,
					"keyHash" : callObj.keyHash
				};
				ACE = ace(loginObj);
			}
			
			// if (!ACE) { 
				// ACE = ace(loginObj);
			// } else if (ACE.userLogin) {  // Fix? If logging in while already logged in.
				// // Fix. Perform user notifications for secondary user login. Skip or update interface.
				// if (ACE.userLogin(loginObj)) {
					// // Fix! Complete this.
				// }
			// } else {
				// // Fix. Error handling.
			// }
			return ACE.loggedIn("name");
		}
		
		// Swaps a passed aceObj or instantiated aceID out with the current one and adds the previous one to the history que.
		function aceObjLoad(aceID) {
			if (aceObj) { aceObjPrev.push(aceObj); }
			if (typeof(aceID) == "string") {
				if (aceObj) {
					aceObj = aceObj.ace(aceID);
				} else if (ACE) {
					aceObj = ACE.ace(aceID);
				} else {
					// Fix. Set trigger to load aceID once aceObj is available. Error handling, notification?
				}
			} else if (typeOf(aceID) == "object") {  // Fix. Do we want this possibility?
				//aceObj = aceID;
			}
			opt.struct = items = aceObj.get("gui");  // Fix. Latency cases.
			//var objLen = aceObj.get("sys.length");  // Fix. Testing.
			if (status != "initializing") { updateUI(); } // Fix? Added this check to circumvent ACE loading issue before first instantiation.
			status = "loaded";
		}
		
		// Updates the core attributes of this aceObjUI object based on the properties of the loaded aceObj.
		function updateUI() {
			var cor;
			if (!aceObj) { return false; }
			_AceUI.uiLoad();
			return true;
			
			// this.name = aceObj.get("name");
			// this.description = aceObj.get("description");
			// this.aceType = aceObj.get("aceType");
			// this.value = aceObj.get("value");
			// return this.aceID;  // Fix?
		}
		
		
		// Public methods:
		
		
		this.loggedIn = function _AceUI_LoginObj_loggedIn(callObj) {
			if (typeOf(ACE) == "object" && ACE.loggedIn) {
				userID = ACE.loggedIn();
				return userID;
			}
		}
		
		// Used to restrict possible items accessible to widget.  // Fix. Can be more efficient, and ideally should use items["sec"] settings of AceObj.
		this.item = function(itemName) {  // Fix. Ensure this returns these indirectly by value to avoid possible modification.
			if (!itemName || itemName == "items") {
				return items;  // Fix! Security settings.
			} else if (itemName == "typeUI") {
				return typeUI;
			} else if (itemName == "aceID") {
				return aceID;
			} else if (itemName == "userName") {
				return userName;  // Fix? Security issue?
			} else if (itemName == "aceObj") {
				return aceObj;  // Fix. Security issue.
			} else if (itemName == "item") {
				return aceID;
			} else {
				// Fix. Error handling, notification.
			}
		}
		
		// Used to verify access to identical AceAPI objects. Caller passes the value returned by their own ACE.aceCheck(); If it's returned as "verified" here, the two ACE instances match.
		this.aceCheck = function _AceUI_LoginObj_aceCheck(keyString) {
			return localACE.aceCheck(keyString);
		}
			
		
		initialize();
	} //AceAccessObj
	
	
	// Pulls any object structure from the html element if set that way.  // Fix. Move this and other utility functions outside of widget.
		function uiObjParse(thisAceUI) {
			var domElem = thisAceUI.element,
				elemID = $(domElem).attr("id"),
				html = $(domElem).html(),
				start, end, uiCall;
				
			if (html && ((start=html.indexOf("{")) != -1) && ((end=html.lastIndexOf("}")) != -1)) {
				uiCall = html.slice(start,end+1);  // Fix? Check for matching order and number of brackets?
				$(domElem).html(html=html.replace(uiCall,""));
				uiCall = JSON.parse(uiCall);  // Fix? Security and error checking?
			} else { uiCall = null; }
			
			return uiCall;
		}
		
		
// Widget specialization tools ////////////////////////////////////////////////////////////////////////
	
	
	// Creates state event called hoverintent, which allows activation of widgets when mouse hovers under conditions set using options.  (Taken directly from jQueryUI demo accordian hoverintent.html)
	function hoverIntent(sensitivity, interval) {
		var cfg = ($.hoverintent = {
			sensitivity: (sensitivity || 7),
			interval: (interval || 100)
		});
		
		$.event.special.hoverintent = {
			setup: function() {
				$( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
			},
			teardown: function() {
				$( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
			},
			handler: function( event ) {
				var self = this,
					args = arguments,
					target = $( event.target ),
					cX, cY, pX, pY;
				
				function track( event ) {
					cX = event.pageX;
					cY = event.pageY;
				};
				pX = event.pageX;
				pY = event.pageY;
				function clear() {
					target
						.unbind( "mousemove", track )
						.unbind( "mouseout", arguments.callee );
					clearTimeout( timeout );
				}
				function handler() {
					if ( ( Math.abs( pX - cX ) + Math.abs( pY - cY ) ) < cfg.sensitivity ) {
						clear();
						event.type = "hoverintent";
						// prevent accessing the original event since the new event
						// is fired asynchronously and the old event is no longer
						// usable (#6028)
						event.originalEvent = {};
						jQuery.event.handle.apply( self, args );
					} else {
						pX = cX;
						pY = cY;
						timeout = setTimeout( handler, cfg.interval );
					}
				}
				var timeout = setTimeout( handler, cfg.interval );
				target.mousemove( track ).mouseout( clear );
				return true;
			}
		};
	}//hoverIntent()
	
	hoverIntent(12, 50);  // Fix. Get behavior props from user preferences. Set individually?
	
}(jQuery)); //"ace.AceObjUI"




