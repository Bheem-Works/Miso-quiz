const quizData = [
  {
    question: "What is Miso Favourite Food?",
    options: ["Fish", "chicken", "Milk", "Eggs"],
    answer: "Eggs",
  },
  {
    question: "How much old is miso?",
    options: ["6Months", "8Months", "9months", "11Months"],
    answer: "9months",
  },
  {
    question: "In which time miso came Home?",
    options: ["6Pm", "5pm", "10pm", "He do not come home "],
    answer: "10pm",
  },
  {
    question: "What is the exact kim miso sleeping time?",
    options: ["7hr", "9hr", "12hr", "14hr"],
    answer: "12hr",
  },
  {
    question: "what is the color of kim miso?",
    options: ["white/black", "jersey cow Color", "white/coal", "white/pink"],
    answer: "white/coal",
  },
  {
    question: "What is the color of the miso feet?",
    options: ["light-pink", "orange", "white", "Dark-pink"],
    answer: "light-pink",
  },
  {
    question: "How many times miso poops in a day?",
    options: [
      "Four times",
      "sixTimes",
      "threeTimes",
      "Some times he do not poop a day",
    ],
    answer: "Four times",
  },
  {
    question: "What is the color of the miso eyes?",
    options: ["Light green", "blue", "mermaid-green", "vanish-blue"],
    answer: "mermaid-green",
  },
  {
    question: "How much tall is Mr.Kim Miso",
    options: ["2feet", "3feet", "1/7feet", "30inch"],
    answer: "2feet",
  },
  {
    question: "where did miso like to sleep?",
    options: [
      "under the table",
      "Home balcony",
      "under the blanket",
      "Vim shoulder",
    ],
    answer: "under the table",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
