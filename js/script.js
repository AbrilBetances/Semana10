// Number of questions. Max=52.
const NUMQUESTIONS = 20;

// List of questions.
let questionsMap = new Map();

// The sequence of the quiz.
let quizSequence = [];

// Store the quiz stats.
let quizStats = {
	counter: 0,
	correct: 0,
	wrong: 0,
	currentQuestion: 0,
};	

function quizQuestions() {
	questionsMap.set(1, {
		question: "When i was born?",
		a: "December 28, 1998.",
		b: "June 28, 1998.",
		c: "October 28, 1998.",
		d: "April 28, 1998.",
		answer: "a",
	});
	questionsMap.set(2, {
		question: "Do i have a middle name?",
		a: "Yes, Marie.",
		b: "Yes, Inocencia.",
		c: "Yes, Camile.",
		d: "No, you don't.",
		answer: "d",
	});
	questionsMap.set(3, {
		question: "How many times did i broke my chin?",
		a: "2.",
		b: "7.",
		c: "5.",
		d: "4.",
		answer: "b",
	});
	questionsMap.set(4, {
		question: "What is my mom's name?",
		a: "Felisa.",
		b: "Maria.",
		c: "Margarita.",
		d: "Paola.",
		answer: "a",
	});
	questionsMap.set(5, {
		question: "What is my favorite color?",
		a: "Pink.",
		b: "Yellow.",
		c: "Purple.",
		d: "Orange.",
		answer: "b",
	});
	questionsMap.set(6, {
		question: "What is my favorite flower?",
		a: "Roses.",
		b: "Peonies.",
		c: "Sunflowers.",
		d: "Daisys.",
		answer: "b",
	});
	questionsMap.set(7, {
		question: "I have a crush on...",
		a: "Emma Watson.",
		b: "Harry Styles.",
		c: "The Weeknd.",
		d: "Dustin (Stranger Things).",
		answer: "c",
	});
	questionsMap.set(8, {
		question: "What is my favorite tv show?",
		a: "The Nanny.",
		b: "The Fresh Prince of Bel-Air.",
		c: "The big bang theory.",
		d: "Friends.",
		answer: "d",
	});
	questionsMap.set(9, {
		question: "Who is my favorite youtuber?",
		a: "Connor Franta.",
		b: "Yuya.",
		c: "Around The Corner.",
		d: "Good Mythical Morning.",
		answer: "a",
	});
	questionsMap.set(10, {
		question: "what thing I can not live with?",
		a: "My Phone.",
		b: "My Computer.",
		c: "My Cat.",
		d: "My bed.",
		answer: "d",
	});
}

// Get the containers.
let questionContainer = document.getElementById("the-question"),
		answerA = document.getElementById("first-answer"),
		answerB = document.getElementById("second-answer"),
		answerC = document.getElementById("third-answer"),
		answerD = document.getElementById("fourth-answer"),
		scoreCounter = document.getElementById("score-counter");

// Add question keys to the quiz sequence array.
function determineSequence() {
	// Populate quizSequence.
	for (let [key, value] of questionsMap) {
		quizSequence.push(key);
	}
	
	// Shuffle an array.
	function shuffle(array) {
		let currentIndex = array.length,
				temporaryValue,
				randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
		// See: http://stackoverflow.com/a/2450976/4429450
	}
	
	// Randomize quizSequence.
	quizSequence = shuffle(quizSequence);
}

// Get the next question.
function getNextQuestion() {
	// Up the counter.
	quizStats.counter++;
	
	// Get the question number.
	let qn = quizSequence.shift();
	
	// Set up the question and answers.
	let a = questionsMap.get(qn).a,
			b = questionsMap.get(qn).b,
			c = questionsMap.get(qn).c,
			d = questionsMap.get(qn).d,
			question = questionsMap.get(qn).question;
	
	// Print the questions.
	questionContainer.textContent = question;
	answerA.textContent = a;
	answerB.textContent = b;
	answerC.textContent = c;
	answerD.textContent = d;
	
	// Track the current question.
	quizStats.currentQuestion = qn;
}

// Add event listeners.
function addEventListeners() {
	answerA.addEventListener("click", checkTheAnswer);
	answerB.addEventListener("click", checkTheAnswer);
	answerC.addEventListener("click", checkTheAnswer);
	answerD.addEventListener("click", checkTheAnswer);
}

// Add data attributes.
function addDataAttributes() {
	answerA.setAttribute("data-answer", ( "a" ));
	answerB.setAttribute("data-answer", ( "b" ));
	answerC.setAttribute("data-answer", ( "c" ));
	answerD.setAttribute("data-answer", ( "d" ));
}

// Check the answer.
function checkTheAnswer() {
	// Get the answers.
	let givenAnswer = this.dataset.answer,
			correctAnswer = questionsMap.get(quizStats.currentQuestion).answer;
	
	// Check given and correct answers.
	if (givenAnswer === correctAnswer) {
		quizStats.correct++;
		this.classList.add("correct");
	}
	else {
		quizStats.wrong++;
		this.classList.add("wrong");
	}
	
	// Update the counter.
	scoreCounter.textContent = quizStats.correct;
	
	// Check if max num of questions has been reached.
	if ( quizStats.counter < NUMQUESTIONS) {
		setTimeout(clearClasses, 2000);
		setTimeout(getNextQuestion, 2000);
	}
	// If so, stop the quiz.
	else {
		showTheResults();
	}
}

// Clear classes.
function clearClasses() {
	answerA.classList.remove("correct", "wrong");
	answerB.classList.remove("correct", "wrong");
	answerC.classList.remove("correct", "wrong");
	answerD.classList.remove("correct", "wrong");
}

// The results.
function showTheResults() {
	// Get the containers.
	let numCorrect = document.getElementById("num-correct"),
			numWrong = document.getElementById("num-wrong"),
			numTotal = document.getElementById("num-total");
	
	// Get the results.
	let correct = quizStats.correct,
			wrong = quizStats.wrong,
			total = NUMQUESTIONS;
	
	// Print the results.
	numCorrect.textContent = correct;
	numWrong.textContent = wrong;
	numTotal.textContent = total;
	
	// Display the results.
	document.getElementsByClassName("results-container")[0].classList.add("display");
}

//Let's start!
(function startQuiz() {
	// Init.
	quizQuestions();
	determineSequence();
	getNextQuestion();
	addEventListeners();
	addDataAttributes();
})();
