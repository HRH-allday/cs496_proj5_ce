let id = 100

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

  if(request.from == "popup"){
    window.alert("take screenshot now!");
    chrome.tabs.executeScript(null, {file : 'get_region.js'});
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
          var code = 'window.location.reload();';
          chrome.tabs.executeScript(tabID, {code: code});
        });
  }
  else if(request.from == "get_region"){
    let targetID = null
    let viewTabUrl = chrome.extension.getURL('screenshot.html')
    console.log(viewTabUrl);
    let statusText = 'startX ' + request.startX + ' startY ' + request.startY + ' endX ' + request.endX + ' endY ' + request.endY
    let currentTabUrl = null

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log(tabs[0]);
      currentTabUrl = tabs[0].url;
    });

    chrome.tabs.captureVisibleTab(null, null, function (screenshotUrl) {
      chrome.tabs.onUpdated.addListener(function listener(tabID, changedProps) {
        if (tabID != targetID || changedProps.status != 'complete') {
          return;
        }
        chrome.tabs.onUpdated.removeListener(listener);

      

        var views = chrome.extension.getViews();
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          if (view.location.href == viewTabUrl) {
            view.setScreenshotUrl(screenshotUrl, currentTabUrl, request);
            break;
          }
        }
      })
      chrome.tabs.create({ url: viewTabUrl}, function (tab) {
        targetID = tab.id
      })
    })

  }
});

// let id = 100

// chrome.browserAction.onClicked.addListener(function (t) {
//   chrome.tabs.captureVisibleTab(null, null, function(screenshotUrl) {
//     let viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
//     let targetID = null
//     // let targetWindowID = null

//     chrome.tabs.onUpdated.addListener(function listener(tabID, changedProps) {
//       if (tabID != targetID || changedProps.status != 'complete') {
//         return
//       }
//       chrome.tabs.onUpdated.removeListener(listener)
//       let views = chrome.extension.getViews()
//       console.log(views)
//       // views[0].setScreenshotUrl(screenshotUrl)
//       for (var i = 0; i < views.length; i++) {
//         var view = views[i];
//         if (view.location.href == viewTabUrl) {
//           view.setScreenshotUrl(screenshotUrl);
//           break;
//         }
//       }
//     })

//     chrome.tabs.create({url: viewTabUrl}, function (tab) {
//       targetID = tab.id
//     })
//   })
// })
