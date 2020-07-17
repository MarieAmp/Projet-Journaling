require("dotenv").config();
require("./../config/mongodb");
const answerModel = require("../../models/Answers");

const responseBase = [
   {
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:01/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c581"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:02/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:03/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c555"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:04/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:05/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c55c"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:06/07/2020,
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:02/03/2020,
   mood:"Bad",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:06/03/2020,
   mood:"Neutral",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
}
]




answerModel.insertMany(questions)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));