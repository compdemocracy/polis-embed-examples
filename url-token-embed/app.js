// This is uuidv4 function is for generating decently random ids, sufficient for the uses of identitification in a polis conversation

// This uuid function is from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  // It depends on the crypto API, which is supported by 97.4% of browsers
  if (window.crypto) {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  // fallback which uses timestamp and ms since browser opened to come up with a uuid
  } else {
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
        r = (d + r)%16 | 0;
        d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r)%16 | 0;
        d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}


function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


// a function for dynamically building a polis container div based on the random uuid

function buildEmbedDiv(xid) {
  return "<div class='polis' data-conversation_id='2demo' data-xid='" + xid + "'></div>"
}

// create the embed script tag which will trigger the embedding

var polisContainer = document.getElementById('polis-container')
var embedScript = document.createElement("script");
embedScript.setAttribute("src", "https://pol.is/embed.js")


// Check to make sure we have an xid query param

var userXID = getParameterByName('xid')
if (userXID) {
  // Attach the embed div based on localStorage.polisUserXID, and execute embed script by embedding it in the page
  console.log("Using query param xid:", userXID)
  polisContainer.innerHTML = buildEmbedDiv(localStorage.polisUserXID)
  polisContainer.appendChild(embedScript)
} else {
  // no xid found, so do nothing but display a message
  console.log("No user id found in query parameter; cancelling embed")
  polisContainer.innerHTML = "Unable to identify participant id. Please make sure you followed the full & correct participation url given to you for this conversation."
}

