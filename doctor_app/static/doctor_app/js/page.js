const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const passwordDivs = document.querySelectorAll(".user-box");

passwordDivs.forEach((div) => {
    const passwordField = div.querySelector("input[type='password']");
    const toggleIcon = div.querySelector(".password-toggle-icon i");

    toggleIcon.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        } else {
            passwordField.type = "password";
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        }
    });
});

function validateForm() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(nameInput.value)) {
        alert('Invalid name. Please enter alphabetic characters only.');
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
        alert('Invalid email address. Please enter a valid email.');
        return false;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
        alert('Invalid phone number. Please enter a valid Indian mobile number.');
        return false;
    }
    if (passwordInput.value.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match. Please re-enter.');
        return false;
    }
    return true;
}