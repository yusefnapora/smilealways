function safariRedirect(event) {
  if (event.url === undefined) {
    return;
  }
  
  //console.log("Checking url for redirect: " + event.url);
  var redirect = detectRedirect(event);
  if (redirect === undefined || redirect === null || redirect['redirectUrl'] == undefined) {
    return;
  }

  //console.log("-----Redirecting---- ");
  console.log(redirect.redirectUrl);
  event.preventDefault();
  event.target.url = redirect.redirectUrl;
}



safari.application.addEventListener('beforeNavigate', safariRedirect, true);