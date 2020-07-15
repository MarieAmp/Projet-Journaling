const btnUserbyId = document.getElementById("btn_fetchUserById");
const btnUserbyEmail = document.getElementById("btn_fetchUserByEmail");
const btnQuestionbyKeyword = document.getElementById(
  "btn_fetchQuestionByKeyword"
);
const btnQuestionbyId = document.getElementById("btn_fetchQuestionById");
const btnAllQuestions = document.getElementById("btn_fetchAllQuestions");
const displayResults = document.getElementById("display_results");
const btnClear = document.getElementById("display_clear");

var clear = () => {
  displayResults.innerHTML = "";
};

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
    <li> Admin access - ${user.admin}</li>
    </ul>`;
      if (user.admin) {
        displayResults.innerHTML += `<span class="revoke" id="revoke"> Revoke admin access
</span>`;
      } else {
        displayResults.innerHTML += `<span class="grant" id="grant"> Grant admin access
</span>`;
      }
    })
    .catch((err) => console.error(err));
};

var displayUserbyEmail = () => {
  clear();
  const userEmail = document.getElementById("user_email").value;
  axios
    .get(`admin/user-${userEmail}`)
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

      var adminStatus = document.getElementById("admin_status").innerText;
      manageAccess(adminStatus, user._id);
    })
    .catch((err) => console.error(err));
};

var revokeAdmin = (userId) => {
  console.log("revoke btn pushed");
  axios
    .get(`admin/revoke/${userId}`)
    .then((dbRes) => console.log("admin rights revoked"))
    .catch((err) => console.error(err));
  displayResults.innerHTML = "Admin access revoked";
};

var grantAdmin = (userId) => {
  console.log('grant btn pushed');
  axios
    .get(`admin/grant/${userId}`)
    .then((dbRes) => console.log("admin rights granted"))
    .catch((err) => console.error(err));
  displayResults.innerHTML = "Admin access granted";
};

var manageAccess = (adminStatus, userId) => {
  if (adminStatus) {
    displayResults.innerHTML += `<a class="revoke" id="revoke"> Revoke admin access
</a>`;
  } else {
    displayResults.innerHTML += `<a class="grant" id="grant"> Grant admin access
</a>`;
  }
  var btnRevoke = document.getElementById("revoke");
  var btnGrant = document.getElementById("grant");
  btnRevoke.onclick = revokeAdmin(userId);
  btnGrant.onclick = grantAdmin(userId);
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

btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId;
btnUserbyEmail.onclick = displayUserbyEmail;
btnAllQuestions.onclick = displayAllQuestions;



/*
      if (adminStatus) {
        displayResults.innerHTML += `<span class="revoke" id="revoke"> Revoke admin access
</span>`      } 
else {displayResults.innerHTML += `<span class="grant" id="grant"> Grant admin access
</span>`}
*/