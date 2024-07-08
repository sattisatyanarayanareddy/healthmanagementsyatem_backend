function openModal() {
  document.querySelector('.emgContainer').style.display = 'flex';
  document.querySelector('body').style.overflow = 'hidden';
}
function logout(){
  console.log("clicked.............");
  window.location.href = "logout/";
}
function closeModal() {
  document.querySelector('.emgContainer').style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
}
function openApplication(doctor, specialization) {
  document.getElementById('bdoctorName').value = doctor;
  document.getElementById('bspecilization').value = specialization;
  document.querySelector('.bookDoctorCont').style.display = 'block';
  document.querySelector('body').style.overflow = 'hidden';
}
function closeForm() {
  document.querySelector('.bookDoctorCont').style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
}

function validateForm() {
  var name = document.forms["myForm"]["emgUsername"].value;
  var phno = document.forms["myForm"]["emgPhno"].value;
  var dropDown = document.forms["myForm"]["emgDropdown"].value;

  console.log(document.getElementById("emgUsername").autofocus);
  
  if (name.length <= 3) {
      alert("Username must be more than 3 letters");
      return false;
  }
  
  if (phno.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
  }
  
  if (dropDown === "Null") {
      alert("Please select a specialization");
      return false;
  }
  
  return true;
}