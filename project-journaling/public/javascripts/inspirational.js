const inspiContainer=document.getElementById("quote-container");
const btnQuote=document.getElementById("get-quote");


function displayQuote() {
    axios.get("/dashboard/quote")
    .then((quote)=>{
        console.log(quote.data);
        inspiContainer.innerHTML+= `<p>${quote.data.quoteText}</p>
        <br>.
        <p>${quote.data.quoteAuthor}</p><br>
        <a href="${quote.data.quoteLink}">source:forismatic.com<a>`
    })
    .catch((err)=>console.log(err))
  }

   

btnQuote.onclick = displayQuote;






//   function displayQuote(){
//       try{
//           await getQuote()
//           then
//       }
//   }

//     axios
//     .get("/dashboard")
//     .then((res)=>{
//         console.log(res)
        // const quote=res
        // inspiContainer.innerHTML= <p>${quote.data.quoteText}

        // </p>

//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// };