// ==UserScript==
// @name         Agariomods Evergreen Userscript
// @namespace	   Agariomods
// @version      1.9.9.2
// @description  community run mod feature set for agar.io
// @author       mevin1
// @updateURL    http://agariomods.com/mods.user.js
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

if(document.location.protocol!=="https:"){
    document.location.protocol="https:";
    return;
}
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
