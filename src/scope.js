'use strict';

var _ = require('lodash');

function Scope(){

	// double-dollar means private in AngularJS
	this.$$watchers = [];

	function initWatchVal(){}

	Scope.prototype.$watch = function(watchFn, listenerFn){

		var watcher = {
			watchFn: watchFn,
			listenerFn: listenerFn,
			// since JavaScript functions are so-called reference values - they are not considered equal to anything but themselves.
			// P 39
			last: initWatchVal
		};

		this.$$watchers.push(watcher);

	};

	Scope.prototype.$digest = function(){
		// Pattern. Page 37.
		var self = this;
		var newValue, oldValue;
		_.forEach(this.$$watchers, function(watcher){
			newValue = watcher.watchFn(self);
			// First time, watcher.last is not assinged
			oldValue = watcher.last;
			if(newValue !== oldValue){
				watcher.last = newValue;
				watcher.listenerFn(newValue,oldValue,self);
			}
		});
	};
	
}

module.exports = Scope;