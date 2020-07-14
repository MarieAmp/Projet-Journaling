const inspiContainer=document.getElementById("quote-container");
const btnQuote=document.getElementById("get-quote");
g
function getQuote() {
    axios.get(
        "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
      )
      .then((dbres) => {
        console.log(dbres.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

// btnQuote.onclick=function(){
//     axios
//     .get("/dashboard")
//     .then((res)=>{
//         console.log(res)
//         // const quote=res
//         // inspiContainer.innerHTML= <p>${quote.data.quoteText}

//         // </p>

//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// };