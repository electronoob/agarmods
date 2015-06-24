// ==UserScript==
// @name        AgarioMods evergreen script
// @namespace	 AgarioMods
// @version      1.9.6
// @description  community run mod feature set for agar.io
// @author       electronoob
// @match        http*://agar.io/
// @grant        none
// ==/UserScript==

var script = document.createElement('script');
script.src = document.location.protocol + "//agariomods.com/mods.js";
(document.body || document.head || document.documentElement).appendChild(script);

/*
repo:
https://github.com/electronoob/agarmods
http://www.agariomods.com
*/
