chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls : ["<all_urls>"]
}, ["blocking"]);

function detectRedirect(details) {
    var url = details.url;
    var http = "http://";
    var https = "https://";
    var amazonurl = "www.amazon.com";
    var smileurl = "smile.amazon.com";
    // string that all amazon redirect urls contain
    var readerurl = "read.amazon.com";
    var redirecturl1 = "redirect=true";
    var redirecturl2 = "redirect.html";
    var affiliateurl1 = "/dp/";
    var affiliateurl2 = "/gp/";

   
    if (url != null) {
        
        // Don't try and redirect pages that will already be redirected or are associated with the affiliate program
        if(url.match(readerurl)) == null && url.match(redirecturl1) == null && url.match(redirecturl2) == null && url.match(affiliateurl1) == null && url.match(affiliateurl2) == null) {

            // Check non-secure links
            if(url.match(http + amazonurl) != null) {
                return{
                    // redirect to amazon smile append the rest of the url
                    redirectUrl : http + smileurl + url.split(amazonurl)[1]
                };
            }

            // Check secure links
            else if (url.match(https + amazonurl) != null) {
                return{
                    // redirect to amazon smile url and append the rest of the url
                    redirectUrl : https + smileurl + url.split(amazonurl)[1]
                };
            }
        }
    }
}

