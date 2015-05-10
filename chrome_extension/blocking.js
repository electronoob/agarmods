function blockingCallback(details){
	console.log(details, "cancelled :D");
	return {cancel: true};
}

chrome.webRequest.onBeforeRequest.addListener(blockingCallback, {urls: [ "http://agar.io/main_out.js*" ]}, ["blocking"]);
