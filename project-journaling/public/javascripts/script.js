const btn = document.getElementById('btn-start')
const container = document.getElementById('container')

// bug

function displayOne(){
  axios.get('/question')
      .then((random) => {
        console.log(random)
        console.log("in");
        container.innerHTML += `<div>${random}</div>` 
    })
    .catch((err) => console.log(err));

}

btn.onclick = displayOne

// 