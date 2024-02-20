function generateWorksheet() {
    document.getElementById("inputOptions").style.display = "none";

    const studentName = document.getElementById("studentName").value;
    const date = document.getElementById("date").value;
    const operation = document.getElementById("operation").value;
    const difficulty = document.getElementById("difficulty").value;
    const numProblems = parseInt(document.getElementById("numProblems").value);
    const worksheetDiv = document.getElementById("worksheet");
    let worksheetHTML = "";
    let problemsSet = new Set();

    worksheetHTML += `<p>Student Name: ${studentName}</p>`;
    worksheetHTML += `<p>Date: ${date}</p>`;
    worksheetHTML += `<form id="answersForm">`;
    worksheetHTML += `<table>`;
    worksheetHTML += `<tr><th>Problem</th><th>Answer</th><th>Result</th></tr>`;

    while (problemsSet.size < numProblems) {
        let problem, answer;
        if (operation === "addition") {
            [problem, answer] = generateAdditionProblem(difficulty);
        } else if (operation === "subtraction") {
            [problem, answer] = generateSubtractionProblem(difficulty);
        } else if (operation === "multiplication") {
            [problem, answer] = generateMultiplicationProblem(difficulty);
        } else if (operation === "division") {
            [problem, answer] = generateDivisionProblem(difficulty);
        }
        if (!problemsSet.has(problem)) {
            worksheetHTML += `<tr>`;
            worksheetHTML += `<td>${problem}</td>`;
            worksheetHTML += `<td><input type="number" class="answerInput" data-answer="${answer}"></td>`;
            worksheetHTML += `<td class="resultCell"></td>`;
            worksheetHTML += `</tr>`;
            problemsSet.add(problem);
        }
    }
    worksheetHTML += `</table>`;
    worksheetHTML += `<br>`;
    worksheetHTML += `<div style="display: flex; justify-content: space-between;">`;
    worksheetHTML += `<button type="button" onclick="checkAnswers()">Check Answers</button>`;
    worksheetHTML += `<button type="button" onclick="showInputOptions()">Back</button>`;
    worksheetHTML += `<button type="button" onclick="printWorksheet()">Print</button>`;
    worksheetHTML += `</div>`;
    worksheetHTML += `</form>`;

    worksheetDiv.innerHTML = worksheetHTML;
}

function showInputOptions() {
    document.getElementById("inputOptions").style.display = "block";
    document.getElementById("worksheet").innerHTML = "";
}

function checkAnswers() {
    const answerInputs = document.getElementsByClassName("answerInput");
    for (let i = 0; i < answerInputs.length; i++) {
        const userAnswer = parseInt(answerInputs[i].value);
        const correctAnswer = parseInt(answerInputs[i].getAttribute("data-answer"));
        const resultCell = answerInputs[i].parentNode.nextElementSibling;
        if (userAnswer === correctAnswer) {
            resultCell.textContent = "Correct";
            resultCell.style.color = "green";
        } else {
            resultCell.textContent = "Incorrect";
            resultCell.style.color = "red";
        }
    }
}

function printWorksheet() {
    window.print();
}

function generateAdditionProblem(difficulty) {
    //let num1, num2;
    let num1 = 0, num2 = 0;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 40) + 1; // Generates a random number between 1 and 40
        num2 = Math.floor(Math.random() * 40) + 1;
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 36) + 40; // Generates a random number between 40 and 75
        num2 = Math.floor(Math.random() * 36) + 40;
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 25) + 75; // Generates a random number between 75 and 99
        num2 = Math.floor(Math.random() * 25) + 75;
    }
    return [`${num1} + ${num2} = `, num1 + num2];
}

function generateSubtractionProblem(difficulty) {
    //let num1, num2;
    let num1 = 0, num2 = 0;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 40) + 1; // Generates a random number between 1 and 40
        //num2 = Math.floor(Math.random() * 40) + 1;
        num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 is less than num1
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 36) + 40; // Generates a random number between 40 and 75
        //num2 = Math.floor(Math.random() * 36) + 40;
        num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 is less than num1
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 25) + 75; // Generates a random number between 75 and 99
        //num2 = Math.floor(Math.random() * 25) + 75;
        num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 is less than num1
    }
    return [`${num1} - ${num2} = `, num1 - num2];
}

function generateMultiplicationProblem(difficulty) {
    //let num1, num2;
    let num1 = 0, num2 = 0;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 40) + 1; // Generates a random number between 1 and 40
        num2 = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 36) + 40; // Generates a random number between 40 and 75
        num2 = Math.floor(Math.random() * 36) + 1; // Generates a random number between 1 and 36
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 25) + 75; // Generates a random number between 75 and 99
        num2 = Math.floor(Math.random() * 25) + 1; // Generates a random number between 1 and 25
    }
    return [`${num1} × ${num2} = `, num1 * num2];
}

function generateDivisionProblem(difficulty) {
    let dividend, divisor, quotient;
    if (difficulty === "easy") {
        divisor = Math.floor(Math.random() * 9) + 1; // Generates a random number between 1 and 9
        quotient = Math.floor(Math.random() * 9) + 1; // Generates a random number between 1 and 9
        dividend = divisor * quotient; // Ensure dividend is divisible by divisor
    } else if (difficulty === "medium") {
        divisor = Math.floor(Math.random() * 45) + 10; // Generates a random number between 10 and 54
        quotient = Math.floor(Math.random() * 9) + 1; // Generates a random number between 1 and 9
        dividend = divisor * quotient; // Ensure dividend is divisible by divisor
    } else if (difficulty === "hard") {
        divisor = Math.floor(Math.random() * 24) + 46; // Generates a random number between 46 and 69
        quotient = Math.floor(Math.random() * 9) + 1; // Generates a random number between 1 and 9
        dividend = divisor * quotient; // Ensure dividend is divisible by divisor
    }
    return [`${dividend} ÷ ${divisor} = `, quotient];
}