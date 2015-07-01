// ==UserScript==
// @name        AgarioMods evergreen script
// @namespace	 AgarioMods
// @version      1.9.9
// @description  community run mod feature set for agar.io
// @author       electronoob
// @match        http://agar.io/
// @match        https://agar.io/
// @updateURL    http://agariomods.com/mods.user.js
// @downloadURL  http://agariomods.com/mods.user.js
// @grant        none
// @run-at document-start
// ==/UserScript==

var ma = document.createElement('meta');
ma.setAttribute('http-equiv',"Content-Security-Policy");
ma.setAttribute('content',"script-src 'unsafe-inline' 'unsafe-eval' agariomods.com agar.io/js cdnjs.cloudflare.com www.google-analytics.com partner.googleadservices.com www.googletagservices.com securepubads.g.doubleclick.net pagead2.googlesyndication.com pubads.g.doubleclick.net cas.criteo.com;");
document.head.appendChild(ma);

document.addEventListener("DOMContentLoaded", function() {
var script = document.createElement('script');
script.src = document.location.protocol+"//agariomods.com/mods.js";
(document.body || document.head || document.documentElement).appendChild(script);
});

/*
repo:
https://github.com/electronoob/agarmods
http://www.agariomods.com
*/
