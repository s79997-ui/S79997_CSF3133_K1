/*
 * Error 1 (grade.html, Line 9): onsubmit="checkMark()" did not use "return checkMark()", causing form submit to reload the page and clear #result.
 * Error 2 (grade.html, Line 16): onclick="showtable()" used lowercase instead of matching showTable().
 * Error 3 (grade.html, Line 19): <script src="grades.js"> pointed to "grades.js" instead of "grade.js".
 * Error 4 (grade.js, Line 4): if (name = "") used assignment (=) instead of comparison (===).
 * Error 5 (grade.js, Line 8): isNan(mark) had wrong capitalization instead of isNaN().
 * Error 6 (grade.js, Line 14): if (mark < 0 && mark > 100) used && instead of || for out-of-range values.
 * Error 7 (grade.js, Lines 24-26): Lowercase "c" for grade C and missing "=" in grade "F".
 * Error 8 (grade.js, Lines 28-31): getElementByID had wrong casing, "got grade" was unquoted, style.colour was misspelled, and return true allowed page reset.
 * Error 9 (grade.js, Lines 38 & 43): Loop started at i = 1 (skipping grade "A") and innerHtml was misspelled instead of innerHTML.
 */

function checkMark() {
    const name = document.forms["gradeForm"]["name"].value.trim();
    const rawMark = document.forms["gradeForm"]["mark"].value.trim();
    const resultEl = document.getElementById("result");
    const checkedAtEl = document.getElementById("checkedAt");

    // Check if name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check if mark field is empty
    if (rawMark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check if mark is numeric
    if (isNaN(rawMark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    const mark = parseInt(rawMark, 10);

    // Check if mark is within 0 to 100
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine letter grade from mark
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display result and apply colour based on grade (A/B: green, C: orange, F: red)
    resultEl.innerHTML = name + " got grade " + grade;
    if (grade === "A" || grade === "B") {
        resultEl.style.color = "green";
    } else if (grade === "C") {
        resultEl.style.color = "orange";
    } else {
        resultEl.style.color = "red";
    }

    // Display current date and time below the result
    checkedAtEl.innerHTML = "Checked on: " + new Date();
    checkedAtEl.style.color = resultEl.style.color;

    return false;
}

// Generate a random whole number between 0 and 100 and put it in the mark input
function randomMark() {
    const rand = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = rand;
}

// Build and display the full grade table (A, B, C, F)
function showTable() {
    const grades = ["A", "B", "C", "F"];
    const ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}