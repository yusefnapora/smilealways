chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls : ["<all_urls>"]
}, ["blocking"]);


function incrementCounter() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://smilealways.herokuapp.com/newredirect", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
      }
    }
    xhr.send();
}


function detectRedirect(details) {
    var url = details.url;
    var http = "http://";
    var https = "https://";
    var amazonurl = "www.amazon.com";
    var smileurl = "smile.amazon.com";
    // string that all amazon redirect urls contain
    var redirecturl = "redirect.html";

   
    if (url != null) {
        
        // Don't try and redirect pages that will already be redirected
        if(url.match(redirecturl) == null) {

            // Check non-secure links
            if(url.match(http + amazonurl) != null) {
                incrementCounter();
                return{
                    // redirect to amazon smile append the rest of the url
                    redirectUrl : http + smileurl + url.split(amazonurl)[1]
                };
            }

            // Check secure links
            else if (url.match(https + amazonurl) != null) {
                incrementCounter();
                return{
                    // redirect to amazon smile url and append the rest of the url
                    redirectUrl : https + smileurl + url.split(amazonurl)[1]
                };
            }
        }
    }
}

