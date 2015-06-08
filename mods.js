var ourskins = "1up;8ball;transformer;agariomods.com;albania;android;anonymous;apple;atari;awesome;baka;bandaid;bane;baseball;basketball;batman;beats;bender;bert;bitcoin;blobfish;bobross;bobsaget;boo;boogie2988;borg;bp;breakfast;buckballs;burgundy;butters;byzantium;charmander;chechenya;chickfila;chocolate;chrome;cj;coca cola;cokacola;controless;converse;cornella;creeper;cyprus;czechrepublic;deadpool;deal with it;deathstar;derp;dickbutt;doge;doggie;dolan;domo;domokun;dong;donut;dreamcast;drunken;ebin;egg;egoraptor;egypt;electrokitty;epicface;expand;eye;facebook;fast forward;fastforward;fbi;fidel;finn;firefox;fishies;flash;florida;freeman;freemason;friesland;frogout;fuckfacebook;gaben;garfield;gaston;getinmybelly;getinthebox;gimper;github;giygas;gnomechild;gonzo;grayhat;halflife;halflife3;halo;handicapped;hap;hatty;hebrew;heisenburg;helix;hipsterwhale;hitler;honeycomb;hydro;iceland;ie;illuminati;imgur;imperial japan;imperialjapan;instagram;isaac;isis;isreal;itchyfeetleech;ivysaur;james bond;java;jew;jewnose;jimmies;kappa;kenny;kingdomoffrance;kingjoffrey;kirby;kitty;klingon;knightstemplar;knowyourmeme;kyle;ladle;lenny;lgbt;libertyy;liechtenstien;linux;love;luigi;macedonia;malta;mario;mars;maryland;masterball;mastercheif;mcdonalds;meatboy;meatwad;megamilk;mike tyson;mlg;moldova;mortalkombat;mr burns;mr.bean;mr.popo;n64;nasa;nazi;nick;nickelodeon;nipple;northbrabant;nosmoking;notch;nsa;obey;osu;ouch;pandaexpress;pedo;pedobear;peka;pepe;pepsi;pewdiepie;pi;pig;piggy;pika;pinkfloyd;pinkstylist;piratebay;pizza;playstation;poop;potato;quantum leap;rageface;rewind;rockstar;rolfharris;rss;satan;serbia;shell;shine;shrek;sinistar;sir;skull;skype;skyrim;slack;slovakia;slovenia;slowpoke;smash;snafu;snapchat;soccer;soliare;solomid;somalia;space;spawn;spiderman;spongegar;spore;spy;squirtle;starbucks;starrynight;stitch;stupid;summit1g;superman;taco;teamfortress;tintin;transformers;triforce;trollface;tubbymcfatfuck;turkey;twitch;twitter;ukip;uppercase;uruguay;utorrent;voyager;wakawaka;wewlad;white  light;windows;wwf;wykop;yinyang;ylilauta;yourmom;youtube;zoella;zoidberg";

var showsh = false;

var showfps = false;

setInterval(function(){if (showsh) DrawStats(false);},500);

var gamejs = "", modBlocking = true;
var tester = document.getElementsByTagName("script");
var i = 0, main_out_url = "http://agar.io/main_out.js", discovered_mainouturl = 0;
var W = '';
var Ja = '';
var b = '';
var c3eg2 = '';

		
/*bgm*/
var bgmusic = '';
$('#audiotemplate').clone()[0];
var tracks = ['BotB 17936 Isolation Tank.mp3','BotB 17934 bubblybubblebubblingbubbles.mp3','BotB 17935 bloblobloblboblbolboblboblbobolbloblob.mp3','BotB 17937 Woofytunes.mp3','BotB 17938 slowgrow.mp3'];
/*sfx*/
var sfxs = [
    'pellet',
    'split',
    'eat',
    'spawn',
    'bounce',
    'merge',
    'virusfeed',
    'virusshoot',
    'virushit',
    'gameover'
];
function sfx_event(id) {
    if (document.getElementById("sfx").value==0) return;
	var event = sfxs[id];
    var sfx = new Audio("http://skins.agariomods.com/botb/sfx/" + event + ".mp3");
    sfx.loop = false;
	sfx.volume = document.getElementById("sfx").value;
    sfx.play();
    sfx.onended = function() {
        $(this).remove();
    }
}
/* lets start to deal with regressions */
var test = 0;
var passed = 0;
var failed = 0;

var chart_update_interval = 10;
var chart = null;
var chart_data = [];
var chart_counter = 0;
var chart_s = '';
var chart_m = '';
var chart_G = '';
var chart_Na= '';
var chart_k = '';

