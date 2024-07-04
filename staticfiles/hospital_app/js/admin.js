
const container = document.getElementById('container');


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

function send_otp_req(){
    document.getElementById("forgot-password-container").style.display = "block";
    document.getElementById("otp-input-container").style.display = "none";
    console.log("clicked..............");
    
}
const cancel_click = document.getElementById('cancel');
cancel_click.onclick = function(event){
    document.getElementById("forgot-password-container").style.display = "none";
}
const otp_btn_click = document.getElementById("get-otp-button");
otp_btn_click.onclick = function(event){
    document.getElementById("otp-input-container").style.display = "block";
    document.getElementById("get-otp-button").style.display = "none";
    document.getElementById("cancel").style.display = "none";
    document.getElementById("submit-otp-button").style.display = "block";
    send_otp();

}
let global_email = '';
async function send_otp(){
    const mail_verify = document.getElementById('forgot-email').value;
    
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    console.log("here........1111111111   222.");
    const data = {
        'mail_verify':mail_verify,
    }

    const response = await fetch('http://127.0.0.1:8000/hospital/validate_mail_gen_otp/',{
        method:'POST',
        headers:{'Content-Type':'application/json','X-CSRFToken': csrfToken},
        body:JSON.stringify(data)
    })
    if(response.ok){
        
        global_email = mail_verify;
        console.log(global_email);
    }
    else{
        console.log("here........4444444444444.");
    }
}


const submit_otp = document.getElementById('submit-otp-button');
submit_otp.onclick = function(event){
    
    document.getElementById('reset-password-container').style.display='block';
}


const reset_otp = document.getElementById('reset-password-button');
reset_otp.onclick = async function(event){
    const password1 = document.getElementById('new-password').value;
    const password2 = document.getElementById('confirm-password').value;
    const csrfToken1 = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    if(validatePassword(password1,password2)){
        const data2 = {
            mail:global_email,
            password:password1
        };
        const res = await fetch('http://127.0.0.1:8000/hospital/validate_otp/',{
            method:'POST',
            headers:{'Content-Type':'application/json','X-CSRFToken': csrfToken1},
            body:JSON.stringify(data2)
        });
        if(res.ok){
            console.log("password is reset");
            document.getElementById('reset-password-container').style.display='none';
        }
        else{
            console.log("password is reset failed");
        }
    }
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