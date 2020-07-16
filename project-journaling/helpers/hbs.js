const hbs = require("hbs");
const moment = require("moment");



hbs.registerHelper("format-date", function(date) {
    return moment(date).format("MM/DD/YYYY");
  });
  

