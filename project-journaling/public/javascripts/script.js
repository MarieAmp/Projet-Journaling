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
const questionDiv = document.getElementById("question-div")

function displayOne() {
  axios
    .get("/question")
    .then((dbRes) => {
      console.log(dbRes.data.question);
      welcomeDiv.innerHTML = ""
      container.innerHTML += `<div id="question-div" class="slide-bck-center">
        <h1 class="question">${dbRes.data.question}</h1>
        <input data-question-id="${dbRes.data._id}" class="response-input" type="textarea" name="response" value="" placeholder = "Answer here" required></input>
        <button id="submit-answer" class="btn">Submit</button>`
      const submit = document.getElementById("submit-answer");
      const input = document.querySelector(".response-input");
      submit.onclick = () => sendAnswer(input,dbRes.data._id);
    
    })
    .catch((err) => console.log(err));
}

function displayMood(answerId) {
  axios
    .get("/mood")
    .then((dbRes) => {
      console.log(dbRes);
      questionDiv.innerHTML = ""
      container.innerHTML = `<div id="question-div">
      <p>Today's Mood</p>
      <h1 class="question" answer-id="${answerId}" >What's your mood today ?</h1>
    <select name="moods" id="mood-select">
    <option value="Very Good">Very Good</option>
    <option value="Good">Good</option>
    <option value="Neutral">Neutral</option>
    <option value="Bad">Bad</option>
    </select>
    <button id="submit-mood">Submit</button>
    </div> `;
    const submitMood = document.getElementById("submit-mood");
    const inputMood = document.querySelector("#mood-select");
    submitMood.onclick = () => getMood(inputMood.value, answerId);
    })
    .catch((err) => console.log(err));
}

// Création variable locale pour sauvegarder en deux fois le mood puis la réponse
function sendAnswer(input,questionId) {

  axios
    .post("/answer", {
      response: [input.value],
      id_question: questionId,
    })
    .then((dbRes) => {
        console.log('ok' + dbRes.data)
      displayMood(dbRes.data._id);
    })
    .catch((err) => console.log(err));
}

function getMood(inputValue, answerId) {
  console.log(`answerID is ${answerId}, mood is ${inputValue}`);
  axios
    .post(`/editanswer/${answerId}`, {
      mood : `${inputValue}`
    })
    .then((Res)=> console.log(Res))
    .catch((err) => console.log(err));
    container.innerHTML = `<div class="question-div">
    <h1 class="question">Today's entry is saved !<h1> <br> Check your <a href="/dashboard"> dashboard </a> for details and resources!`
}


btn.onclick = displayOne;

