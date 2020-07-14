const inspiContainer = document.getElementById("quote-container");
const btnQuote = document.getElementById("get-quote");
const widget = document.getElementById("widget-container");
const btnWidget = document.getElementById("get-widget");

function displayQuote() {
  axios
    .get("/dashboard/quote")
    .then((quote) => {
      console.log(quote.data);
      inspiContainer.innerHTML += `<p>${quote.data.quoteText}</p>
        <br>.
        <p>${quote.data.quoteAuthor}</p><br>
        <a href="${quote.data.quoteLink}">source:forismatic.com<a>`;
    })
    .catch((err) => console.log(err));
}

function spotifyWidget() {
  widget.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u" width="300" height="380" frameborder="0"
    allowtransparency="true" allow="encrypted-media"></iframe>`;
}


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}


btnQuote.onclick = displayQuote;
btnWidget.onclick = spotifyWidget;
