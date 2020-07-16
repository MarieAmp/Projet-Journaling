const btnUserbyId = document.getElementById("btn_fetchUserById");
const btnUserbyEmail = document.getElementById("btn_fetchUserByEmail");
const btnQuestionbyKeyword = document.getElementById(
  "btn_fetchQuestionByKeyword"
);
const btnQuestionbyId = document.getElementById("btn_fetchQuestionById");
const btnAllQuestions = document.getElementById("btn_fetchAllQuestions");
const displayResults = document.getElementById("display_results");
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
  var spanQuestionId = document.querySelector('.span_question_id');
  var questionId = spanQuestionId.getAttribute('question_id')
axios.get(`admin/delete/question/${questionId}`)
.then((dbRes) => {
  console.log(dbRes)
  displayResults.innerHTML = `<p class="revoke final">  Question ${questionId} deleted </p>`;
})
.catch((err) => {
  console.log(err)
  displayResults.innerHTML = `<p class="revoke final">  Could not delete question #${questionId} <br> sorry. </p>`;
});
}


//CLEARS RESULTS
var clear = () => {
  displayResults.innerHTML = "...";
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
    .catch((err) => {
      console.log(err)
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
      console.log(err)
      displayResults.innerHTML = `<p>  Could not delete retrieve user with <br> email : ${userEmail} <br> sorry. </p>`;
    });
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
        displayResults.innerHTML += `  <ul class="list_questions"><li> <span class="span_question_id question_delete" question_id="${question._id}"> X</span>  - ${question.question} </li> </ul>`;
      });
      displayResults.innerHTML += ``;
      var btnsRemove = document.querySelectorAll(".question_delete");
      btnsRemove.forEach((btn) => (btn.onclick = displayAllQuestions));
    })
    .catch((err) => {console.log(err)
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
      <button class="delete">Delete question</button>
      <button id="display_all">All questions</button>`;

      var btnDisplayAll = document.getElementById("display_all");
      btnDisplayAll.onclick = displayAllQuestions;
var btnDelete = document.querySelector(".delete")
btnDelete.onclick = deleteQuestion;

    })
    .catch((err) => {console.log(err)
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
      displayResults.innerHTML = "";
      questions.forEach( question => {
        displayResults.innerHTML += ` <h3> Question # <span class="span_question_id" question_id="${question._id}"> ${question._id} </span></h3>
      <aside class="theme">  theme : ${question.theme} </aside>
      <p class="questions_text"> ${question.question} </p>
      <button class="delete">Delete question</button> <div id="blank"></div>`;
var btnDelete = document.querySelector(".delete");
btnDelete.onclick = deleteQuestion;
      })
      
      
})
.catch((err) => {console.log(err);
  displayResults.innerHTML = `<p>  Could not retrieve questions with <br> keyword : ${questionKeyword} <br> sorry. </p>`;
})
};






btnClear.onclick = clear;
btnUserbyId.onclick = displayUserbyId;
btnUserbyEmail.onclick = displayUserbyEmail;
btnAllQuestions.onclick = displayAllQuestions;
btnQuestionbyId.onclick = displayOneQuestion;
btnQuestionbyKeyword.onclick = displayKeyword;