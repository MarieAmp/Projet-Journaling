const btnUserbyId = document.getElementById("btn_fetchUserById");
const btnUserbyEmail = document.getElementById("btn_fetchUserByEmail");
const btnQuestionbyKeyword = document.getElementById(
  "btn_fetchQuestionByKeyword"
);
const btnQuestionbyId = document.getElementById("btn_fetchQuestionById");
const btnAllQuestions = document.getElementById("btn_fetchAllQuestions");
const displayResults = document.getElementById("display_results");
const btnClear = document.getElementById("display_clear");

var revokeAdmin = () => {
  var revokeDiv = document.getElementById("revoke");
  var userId = revokeDiv.getAttribute("userID");
  console.log("revoke btn pushed for ", userId);
  axios
    .get(`/admin/revoke/${userId}`)
    .then((jsonUser) => {
      displayResults.innerHTML = `<p class="revoke final">  Admin access revoked for ${jsonUser.data.name} ${jsonUser.data.lastName} </p>`;
    })
    .catch((err) => console.error(err));
};

var grantAdmin = () => {
  var grantDiv = document.getElementById("grant");
  var userId = grantDiv.getAttribute("userID");
  console.log("grant btn pushed for ", userId);
  axios
    .get(`/admin/grant/${userId}`)
    .then((jsonUser) => {
      displayResults.innerHTML = `<p class="grant final">  Admin access granted  for ${jsonUser.data.name} ${jsonUser.data.lastName} </p>`;
    })
    .catch((err) => console.error(err));
};

var manageAccess = (adminStatus, userId) => {
  if (adminStatus) {
    displayResults.innerHTML += `<div class="revoke" userID="${userId}" id="revoke"> Revoke admin access
</div>`;
    document.getElementById("revoke").onclick = revokeAdmin;
  } else {
    displayResults.innerHTML += `<div class="grant" userID="${userId}" id="grant"> Grant admin access
    </div>`;
    document.getElementById("grant").onclick = grantAdmin;
  }
};

//CLEARS RESULTS
var clear = () => {
  displayResults.innerHTML = "";
};
//

var displayUserbyId = () => {
  clear();
  const userId = document.getElementById("user_id").value;
  axios
    .get(`admin/user-${userId}`)
    .then((jsonUser) => {
      console.log(jsonUser.data);
      var user = jsonUser.data;
      var birthday = moment(user.birthday).format("MM/DD/YYYY");
      console.log(`it's my birthday : `, birthday);
      displayResults.innerHTML = ` <h3> ID - ${user._id} </h3>
    <h3> ${user.name} ${user.lastName}</h3>
    <ul> 
      <li> Birthday - ${birthday}</li>
    <li> Email - ${user.email}</li>
    <li> Plan -  ${user.plan}</li>
    <li> Admin access - <span id="admin_status">${user.admin}</span></li>
    </ul>`;
      manageAccess(user.admin, user._id);
    })
    .catch((err) => console.error(err));
};

var displayUserbyEmail = () => {
  clear();
  const userEmail = document.getElementById("user_email").value;
  axios
    .get(`admin/user/${userEmail}`)
    .then((jsonUser) => {
      console.log(jsonUser.data);
      var user = jsonUser.data;
      var birthday = moment(user.birthday).format("MM/DD/YYYY");
      //console.log(`it's my birthday : `, birthday)
      displayResults.innerHTML = ` <h3> ID - ${user._id} </h3>
      <h3> ${user.name} ${user.lastName}</h3>
      <ul> 
        <li> Birthday - ${birthday}</li>
      <li> Email - ${user.email}</li>
      <li> Plan -  ${user.plan}</li>
      <li> Admin access - <span id="admin_status">${user.admin}</span></li>
      </ul>`;

      //var adminStatus = document.getElementById("admin_status").innerText;
      manageAccess(user.admin, user._id);
    })
    .catch((err) => console.error(err));
};

var displayAllQuestions = () => {
  clear();
  axios
    .get(`admin/questions/all`)
    .then((jsonQuestionList) => {
      console.log(jsonQuestionList.data);
      var Questions = jsonQuestionList.data;

      displayResults.innerHTML = ` <h3> All questions </h3>
      `;
      Questions.forEach((question) => {
        displayResults.innerHTML += `  <ul class="list_questions"><li> <a href="admin/delete/question-${question._id}" class="question_delete">X</a>  - ${question.question} </li> </ul>`;
      });
      displayResults.innerHTML += ``;
      var btnsRemove = document.querySelectorAll(".question_delete");
      btnsRemove.forEach((btn) => (btn.onclick = displayAllQuestions));
    })
    .catch((err) => console.error(err));
};

var displayOneQuestion = () => {
  var questionId = document.getElementById("question_id").value;
  console.log("display one question requested for id", questionId);
  clear();
  axios
    .get(`admin/question/${questionId}`)
    .then((jsonQuestion) => {
      console.log(jsonQuestion.data);
      var question = jsonQuestion.data;

      displayResults.innerHTML = ` <h3> Question #${question._id} </h3>
      <p class="question"> ${question.question} </p>
      <p class="theme">  theme : ${question.theme} </p>
      <button id="display_all">All questions</button>`;

      var btnDisplayAll = document.getElementById("display_all");
      btnDisplayAll.onclick = displayAllQuestions;
    })
    .catch((err) => console.error(err));
};

btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId;
btnUserbyEmail.onclick = displayUserbyEmail;
btnAllQuestions.onclick = displayAllQuestions;
