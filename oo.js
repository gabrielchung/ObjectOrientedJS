function ObjFactory() {
	this.createObj = function(objName) {
		
		var obj = new window[objName]();
		var objInterface;
		
		if (typeof(obj.interfaces) != 'undefined')
			
			for (var i in obj.interfaces) {
				
				console.log(obj.interfaces[i]);
				
				objInterface = new window[obj.interfaces[i]]();
										
				for (var j in objInterface.prototype.methods) {
										
					if (typeof(obj[objInterface.prototype.methods[j]]) != 'function')
						console.error('function ('+objInterface.prototype.methods[j]+') is not implemented for interface ('+obj.interfaces[i]+')');
				}
				
			} 
		
	}
}

function Interface() {
	this.methods = [];
}

function Foo() {
	//this.interfaces = ['IBuildable', 'IClickable'];
	this.interfaces = ['IBuildable', 'IClickable'];
	this.build = function() { console.log('build'); }
	this.destroy = function() { console.log('destroy'); }
}

function IBuildable() {
	this.prototype = new Interface();
	this.prototype.methods.push('build');
	this.prototype.methods.push('destroy');
}

function IClickable() {
	this.prototype = new Interface();
	this.prototype.methods.push('click');
}

of = new ObjFactory(); of.createObj('Foo');