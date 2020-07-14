const inspiContainer=document.getElementById("quote-container");
const btnQuote=document.getElementById("get-quote");


function displayQuote() {
    axios.get("/dashboard/quote")
    .then((quote)=>{
        console.log(quote.data.quoteText);
        inspiContainer.innerHTML+= `<p>${quote.data.quoteText}</p>`
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