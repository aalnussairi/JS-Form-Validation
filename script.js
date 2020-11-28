"use strict";
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not Valid");
  }
  return re.test(String(input).toLowerCase());
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${input.name} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max = null) {
  if (max === null) {
    if (input.value.length < min) {
      showError(
        input,
        `${input.name} has to be greater than ${min} characters`
      );
    } else {
      showSuccess(input);
    }
  } else {
    if (input.value.length < min) {
      showError(
        input,
        `${input.name} has to be greater than ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(input, `${input.name} has to be less than ${min} characters`);
    } else {
      showSuccess(input);
    }
  }
}

// Check Password Match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8);
  checkLength(password2, 8);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
