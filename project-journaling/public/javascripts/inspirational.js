axios
.get("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en")
.then((dbres)=>{
    console.log(dbres)
})
.catch((err)=>{
    console.log(err)
})