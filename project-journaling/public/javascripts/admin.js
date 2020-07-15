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
    var birthday = moment(user.birthday).format("MM/DD/YYYY");
    console.log(`it's my birthday : `, birthday)
    displayResults.innerHTML = ` <h3> ID - ${user._id} </h3>
    <h3> ${user.name} ${user.lastName}</h3>
    <ul> 
      <li> Birthday - ${birthday}</li>
    <li> Email - ${user.email}</li>
    <li> Plan -  ${user.plan}</li>
    <li> Admin access - ${user.admin}</li>
    </ul>`
  })
  .catch((err) => console.error(err))
}

var displayUserbyEmail = () => {
  clear()
  const userEmail = document.getElementById('user_email').value
    axios 
    .get(`admin/user-${userEmail}`)
    .then((jsonUser) => {
      console.log(jsonUser.data);
      var user = jsonUser.data;
      var birthday = moment(user.birthday).format("MM/DD/YYYY");
      console.log(`it's my birthday : `, birthday)
      displayResults.innerHTML = ` <h3> ID - ${user._id} </h3>
      <h3> ${user.name} ${user.lastName}</h3>
      <ul> 
        <li> Birthday - ${birthday}</li>
      <li> Email - ${user.email}</li>
      <li> Plan -  ${user.plan}</li>
      <li> Admin access - ${user.admin}</li>
      </ul>`
      if (user.admin) {
        displayResults.innerHTML += `<span class="revoke" id="revoke"> Revoke admin access
</span>`      } 
else {displayResults.innerHTML += `<span class="grant" id="grant"> Grant admin access
</span>`}
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
      `
Questions.forEach(question => { 
  displayResults.innerHTML += `  <ul class="list_questions"><li> <a href="admin/delete/question-${question._id}" class="question_delete">X</a>  - ${question.question} </li> </ul>`;
});
      displayResults.innerHTML += ``
      var btnsRemove = document.querySelectorAll(".question_delete")
      btnsRemove.forEach( btn => btn.onclick = displayAllQuestions )
    })
    .catch((err) => console.error(err))
  }






btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId ;
btnAllQuestions.onclick = displayAllQuestions;

