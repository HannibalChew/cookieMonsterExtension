// Cookie Monster.
function getCurrentOptions(){
	chrome.storage.sync.get([
		'url'
	], function(data){
		document.getElementById('url').value	= data.url;
	});
}

function saveOptions(){
	var url = document.getElementById('url').value;
	chrome.storage.sync.set({
    'url': url
	}, function() {
		window.close();
  });
}
window.onload = function() {
	getCurrentOptions();
}
document.getElementById('save').addEventListener('click', saveOptions);
