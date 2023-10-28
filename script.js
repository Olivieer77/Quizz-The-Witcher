const quizData = [{
        question: 'Jak nazywa się aktor, który wciela się w Geralta w serialu?',
        a: 'Henry Cavill',
        b: 'Robby Smith',
        c: 'Jon Snow',
        d: 'Michał Żebrowski',
        correct: 'a',
    },
    {
        question: 'Z którego królestwa pochodzi Ciri?',
        a: 'Aedirn',
        b: 'Hagge',
        c: 'Temerii',
        d: 'Cintry',
        correct: 'd',
    },
    {
        question: 'Płotka to:',
        a: 'Bard, przyjaciel Geralta',
        b: 'Królowa Temerii',
        c: 'Koń Geralta',
        d: 'Miecz Geralta',
        correct: 'c',
    },
    {
        question: 'Po czym można poznać każdego wiedźmina',
        a: 'Po tatuażu na karku',
        b: 'Po magicznym medalionie',
        c: 'Po magicznej różdżce',
        d: 'Po białych włosach',
        correct: 'b',
    },
    {
        question: 'Nilfgaard to:',
        a: 'Miasto krasnoludów',
        b: 'Wrogie królestwo z południa',
        c: 'Nawiedzona kopalnia',
        d: 'Mroczny las',
        correct: 'b',
    }, {
        question: 'Kim jest Yennefer?',
        a: 'Złodziejką',
        b: 'Królową Cintry',
        c: 'Żoną Geralta',
        d: 'Czarodziejką',
        correct: 'd',
    },
];

const images = ['witcher5.jpg', 'ciri.jpg', 'witcher 6.jpg', 'witcher3.jpg', 'nilfgard.jpg', 'yennefer.jpg']

const quiz = document.getElementById('quizz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_answer = document.getElementById('a_answer');
const b_answer = document.getElementById('b_answer');
const c_answer = document.getElementById('c_answer');
const d_answer = document.getElementById('d_answer');
const submit = document.getElementById('next-question');
const warning = document.getElementsByName('p');
let errorInfo = document.querySelector('.error-info')




function shuffleArrayWithSync(array1, array2) {
    if (array1.length !== array2.length) {
        console.error("Tablice muszą mieć taką samą długość");
        return;
    }

    for (let i = array1.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array1[i], array1[randomIndex]] = [array1[randomIndex], array1[i]];
        [array2[i], array2[randomIndex]] = [array2[randomIndex], array2[i]];
    }
}
shuffleArrayWithSync(quizData, images);

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuestion = quizData[currentQuiz];
    const currentImage = images[currentQuiz];

    questionEl.innerText = currentQuestion.question;
    a_answer.innerText = currentQuestion.a;
    b_answer.innerText = currentQuestion.b;
    c_answer.innerText = currentQuestion.c;
    d_answer.innerText = currentQuestion.d;
    errorInfo.textContent = '';
    document.getElementById("images").src = currentImage;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked == true) {
            answer = answerEl.id;
        } else {
            errorInfo.textContent = 'Wybierz odpowiedź!';
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    })
}


submit.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.style.height = "200px"
            quiz.innerHTML = `
            <h2> Odpowiedziałeś poprawnie na ${score}/${quizData.length} pytań. </h2> 
            <button onclick="location.reload()"> Zacznij od nowa </button>
            `;
        }
    }
});