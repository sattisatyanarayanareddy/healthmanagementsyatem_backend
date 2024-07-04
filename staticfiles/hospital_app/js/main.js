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
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }

})()

