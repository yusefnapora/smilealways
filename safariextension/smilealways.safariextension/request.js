function detectRedirect(details) {
    var url = details.url;
    
    if (url == null) {
        return;
    }
    
    var http = "http://";
    var https = "https://";
    var amazonurl = "www.amazon.com";
    // ignore links with these strings in them
    var filter = "(sa-no-redirect=)|(redirect=true)|(redirect.html)|(r.html)|(/gp/dmusic/cloudplayer)|(/gp/wishlist)|(aws.amazon.com)";
    
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