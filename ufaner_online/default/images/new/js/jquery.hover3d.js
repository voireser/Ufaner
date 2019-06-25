/*
jQuery Hover3d
=================================================
Version: 1.0.0
Author: Rian Ariona
Website: http://ariona.net
Docs: http://ariona.github.io/hover3d
Repo: http://github.com/ariona/hover3d
Issues: http://github.com/ariona/hover3d/issues
*/

(function($){
	
	$.fn.hover3d = function(options){
		
		var settings = $.extend({
			selector      : null,
			perspective   : 1000,
			sensitivity   : 20,
			invert        : false,
			hoverInClass  : "hover-in",
			hoverOutClass : "hover-out"
		}, options);
		
		return this.each(function(){
			
			var $this = $(this),
				$card = $this.find(settings.selector);

			// Set perspective and transformStyle value
			// for element and 3d object	
			$this.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d"
			});
			
			$card.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d",
			});
			
			// Mouse Enter function, this will add hover-in
			// Class so when mouse over it will add transition
			// based on hover-in class
			function enter(){
				$card.addClass(settings.hoverInClass);
				
				setTimeout(function(){
					$card.removeClass(settings.hoverInClass);
				}, 1000);
			}
			
			// Mouse movement Parallax effect
			function move(event){
				var w      = $this.innerWidth(),
					h      = $this.innerHeight(),
					ax 	   = settings.invert ?  ( w / 2 - event.offsetX)/settings.sensitivity : -( w / 2 - event.offsetX)/settings.sensitivity,
					ay     = settings.invert ? -( h / 2 - event.offsetY)/settings.sensitivity :  ( h / 2 - event.offsetY)/settings.sensitivity;
					dy     = event.offsetY - h / 2,
					dx     = event.offsetX - w / 2,
					theta  = Math.atan2(dy, dx),
					angle  = theta * 180 / Math.PI - 90;
					
				if (angle < 0) {
					angle  = angle + 360;
				}
				

				$card.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateY("+ax+"deg) rotateX("+ay+"deg)"
				});
			}
			
			// Mouse leave function, will set the transform
			// property to 0, and add transition class
			// for exit animation
			function leave(){
				$card.addClass(settings.hoverOutClass);
				$card.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateX(0) rotateY(0)"
				});
				setTimeout( function(){
					$card.removeClass(settings.hoverOutClass);
				}, 1000 );
			}
			
			// Mouseenter event binding
			$this.on( "mouseenter", function(){
				return enter();
			});
			
			// Mousemove event binding
			$this.on( "mousemove", function(event){
				return move(event);
			});
			
			// Mouseleave event binding
			$this.on( "mouseleave", function(){
				return leave();
			});
			
		});
		
	};
	
}(jQuery));