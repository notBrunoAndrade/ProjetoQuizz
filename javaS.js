let question = document.querySelector("#question")
let answersBox = document.querySelector("#answers-box")
let quizzContainer = document.querySelector("#quizz-container")
let scoreContainer = document.querySelector("#score-container")
let letters = ["a","b","c","d"]
let points = 0
let questao = 0
let reset = document.querySelector("#restart")

// perguntas

const questions = [
    {
      "question": "Quem é o pai do Luffy ?",
      "answers": [
        {
          "answer": "Dragon",
          "correct": true
        },
        {
          "answer": "Ray light",
          "correct": false
        },
        {
          "answer": "Zoro",
          "correct": false
        },
        {
          "answer": "Shanks",
          "correct": false
        },
      ]
    },
    {
      "question": "Quem é o tripulante que a Robin mais gosta ?",
      "answers": [
        {
          "answer": "Zoro",
          "correct": false
        },
        {
          "answer": "Chopper",
          "correct": true
        },
        {
          "answer": "Nami",
          "correct": false
        },
        {
          "answer": "Luffy",
          "correct": false
        },
      ]
    },
    {
      "question": "o Sanji gosta mais de quem do Anime inteiro ?",
      "answers": [
        {
          "answer": "Todas as Mulheres",
          "correct": true
        },
        {
          "answer": "Zoro ?",
          "correct": false
        },
        {
          "answer": "Robin",
          "correct": false
        },
        {
          "answer": "Nami",
          "correct": false
        },
      ]
    },
    {
        "question": "Qual o valor atual de barrys do Chopper ?",
        "answers": [
            
        {
            "answer":"20 barrys",
            "correct": false

        },
        {
            "answer":"200 milhões de barrys",
            "correct": false
        },
        {
            "answer":"50 barrys",
            "correct": false
        },
        {
            "answer":"100 barrys",
            "correct": true
        }
     ]
    }
  ]

// subistituir o quizz para primeira pergunta

function init(){
    createQuestion(0)
}

// criar pergunta

function createQuestion(i){

    const oldbuttons = answersBox.querySelectorAll("button")

    oldbuttons.forEach(function(btn){
        btn.remove()
    })

    const questionText = question.querySelector("#question-text")
    const questionNumeber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question
    questionNumeber.textContent = i + 1

    questions[i].answers.forEach(function(answer,i){
        const answerTamplate = document.querySelector(".answers-tamplate").cloneNode(true)

        const latterBTN = answerTamplate.querySelector(".btn-letra")
        const latterText = answerTamplate.querySelector(".btn-answer")

        latterBTN.textContent = letters[i]
        latterText.textContent = answer["answer"]

        answerTamplate.setAttribute("correct-answer",answer["correct"])

       

        // remover hide e tamplate class

        answerTamplate.classList.remove("hide")
        answerTamplate.classList.remove("answers-tamplate")

        answersBox.appendChild(answerTamplate)


        // evento de click

        answerTamplate.addEventListener("click",function(){
            checkAnswer(this)
        })
    })
questao++
    
}

function checkAnswer(btn){
    const button = answersBox.querySelectorAll("button")

    button.forEach(function(button){
        if(button.getAttribute("correct-answer")== "true"){
            button.classList.add("resp-corret")

            if(btn === button){
                points++
            }
        }else{
            button.classList.add("resp-wrong")
        }
    })

    nextQuestion()
}

// inicialização do quizz
init()

function nextQuestion(){

    setTimeout(() => {
        if(questao >= questions.length){

            showSuccessMessage()
            showQuizz()
            return

        }
            createQuestion(questao)
        
    }, 300);
}



function showQuizz(){
    quizzContainer.classList.toggle("hide")
    scoreContainer.classList.toggle("hide")
}

function showSuccessMessage(){
    
    const score = ((points/questions.length)*100).toFixed(2)
    const displayscore = document.querySelector("#display-score span")

    displayscore.textContent = score.toString()

    const correctAnswers = document.querySelector("#acertos")
    const totalAnswers = document.querySelector("#perguntasT")

    totalAnswers.textContent = questions.length
    correctAnswers.textContent = points
}

reset.addEventListener("click",function(){
    questao = 0
    points = 0
    showQuizz()
    init()
})

