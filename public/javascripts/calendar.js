const calBtn = document.getElementById("btn-calendar");
const displayPastA = document.getElementById("pastA");
const displayPastQ = document.getElementById("pastQ");
// calBtn.onclick = getData;

!(function () {
  var today = moment();
  function getData() {
    axios
      .get("/calendar/show")
      .then((dbRes) => {
        
        console.log(dbRes);
        let data = dbRes.data;
        console.log(data);
        console.log
        var calendar = new Calendar("#calendar", data);
      })
      .catch((err) => console.log(err));
  }
  window.addEventListener("load", getData);

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.events.forEach(function (ev) {
      ev.date = moment(ev.date);
    });
    this.draw();
    var current = document.querySelector(".today");
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function () {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();
  };

  Calendar.prototype.drawHeader = function () {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement("div", "header");
      this.header.className = "cal-header";

      this.title = createElement("h1");

      var right = createElement("div", "right");
      right.addEventListener("click", function () {
        self.nextMonth();
      });

      var left = createElement("div", "left");
      left.addEventListener("click", function () {
        self.prevMonth();
      });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format("MMMM YYYY");
  };

  Calendar.prototype.drawMonth = function () {
    var self = this;

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = "month out " + (self.next ? "next" : "prev");
      this.oldMonth.addEventListener("webkitAnimationEnd", function () {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement("div", "month");
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function () {
          self.month.className = "month in " + (self.next ? "next" : "prev");
        }, 16);
      });
    } else {
      this.month = createElement("div", "month");
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = "month new";
    }
  };

  Calendar.prototype.backFill = function () {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) {
      return;
    }

    clone.subtract("days", dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.fowardFill = function () {
    var clone = this.current.clone().add("months", 1).subtract("days", 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) {
      return;
    }

    for (var i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.currentMonth = function () {
    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add("days", 1);
    }
  };

  Calendar.prototype.getWeek = function (day) {
    if (!this.week || day.day() === 0) {
      this.week = createElement("div", "week");
      this.month.appendChild(this.week);
    }
  };

  Calendar.prototype.drawDay = function (day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement("div", this.getDayClass(day));
    outer.addEventListener("click", function () {
      self.openDay(this);
    });

    //Day Name
    var name = createElement("div", "day-name", day.format("ddd"));

    //Day Number
    var number = createElement("div", "day-number", day.format("DD"));

    //////////////////////////////////////////////////////////////
    //Events

    var events = createElement("div", "day-events");
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  };

  Calendar.prototype.drawEvents = function (day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {
        if (ev.date.isSame(day, "day")) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        var evSpan = createElement("span", "white"); //ai changé ev.color en white pour créer une case blanche si evt
        element.appendChild(evSpan);
      });
    }
  };

  Calendar.prototype.getDayClass = function (day) {
    var classes = ["day"];
    if (day.month() !== this.current.month()) {
      classes.push("other");
    } else if (today.isSame(day, "day")) {
      classes.push("today");
    }
    return classes.join(" ");
  };

  Calendar.prototype.openDay = function (el) {
    var details, arrow;
    var dayNumber =
      +el.querySelectorAll(".day-number")[0].innerText ||
      +el.querySelectorAll(".day-number")[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector(".details");

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector(".arrow");
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener("webkitAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("oanimationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("msAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("animationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = "details out";
      }

      //Create the Details Container
      details = createElement("div", "details in");

      //Create the arrow
      var arrow = createElement("div", "arrow");

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, "day")) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + "px";
  };

  Calendar.prototype.renderEvents = function (events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector(".events");
    var wrapper = createElement(
      "div",
      "events in" + (currentWrapper ? " new" : "")
    );

    events.forEach(function (ev) {
      console.log(ev)
      var div = createElement("div", "event");
      var square = createElement("div", "white");
      var span = createElement(
        "span",
        "",
        ev.id_question.question
      );
      span.setAttribute("question.id", `${ev.id_question._id}`);
      span.setAttribute("user.id",`${ev.id_user}`);
      span.onclick = pastAnswers;

      function pastAnswers() {
        var target = event.target.getAttribute("question.id");
        // var target = event.target.getAttribute("user.id");
        console.log(target);
        function clean() {
          displayPastA.innerHTML = "";
        }
        clean();
        axios
          .get(`calendar/past-answers/${target}`)
          .then((res) => {
            console.log(res);
            displayPastQ.innerHTML = res.data[0].id_question.question;
            res.data.forEach((rep) => {
              var momDate = moment(rep.date).format("DD/MM/YYYY");
              displayPastA.innerHTML += `
            <div class='each-ans'>
            <h3 class='each-date'>${momDate}</h3>
            <p class='each-a'>${rep.response}</p><br>`;
            });
          })
          .catch((err) => console.log(err));
      }

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement("div", "event empty");
      var span = createElement("span", "", "No Entry");

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = "events out";
      currentWrapper.addEventListener("webkitAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("oanimationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("msAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("animationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  };

  Calendar.prototype.nextMonth = function () {
    this.current.add("months", 1);
    this.next = true;
    this.draw();
  };

  Calendar.prototype.prevMonth = function () {
    this.current.subtract("months", 1);
    this.next = false;
    this.draw();
  };

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if (className) {
      ele.className = className;
    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
})();
