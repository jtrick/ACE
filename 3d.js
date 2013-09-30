// aceModel.js  Copyright (c) The New Waters Foundation, all rights reserved.  For license see: http://OpenAce.org/license?id=aceModel.js


(function aceModel(){
	
	var $stage = $('#stage'),
		stage = null,  // Reference to Raphael stage associated with div #stage. 
		ball = null,
		loc = {x:0,y:0,z:0},  // Floating coordinate to track main testing element.
		xMax = 100,
		yMax = 100,
		zMax = 100,
		depth = 100,
		zD = .5,  // The depth into infinity that z:0 is. 1 is infinite, .5 is halfway from perspective to horizon, and 0 is no depth.
		zoomRatio = .5,
		ballMax = .05,
		box = {
			screen: null,
			front: null,
			back: null,
			angles: {lt:0,rt:0,lb:0,rb:0},
			svgs: {}
		},
		svgStyles = {
			btn: {
				'stroke': 'white',
				'stroke-opacity': .5,
				'cursor': 'pointer',
				'fill': 'white',
				'text-color': 'blue',
				'corners': 'auto'
			}
		},
		btns = {},
		screenObj = {},
		orbits = [];
		
	
	// Initialize once DOM fully loaded.
	$(function initAceModel(){
		initRaphael();
		calcBox();
		// makeButtons();
		drawBall({
			x:50,
			y:50,
			z:50
		},1);
		ACElogo();
		makeSpheres(4);
		orbit();
	});
	
	
	// Generates the nav buttons.
	function makeButtons() {
		var l = box.screen.x2+50,
			t = box.screen.y+50,
			w = 100,
			h = 50,
			c = 7,
			items = ['left','right','up','down','back','front'];
		
		$.each(items,function(n,nam){
			new Btn({
				id: 'btn-'+nam,
				l:l,
				t:t+=(h*1.5),
				w:w,
				h:h,
				txt: nam.toUpperCase(),
				exe: nam
			});
		});
		
	}
	
	
	// Populates box object using current screen ratio values.
	function calcBox() {
		if (!screenChanged()) { return; }  // Fix?
		var w = $stage.width(),
			h = $stage.height(),
			u = h > w ? w : h,  // Unit screen dimension.
			s = u == h ? 'h' : 'w',  // Smaller screen dimension.
			z = 0,
			l,r,t,b,  // left, right, top, bottom.
			o = {'stroke':'white','stroke-opacity':.5},
			el = null;
		
		ballMax *= u;
		$.each(box.svgs,function(n,svg){svg.remove();});
		box.svgs = {};
		
		s = box.screen = {
			x: l=(w-u)/2 || 0,
			y: t=(h-u)/2 || 0,
			x2: r=(l+u),
			y2: b=(t+u),
			w: w=u,
			h: h=u,
			l: l,
			t: t,
			r: r,
			b: b,
			u: u
		};
		s.l=s.x;s.r=s.x2;
		box.svgs.screen = stage.rect(l,t,w,h).attr(o);
		b = box.back = {
			x: (l+=((r-l-(w*=zoomRatio))/2)),
			y: (t+=(b-t-(h*=zoomRatio))/2),
			x2: r=(l+w),
			y2: b=(t+h),
			w: w,
			h: h,
			l: l,
			t: t,
			r: r,
			b: b,
			u: w<h?w:h
		};
		box.svgs.back = stage.rect(l,t,w,h).attr(o);
		box.svgs.lines = stage.path(
			'M'+s.x+','+s.y+'L'+b.x+','+b.y+
			'M'+s.x2+','+s.y+'L'+b.x2+','+b.y+
			'M'+s.x+','+s.y2+'L'+b.x+','+b.y2+
			'M'+s.x2+','+s.y2+'L'+b.x2+','+b.y2
		).attr(o);
		
		box.angles.lt = Raphael.angle(b.x, b.y, s.x, s.y);
		box.angles.lb = Raphael.angle(b.x, b.y2, s.x, s.y2);
		box.angles.rt = Raphael.angle(b.x2, b.y, s.x2, s.y);
		box.angles.rb = Raphael.angle(b.x2, b.y2, s.x2, s.y2);
		
		
		// o.fill = 'white';
		// o.cursor = 'pointer';
		// u = $.extend({},o,{'fill':'blue','font-size':30});
		
		// el = stage.rect(l=box.screen.x2+50,t=box.screen.y+50,w=100,h=50,7);
		// el.attr(o);
		// el.click(function leftBtnClick(){
			// log(move,'clicked');
			// move({x:-10});
		// });
		// stage.text(l+w/2, t+h/2, "Left").attr(u);
	}
	
	
	function initRaphael() {
		stage = Raphael("stage");
		
		Raphael.fn.sphere = function (x, y, r, hue) {
			hue = hue || 0;
			return this.set(
				// this.ellipse(x, y + r - r / 5, r, r / 2).attr({fill: "rhsb(" + hue + ", 1, .25)-hsb(" + hue + ", 1, .25)", stroke: "none", opacity: 0})
				this.ellipse(x, y, r, r).attr({fill: "r(.5,.9)hsb(" + hue + ", 1, .75)-hsb(" + hue + ", .5, .25)", stroke: "none"}),
				this.ellipse(x, y, r - r / 5, r - r / 20).attr({stroke: "none", fill: "r(.5,.1)#ccc-#ccc", opacity: 0})
			);
		};
	
	}
	
	
	// Instantiates the ACE symbol to the stage.  obj can contain any of the following: {x,y,z,r}
	function ACElogo(obj) {
		var svg = stage.set(),
			o = $.extend({x:xMax/2,y:yMax/2,z:zMax/2,r:1},obj||{}),
			// mod = 0.8742010375763134,  // 3*ballMax/104.667,
			// x = 411.498-359.73197856057783,
			// y = 390.25-341.1569549141563,
			// circ = stage.circle(306.661, 395.557, 104.667).attr({fill:'#c53838'}),
			circ = stage.sphere(306.661, 395.557, 104.667,1),
			seg1 = stage.path("M201.994,400.75c-12.083-1-18.708-7.625-11.458-18.875c6.347-9.848,41.875-42.85,108.509-42.85c41.52,0,86.107,7.595,97.64,31.161c-45.677-13.447-120.7-1.449-122.278,21.343c-1.579,22.792,28.334,22.387,28.334,22.387s-42.737,1.144-39.459-23.384c4.373-32.7,94.041-33.44,106.896-30.741c-9.647-12.058-48.202-14.804-70.462-14.804c-24.304,0-97.721,14.387-107.942,41.765C187.465,398.292,201.994,398.375,201.994,400.75z"),
			seg2 = stage.path("M411.498,390.25c12.083,1,18.708,7.625,11.458,18.875c-6.347,9.848-41.875,42.85-108.509,42.85c-41.52,0-86.107-7.596-97.64-31.162c45.677,13.447,120.7,1.449,122.278-21.343c1.579-22.792-28.334-22.387-28.334-22.387s42.737-1.143,39.459,23.384c-4.373,32.699-94.041,33.439-106.896,30.74c9.647,12.059,48.202,14.805,70.462,14.805c24.304,0,97.721-14.387,107.942-41.766C426.027,392.708,411.498,392.625,411.498,390.25z"),
			
			// Manually modified versions:
			// circ = stage.circle(0, 0, 3*ballMax).attr({fill:'#c53838'}),
			// seg1 = stage.path("M 107,-20 c12.071,1.005,18.686,7.629,11.44,18.873c-6.347,9.848,-41.875,42.85,-108.509,42.85c-41.52,0,-86.107,-7.596,-97.64,-31.162c45.677,13.447,120.7,1.449,122.278,-21.343c1.579,-22.792,-28.334,-22.387,-28.334,-22.387c0,0,42.737,-1.143,39.459,23.384c-4.373,32.699,-94.041,33.439,-106.896,30.74c9.647,12.059,48.202,14.805,70.462,14.805c24.304,0,97.721,-14.387,107.942,-41.766c4.309,-11.538,-10.22,-11.621,-10.22,-13.996c0,0,0,0,0,0"),
			// seg2 = stage.path("M0,0c-12.071,-1.005,-18.686,-7.629,-11.44,-18.873c6.347,-9.848,41.875,-42.85,108.509,-42.85c41.52,0,86.107,7.595,97.64,31.161c-45.677,-13.447,-120.7,-1.449,-122.278,21.343c-1.579,22.792,28.334,22.387,28.334,22.387c0,0,-42.737,1.144,-39.459,-23.384c4.373,-32.7,94.041,-33.44,106.896,-30.741c-9.647,-12.058,-48.202,-14.804,-70.462,-14.804c-24.304,0,-97.721,14.387,-107.942,41.765c-4.309,11.54,10.22,11.623,10.22,13.998c0,0,0,0,0,0"),
			
			// Original imported versions:
			// circO = stage.circle(306.661, 395.557, 104.667).attr({fill:'#c53838'}),
			// seg1O = stage.path("M201.994,400.75c-12.083-1-18.708-7.625-11.458-18.875c6.347-9.848,41.875-42.85,108.509-42.85c41.52,0,86.107,7.595,97.64,31.161c-45.677-13.447-120.7-1.449-122.278,21.343c-1.579,22.792,28.334,22.387,28.334,22.387s-42.737,1.144-39.459-23.384c4.373-32.7,94.041-33.44,106.896-30.741c-9.647-12.058-48.202-14.804-70.462-14.804c-24.304,0-97.721,14.387-107.942,41.765C187.465,398.292,201.994,398.375,201.994,400.75z"),
			// segO = stage.path("M411.498,390.25c12.083,1,18.708,7.625,11.458,18.875c-6.347,9.848-41.875,42.85-108.509,42.85c-41.52,0-86.107-7.596-97.64-31.162c45.677,13.447,120.7,1.449,122.278-21.343c1.579-22.792-28.334-22.387-28.334-22.387s42.737-1.143,39.459,23.384c-4.373,32.699-94.041,33.439-106.896,30.74c9.647,12.059,48.202,14.805,70.462,14.805c24.304,0,97.721-14.387,107.942-41.766C426.027,392.708,411.498,392.625,411.498,390.25z"),
			
			// Modifiers:
			// seg1Str = seg1.getSubpath(0,seg1.getTotalLength()),
			// newSeg1 = stage.path(Raphael.pathToRelative(seg1Str)),
			// newSeg1Str = Raphael.pathToRelative(newSeg1.getSubpath(0,newSeg1.getTotalLength())).toString(),
			scale = o.r*ballMax*o.z/zMax;  // Fix. Adjust to scale of image.
		// log(x,'x');
		// log(y,'y');
		// log(newSeg1Str,'newSeg1Str');
		// svg.push(seg1).attr({fill:'blue'}).push(circ).attr({stroke:'none'});
		svg.push(seg1,seg2).attr({fill:'white'}).push(circ).attr({stroke:'none'});
		svg.transform('T-150,-250');  // Fix. +'S'+scale);
		// move({X:50,Y:50,Z:50});
		
		
		// Comparison:
		var svg2 = stage.set(),
			circ2 = stage.circle(306.661, 395.557, 104.667).attr({fill:'#c53838'}),
			seg3 = stage.path("M201.994,400.75c-12.083-1-18.708-7.625-11.458-18.875c6.347-9.848,41.875-42.85,108.509-42.85c41.52,0,86.107,7.595,97.64,31.161c-45.677-13.447-120.7-1.449-122.278,21.343c-1.579,22.792,28.334,22.387,28.334,22.387s-42.737,1.144-39.459-23.384c4.373-32.7,94.041-33.44,106.896-30.741c-9.647-12.058-48.202-14.804-70.462-14.804c-24.304,0-97.721,14.387-107.942,41.765C187.465,398.292,201.994,398.375,201.994,400.75z"),
			seg4 = stage.path("M411.498,390.25c12.083,1,18.708,7.625,11.458,18.875c-6.347,9.848-41.875,42.85-108.509,42.85c-41.52,0-86.107-7.596-97.64-31.162c45.677,13.447,120.7,1.449,122.278-21.343c1.579-22.792-28.334-22.387-28.334-22.387s42.737-1.143,39.459,23.384c-4.373,32.699-94.041,33.439-106.896,30.74c9.647,12.059,48.202,14.805,70.462,14.805c24.304,0,97.721-14.387,107.942-41.766C426.027,392.708,411.498,392.625,411.498,390.25z");
		svg2.push(seg3,seg4).attr({fill:'white'}).push(circ2).attr({stroke:'none'});
		svg2.transform('T-150,0');
	}//ACElogo()
	
	
	// Draws a ball at the given coordinates as {x:0,y:0,z:0}.
	function drawBall(coord, color) {
		coord = coord || {};
		var x = coord.x || xMax/2, 
			y = coord.y || yMax/2,
			z = coord.z || zMax/2;
		loc={x:x,y:y,z:z};
		color = color || Math.random();
		ball = stage.sphere(0, 0, ballMax*4, color);  // Fix!
		move({X:loc.x,Y:loc.y,Z:loc.z}, ball);
	}
	
	
	function makeSpheres(numSpheres) {
		var num = 3;
		while (num--) { orbits.push(stage.sphere(0,0,ballMax,1));log(orbits,'num: '+num) }  // (num+.25)
	}
	
	
	function orbit() {
		var t = (now()%(1000*60))/1000,
			s1 = 50+Math.sin(t)*50,
			c1 = 50+Math.cos(t)*50,
			s2 = 50+Math.sin(-t)*50,
			c2 = 50+Math.cos(-t)*50;
		move({X:s2,Y:c1,Z:c2},orbits[1]);  // blue
		move({X:c2,Y:s1,Z:s2},orbits[2]);  // red
		move({X:s1,Y:c2,Z:s1},orbits[0]);  // green
		// move({X:c2,Y:s2,Z:c2},orbits[2]);  // purple
		delay(orbit,30);
	}
	
	
	// Moves an object on the 3D stage. Capital coords are absolute stage coords, lowercase is movement relative to the object's current location.
	function move(coord, obj) {
		coord = coord || {};
		var zero = -1,  // Fix. Temporary hack.
			x = is(coord.X)&&(coord.X||-1) || is(coord.x)&&(loc.x+coord.x||-1) || loc.x,
			y = is(coord.Y)&&(coord.Y||-1) || is(coord.y)&&(loc.y+coord.y||-1) || loc.y,
			z = is(coord.Z)&&(coord.Z||-1) || is(coord.z)&&(loc.z+coord.z||-1) || loc.z,
			r = zD+z*zD/zMax,
			to = to2D(loc={
				x: (x>xMax&&xMax||x>0&&x||0),
				y: (y>yMax&&yMax||y>0&&y||0),
				z: (z>zMax&&zMax||z>0&&z||0)
			}),
			XY = {x:toX(to.x),y:toY(to.y)};
		obj = obj || ball;
		// obj.attr({x:XY.x,y:XY.y,cx:XY.x,cy:XY.y}).transform('S'+(r>1&&1||r<zD&&zD||r));
		obj.transform('T'+XY.x+','+XY.y+'S'+(r>1&&1||r<zD&&zD||r));
		// log({from:loc,coord:coord,to:to,XY:XY,obj:obj});
	}
	
	
	// Takes a 3D coordinate and converts the perspective into a 2D representation within the 3D stage.
	function to2D(coord) {
		var x = coord.X || coord.x,
			y = coord.Y || coord.y,
			z = coord.Z || coord.z,
			to = {};
		if (!is(x)||!is(y)||!is(z)) { return log(coord,'Incomplete coord set!'); }  // Fix! How to handle incomplete coords? Is 0 a valid coord?
		
		var off = (x-xMax/2),
			zMod = 1-(z/zMax),
			zSub = (zMax-z)/zMax,
			tot = 0;
			
		x -= off*zMod*zD;
		// log({off:off,zMod:zMod,zSub:zSub,tot:x});
		y -= (y-yMax/2)*(1-(z/zMax))*zD;
		return {x:x,y:y};
	}
	
	
	// Translates relative box coords to stage coordinates. (dir can only be 'x' or 'y').
	function toXY(val,dir) {
		(dir=='y')||(dir='x');
		// dir=(dir=='y')?'y':'x';
		return box.screen[dir]+box.screen.u*val/(dir=='y'&&yMax||xMax);
	}
	
	function toX(val) {
		var xP = loc.x
		return box.screen.l+box.screen.u*val/xMax; 
	}  // Shortcut.
	
	function toY(val) { return box.screen.t+box.screen.u*val/yMax; }  // Shortcut.
	
	
	// Draws an outline of the spatial coordinate system
	function showPerspective() {
		
	}
	
	
	// Translates the relevant object keys into uniform screen coordinates.
	function transPos(obj) {
		return obj;  // Fix!
	}
	
	
	// Gets the global class object if it exists.
	function svgClass(name) {
		return svgStyles[name] || {};
	}
	
	
	// Returns true if the screen has changed size since the last check.
	function screenChanged() {
		var hasChanged,
			screenCheck = {
				sw: screen.width,
				sh: screen.height,
				dw:	document.documentElement.clientWidth,
				dh: document.documentElement.clientHeight,
			};  //$.extend({},)
		screenCheck.u = (screenCheck.sw<screenCheck.sh) ? screenCheck.sw : screenCheck.sh;
		$.each(screenObj,function(key,val){
			if (hasChanged = (screenCheck[key]==val) ? false : true) { return false; }
		});
		screenObj = screenCheck;
		if (!is(hasChanged)) { return true; }
		return hasChanged;
	}
	
	
	
	// Objects ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	// A 3D emulated space, which will translate coords in 3 dimensions for the objcts on it.
	function Stage3D(vals) {
		var _this = this,
			svg = stage.set(),
			v = $.extend({
				typ : 'stage3D',
				id : null,
				cls: 'stage3D',
				par: '',
				stage: stage
			},vals||{});
		
		
	}//Stage3D
	
	
	// A basic button widget.  vals can be used to set attributes of the button, 
	function Btn(vals, pVals) {
		var _this = this,
			svg = stage.set(),
			btn = null,
			txt = null,
			ovr = null,
			v = $.extend({
				typ : 'btn',
				id : null,
				cls: 'btn',
				lbl: null,
				txt: '',
				img: null,
				par: '',
				tgt: '',
				exe: null
			},pVals||{},vals||{}),
			p = transPos(v),
			l,r,t,b,x,y,z,w,h,c,
			sty = svgClass(v.cls);
		
		l = p.l;
		t = p.t;
		w = p.w;
		h = p.h;
		c = p.c||sty.corners&&h*.1||0;
		svg.push(btn=stage.rect(l,t,w,h,c));
		svg.attr(svgClass(v.cls));
		c = sty['text-color'] || 'black';
		svg.push(txt=stage.text(l+w/2, t+h/2, v.txt).attr({stroke:c,fill:c,'font-size':h*.5,'cursor':sty.cursor||'auto'}));
		svg.click($.isFunction(v.exe)&&v.exe||btnClick(v.exe));
		
		
		if (btns[v.id]) {
			// Fix! What happens if id already exists?
		}
		btns[v.id] = this;
		
		// The default click functionality for buttons.
		function btnClick(dir) {
			var dirs = {
				left: {x:-10},
				right: {x:10},
				up: {y:-10},
				down: {y:10},
				back: {z:-10},
				front: {z:10}
			};
			if (dirs[dir]) { 
				return function btnClicked() {
					log(dir);
					move(dirs[dir]);
				}
			}
		}
		
		
		// Public Methods:
		
		this.get = function(name) { return v[name]; }
		this.set = function(name, val) { return (v.hasOwnProperty(name) && (v[name]=val)); }  // Fix? Add safety checks?
		
		this.clear = function(options) {
			
		}
		
	}//Btn
	
	

})();


