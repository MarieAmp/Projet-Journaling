const btn = document.getElementById("btn-start");
const container = document.getElementById("container");

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
    .then((Res) => {});
}

btn.onclick = displayOne;
