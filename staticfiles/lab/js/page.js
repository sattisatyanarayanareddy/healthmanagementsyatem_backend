document.addEventListener('DOMContentLoaded', (event) => {
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    const forgotPasswordContainer = document.getElementById("forgot-password-container");
    const cancelForgotButton = document.getElementById("cancel");

    forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault();
        forgotPasswordContainer.style.display = "block";
    });

    cancelForgotButton.addEventListener('click', function (event) {
        event.preventDefault();
        forgotPasswordContainer.style.display = "none";
    });

    const getOtpButton = document.getElementById("get-otp-button");
    getOtpButton.onclick = function () {
        const email = document.getElementById("forgot-email").value;
        if (validateEmail(email)) {
            alert("An OTP has been sent to " + email);
        } else {
            alert("Please enter a valid email.");
        }
    }

    const cancelOTP = document.getElementById("cancel");
    cancelOTP.onclick = function (event) {
        document.getElementById('forgot-password-container').style.display = 'none';
    }

});

document.getElementById('get-otp-button').addEventListener('click', function (event) {
    event.preventDefault();
    var email = document.getElementById('forgot-email').value;
    if (validateEmail(email)) {
        document.getElementById('otp-input-container').style.display = 'block';
        document.getElementById('get-otp-button').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
    } else {
        alert('Please enter a valid email to get OTP.');
    }
});

document.getElementById('otp').addEventListener('input', function (event) {
    var otpValue = event.target.value.trim();
    if (otpValue !== '') {
        document.getElementById('submit-otp-button').style.display = 'block';
    } else {
        document.getElementById('submit-otp-button').style.display = 'none';
    }
});

document.getElementById('submit-otp-button').addEventListener('click', function (event) {
    event.preventDefault();
    var otp = document.getElementById('otp').value;
    if (otp.trim() !== '') {
        document.getElementById('forgot-password-container').style.display = 'none';
        document.getElementById('reset-password-container').style.display = 'block';
    } else {
        alert('Please enter the OTP.');
    }
});

document.getElementById('reset-password-button').addEventListener('click', function (event) {
    event.preventDefault();
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if (validatePassword(newPassword, confirmPassword)) {
        document.getElementById('reset-password-container').style.display = 'none';
        alert('Your password has been reset successfully.');
    }
});

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(newPassword, confirmPassword) {
    if (newPassword === '' || confirmPassword === '') {
        alert('Please fill in both password fields.');
        return false;
    }
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (!newPassword.match(upperCaseLetters)) {
        alert('Password must contain at least one uppercase letter.');
        return false;
    }
    var lowerCaseLetters = /[a-z]/g;
    if (!newPassword.match(lowerCaseLetters)) {
        alert('Password must contain at least one lowercase letter.');
        return false;
    }
    var numbers = /[0-9]/g;
    if (!newPassword.match(numbers)) {
        alert('Password must contain at least one number.');
        return false;
    }
    var specialCharacters = /[@$!%*?&#]/g;
    if (!newPassword.match(specialCharacters)) {
        alert('Password must contain at least one special character (@, $, !, %, *, ?, &, or #).');
        return false;
    }
    return true;
}