//  Utility functions  //////////////////////////////////////////////////////////////////////////////////////////////////////


 
// Shortcut for window.setTimeout(). Set ms=false to clear an existing queued function.
	function delay(fnc, ms, args) {
		var name = null, 
			timeOut = null, 
			func = null,
			timers = timersObj();
		
		if (!fnc) {
			return timers;
		} else if (typeof(fnc)=='string') {
			name = fnc;
		} else if ($.isFunction(fnc)) {
			name = fnc.name || now();
			func = function delayFired(){  // Fix.
				if (name) { 
					delete timers[name];
					// log(timers, 'Timer "'+name+'" fired. Deleting from timers.'); 
				}
				fnc(args);
			};
		}
		if (name) {
			if (timers[name]) { window.clearTimeout(timers[name]); }
			if (ms===false) { 
				delete timers[name];
				// log(timers, 'Deleted timer "'+name+'"');
			} else if (func) {
				timeOut = timers[name] = window.setTimeout(func, ms);
			}
		}
		return timeOut;
		
		function timersObj() {
			return timers || {};
		}
	}
	
	
	// Shortcut for window.console() output.
	function log(obj,msg,tgt) {
		if (isStr(tgt) && tgt!='log' && tgt!='console' && (tgt=document.getElementById(tgt))) {
			msg = '<span style="{color:blue;}">'+log.caller.name+'()'
				+(msg&&'</span> <span style="{color:red;}">["'+msg+'"]'||'')+':</span> ';
			// Fix. Add object.
			tgt.innerHTML += '<br>'+msg;
		} else {
			console.log(log.caller.name+'()'+(msg&&' ["'+msg+'"]: '||': '),obj);
		}
	}
	
	
	// Shorthand for Date.now().
	function now() {
		return Date.now();
	}
	
	
	// Shorthand for comparison to undefined.
	function isStr(obj) {
		return (typeof obj == 'string');
	}
	
	
	// Shorthand for comparison to undefined.
	function is(val) {
		return (typeof val != 'undefined');
	}
	
	
	// Shorthand for document.getElementById();
	function byID(id) {
		return document.getElementById(id);
	}

