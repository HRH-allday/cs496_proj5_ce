
/*
chrome.storage.sync.get('portalNotice',function(data){
	
});
*/

var str="";

window.onload = function onLoadListener(){
	getScreenShotFiles();
};


var getScreenShotFiles = function(){
	str = "";
	var httpPost = new XMLHttpRequest(),
	path = "http://ec2-52-79-155-110.ap-northeast-2.compute.amazonaws.com:3000/getScreenShotLists/";
   	// Set callback function
   	httpPost.onreadystatechange = function(err) {
   		if (httpPost.readyState == 4 && httpPost.status == 200){
   			var res = httpPost.responseText;
   			var imgJson = JSON.parse(res);
   			var imgNum = imgJson.length
   			for(i = 0 ; i < imgNum ; i++){
   				str += "<div class=\"ui card\"> <div class=\"image\"> <img src=\""+ imgJson[imgNum - i -1].imgURL + "\"> </div> </div>"
   				 //"<div id= 'box" + i + "' class=\"screenshot\"><img src = \"" + imgJson[imgNum - i -1].imgURL + "\" height= \"150\" width=\"300\" > </div>";
   			}
   			console.log(str);
   			document.getElementById("container").innerHTML = str; 
   		} else {
   			console.log(err);
   		}
   	};
    // Set the content type of the request to json since that's what's being sent
    httpPost.open("GET", path, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');
    httpPost.send();
};

var port = chrome.extension.connect({
	name: "Sample Communication"
});
port.onMessage.addListener(function(msg) {
	console.log("message recieved" + msg);
});


document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('screenshot button');
    // onClick's logic below:
    link.addEventListener('click', function() {
    	chrome.runtime.sendMessage({from: "popup"}, function(response) {
    		console.log('message recieved succesfully');
    	});
    });
});

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.from == "screenshot finished"){
		var imgurl = request.imgurl;
		var string = "<div id= 'box" + 4 + "' class=\"screenshot\"><img src = \"" + imgurl + "\" height= \"150\" width=\"300\" > </div>";
		document.getElementById("container").innerHTML = string;
	}
})
*/