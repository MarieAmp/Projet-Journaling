const btnUserbyId = document.getElementById("btn_fetchUserById");
const btnUserbyEmail = document.getElementById("btn_fetchUserByEmail");
const btnQuestionbyKeyword = document.getElementById(
  "btn_fetchQuestionByKeyword"
);
const btnQuestionbyId = document.getElementById("btn_fetchQuestionById");
const btnAllQuestions = document.getElementById("btn_fetchAllQuestions");
const btnAllUsers = document.getElementById("btn_fetchAllUsers");
const btnCreateQuestion = document.getElementById("btn_createQuestion");

const displayResults = document.getElementById("display_results");
var nbResultsElt = document.getElementById("nb_results");
const btnClear = document.getElementById("display_clear");

// ADMIN MANAGEMENT

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

// QUESTION MANAGEMENT

var deleteQuestion = () => {
  var spanQuestionId = document.querySelector(".span_question_id");
  var questionId = spanQuestionId.getAttribute("question_id");
  axios
    .get(`admin/delete/question/${questionId}`)
    .then((dbRes) => {
      console.log(dbRes);
      displayResults.innerHTML = `<p class="revoke final">  Question ${questionId} deleted </p>`;
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p class="revoke final">  Could not delete question #${questionId} <br> sorry. </p>`;
    });
};

var deleteQuestion = (questionId) => {
  axios
    .get(`admin/delete/question/${questionId}`)
    .then((dbRes) => {
      console.log(dbRes);
      displayResults.innerHTML = `<p class="revoke final">  Question ${questionId} deleted </p>`;
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p class="revoke final">  Could not delete question #${questionId} <br> sorry. </p>`;
    });
};

var createQuestion = () => {
  clear();
  var questionText = document.getElementById("question_text").value;
  const select = document.querySelector("select[name='question_theme']");
  const value = select.value;
  const questionTheme = select.querySelector(`option[value='${value}']`);
  console.log(`question : ${questionText}, theme : ${questionTheme.value}`);
  axios
    .post("admin/new/question", {
      question: `${questionText}`,
      theme: `${questionTheme.value}`,
    })
    .then((dbRes) => {
      var newQuestion = dbRes.data;
      displayResults.innerHTML = `New question created <br> <h3> Question # <span class="span_question_id" question_id="${newQuestion._id}"> ${newQuestion._id} </span></h3>
    <aside class="theme">  theme : ${newQuestion.theme} </aside>
    <p class="questions_text"> ${newQuestion.question} </p>
    `;
    })
    .catch((err) => {
      console.error(err);
      displayResults.innerHTML = `Could not create new question <br> sorry.`;
    });
};

//CLEARS RESULTS
var clear = () => {
  displayResults.innerHTML = "";
  nbResultsElt.innerText = "";
};

//DISPLAY USERS
var displayUserbyId = () => {
  clear();
  const userId = document.getElementById("user_id").value;
  console.log(userId)
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
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not delete retrieve user <br> #${userId} <br> sorry. </p>`;
    });
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
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not retrieve user with <br> email : ${userEmail} <br> sorry. </p>`;
    });
};

var displayAllUsers = () => {
  clear();
  axios
    .get(`admin/users/all`)
    .then((jsonUserList) => {
      console.log(jsonUserList.data);
      var users = jsonUserList.data;
      nbResultsElt.innerText = `${users.length}`;
      displayResults.innerHTML = ` <h3> All users </h3>
      `;
      users.forEach((user) => {
        var birthday = moment(user.birthday).format("MM/DD/YYYY");
        displayResults.innerHTML += `  <h3> ID - ${user._id} </h3>
        <h3> ${user.name} ${user.lastName}</h3>
        <ul> 
          <li> Birthday - ${birthday}</li>
        <li> Email - ${user.email}</li>
        <li> Plan -  ${user.plan}</li>
        <li> Admin access - <span id="admin_status">${user.admin}</span></li>
        </ul>
        <div class="blank"> <div>`;
      });
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not retrieve all users <br> sorry. </p>`;
    });
};

