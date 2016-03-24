// ==UserScript==
// @name         Agariomods Userscript
// @namespace	 Agariomods
// @version      1.9.9.4
// @description  community run mod feature set for agar.io
// @author       Mevin1
// @updateURL    http://agariomods.com/mods.user.js
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

if (window.top !== window.self && window.top.location.hostname == window.self.location.hostname) {
	return;
}
if (window.location.protocol==="http:"){
	window.location="https"+window.location.href.substr(4);
} else {
	if(/Firefox/.test(navigator.userAgent)){
		var script = document.createElement('script');
		script.innerHTML = `console.log("Agariomods Initilizing");
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
		htmlRequest.open("GET", "https://connect.agariomods.com/a/index.html", true);
		htmlRequest.send();`;
		(document.body || document.head || document.documentElement).appendChild(script);
	} else {
		console.log("Agariomods Initilizing");
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
		htmlRequest.open("GET", "https://connect.agariomods.com/a/index.html", true);
		htmlRequest.send();
	}
}
