require("dotenv").config();
require("../../config/mongodb");

const QuestionModel = require("../../models/Question")

const questions = [
  {
    question: "What makes you proud ?", 
    theme: "personality" 
  },
  {
    question : "Where do you want to travel next ?",
    theme : 'lifestyle'
  }, 
  {
    question : "What is your mission ?",
    theme : "personality"
  }, 
  {
    question : "Can people change ?",
    theme : "deep"
  }, 
  {
    question : "The best part of today ?",
    theme : "lifestyle"
  }, 
  {
    question : "Today was tought because :",
    theme : "lifestyle"
  }, 
  {
    question : "What song is stuck in your head ?",
    theme : "lifestyle"
  }, 
  {
    question : "What's the oldest thing you're wearing today ?",
    theme : "lifestyle"
  }, 
  {
    question : "Do you owe someone money ? Does someone owe you ?",
    theme : "relationships"
  }, 
  {
    question : "What are you looking forward to ?",
    theme : "lifestyle"
  }, 
  {
    question : "Are you holding a grudge ? About ?",
    theme : "personality"
  }, 
  {
    question : "Do you need a break ? From what ?",
    theme : "personality"
  }, 
  {
    question : "If you were going to start your own company, what would it be ?",
    theme : "work"
  }, 
  {
    question : "What makes you `YOU` ?",
    theme : "deep"
  }, 
  {
    question : "Who do you want to be ?",
    theme : "deep"
  }, 
  {
    question : "What do you want to forget ?",
    theme : "deep"
  }, 
  {
    question : "What would you rather have your success come from ?",
    theme : "work"
  }, 
  {
    question : "What are you obsessively listening to ?",
    theme : "lifestyle"
  }, 
  {
    question : "Are you seeking contentment or excitement ?",
    theme : "deep"
  }, 
  {
    question : "Are you in love ?",
    theme : "lifestyle"
  }, 
  {
    question : "What is your biggest obstacle right now ?",
    theme : "deep"
  }, 
  {
    question : "What's your favourite question to ask people ?",
    theme : "relationships"
  }, 
  {
    question : "Write down the cure for a broken heart",
    theme : "relationships"
  }, 
  {
    question : "What was the last performance or concert you attended ?",
    theme : "lifestyle"
  }, 
  {
    question : "Who is the craziest person in your life ?",
    theme : "relationships"
  }, 
  {
    question : "What word did you overuse today ?",
    theme : "lifestyle"
  }, 
  {
    question : "What's your most embarassing purchase on a recent bank statement ?",
    theme : "lifestyle"
  }, 
  {
    question : "What would you like to ask your mother ?",
    theme : "relationships"
  }, 
  {
    question : "Who's your nemesis ?",
    theme : "relationships"
  }, 
  {
    question : "If you could add one hour to your day, what would you do with it ?",
    theme : "deep"
  }, 
  {
    question : "What do you not want to talk about ?",
    theme : "deep"
  }, 
  {
    question : "What do you want to buy ?",
    theme : "lifestyle"
  }, 
  {
    question : "What new activity have you tried ?",
    theme : "lifestyle"
  }, 
  {
    question : "Who do you aspire to be like ?",
    theme : "deep"
  }, 
  {
    question : "When was the last time you felt like you were on top of the world ?",
    theme : "personality"
  }, 
  {
    question : "Pick a color for today",
    theme : "lifestyle"
  }, 
  {
    question : "What inventions can you not live without ?",
    theme : "lifestyle"
  }, 
  {
    question : "If you could acquire a talent, what would it be ?",
    theme : "personality"
  }, 
  {
    question : "Write down a problem you solved today.",
    theme : "lifestyle"
  }, 
  {
    question : "What famous people would you bring back from the dead and have dinner with ?",
    theme : "deep"
  }, 
  {
    question : "How many times did you curse today ?",
    theme : "lifestyle"
  }, 
  {
    question : "Who do you need to call ?",
    theme : "relationships"
  }, 
  {
    question : "If you could have a superpower just for today, what would it be ?",
    theme : "deep"
  }, 
  {
    question : "How do you want to be remembered ?",
    theme : "deep"
  }, 
  {
    question : "What makes a good enemy ?",
    theme : "deep"
  }, 
  {
    question : "What makes a good lover ?",
    theme : "relationships"
  }, 
  {
    question : "What do you consider to be your biggest achievement ?",
    theme : "work"
  }, 
  {
    question : "If you could go back in time and change something, what would it be ?",
    theme : "deep"
  }, 
  {
    question : "What's the most creative thing you've done recently ?",
    theme : "personality"
  }, 
  {
    question : "When was the last time you had an inspiring conversation ?",
    theme : "relationships"
  }, 
  {
    question : "When was the last time you learnt something ?",
    theme : "personality"
  }, 
  {
    question : "What motivated you today ?",
    theme : "lifestyle"
  }, 
  {
    question : "If you could travel anywhere tomorrow, where would you go ?",
    theme : "personality"
  }, 
  {
    question : "What gives you comfort right now ?",
    theme : "lifestyle"
  }, 
  {
    question : "Should you trust your instincts ?",
    theme : "deep"
  }, 
  {
    question : "What do you feel greateful for today ?",
    theme : "personality"
  }, 
  {
    question : "What makes you feel miserable ?",
    theme : "personality"
  }, 
  {
    question : "What makes a good friend ?",
    theme : "relationships"
  }, 
  {
    question : "What makes a good boss ?",
    theme : "work"
  }, 
  {
    question : "Is something in your way ? Can you move it ?",
    theme : "deep"
  }, 
  {
    question : "What's you favourite gadget ?",
    theme : "lifestyle"
  }, 
  { 
    question : "What makes you cynical ?",
    theme : "personality"
  }, 
  {
    question : "What was the last personnal letter you received ?",
    theme : "relationships"
  },
  {
    question : "Write the first sentence of your autobiography",
    theme : "deep"
  },
  {
    question : "What's your biggest indulgence ?",
    theme : "personality"
  },
  {
    question : "Where do you go for good ideas ?",
    theme : "lifestyle"
  },
  {
    question : "If you could hire any artist (living or dead) to paint your portrait, who would it be ?",
    theme : "personality"
  },
  {
    question : "Are you working hard, or hardly working ?",
    theme : "personality"
  },
  {
    question : "What do you lie about ?",
    theme : "personality"
  },
  {
    question : "What question(s) do you love to answer ?",
    theme : "personality"
  },
  {
    question : "What are you chasing at the moment ?",
    theme : "deep"
  },
  {
    question : "Who inspires you ?",
    theme : "deep"
  },
  {
    question : "What song would be your self-portrait ?",
    theme : "personality"
  },
  {
    question : "What was the last risk you took ?",
    theme : "deep"
  },
  {
    question : "What are you geek about ?",
    theme : "personality"
  },
  {
    question : "What famous living person would you like to meet for drinks ?",
    theme : "relationships"
  },
  {
    question : "Who (or what) do you miss ?",
    theme : "relationships"
  },
  {
    question : "Today you gained ______",
    theme : "lifestyle"
  }
]



QuestionModel.insertMany(questions)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));