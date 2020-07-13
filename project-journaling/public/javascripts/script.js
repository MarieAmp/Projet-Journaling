const btn = document.getElementById('btn-start')
const container = document.getElementById('container')



function displayOne(){
  axios.get('/question')
      .then((dbRes) => {
        console.log(dbRes.data.question)
        console.log("in");
        container.innerHTML += `<div>${dbRes.data.question}</div>` 
    })
    .catch((err) => console.log(err));

}

btn.onclick = displayOne
 