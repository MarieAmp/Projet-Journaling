const inspiContainer = document.getElementById("div-quote");
const btnQuote = document.getElementById("get-quote");
const widget = document.getElementById("widget-container");
const btnWidget = document.getElementById("get-widget");

function displayQuote() {
  axios
    .get("/dashboard/quote")
    .then((quote) => {
      console.log(quote.data);
      inspiContainer.innerHTML = `<i><p class="quote-text">${quote.data.quoteText}</p></i>
        <br>.
        <p class="author-text"><i>${quote.data.quoteAuthor}</i></p><br>`
       /*  <a href="${quote.data.quoteLink}">source:forismatic.com<a>; */
    })
    .catch((err) => console.log(err));
}

function spotifyWidget() {
  widget.innerHTML = ` <p class="dash-title">Meditate</p>
  <p class="spotify-text">Listen to the perfect playlist for your meditation session</p>
  <iframe class="spotify-widget" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u" width="300" height="380" frameborder="0"
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
