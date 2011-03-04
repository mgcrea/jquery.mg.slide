
 /*
 * jQuery Slide plugin
 *
 * Copyright (c) 2010 Magenta Creations. All rights reserved.
 * Licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License.
 *  Summary : <http://creativecommons.org/licenses/by-nc-sa/3.0/>
 *  Legal : <http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode>
 *
 * Royalty-free license for commercial purpose available on demand
 *
 * contact@mg-crea.com
 * http://mg-crea.com
 */

(function( $, console, undefined ) {

var defaults = {
	active: 'ui-state-active',
	easing: 'easeOutExpo',
	attribute: 'id',
	container: "body",
	zindex: 9,
	tempo: 300,
	debug: false,
};

if(!window.console || !window.console.log) console = {log : function(){}, warn : function(){}};

$.fn.extend({

	slide : function(direction, $next, callback, options) {

		options = $.extend(defaults, options);

		if(!options.debug) console = {log : function(){}, warn : function(){}};
		console.log('$.fn.slide', [direction, $next, callback, options]);

		var o = options,
			$current = this,
			$container = $(o.container),
			height = $current.height(),
			width = $current.width();

		var map = {
			top : [{top: height, left: 0}, {top: "-=" + height}],
			right : [{top: 0, left: -width}, {left: "+=" + width}],
			bottom : [{top: -height, left: 0}, {bottom: "+=" + height}],
			left : [{top: 0, left: width}, {left: "-=" + width}]
		};

		$next = (typeof($next) == 'string') ? $($next) : $next;

		if($next.get(0) != $current.get(0)) {

			$container.data("history", "#" + $current.attr(o.attribute)).data("history-transform", direction);

			$next.css($.extend({position: 'absolute', 'z-index' : o.zindex}, map[direction][0])).addClass(o.active);

			$current.css({opacity: .75}).add($next).animate($.extend({leaveTransforms: true, useTranslate3d: true}, map[direction][1]), o.tempo, o.easing, function() {
				$current.removeClass(o.active).removeAttr("style");
				$next.removeAttr("style");
				if($.isFunction(callback)) callback();
			});

		}
	}

});

})(jQuery, console);
