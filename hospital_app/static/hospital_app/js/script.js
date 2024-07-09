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
        console.log(id);
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
function viewInvoice(className) {
    document.querySelector(className).style.display = 'flex';
    document.querySelector('body').style.overflow = 'auto';
}
function closeInvoice(className) {
    document.querySelector(className).style.display = 'none';
    document.querySelector('body').style.overflow = 'hidden';
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


document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const selectedItemsContainer = document.querySelector('#selected-symptoms');
    const dropbtn = document.querySelector('.dropbtn');

    const specialistDropdownContent = document.querySelector('#specialist-dropdown-content');
    const selectedSpecialistsContainer = document.querySelector('#selected-specialists');
    const specialistDropbtn = document.querySelectorAll('.dropbtn')[1];

    const symptomToSpecialists = {
        'fever': ['General Practitioner', 'Infectious Disease Specialist'],
        'cough': ['Pulmonologist', 'General Practitioner'],
        'sore throat': ['ENT Specialist', 'General Practitioner'],
        'shortness of breath': ['Pulmonologist', 'Cardiologist'],
        'chest pain': ['Cardiologist', 'Pulmonologist'],
        'fatigue': ['General Practitioner', 'Endocrinologist'],
        'headache': ['Neurologist', 'General Practitioner'],
        'body aches': ['Rheumatologist', 'General Practitioner'],
        'nausea or vomiting': ['Gastroenterologist', 'General Practitioner'],
        'diarrhea': ['Gastroenterologist', 'General Practitioner'],
        'abdominal pain': ['Gastroenterologist', 'General Practitioner'],
        'joint pain': ['Rheumatologist', 'Orthopedic Specialist'],
        'skin rash': ['Dermatologist', 'Allergist']
    };

    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            addSelectedItem(item);
        });
    });

    function addSelectedItem(item) {
        const selectedItem = document.createElement('div');
        selectedItem.classList.add('selected-item');

        const itemLabel = document.createElement('span');
        itemLabel.textContent = item.textContent;

        const removeBtn = document.createElement('span');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'x';
        removeBtn.addEventListener('click', () => {
            selectedItemsContainer.removeChild(selectedItem);
            item.style.display = 'block';
            updateDropbtnPlaceholder();
        });

        selectedItem.appendChild(itemLabel);
        selectedItem.appendChild(removeBtn);
        selectedItemsContainer.appendChild(selectedItem);
        item.style.display = 'none';
        updateDropbtnPlaceholder();
    }

    function updateDropbtnPlaceholder() {
        const selectedItems = document.querySelectorAll('#selected-symptoms .selected-item span:first-child');
        const selectedTexts = Array.from(selectedItems).map(item => item.textContent);
        dropbtn.placeholder = selectedTexts.length > 0 ? '' : 'Select Symptoms';
    }

    function addSelectedSpecialist(item) {
        const selectedItem = document.createElement('div');
        selectedItem.classList.add('selected-item');

        const itemLabel = document.createElement('span');
        itemLabel.textContent = item.textContent;

        const removeBtn = document.createElement('span');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'x';
        removeBtn.addEventListener('click', () => {
            selectedSpecialistsContainer.removeChild(selectedItem);
            item.style.display = 'block';
            updateSpecialistDropbtnPlaceholder();
        });

        selectedItem.appendChild(itemLabel);
        selectedItem.appendChild(removeBtn);
        selectedSpecialistsContainer.appendChild(selectedItem);
        item.style.display = 'none';
        updateSpecialistDropbtnPlaceholder();
    }

    function updateSpecialistDropbtnPlaceholder() {
        const selectedItems = document.querySelectorAll('#selected-specialists .selected-item span:first-child');
        const selectedTexts = Array.from(selectedItems).map(item => item.textContent);
        specialistDropbtn.placeholder = selectedTexts.length > 0 ? '' : 'Select Specialists';
    }
});

