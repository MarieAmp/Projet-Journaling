//nav 

const burger = document.getElementById("burger");
const navMobile = document.getElementById("nav-mobile");
/* const headerMobile = document.getElementById("header-main") */

function toggleNavMobile() {
  navMobile.classList.toggle("is-active");
}

burger.onclick = toggleNavMobile;

//Index

const btn = document.getElementById("btn-start");
const container = document.getElementById("container");
const btnMood = document.getElementById("btn-mood");
const welcomeDiv = document.getElementById("welcome-div")

btn.onclick = function displayOne() {
  axios
    .get("/question")
    .then((dbRes) => {
      console.log(dbRes.data.question);
      welcomeDiv.innerHTML = ""
      container.innerHTML += `<div id="question-div" class="slide-bck-center">
        <h1 class="question">${dbRes.data.question}</h1>
        <input data-question-id="${dbRes.data._id}" class="response-input" type="textarea" name="response" value="" placeholder = "Answer here" required></input>
        <button id="submit-answer" class="btn">Submit</button>
      </div> `;
      const submit = document.getElementById("submit-answer");
      const input = document.querySelector(".response-input");
      submit.onclick = () => sendAnswer(input,dbRes.data._id);
    
    })
    .catch((err) => console.log(err));
}

function displayMood() {
  axios
    .get("/mood")
    .then((dbRes) => {
      console.log(dbRes);
      container.innerHTML = `<div id="question-div">
      <h1 class="question">What's your mood today ?</p>
    <select name="moods" id="mood-select">
    <option value="dog">Good</option>
    <option value="cat">Bof</option>
    <option value="hamster">Bad</option>
    </select>
    <button id="submit-mood">Submit</button>
    </div> `;
    const submitMood = document.getElementById("submit-mood");
    const inputMood = document.querySelector("#mood-select");
    submitMood.onclick = () => getMood(inputMood.value);
    })
    .catch((err) => console.log(err));
}

// Création variable locale pour sauvegarder en deux fois le mood puis la réponse
function sendAnswer(input,questionId) {

  axios
    .post("/question", {
      response: [input.value],
      id_question: questionId,
    })
    .then((Res) => {
        console.log('ok')
      displayMood();
    })
    .catch((err) => console.log(err));
}

function getMood(input) {
  axios
    .post("/mood", {
      mood: input.value,
    })
    .then(Res)
    .catch((err) => console.log(err));
}



