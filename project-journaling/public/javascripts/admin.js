const btnUserbyId = document.getElementById('btn_fetchUserById')
const btnUserbyEmail = document.getElementById('btn_fetchUserByEmail')
const btnQuestionbyKeyword = document.getElementById('btn_fetchQuestionByKeyword')
const btnQuestionbyId = document.getElementById('btn_fetchQuestionById')
const btnAllQuestions= document.getElementById('btn_fetchAllQuestions')
const displayResults = document.getElementById('display_results')
const btnClear = document.getElementById('display_clear')

var clear = () => { displayResults.innerHTML = ""}

var displayUserbyId = () => {
clear()
const userId = document.getElementById('user_id').value
  axios 
  .get(`admin/user-${userId}`)
  .then((jsonUser) => {
    console.log(jsonUser.data);
    var user = jsonUser.data;
    //var birthday = moment(user.birthday).format("MM/DD/YYY");
    displayResults.innerHTML = ` <h3> ID - ${user._id} </h3>
    <h3> ${user.name} ${user.lastName}</h3>
    <ul> 
      <li> Birthday - moment(${user.birthday}).format("MM/DD/YYY")</li>
    <li> Email - ${user.email}</li>
    <li> Plan -  ${user.plan}</li>
    <li> Admin access - ${user.admin}</li>
    </ul>`
  })
  .catch((err) => console.error(err))
}

var displayAllQuestions = () => {
 clear()
    axios 
    .get(`admin/questions/all`)
    .then((jsonQuestionList) => {
      console.log(jsonQuestionList.data);
      var Questions = jsonQuestionList.data;

      displayResults.innerHTML = ` <h3> All questions </h3>
      </ul>`
Questions.forEach(question => { 
  displayResults.innerHTML += `  <li>  ${question.question} <a href="admin/delete/question-${question._id}" class="question_delete"> X </a></li>`;
});
      displayResults.innerHTML += `</ul>`
      var btnsRemove = document.querySelectorAll(".question_delete")
      btnsRemove.forEach( btn => btn.onclick = displayAllQuestions )
    })
    .catch((err) => console.error(err))
  }






btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId ;
btnAllQuestions.onclick = displayAllQuestions;

