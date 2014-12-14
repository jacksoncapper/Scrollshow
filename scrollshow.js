var scrollshowScripts = document.getElementsByTagName("script");
var scrollshowPath = scrollshowScripts[scrollshowScripts.length - 1].src;
scrollshowPath = scrollshowPath.substring(0, scrollshowPath.lastIndexOf("/"));

var iscroll = document.createElement("script");
iscroll.setAttribute("src", scrollshowPath + "/iscroll5.1.3.js");
document.getElementsByTagName("head")[0].appendChild(iscroll);

var styles = document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", scrollshowPath + "/scrollshow.css");
document.getElementsByTagName("head")[0].appendChild(styles);

var Scrollshow = {};

Scrollshow.start = function(scrollshowX, interval){
	interval = interval != null ? interval : 8000;
	scrollshowX.interval = interval;
	
	scrollshowX.className = scrollshowX.className + " scrollshow";
	
	var iScrollDiv = document.createElement("div");
	iScrollDiv.className = "iscroll";
	for(var i = 0; i < scrollshowX.childNodes.length; i++)
		if(scrollshowX.childNodes[i].nodeType == 1){
			iScrollDiv.appendChild(scrollshowX.childNodes[i]);
			i--;
		}
	scrollshowX.appendChild(iScrollDiv);
	
	function next(){
		if(scrollshowX.iscroll.x == scrollshowX.iscroll.maxScrollX)
			scrollshowX.iscroll.goToPage(0, 0);
		else
			scrollshowX.iscroll.next();
	}
	
	function reset(){
		clearInterval(scrollshowX.autoInterval);
		scrollshowX.autoInterval = setInterval(next, scrollshowX.interval);
	}
	
	if(scrollshowX.iscroll == null){
		scrollshowX.iscroll = new ScrollshowIScroll(scrollshowX, {
			snap: true,
			scrollX: true,
			scrollY: false,
			click:true
		});
		scrollshowX.iscroll.on("scrollStart", function(){ clearInterval(scrollshowX.autoInterval); });
		scrollshowX.iscroll.on("scrollEnd", reset);
	}
	else
		scrollshowX.iscroll.enable();

	var refreshSizes = function(){
		var div = scrollshowX.getElementsByTagName("div")[0];
		for(var i = 0; i < div.childNodes.length; i++)
			if(div.childNodes[i].nodeType == 1)
				div.childNodes[i].style.width = scrollshowX.offsetWidth + "px";
		scrollshowX.iscroll.refresh();
	};
	window.addEventListener("resize", refreshSizes);
	refreshSizes();
	reset();
};

Scrollshow.pause = function(scrollshowX){
	clearInterval(scrollshowX.autoInterval);
	delete scrollshowX.autoInterval;
	scrollshowX.iscroll.disable();
};

Scrollshow.stop = function(scrollshowX){
	delete scrollshowX.interval;
	clearInterval(scrollshowX.autoInterval);
	delete scrollshowX.autoInterval;	
	scrollshowX.iscroll.destroy();
	delete scrollshowX.iscroll;
};