//DISPLAY QUESTIONS
var displayAllQuestions = () => {
  clear();
  axios
    .get(`admin/questions/all`)
    .then((jsonQuestionList) => {
      console.log(jsonQuestionList.data);
      var Questions = jsonQuestionList.data;
      nbResultsElt.innerText = `${Questions.length}`;
      displayResults.innerHTML = ` <h3> All questions </h3>
      `;
      Questions.forEach((question) => {
        displayResults.innerHTML += `  <ul class="list_questions"><li> <span class="span_question_id question_delete" question_id="${question._id}"> X</span>  - ${question.question} </li> </ul>`;
      });
      displayResults.innerHTML += ``;
      var btnsRemove = document.querySelectorAll(".question_delete");
      btnsRemove.forEach((btn) => (btn.onclick = () => {

            var questionId = btn.getAttribute("question_id");
            axios
              .get(`admin/delete/question/${questionId}`)
              .then((dbRes) => {
                console.log(dbRes);
                displayResults.innerHTML = `<p class="revoke final">  Question ${questionId} deleted </p>`;
                setTimeout(displayAllQuestions, 2500);
              })
              .catch((err) => {
                console.log(err);
                displayResults.innerHTML = `<p class="revoke final">  Could not delete question #${questionId} <br> sorry. </p>`;
              });
          })
      );
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not retrieve all questions <br> sorry. </p>`;
    });
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

      displayResults.innerHTML = ` <h3> Question # <span class="span_question_id" question_id="${question._id}"> ${question._id} </span></h3>
      <aside class="theme">  theme : ${question.theme} </aside>
      <p class="question_text"> ${question.question} </p>
      <button class="delete">Delete question</button>`;

      var btnDelete = document.querySelector(".delete");
      btnDelete.onclick = deleteQuestion;
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not retrieve question # ${questionId} <br> sorry. </p>`;
    });
};

var displayKeyword = () => {
  var questionKeyword = document.getElementById("question_keyword").value;
  console.log("display questions requested for keyword : ", questionKeyword);
  clear();
  axios
    .get(`admin/question/keyword/${questionKeyword}`)
    .then((jsonQuestionsList) => {
      console.log(jsonQuestionsList.data);
      var questions = jsonQuestionsList.data;
      nbResultsElt.innerText = `${questions.length}`;
      displayResults.innerHTML = `<br>`;
      questions.forEach((question) => {
        displayResults.innerHTML += ` <div question_id="${question._id}"> <h3> Question # <span class="span_question_id" question_id="${question._id}"> ${question._id} </span></h3>
      <aside class="theme">  theme : ${question.theme} </aside>
      <p class="questions_text"> ${question.question} </p>
      <button class="delete">Delete question</button> </div> <div class="blank"></div>`;
      });
      var btnsDelete = document.querySelectorAll(".delete");
      btnsDelete.forEach(
        (btn) =>
          (btn.onclick = () => {
            var questionId = btn.parentElement.getAttribute("question_id");
            axios
              .get(`admin/delete/question/${questionId}`)
              .then((dbRes) => {
                console.log(dbRes);
                displayResults.innerHTML = `<p class="revoke final">  Question ${questionId} deleted </p>`;
                setTimeout(displayKeyword, 2500);
              })
              .catch((err) => {
                console.log(err);
                displayResults.innerHTML = `<p class="revoke final">  Could not delete question #${questionId} <br> sorry. </p>`;
              });
          })
      );
    })
    .catch((err) => {
      console.log(err);
      displayResults.innerHTML = `<p>  Could not retrieve questions with <br> keyword : ${questionKeyword} <br> sorry. </p>`;
    });
};

var createQuestionForm = () => {
  clear();
  displayResults.innerHTML = `<h3> Create a new question </h3>
  
  <label class="create_label" for="question_text">Question</label>
  <input class ="input_question" type="text" name="question" id="question_text">
  <label class="create_label" for="question_theme">Theme</label>
  <select name="question_theme" id="question_theme">
  <option  value="relationships" >relationships</option>
  <option value="personality" >personality</option>
  <option value="lifestyle" >lifestyle</option>
  <option value="work" >work</option>
  <option value="deep" >deep</option>
  </select>
  <button id="btn_newQuestion">create new question</button>
  </form>`;

  var btn_newQuestion = document.getElementById("btn_newQuestion");
  btn_newQuestion.onclick = createQuestion;
};

//

// EVT LISTENERS
btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId;
btnUserbyEmail.onclick = displayUserbyEmail;
btnAllQuestions.onclick = displayAllQuestions;
btnQuestionbyId.onclick = displayOneQuestion;
btnQuestionbyKeyword.onclick = displayKeyword;
btnAllUsers.onclick = displayAllUsers;
btnCreateQuestion.onclick = createQuestionForm;