for (i=0; i<tester.length; i++ ){
	src = tester[i].src;
	if (src.substring(0, main_out_url.length ) == main_out_url) {
		discovered_mainouturl = src.replace("http://agar.io/","");
	}
}

if(discovered_mainouturl != 0) {
	httpGet(discovered_mainouturl, function(data) {
		gamejs = "window.agariomods = " + data.replace("socket open","socket open (agariomods.com mod in place)");
		gamejs = gamejs.replace(/\n/g, "");
		offset = gamejs.search("..=\"poland;");
		Ja =  gamejs.substr(offset,2);
		offset = gamejs.search(".....src=\"skins");
		b = gamejs.substr(offset+2,1);
		offset = gamejs.search(".."+b+"..src");
		W = gamejs.substr(offset,1);
		var components = /strokeText\((.{1,14})\);/.exec(gamejs);
		c3eg2 = components[1];
		var components = /\((.)\=..x,.\=..y\)/.exec(gamejs);		
		chart_s = components[1];
		var components = /\(.\=(.).x,.\=..y\)/.exec(gamejs);
		chart_m = components[1];
		var components = /(.)\=Math.max\(.,..\(\)\);/.exec(gamejs);
		chart_G = components[1];
		var components = /.\=Math.max\(.,(..)\(\)\);/.exec(gamejs);
		chart_Na = components[1];
		var components = /(.)\[0\]\.name\&\&\(/.exec(gamejs);
		chart_k = components[1];
		//console.log ("chartmod info: chart_m = "+chart_m+";  chart_s = "+chart_s+"; chart_G = "+chart_G+"; chart_Na = "+chart_Na+"; chart_k = "+chart_k);
		agariomodsRuntimeInjection();
	});
}

// XMLHttp, because apparently raven is doing funky stuff with jQuery
function httpGet(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	};
}
function agariomodsRuntimeInjection() {
	var script = document.createElement("script");
	script.src='//cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js';
        document.head.appendChild(script);
	var tester = document.getElementsByTagName("head");
	var oldhtml = tester[0].innerHTML;
	oldhtml = oldhtml.replace('width:350px;', '');
	oldhtml = oldhtml.replace('-webkit-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('-ms-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('top:50%;left:50%;','margin:10px;');
	tester[0].innerHTML = oldhtml;
	var script = document.createElement("script");
	agariomodsRuntimePatches();
	script.innerHTML = gamejs;
	document.head.appendChild(script);
	agariomodsRuntimeHacks();
	bgmusic = $('#audiotemplate').clone()[0];
	bgmusic.volume = 0.2;
	window.onbeforeunload = function() {
		return 'Are you sure you want to quit agar.io?';
	};
	// as a trackpad user, this fix should reduce the frequency at which I am killed.
	$("#canvas").on('mousedown', function(event){
		event.preventDefault();
	});
        $("#chart-container").on('mousedown', function(event){
                event.preventDefault();
        });
        $("#chart-container-agariomods").on('mousedown', function(event){
                event.preventDefault();
        });
        $("#fps-agariomods").on('mousedown', function(event){
                event.preventDefault();
        });

}
function agariomodsRuntimePatches() {
        gamejs = gamejs.replace(';reddit;',';reddit;'+ourskins+';');
        gamejs = gamejs.replace(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0) && (ourskins.split(";").indexOf('+b+')>-1)) {agariomods="http://skins.agariomods.com/i/"+'+b+'+".png";} else if ('+b+'.substring(0, 2) == "i/") {agariomods="http://i.imgur.com/"+this.name.substring(2)+".jpg";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase() + ".png";}');
        gamejs = gamejs.replace(W +'['+b+'].src="skins/"+'+b+'+".png"',W+'['+b+'].src=agariomods');
        gamejs = gamejs.replace("this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")", "if (String(c).substring(0, 2) != \"i/\") {this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")}");
        gamejs = gamejs.replace(b+"=this.name.toLowerCase();", b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;");
    gamejs = addChartHooks(gamejs);
    gamejs = addOnCellEatenHook(gamejs);
    gamejs = addOnShowOverlayHook(gamejs);
    gamejs = addLeaderboardHook(gamejs);
    gamejs = addOnDrawHook(gamejs)
	//gamejs = gamejs.replace('('+chart_s+'='+chart_m+'.x', '(ResetChart(), '+chart_s+'='+chart_m+'.x');
	//gamejs = gamejs.replace(chart_G+'=Math.max('+chart_G+','+chart_Na+'());', 'var current = '+chart_Na+'();'+chart_G+' = Math.max('+chart_G+', current);');
	//gamejs = gamejs.replace('setValue("Score:','setValue("Current: " + ~~(current / 100) + "  High:');
	//gamejs = gamejs.replace('24-10,b+10,34),','24, 300, 24),');
	//gamejs = gamejs.replace('10-24-5));','10-24-5), ('+chart_k+' && '+chart_k+'[0] && UpdateChart(current/100, GetRgba('+chart_k+'[0].color, 0.4))));');
	console.log ("Begin regression testing of agariomods.com userscript.");
	testCondition((-1 != gamejs.indexOf(';reddit;'+ourskins)), test++, "add our skinlist to the original game skinlist.");
	testCondition((-1 != gamejs.indexOf('var agariomods="";var ourskins'  )), test++, "add check for which skin mode we are in. be it no skin, default skin, imgur skin, or an agariomods skin.");
	testCondition((-1 != gamejs.indexOf('else if ('+b+'.substring(0, 2) == "i/") {agariomods' )),test++,"add imgur check #1");
	testCondition((-1 != gamejs.indexOf( b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;"  )), test++, "add imgur check #2.");
	testCondition((-1 != gamejs.indexOf(W+'['+b+'].src=agariomods')), test++, "add agariomods variable to replace src of image");
	testCondition((-1 != gamejs.indexOf("if (String(c).substring(0, 2) != \"i/\") {this._stroke")), test++, "add imgur check for hiding username when using imgur id");
	//testCondition((-1 != gamejs.indexOf('(ResetChart(), '+chart_s+'='+chart_m+'.x')), test++, "add mikes call to resetchart");
	//testCondition((-1 != gamejs.indexOf('var current = '+chart_Na+'();'+chart_G+' = Math.max('+chart_G+', current);')),  test++, "add mikes current score buffer");
	//testCondition((-1 != gamejs.indexOf('setValue("Current: " + ~~(current / 100) + "  High:')),  test++, "add mikes current and high score cosmetics");
	//testCondition((-1 != gamejs.indexOf('24, 300, 24),')),  test++, "add mikes resized score rectangle");
	//testCondition((-1 != gamejs.indexOf('10-24-5), ('+chart_k+' && '+chart_k+'[0] && UpdateChart(current/100, GetRgba('+chart_k+'[0].color, 0.4))));')),  test++, "add mikes chart update and colour setting");
	console.log ("Testing complete, "+passed+" units passed and "+failed+" units failed.");
}
function testCondition (condition, id, comment) {
        if(condition) {
                console.log("test: #"+id+" PASSED - "+ comment);
                passed++;
        } else {
                console.log("test: #"+id+" FAILED - "+ comment);
		failed++;
        }
}


function agariomodsRuntimeHacks() {
	jQuery('#helloDialog').css({left: '5px'});
	jQuery('#helloDialog').css({top: '5px'});
	jQuery('#helloDialog').css({margin: '0px'});
	jQuery('#helloDialog').css({marginLeft: 'auto'});
	jQuery('#helloDialog').css({marginRight: 'auto'});
//   opacity: 0.5;
//

jQuery('#helloDialog').css({opacity: '0.85'});	
jQuery('#helloDialog').css({width: '450px'});
	var nodeDiv = document.createElement("div");
	$( document ).ready(function() {
		hd = document.getElementById("helloDialog");
		cachedhd = hd.innerHTML;
		hd.innerHTML = cachedhd.replace("<center>Agar.io</center>", "<a target=\"_blank\" style=\"position:absolute; padding-left:435px;top:-10px; z-index: -1; height:120px;\" href=\"https://www.reddit.com/r/Agario/\"><img src=\"http://i.imgur.com/TkTWOrc.png\" height=\"120px\"/></a>");
	});
	document.getElementById("nick").placeholder = "agariomods.com";
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "400px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 9999999999;
	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "8px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
	nodeDiv.style.margin = "10px";
	nodeDiv.style.maxHeight = "250px"; //The settings and the ad are being pushed down too far on some screens (1366*768). ~Mevin1
	nodeDiv.style.overflow = "auto"; //add scroll bar
	nodeDiv.innerHTML += `
	`;
	jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
	jQuery('#region').parent().get(0).appendChild(nodeDiv);
	var selector = jQuery('#region');
	var playBtn = jQuery('#playBtn');
	var nodeInput = document.createElement("input");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	var nodeLinks = document.createElement("div");
	nodeLinks.innerHTML = "<a href='http://skins.agariomods.com' target='_blank'>Skins browser</a> - <a href='http://forum.agariomods.com' target='_blank'>Forum</a> - <a href='http://chat.agariomods.com' target='_blank'>Chatroom</a> - <a href='http://agariomods.com/mumble.html' target='_blank'>Mumble</a> - <a href='http://agariomods.com' target='_blank'>Website</a> - <a href='http://agariomods.com/help.html' target='_blank'>Help me!</a>";
	nodeLinks.style.position = "absolute";
	nodeLinks.style.top = "5em";

	nodeSpan.className = "glyphicon glyphicon-refresh";
	nodeSpan.style.fontSize = "1.5em";
	nodeSpan.style.cssFloat = "left";
	nodeSpan.style.paddingTop = "5px";
	nodeSpan.style.paddingLeft = "15px";
	nodeSpan.addEventListener("click", function (e) {
		if (modBlocking == false) {
                        //jQuery('#region').style.height = "0px";
                        jQuery('#region').hide();
                        //jQuery('#gamemode').style.height = "0px";
                        jQuery('#gamemode').hide();
			console.log ("clicked refresh");
			var oldregionval = jQuery('#region').val;
			jQuery('#region').val("EU-London");
			jQuery('#region').change();
			jQuery('#region').val("SG-Singapore");
			jQuery('#region').change();
			jQuery('#region').val(oldregionval);
			jQuery('#region').change();
			jQuery('#gamemode').change();
			//jQuery(this).fadeOut(100).fadeIn(100);
		}
	});
	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.border = "2px solid green";
	nodeInput.placeholder = "Alternative server ip:port here.";
	jQuery(playBtn).parent().get(0).appendChild(nodeLinks);
	jQuery(playBtn).parent().get(0).appendChild(nodeInput);
	jQuery(playBtn).parent().get(0).appendChild(nodeSpan);
	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
	jQuery(playBtn).parent().prepend("<b>Current Server IP: </b><span id='ip'></span>");
	var nodeAudio = document.createElement("audio");		
	nodeAudio.id = 'audiotemplate';		
	jQuery(playBtn).parent().get(0).appendChild(nodeAudio);
	jQuery('#iphack').change(function() {
		if (jQuery('#iphack').val() == "") {
			modBlocking = true;
		}
		modBlocking = false;
	});
	jQuery('#playBtn').off();
	$('.btn-needs-server').prop('disabled', true);
	jQuery('#playBtn').click(function() {
		setNick(document.getElementById('nick').value);
		return false;
	});
}

(function(window) {
	var WebSocket_original = window.WebSocket;
	window.WebSocket_original = WebSocket_original;
	var newWebSocket = 0;
	window.WebSocket = function(data) {
		if (modBlocking == true) {
			newWebSocket = new window.WebSocket_original(data);
			jQuery('#includedContent').html(`v1.8.5: <font color="pink">Thanks mikeyk730 for the <u>fantastic</u> stats. Checkbox settings are now saved automatically thanks to mevin1 and programjm on the agariomods team. oh, we now have bgm and sfx <s>which you can't turn off. - sound removed for now.</s></font>
        <div style="background-color: #ffffff; color: #000000; padding: 2px; margin: 0px;">
                <small><b>Disable ad blockers</b>&nbsp;- They are breaking the game and our modifications in random and unexpected ways.</small>
        </div>`); //backticks for multiline strings, cannot be used for single line strings. (oh now I have to un-escape everything) ~Mevin1
		//This div started to become a box where we threw a bunch of information into, it was starting to get too big for the smallest pc display that is still HD.
		jQuery('#ip').html(data.replace('ws://', ''));
		} else {
			console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
			jQuery('#includedContent').html("<h3>Connected to " +  jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");
        	jQuery('#ip').html(jQuery('#iphack').val());
			}
        	return newWebSocket;
	};
})(window);








/* begin mikeys new code */
var chart_update_interval = 10;

var chart = null;
var chart_data = [];
var chart_counter = 0;
var stat_canvas = null;

var stats = null;
var my_cells = null;
var my_color = "#ff8888";
var pie = null;
var stats_chart;

var display_chart = LS_getValue('display_chart', 'true') === 'true';
var display_stats = LS_getValue('display_stats', 'false') === 'true';

/////////////////////////////////////////////////////////

var g_stat_spacing = 0;
var g_display_width = 220;
var g_layout_width = g_display_width;

////////////////////////////////////////////////////////////////
function addChartHooks(script) {
    var match = script.match(/max\((\w+),(\w+)\(/);
    var high = match[1];
    var current = match[2];
    match = script.match(/1==(\w+)\.length&&\(/);
    var my_cells = match[1];
    var split = script.split(match[0]);
    script = split[0] + '1=='+my_cells+'.length&&(OnGameStart('+my_cells+'),' + split[1];
    split = script.split(script.match(/"Score: "\+~~\(\w+\/100\)/)[0]);
    match = split[1].match(/-(\d+)\)\);/);
    var subSplit = split[1].split(match[0]);
    split[1] = subSplit[0] + '-'+match[1]+'),('+my_cells+'&&'+my_cells+'[0]&&OnUpdateMass('+current+'())));' + subSplit[1];
    return split[0] + '"Current: "+~~('+current+'()/100)+"  High: "+~~('+high+'/100)' + split[1];
}

function addLeaderboardHook(script) {
    var match = script.match(/(fillStyle="#FFAAAA")(.+)(\w+)(\+1\+"\. ")/);
    var split = script.split(match[0]);
    return split[0]+match[1]+',OnLeaderboard('+match[3]+'+1)'+match[2]+match[3]+match[4]+split[1]   
}

function addOnCellEatenHook(script) {
    var match = script.match(/(\w+)&&(\w+)&&\((\w+)\.destroy/);
    var split = script.split(match[0]);
    return split[0] + match[1] + '&&' + match[2] + '&&(OnCellEaten('+match[1]+','+match[2]+'),' + match[3] + '.destroy' + split[1];
}

function addOnShowOverlayHook(script) {
    var match = script.match(/\w+\("#overlays"\).fadeIn\((\w+)\?\w+:\w+\);/);    
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnShowOverlay(' + match[1] + ');' + split[1];
}

function addOnDrawHook(script) {
    var match = script.match(/\w+\.width&&(\w+)\.drawImage\(\w+,\w+-\w+\.width-10,10\);/);
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnDraw(' + match[1] + ');' + split[1];
}

var __STORAGE_PREFIX = "mikeyk730__";

function LS_getValue(aKey, aDefault) {
	var val = localStorage.getItem(__STORAGE_PREFIX + aKey);
	if (null === val && 'undefined' != typeof aDefault) return aDefault;
	return val;
}
 
function LS_setValue(aKey, aVal) {
	localStorage.setItem(__STORAGE_PREFIX + aKey, aVal);
}

function GetRgba(hex_color, opacity)
{
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hex_color);
    return "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+opacity+")";
}

function secondsToHms(d) 
{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
////////////////////////////////////////////////////////////////
jQuery(document).ready(function() 
{
    jQuery('body').append(`<div id="chart-container" style="display:none; position:absolute; height:176px; width:300px; left:10px; bottom:44px"></div>
			   <div id="chart-container-agariomods" style="opacity: 0.7; position:absolute; height:20px; width:300px; right:10px; bottom:10px;">&nbsp;agariomods.com - modding <b>without</b> cheating</div>
			   <div id="fps-agariomods" style="color: white; position:absolute; height:20px; width:300px; top:5px; left:10px; display: none;"><b>FPS: </b><span>0</span></div>
			   `);
  	var checkbox_div = jQuery('#settings input[type=checkbox]').closest('div');
    checkbox_div.append('<label><input type="checkbox" onchange="setAcid($(this).is(\':checked\'));">Acid</label>');
	checkbox_div.append('<label><input type="checkbox" onchange="if(this.checked){jQuery(\'#chart-container\').show()}else{jQuery(\'#chart-container\').hide()}">Show chart</label>');
	checkbox_div.append('<label>SFX<input id="sfx" type="range" value="0" step=".1" min="0" max="1"></label>');
	checkbox_div.append('<label>BGM<input type="range" id="bgm" value="0" step=".1" min="0" max="1" oninput="volBGM(this.value);"></label>');
    jQuery('#overlays').append('<div id="stats" style="opacity: 0.85; position: absolute; top:330px; left: 460px; width: 480px; display: none; background-color: #FFFFFF; border-radius: 15px; padding: 5px 15px 5px 15px; transform: translate(0,-50%); white-space: nowrap; overflow:hidden;"><div id="statArea" style="vertical-align:top; width:250px; display:inline-block;"></div><div id="pieArea" style="vertical-align: top; width:200px; height:150px; display:inline-block; vertical-align:top"> </div><div id="gainArea" style="width:500px;  vertical-align:top"></div><div id="lossArea" style="width:500px; "></div><div id="chartArea" style="width:450px; display:inline-block; vertical-align:top"></div></div>');
    jQuery('#stats').hide(0);   
});

function ResetChart() 
{
    chart = null;
    chart_data.length = 0;
    chart_counter = 0;
    jQuery('#chart-container').empty();    
}

function UpdateChartData(mass)
{
    chart_counter++;
    if (chart_counter%chart_update_interval > 0) 
		return false;
	
	chart_data.push({
        x: chart_counter,
        y: mass/100
    });
	return true;
}

function CreateChart(e, color, interactive)
{
    return new CanvasJS.Chart(e,{
        interactivityEnabled: interactive,
        title: null,
        axisX:{      
            valueFormatString: " ",
            lineThickness: 0,
            tickLength: 0
        },
        axisY:{
            lineThickness: 0,
            tickLength: 0,
            gridThickness: 2,
            gridColor: "white",
            labelFontColor: "white"
        },
        backgroundColor: "rgba(0,0,0,0.2)",
        data: [{
            type: "area",
            color: color,
            dataPoints: chart_data
        }]
    });
}

function UpdateChart(mass, color) 
{
	my_color = color;	
	if (chart === null)
		chart = CreateChart("chart-container", color, false);	
	if (UpdateChartData(mass) && display_chart)
		chart.render();     
	jQuery('.canvasjs-chart-credit').hide();
};

function ResetStats()
{
    stats = {
        pellets: {num:0, mass:0},
        w: {num:0, mass:0},
        cells: {num:0, mass:0},
        viruses: {num:0, mass:0},

        birthday: Date.now(),
        time_of_death: null,
        high_score: 0,
        top_slot: Number.POSITIVE_INFINITY,

        gains: {},
        losses: {},
    };
}

function OnGainMass(me, other)
{
    var mass = other.size * other.size;
    if (other.isVirus){
        stats.viruses.num++;
        if (document.getElementById("gamemode").value!=":teams") stats.viruses.mass += mass; /*DONE: shouldn't add if game mode is teams. TODO: Find a better way of doing this. ~Mevin1*/
		sfx_event(8);
    }
    else if (Math.floor(mass) <= 400 && !other.name){
        stats.pellets.num++;
        stats.pellets.mass += mass;
		sfx_event(0);
    }
	/* heuristic to determine if mass is 'w', not perfect */
    else if (!other.name && mass <= 1444 && (mass >= 1369 || (other.x == other.ox && other.y == other.oy))){
		/*console.log('w', mass, other.name, other);*/
        if (other.color != me.color){ /*don't count own ejections, again not perfect*/
            stats.w.num++;
            stats.w.mass += mass;
        }
		sfx_event(2);
    }
    else { 
	    /*console.log('cell', mass, other.name, other);*/
        var key = other.name + ':' + other.color;
        stats.cells.num++;
        stats.cells.mass += mass;
        if (stats.gains[key] == undefined)
            stats.gains[key] = {num: 0, mass: 0};
        stats.gains[key].num++;
        stats.gains[key].mass += mass;
		sfx_event(2);
    }
}

function OnLoseMass(me, other)
{
    var mass = me.size * me.size;
    var key = other.name + ':' + other.color;
    if (stats.losses[key] == undefined)
        stats.losses[key] = {num: 0, mass: 0};;
    stats.losses[key].num++;
    stats.losses[key].mass += mass;
    sfx_event(2);
}

function DrawPie(pellet, w, cells, viruses)
{
    var total = pellet + w + cells + viruses;
    pie = new CanvasJS.Chart("pieArea", {
        title: null,
        animationEnabled: false,
        legend:{
            verticalAlign: "center",
            horizontalAlign: "left",
            fontSize: 12,
            fontFamily: "Helvetica"        
        },
        theme: "theme2",
        data: [{        
            type: "pie",       
            startAngle:-20,      
            showInLegend: true,
            toolTipContent:"{legendText} {y}%",
            dataPoints: [
                {  y: 100*pellet/total, legendText:"pellets"},
                {  y: 100*cells/total, legendText:"cells"},
                {  y: 100*w/total, legendText:"w"},
                {  y: 100*viruses/total, legendText:"viruses"},
            ]
        }]
    });
	pie.render();   
}

function GetTopN(n, p)
{
	var r = [];
	var a = Object.keys(stats[p]).sort(function(a, b) {return -(stats[p][a].mass - stats[p][b].mass)});
    for (var i = 0; i < n && i < a.length; ++i){
        var key = a[i];
        var mass = stats[p][key].mass;
        var name = key.slice(0,key.length-8);
        if (!name) name = "An unnamed cell";
        var color = key.slice(key.length-7);
		r.push({name:name, color:color, mass:Math.floor(mass/100)});
    }	
	return r;
}

function AppendTopN(n, p, list)
{
	var a = GetTopN(n,p);
    for (var i = 0; i < a.length; ++i){
        var text = a[i].name + ' (' + (p == 'gains' ? '+' : '-') + a[i].mass + ' mass)';
        list.append('<li style="font-size: 12px; "><div style="width: 10px; height: 10px; border-radius: 50%; margin-right:5px; background-color: ' + a[i].color + '; display: inline-block;"></div>' + text + '</li>');
    }
	return a.length > 0;
}

function DrawStats(game_over)
{
    //if (!stats) return;
            
	jQuery('#statArea').empty();
    jQuery('#pieArea').empty();
    jQuery('#gainArea').empty();
    jQuery('#lossArea').empty();
    jQuery('#chartArea').empty();
    jQuery('#stats').show();
    
    if (game_over){
        sfx_event(9);
		StopBGM();
	}
	stats.time_of_death = Date.now();
    var time = stats.time_of_death ? stats.time_of_death : Date.now();
    var seconds = (time - stats.birthday)/1000;
	
	var list = jQuery('<ul>');
    list.append('<li style="font-size: 12px; ">Game time: ' + secondsToHms(seconds) + '</li>');
    list.append('<li style="font-size: 12px; ">High score: ' + ~~(stats.high_score/100) + '</li>');
    if (stats.top_slot == Number.POSITIVE_INFINITY){
        list.append('<li style="font-size: 12px; ">You didn\'t make the leaderboard</li>');
    }
    else{
        list.append('<li style="font-size: 12px; ">Leaderboard max: ' + stats.top_slot + '</li>');
    }
    list.append('<li style="font-size: 12px; padding-top: 15px">' + stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.w.num + " masses eaten (" + ~~(stats.w.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ' mass)</li>');
    jQuery('#statArea').append('<b>Game Summary</b>');
    jQuery('#statArea').append(list);
	
    DrawPie(stats.pellets.mass, stats.w.mass, stats.cells.mass, stats.viruses.mass);

	jQuery('#gainArea').append('<b>Top Gains</b>');
	list = jQuery('<ol>');
    if (AppendTopN(5, 'gains', list))
		jQuery('#gainArea').append(list);
	else
		jQuery('#gainArea').append('<ul><li style="font-size: 12px; ">You have not eaten anybody</li></ul>');
	 
    jQuery('#lossArea').append('<b>Top Losses</b>');
	list = jQuery('<ol>');
	if (AppendTopN(5, 'losses', list))
		jQuery('#lossArea').append(list);
    else
		jQuery('#lossArea').append('<ul><li style="font-size: 12px; ">Nobody has eaten you</li></ul>');
	
	if (stats.time_of_death !== null){
		jQuery('#chartArea').width(450).height(150);
		stat_chart = CreateChart('chartArea', my_color, true);
		stat_chart.render();
	}
	else {
		jQuery('#chartArea').width(450).height(0);
	}
jQuery('.canvasjs-chart-credit').hide();
}

var styles = {
	heading: {font:"20px Ubuntu", spacing: 41, alpha: 1},
	subheading: {font:"18px Ubuntu", spacing: 31, alpha: 1},
	normal: {font:"12px Ubuntu", spacing: 21, alpha: 0.6}
}

function AppendText(text, context, style)
{
	context.globalAlpha = styles[style].alpha;
	context.font = styles[style].font;
	g_stat_spacing += styles[style].spacing;
    
    var width = context.measureText(text).width;
    g_layout_width = Math.max(g_layout_width, width);    
	context.fillText(text, g_layout_width/2 - width/2, g_stat_spacing);
}

function RenderStats(reset)
{
	if (reset) g_layout_width = g_display_width;
	if (!display_stats || !stats) return;
	g_stat_spacing = 0;	
	
	var gains = GetTopN(3, 'gains');
	var losses =  GetTopN(3, 'losses');
	var height = 30 + styles['heading'].spacing + styles['subheading'].spacing * 2 + styles['normal'].spacing * (4 + gains.length + losses.length);
		
	stat_canvas = document.createElement("canvas");
	var scale = Math.min(g_display_width, .3 * window.innerWidth) / g_layout_width;
	stat_canvas.width = g_layout_width * scale;
    stat_canvas.height = height * scale;
	var context = stat_canvas.getContext("2d");
	context.scale(scale, scale);
		
    context.globalAlpha = .4;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, g_layout_width, height);
        
    context.fillStyle = "#FFFFFF";
	AppendText("Stats", context, 'heading');
		
	var text = stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ")";
	AppendText(text, context,'normal');		
	text = stats.w.num + " mass eaten (" + ~~(stats.w.mass/100) + ")";
	AppendText(text, context,'normal');
    text = stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ")";
	AppendText(text, context,'normal');
	text = stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ")";
	AppendText(text, context,'normal');
		
	AppendText("Top Gains",context,'subheading');
	for (var j = 0; j < gains.length; ++j){
		text = (j+1) + ". " + gains[j].name + " (" + gains[j].mass + ")";
		context.fillStyle = gains[j].color;			
		AppendText(text, context,'normal');
	}
		
	context.fillStyle = "#FFFFFF";
	AppendText("Top Losses",context,'subheading');
	for (var j = 0; j < losses.length; ++j){
		text = (j+1) + ". " + losses[j].name + " (" + losses[j].mass + ")";
		context.fillStyle = losses[j].color;			
		AppendText(text, context,'normal');
	}
}  

jQuery(window).resize(function() {
    RenderStats(false);
});

window.OnGameStart = function(cells)
{
    my_cells = cells;
    ResetChart();
    ResetStats();
    RenderStats(true);
	DrawStats(false);
	if (kd == true) {
		showsh = false;
		document.getElementById("overlays").style.display = "none";
		document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
		document.getElementById("helloDialog").style.display = "block";
		kd = false;
	}
	StartBGM();
	sfx_event(3);
}

window.StartBGM = function ()
{
    var track = tracks[Math.floor(Math.random() * tracks.length)];
    bgmusic.src = "http://skins.agariomods.com/botb/" + track;
	bgmusic.volume = document.getElementById("bgm").value;
    bgmusic.play();
    bgmusic.loop = false;
    bgmusic.onended = function() {
        var track = tracks[Math.floor(Math.random() * tracks.length)];
        bgmusic.src = "http://skins.agariomods.com/botb/" + track;
        bgmusic.play();
    }
}

window.StopBGM = function ()
{
    bgmusic.pause();
}

window.volBGM = function (vol)
{
    bgmusic.volume = document.getElementById("bgm").value;
}

window.OnShowOverlay = function(game_in_progress)
{
    DrawStats(!game_in_progress);
	if (!game_in_progress && kd == true) {
		showsh = false;
		document.getElementById("overlays").style.display = "block";
		document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
		document.getElementById("helloDialog").style.display = "block";
		kd = false;
	}
}

window.OnUpdateMass = function(mass) 
{
    stats.high_score = Math.max(stats.high_score, mass);
    UpdateChart(mass, GetRgba(my_cells[0].color,0.4));
}

window.OnCellEaten = function(predator, prey)
{
    if (!my_cells) return;

    if (my_cells.indexOf(predator) != -1){
        OnGainMass(predator, prey);
        RenderStats(false);
    }
    if (my_cells.indexOf(prey) != -1){
        OnLoseMass(prey, predator);
        RenderStats(false);
    }    
}

window.OnLeaderboard = function(position)
{
    stats.top_slot = Math.min(stats.top_slot, position);
}

window.OnDraw = function(context)
{
	if (showfps) document.getElementById("fps-agariomods").children[1].innerHTML = countFPS();
    display_stats && stat_canvas && context.drawImage(stat_canvas, 10, 10);   
}

window.countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());

window.onpageshow = function() {
    $("div#settings label").change(function() {
        $("div#settings.checkbox input").each(function() {
            localStorage.setItem("setting"+$(this).parent().text().replace(" ","_"),this.checked);
        });
        $("div#settings input[type=range]").each(function() {
            localStorage.setItem("setting"+$(this).parent().text().replace(" ","_"),this.value);
        });
    });
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
	$("div#settings input").each(function() {
            this.dispatchEvent(evt);
	});
}

$(document).ready(function() {
	$("div#settings.checkbox input").each(function() {
			$(this).attr("checked",(localStorage.getItem("setting"+$(this).parent().text().replace(" ","_")))=="true");
	});
	$("div#settings input[type=range]").each(function() {
			$(this).attr("value",(localStorage.getItem("setting"+$(this).parent().text().replace(" ","_"))));
	});
});

var kd = false;
$(document).keydown(function(e) {
	//Stats Shortcut
	if (e.keyCode == 9) {
		e.preventDefault();
		if (kd == false && document.getElementById("overlays").style.display == 'none') {
			kd = true;
			document.getElementById("overlays").style.display = "block";
			document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,0)";
			document.getElementById("helloDialog").style.display = "none";
			showsh = true;
			DrawStats(false);
		}
	}
	//FPS Hotkey
	if (e.keyCode == 49) {
		e.preventDefault();
		showfps = !showfps;
		document.getElementById("fps-agariomods").style.display = showfps?"block":"none";
	}
	//Firefox Fullscreen
	if (e.ctrlKey && e.keyCode === 70 && navigator.userAgent.match("Firefox")) {
		e.preventDefault();
		if (document.mozFullScreenElement)
		{
			document.mozCancelFullScreen();
		}
		else
		{
			document.getElementById("overlays").mozRequestFullScreen();
		}
	}
});
$(document).keyup(function(e) {
	if (e.keyCode == 9) {
		e.preventDefault();
		if (kd == true) {
			kd = false;
			document.getElementById("overlays").style.display = "none";
			document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
			document.getElementById("helloDialog").style.display = "block";
			showsh = false;
		}
	}
});
