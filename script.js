// assigning variables to all required elements
const start_btn = document.querySelector(".start-btn button");
const guide_box = document.querySelector(".guide-box");
const exit = document.querySelector(".exit");
const continuee = document.querySelector(".continue");
const content_box = document.querySelector(".content-box");
const result_box = document.querySelector(".result-box");
const option_box = document.querySelector(".option_box");
const timeReading = document.querySelector(".timer .t-sec");
const timeText = document.querySelector(".timer .t-left");
const progressBar = document.querySelector(".header .progress-bar");

// when Start Quiz button is clicked.
start_btn.onclick = () => {
    guide_box.classList.add("activeGuide");
    start_btn.classList.remove()

}

// exiting the instructions box and moving back to the start button page when exit is clicked.
exit.onclick = () => {
    guide_box.classList.remove("activeGuide");
}

// moving to the quiz box containing the questions when continue is clicked
continuee.onclick = () => {
    content_box.classList.add("activeContent"); //adding content box
    guide_box.classList.remove("activeGuide"); //removing the guide box
    displayQuestion(0);    //display the questions
    startTimer(14);       //calling the startTimer function
    startTimerLine(0);    //calling startTimerLine function
    queCounter(1);       //passing 1 parameter to queCounter
}

let timeValue = 14;
let que_count = 0;
let que_num = 1
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// assigning variables to all buttons in the result_box
const play_again = result_box.querySelector(".button .play-again");
const end = result_box.querySelector(".button .end");

// when playagain button is clicked
play_again.onclick = () => {
    content_box.classList.add("activeContent"); //show the content box
    result_box.classList.remove("activeResult"); //remove the  result box
    timeValue = 14;
    que_count = 0;
    que_num = 1;
    widthValue = 0;
    userScore = 0;
    displayQuestion(que_count); //calling the displayQuestion function
    queCounter(que_num);
    startTimer(timeValue); //calling the startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left.
    next_btn.classList.remove("show") //hide the next question button
}

// when the endquiz button is clicked
end.onclick = () => {
    window.location.reload(); //reloads the current window back to start_button page.
}

// assigning variable to the next question button in the footer
const next_btn = document.querySelector(".btn .nextBtn");
// assigning variable to questions history displayed in the footer.
const counterDisplay = document.querySelector("footer .que-history");

// when next question button is clicked
next_btn.onclick = () => {
   if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        displayQuestion(que_count);
        queCounter(que_num);
        startTimer(timeValue); //calling the startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        timeText.textContent = "Time Left"; //change the text of timeText to Time Left.
        next_btn.classList.remove("show") //hide the next question button
   } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
   }
}

function displayQuestion(index) {
    const ques = document.querySelector(".question");

    let ques_tag = "<span>" + questions[index].num + ". " + questions[index].question + "</span>"
    let option_tag = "<div class='option'><input type='radio' name='ans'><span>" + questions[index].option[0] + "</span></div>"
        + "<div class='option'><input type='radio' name='ans'><span>" + questions[index].option[1] + "</span></div>"
        + "<div class='option'><input type='radio' name='ans'><span>" + questions[index].option[2] + "</span></div>"
        + "<div class='option'><input type='radio' name='ans'><span>" + questions[index].option[3] + "</span></div>";
    
    ques.innerHTML = ques_tag; //adding questions inside the ques tag
    option_box.innerHTML = option_tag; //adding options to the option_box tag

    // assigning a variable to capture all options
    const option = option_box.querySelectorAll(".option");
    
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// if an option is clicked
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let myAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    const allOptions = option_box.children.length;

    if (myAnswer === correctAnswer) {
        userScore += 1;
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");

    }

    for(i = 0; i < allOptions; i++) {
        option_box.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    guide_box.classList.remove("activeGuide");
    content_box.classList.remove("activeContent");
    result_box.classList.add("activeResult");
    const score = result_box.querySelector(".score");

    if (userScore >= 4) {
        let tag = "<span>Excellent!, you scored <p>" + userScore + "/" + questions.length + "</p></span>";
        score.innerHTML = tag;
    } else if (userScore === 3) {
        let tag = "<span>Good!! you scored <p>" + userScore + "/" + questions.length + "</p></span>";
        score.innerHTML = tag;
    } else {
        let tag = "<span>Sorry, you scored only <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        score.innerHTML = tag;
    }
}


// setting timer functions
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeReading.textContent = time + " seconds";
        time-- + " seconds";
        if (time < 9) {
            let lessTime = time;
            timeReading.textContent = "0" + lessTime + " seconds";
        }

        // when the time elapses
        if (time <= 0) {
            clearInterval(counter);
            timeReading.textContent = "00"
            timeText.textContent = "Time Off";
            const allOptions = option_box.children.length;
            for (let i = 0; i < allOptions; i++) {
                option_box.children[i].classList.add("disabled");           
            }

            next_btn.classList.add("show");
        }
    }
}

function queCounter(index) {
    let history = "<span><p>" + index + "</p> of <p>" + questions.length + "</p></span>";
    counterDisplay.innerHTML = history;

}

gsap.fromTo(".guide-box", {scale: "0.1", backgroundColor: "violet"}, {ease: "bounce", duration: 2, backgroundColor: "silver", scale: "1"});