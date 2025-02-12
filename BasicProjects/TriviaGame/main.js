let categoryId = 1;
let difficult = 'easy';
let url;
let activeQuestion = 0;
let questions;
let correctAnswer;
let score = 0;
let totalTime = 0;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');
}

function categorySelect(category) {
    switch (category) {
        case "art":
            buttonSelect(".btn-category", "art");
            categoryId = 1;
            break;
        case "geography":
            buttonSelect(".btn-category", "geography");
            categoryId = 2;
            break;
        case "history":
            buttonSelect(".btn-category", "history");
            categoryId = 3;
            break;
        case "science":
            buttonSelect(".btn-category", "science");
            categoryId = 4;
            break;
        default:
            break;
    }
}

function difficultSelect(selectedDifficult) {
    switch (selectedDifficult) {
        case "easy":
            buttonSelect(".btn-difficult", "easy");
            difficult = 'easy';
            break;
        case "medium":
            buttonSelect(".btn-difficult", "medium");
            difficult = 'medium';
            break;
        case "hard":
            buttonSelect(".btn-difficult", "hard");
            difficult = "hard";
            break;
        default:
            break;
    }
}

function buttonSelect(buttonCategory, butonId) {
    document.querySelectorAll(buttonCategory).forEach(category => {
        category.classList.remove('selected');
    });

    let button = document.getElementById(butonId);
    button.classList.add("selected");
}

function getQuestion() {
    showScreen('loading');

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                questions = JSON.parse(xhr.responseText);
                console.log(questions.results);
                showScreen('questionScreen');
                resolve();
            } else if (xhr.readyState == 4) {
                console.log("Bir Hata Oluştu");
                showScreen('errorScreen');
                reject("Bir Hata Oluştu");
            }
        });

        xhr.open("GET", url);
        xhr.send();
    });
}

async function startGame() {
    switch (categoryId) {
        case 1:
            url = `https://opentdb.com/api.php?amount=10&category=25&difficulty=${difficult}&type=multiple`;
            break;
        case 2:
            url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficult}&type=multiple`;
            break;
        case 3:
            url = `https://opentdb.com/api.php?amount=10&category=23&difficulty=${difficult}&type=multiple`;
            break;
        case 4:
            url = `https://opentdb.com/api.php?amount=10&category=17&difficulty=${difficult}&type=multiple`;
            break;
        default:
            break;
    }

    try {
        await getQuestion();
        startTimer();
        gameScript();
    } catch (error) {
        console.error("Sorular yüklenirken hata oluştu:", error);
    }
}

let timeLeft = 10;
let timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimer();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time Done!');
            totalTime += 10;
            finishGame();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = timeLeft;
}

function gameScript() {
    document.getElementById('questionTxt').innerHTML = questions.results[activeQuestion].question;
    correctAnswer = Math.floor(Math.random() * 4) + 1;
    let answers;

    switch (correctAnswer) {
        case 1:
            document.getElementById('answerTxtOne').innerHTML = questions.results[activeQuestion].correct_answer;
            answers = [2, 3, 4];
            break;
        case 2:
            document.getElementById('answerTxtTwo').innerHTML = questions.results[activeQuestion].correct_answer;
            answers = [1, 3, 4];
            break;
        case 3:
            document.getElementById('answerTxtThree').innerHTML = questions.results[activeQuestion].correct_answer;
            answers = [1, 2, 4];
            break;
        case 4:
            document.getElementById('answerTxtFour').innerHTML = questions.results[activeQuestion].correct_answer;
            answers = [1, 2, 3];
            break;
        default:
            break;
    }

    for (let i = 0; i < 3; i++) {
        let answer = answers[i];

        switch (answer) {
            case 1:
                document.getElementById('answerTxtOne').innerHTML = questions.results[activeQuestion].incorrect_answers[i];
                break;
            case 2:
                document.getElementById('answerTxtTwo').innerHTML = questions.results[activeQuestion].incorrect_answers[i];
                break;
            case 3:
                document.getElementById('answerTxtThree').innerHTML = questions.results[activeQuestion].incorrect_answers[i];
                break;
            case 4:
                document.getElementById('answerTxtFour').innerHTML = questions.results[activeQuestion].incorrect_answers[i];
                break;
            default:
                break;
        }
    }

    totalTime += 10 - timeLeft;
    timeLeft = 10;
}

function answerButton(clickedButton) {
    if (clickedButton == correctAnswer) {
        activeQuestion++;
        score += 10;
        document.getElementById('score').textContent = score;
        if (activeQuestion < 10) {
            gameScript();
        } else {
            finishGame();
        }
    } else {
        activeQuestion++;
        if (activeQuestion < 10) {
            gameScript();
        } else {
            finishGame();
        }
    }
}

function finishGame() {
    clearInterval(timerInterval);
    showScreen('resultScreen');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = score / 10;
    document.getElementById('wrongAnswers').textContent = 10 - (score / 10);
    document.getElementById('totalTime').textContent = totalTime;
    document.getElementById('speed').textContent = totalTime / 10;
    document.getElementById('accuracy').textContent = (score / 10) * 10;

    switch (categoryId) {
        case 1:
            document.getElementById('categoryTxt').textContent = "🎭 Art";
            break;
        case 2:
            document.getElementById('categoryTxt').textContent = "🌍 Geography";
            break;
        case 3:
            document.getElementById('categoryTxt').textContent = "🏰 History";
            break;
        case 4:
            document.getElementById('categoryTxt').textContent = "🧪 Science";
            break;
        default:
            break;
    }

    switch (difficult) {
        case "easy":
            document.getElementById('difficultyTxt').textContent = "🟢 Easy";
            break;
        case "medium":
            document.getElementById('difficultyTxt').textContent = "🟡 Medium";
            break;
        case "hard":
            document.getElementById('difficultyTxt').textContent = "🔴 Hard";
            break;
        default:
            break;
    }
}

function restartGame() {
    categoryId = 1;
    difficult = "easy";
    activeQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    showScreen('configScreen');
}