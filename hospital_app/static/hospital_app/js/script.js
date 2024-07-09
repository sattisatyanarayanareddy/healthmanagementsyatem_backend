const navbarLinks = document.querySelectorAll('.navbar a');
const contentSections = document.querySelectorAll('.content');

navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});
const pageLinks = document.querySelectorAll('.historyLink');
const subPages = document.querySelectorAll('.historySubPage');
pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        subPages.forEach(page => {
            page.classList.remove('visible');
        });
        document.getElementById(id).classList.add('visible');
    });
});

function viewMore() {
    document.querySelector('.prescripCont').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
}
function closeView() {
    document.querySelector('.prescripCont').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
}
function openAppointment() {
    document.querySelector('.prevAppCont').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
}
function closeAppointment() {
    document.querySelector('.prevAppCont').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
}
function filterDoctors() {

    var input, filter, container, cards, card, title, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    container = document.getElementById('doctorContainer');
    cards = container.getElementsByClassName('doctor-card');


    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        title = card.getElementsByTagName("h3")[0];
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}
function openPopup() {
    const popupWindow = document.getElementById("popupWindow");
    popupWindow.style.display = "flex";
}

function updatePatient() {
    alert("Update functionality will be implemented here.");
}

function closePopup() {
    const popupWindow = document.getElementById("popupWindow");
    popupWindow.style.display = "none";
}

function viewRow() {
    const modal = new bootstrap.Modal(document.getElementById('viewModal'));
    modal.show();
}
function convert_hundreds(n) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if (n < 20) {
        return ones[n];
    } else if (n < 100) {
        return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    } else {
        return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + convert_hundreds(n % 100) : '');
    }
}
function convert_thousands(n) {
    if (n < 1000) {
        return convert_hundreds(n);
    } else if (n < 100000) {
        return convert_hundreds(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + convert_hundreds(n % 1000) : '');
    } else if (n < 10000000) {
        return convert_hundreds(Math.floor(n / 100000)) + ' lakh' + (n % 100000 ? ' ' + convert_thousands(n % 100000) : '');
    } else {
        return convert_hundreds(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 ? ' ' + convert_thousands(n % 10000000) : '');
    }
}
function convertToWords(num) {
    var amountInWords;
    amountInWords = convert_thousands(num);
    document.getElementById("invoiceAmount").value = amountInWords;
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
