require("dotenv").config();
require("./../../config/mongodb");
const answerModel = require("../../models/Answers");

const responseBase = [
   {
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-01-12',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c581"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-02-13',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-01-14',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c555"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-01-15',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2019-07-05',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c55c"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2019-07-06',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2019-02-03',
   mood:"Bad",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2019-02-01',
   mood:"Neutral",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-12',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c581"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-13',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-14',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c555"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-15',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-05',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c55c"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-07-06',
   mood:"Good",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-02-03',
   mood:"Bad",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c575"
},
{
   response : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio, unde reiciendis inventore similique quibusdam consequuntur dolorem accusamus, nostrum explicabo laboriosam? Excepturi laboriosam, molestiae saepe fugit quisquam distinctio omnis repellendus!",
   date:'2020-02-01',
   mood:"Neutral",
   id_user:"5f1175904fac51768cf6bd82",
   id_question:"5f0ea3f990e6fef2e8e2c56a"
}
]




answerModel.insertMany(responseBase)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));