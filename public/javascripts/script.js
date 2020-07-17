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
const welcomeDiv = document.getElementById("welcome-div");
const questionDiv = document.getElementById("question-div");

function displayOne() {
  axios
    .get("/question")
    .then((dbRes) => {
      console.log(dbRes.data.question);
      welcomeDiv.innerHTML = "";
      container.innerHTML = `<div id="question-div" class="slide-bck-center">
        <div class="slide">
        <h1 class="question">${dbRes.data.question}</h1>
        <input data-question-id="${dbRes.data._id}" class="response-input" type="textarea" name="response" value="" placeholder = "Answer here" required></input>
        <button id="submit-answer" class="btn">Submit</button>
        </div>
        </div>`;
      const submit = document.getElementById("submit-answer");
      const input = document.querySelector(".response-input");
      submit.onclick = () => sendAnswer(input, dbRes.data._id);
    })
    .catch((err) => console.log(err));
}

function displayMood(answerId) {
  axios
    .get("/mood")
    .then((dbRes) => {
      console.log(dbRes);
      container.innerHTML = `<div id="question-div">
      <div class="slide">
      <h1 class="question" answer-id="${answerId}" >What's your mood today ?</h1>
      <div class="mood-radio">
      <div>
      <label for="good" class="label-mood">
      <input type="radio" id="good" name="mood" value="good" checked>
      <img class="img-radio" src="/images/good.png">
      </label>
    </div>
    
    <div>
    <label for="neutral" class="label-mood">
      <input type="radio" id="neutral" name="mood" value="neutral">
      <img class="img-radio" src="/images/neutral.png">
    </label>
    </div>
    
    <div>
    <label for="bad" class="label-mood">
    <input type="radio" id="bad" name="mood" value="bad">
    <img class="img-radio" src="/images/bad.png">
    </label>

    <button id="submit-mood" class="btn">Submit</button>
    </div>
    
    </div>
    <br>
    
    </div>
 
    
    </div> `;
      const submitMood = document.getElementById("submit-mood");
      submitMood.onclick = () => getMood(answerId);
    })
    .catch((err) => console.log(err));
}

// Création variable locale pour sauvegarder en deux fois le mood puis la réponse
function sendAnswer(input, questionId) {
  axios
    .post("/answer", {
      date: new Date(),
      response: [input.value],
      id_question: questionId,
    })
    .then((dbRes) => {
      console.log("ok" + dbRes.data);
      displayMood(dbRes.data._id);
    })
    .catch((err) => console.log(err));
}

function getMood(answerId) {
  var inputMood = document.querySelector('input[name="mood"]:checked').value
  console.log(`answerID is ${answerId}, mood is ${inputMood}`);
  axios
    .post(`/editanswer/${answerId}`, {
      mood: `${inputMood}`,
    })
    .then((Res) => console.log(Res))
    .catch((err) => console.log(err));
  container.innerHTML = `<div id="question-div">
    <h1 class="title">Today's entry is saved !</h1>
    <div class="see-dashboard"><p class="typing">Check your dashboard for details <br>and resources!</p>
    <a href="/dashboard"><button class="btn">See dashboard</button></a></div>
    </div>`;
}

btn.onclick = displayOne;
