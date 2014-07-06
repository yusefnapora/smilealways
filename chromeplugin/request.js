/************************ PAGE ACTION CODE ***********************/
var amazonPattern = '(smile|www)\.amazon\.com';
var showPageActionOnAmazon = {
  conditions: [
    // When a page has an amazon url
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlMatches: amazonPattern, schemes: ['http','https'] },
    })
  ],
  // show the page action.
  actions: [new chrome.declarativeContent.ShowPageAction() ]
}

// Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([showPageActionOnAmazon]);
  });
});

// keep track of current tab
var lastTabId = 0;
//var amazonTabs = []
// keep track of SA state
var smileAlwaysOn = true;
var smileStatus = 'on';
var altStatus = 'off';

// Track current tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
});

// Update pageAction when page is update or activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
    lastTabId = activeInfo.tabId;
    updateSpecificPageAction(lastTabId);
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    updateSpecificPageAction(lastTabId);
});

// Toggle on pageAction clicked events
chrome.pageAction.onClicked.addListener(function(tab) {
    smileAlwaysOn = !smileAlwaysOn;
    smileStatus = (smileAlwaysOn? 'on' : 'off');
    altStatus = (smileAlwaysOn? 'off' : 'on');

    updateSpecificPageAction(lastTabId);
    alert('SmileAlways has been turned ' + smileStatus + '.' );
});

/*
// Update all pages with proper info
function updatePageActionInfo() {
    chrome.tabs.query({}, function(tabs) {
        amazonTabs = tabs;
        console.log(tabs);
        for(var i=0; i< tabs.length; i++) {
            updateSpecificPageAction(tabs[i].tabId);
        }
    });
}
*/

// Update page action info on a specific tab
function updateSpecificPageAction(pageActionTabId) {
    chrome.pageAction.setTitle({title:'SmileAlways is ' + smileStatus + '.' 
                                       + ' Click to turn ' + altStatus + '.',
                                tabId: pageActionTabId });
    var imgPath = smileAlwaysOn ? 'happy-smile.png' : 'sad-smile.png';
    chrome.pageAction.setIcon({path: imgPath, tabId: pageActionTabId}); 
}


/************************ REDIRECT CODE ***********************/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls : ["<all_urls>"],
    types: ["main_frame","sub_frame"]
}, ["blocking"]);


function detectRedirect(details) {
    updateSpecificPageAction(lastTabId);
    var url = details.url;
    
    if (url == null || !smileAlwaysOn ) {
        return;
    }
    
    var http = "http://";
    var https = "https://";
    var amazonurl = "www.amazon.com";
    // ignore links with these strings in them
    var filter = "(sa-no-redirect=)|(redirect=true)|(redirect.html)|(/gp/dmusic/cloudplayer)|(/gp/wishlist)|(aws.amazon.com)";
    
    // Don't try and redirect pages that are in our filter
    if (url.match(filter) != null) {
        return;
    }

    if (url.match(http + amazonurl) != null) {
        // If this is the non-secure link...
        return redirectToSmile(http, amazonurl, url);

    }  else if (url.match(https + amazonurl) != null) {
        // If this is the secure link...
        return redirectToSmile(https, amazonurl, url);
    }

}

function redirectToSmile(scheme, amazonurl, url) {
    var smileurl = "smile.amazon.com";
    return {
        // redirect to amazon smile append the rest of the url
        redirectUrl : scheme + smileurl + getRelativeRedirectUrl(amazonurl, url)
    };
}

function getRelativeRedirectUrl(amazonurl, url) {
    var relativeUrl = url.split(amazonurl)[1];
    var noRedirectIndicator = "sa-no-redirect=1";
    var paramStart = "?";
    var paramStartRegex = "\\" + paramStart;
    var newurl = null;

    // check to see if there are already GET variables in the url
    if (relativeUrl.match(paramStartRegex) != null) {
        newurl = relativeUrl + "&" + noRedirectIndicator;
    } else {
        newurl = relativeUrl + paramStart + noRedirectIndicator;
    }
    return newurl;
}
