var questions = document.getElementsByClassName("question_entry");
var btnOk = document.getElementById('details_ok');

getDetails = (nodeContainer) => {
  var question_id = nodeContainer.getAttribute('question-id');
axios 
.get(`/dashboard/collections/question-${question_id}`)
.then((dbRes) => return dbRes.data ) //console.log(dbRes.data)  )   //doesn't work !
//return dbRes.data
.catch((err) => console.log(err));
}

displayDetails = (nodeContainer) => {
  var infos = getDetails(nodeContainer);
  var detailBox = document.getElementById('details_box');
  var questionText = infos.question;
  var answers = infos.answers;
  var detailQuestion = document.getElementById('details_question');
  var detailAnswers = document.getElementById('details_answers');
  var date = moment(answer.date).format("MM/DD/YYY")
  detailQuestion.innerText = questionText
  answers.forEach(answer => { detailAnswers.innerHTML += `<li> On <span class="bold"> ${date}</span> Your answer was : <br>
  <p>${answer.response} <br> Your mood was : <span class="bold ${answer.mood}"> ${answer.mood}</span></p></li>`
  });
  detailBox.classList.toggle('hidden');
}

hideDetails = () => { 
  var detailBox = document.getElementById('details_box');
  var detailQuestion = document.getElementById('details_question');
  var detailAnswers = document.getElementById('details_answers');
  detailQuestion.innerText = "";
  detailAnswers.innerHTML = "";
  detailBox.classList.toggle('hidden')

}






questions.forEach(question => { question.onclick = displayDetails(question)
});

btnOk.onclick = hideDetails


