// add fake webRequest object to chrome object so we don't get an eror
// when running this outside of an extension environment
chrome.webRequest = {
    onBeforeRequest: {
        addListener: function(listener) {}
    }
};
