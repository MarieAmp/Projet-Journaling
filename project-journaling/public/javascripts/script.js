const btn = document.getElementById("btn-start");
const container = document.getElementById("container");
const btnMood = document.getElementById("btn-mood");




function displayOne() {
  axios
    .get("/question")
    .then((dbRes) => {
      console.log(dbRes.data.question);
      console.log("in");
      container.innerHTML += `<div id="question-div">
        <p class="question">${dbRes.data.question}</p>
        <input class="reponse-input" type="textarea" name="response" required></input>
        <button id="submit-answer">Submit</button>
      </div> `;
      const submit = document.getElementById("submit-answer");
      const input = document.getElementsByClassName("response-input");
      submit.onclick = () => getAnswer(input[0], dbRes.data.id);
      submit.onclick = displayMood
    })
    .catch((err) => console.log(err));
}

function displayMood() {
  axios
    .get("/mood")
    .then((dbRes) => {
      console.log(dbRes);
      container.innerHTML = `<div id="question-div">
      <p class="question">What's your mood today ?</p>
    <select name="moods" id="mood-select">
    <option value="dog">Good</option>
    <option value="cat">Bof</option>
    <option value="hamster">Bad</option>
    <button id="submit-mood">Submit</button>
    </div> `;
    const submitMood = document.getElementById("submit-mood");
    const inputMood = document.getElementsByClassName("mood-select");
    submitMood.onclick = () => getMood(inputMood.value);
    })
    .catch((err) => console.log(err));
}

// Création variable locale pour sauvegarder en deux fois le mood puis la réponse
function getAnswer(input, questionId) {
  axios
    .post("/response", {
      response: input[0].value,
      id_question: questionId,
    })
    .then(Res)
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


btn.onclick = displayOne;

