// Cookie Monster.
function getContentFromClipboard() {
  var result = '';
  var sandbox = document.getElementById('sandbox');
  sandbox.value = '';
  sandbox.select();
  if (document.execCommand('paste')) {
    result = sandbox.value;
    console.log('got value from sandbox: ' + result);
  }
  sandbox.value = '';
  return result;
}

function injectCookie() {
  chrome.browserAction.onClicked.addListener(function(activeTab) {
		chrome.storage.sync.get('url', function(data){
			var URL;
			console.log('BACKRGOUND LOCALE: ' + data.url);
			URL = data.url;
			clipboardContents = getContentFromClipboard();
	    if (clipboardContents.includes("`")) {
	      clipboardContents = clipboardContents.split("```");
	      clipboardContents = clipboardContents[1].split("=");
	    } else {
	      clipboardContents = clipboardContents.split("=");
	    }

	    chrome.windows.create({
	      url: URL,
	      "incognito": true
	    });
	    chrome.cookies.getAll({
	      domain: URL
	    }, function(cookies) {
	      for (var i = 0; i < cookies.length; i++) {
	        chrome.cookies.remove({
	          url: URL + cookies[i].path,
	          name: cookies[i].name
	        });
	      }
	    });
	    chrome.cookies.set({
	      "name": clipboardContents[0],
	      "url": URL,
	      "value": clipboardContents[1]
	    }, function(cookie) {
				console.log(URL + 'cookie');
	      console.log(JSON.stringify(cookie));
	      console.log(chrome.extension.lastError);
	      console.log(chrome.runtime.lastError);
	    });
	  });
	});
}
window.onload = injectCookie;
