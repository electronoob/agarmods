// ==UserScript==
// @name         Iomods
// @namespace	 Iomods
// @version      2.0
// @description  community run mod feature set for agar.io and slither.io
// @author       Mevin1
// @match        http://slither.io/*
// @match        https://slither.io/*
// @match        http://agar.io/*
// @match        https://agar.io/*
// @updateURL    https://iomods.com/mods.user.js
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

if (window.location.hostname=="agar.io"&&window.location.protocol==="http:"){
	window.location="https"+window.location.href.substr(4);
} else if (~["agar.io","slither.io"].indexOf(window.location.hostname)) {
	if(/Firefox/.test(navigator.userAgent)){
		var script = document.createElement('script');
		script.innerHTML = `console.log("Iomods Initilizing");
			document.open();
			document.close();
			var htmlRequest = new XMLHttpRequest();
			htmlRequest.onreadystatechange = function() {
				if (htmlRequest.readyState == 4 && htmlRequest.status == 200) {
					document.onreadystatechange = function(){
						if(document.readyState!="complete")return;
						console.log("Caching downloaded DOM");
						document.write(htmlRequest.responseText);
						document.close();
					}
				}
			};
			htmlRequest.open("GET", "https://${window.location.hostname}mods.com/mod/index.html", true);
			htmlRequest.send();`;
		document.head.appendChild(script);
	} else {
		console.log("Iomods Initilizing");
		document.open();
		document.close();
		var htmlRequest = new XMLHttpRequest();
		htmlRequest.onreadystatechange = function() {
			if (htmlRequest.readyState == 4 && htmlRequest.status == 200) {
				console.log("Caching downloaded DOM");
				document.write(htmlRequest.responseText);
				document.close();
			}
		};
		htmlRequest.open("GET", `https://${window.location.hostname}mods.com/mod/index.html`, true);
		htmlRequest.send();
	}
}
