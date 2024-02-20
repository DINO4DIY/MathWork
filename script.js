function generateWorksheet() {
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
    worksheetHTML += `<button type="button" onclick="checkAnswers()">Check Answers</button>`;
    worksheetHTML += `</form>`;

    worksheetDiv.innerHTML = worksheetHTML;
}

function checkAnswers() {
    const answerInputs = document.getElementsByClassName("answerInput");

    for (let i = 0; i < answerInputs.length; i++) {
        const userAnswer = parseInt(answerInputs[i].value);
        const correctAnswer = parseInt(answerInputs[i].getAttribute("data-answer"));
        const resultCell = answerInputs[i].parentNode.nextElementSibling;

        if (isNaN(userAnswer)) {
            resultCell.textContent = "Please enter a number.";
            resultCell.style.color = "red";
        } else if (userAnswer === correctAnswer) {
            resultCell.textContent = "Correct!";
            resultCell.style.color = "green";
        } else {
            resultCell.textContent = "Incorrect!";
            resultCell.style.color = "red";
        }
    }
}

function generateAdditionProblem(difficulty) {
    let num1, num2;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 50);
        num2 = Math.floor(Math.random() * 50);
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
    }
    return [`${num1} + ${num2} = `, num1 + num2];
}

function generateSubtractionProblem(difficulty) {
    let num1, num2;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * num1);
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 50);
        num2 = Math.floor(Math.random() * num1);
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * num1);
    }
    return [`${num1 + num2} - ${num2} = `, num1];
}

function generateMultiplicationProblem(difficulty) {
    let num1, num2;
    if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
    } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
    } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
    }
    return [`${num1} × ${num2} = `, num1 * num2];
}

function generateDivisionProblem(difficulty) {
    let divisor, dividend, quotient;
    if (difficulty === "easy") {
        divisor = Math.floor(Math.random() * 10) + 1;
        dividend = divisor * (Math.floor(Math.random() * 10) + 1);
    } else if (difficulty === "medium") {
        divisor = Math.floor(Math.random() * 20) + 1;
        dividend = divisor * (Math.floor(Math.random() * 10) + 1);
    } else if (difficulty === "hard") {
        divisor = Math.floor(Math.random() * 50) + 1;
        dividend = divisor * (Math.floor(Math.random() * 10) + divisor);
    }
    quotient = Math.floor(dividend / divisor);
    return [`${dividend} ÷ ${divisor} = `, quotient];
}