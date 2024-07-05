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
const addLinks = document.querySelectorAll('.addOpt');
const addPages = document.querySelectorAll('.addPerson');
addLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        addPages.forEach(page => {
            page.classList.remove('visible');
        });
        console.log(id);
        document.getElementById(id).classList.add('visible');
    });
});
function openModal() {
    document.querySelector('.emgContainer').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
}
function closeModal() {
    document.querySelector('.emgContainer').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
}
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
function checkHealthActivity() {
    var hasHealthActivity = true;

    if (hasHealthActivity) {
        var healthActivityModal = new bootstrap.Modal(document.getElementById('healthActivityModal'));
        healthActivityModal.show();
    } else {
        var noDataModal = new bootstrap.Modal(document.getElementById('noDataModal'));
        noDataModal.show();
    }
}

function filterAppointments(id, cont) {
    var input, filter, container, cards, card, title, i;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    container = document.getElementById(cont);
    cards = container.getElementsByClassName('appointment-card');

    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        title = card.getElementsByTagName("h2")[0];
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}

function filterUpcomingAppointments(id, cont) {

    var input, filter, tbody, rows, row, doctorName, i;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    tbody = document.getElementById(cont);
    rows = tbody.querySelectorAll('tr');

    for (i = 0; i < rows.length; i++) {
        row = rows[i];
        doctorName = row.cells[1].textContent;
        if (doctorName.toUpperCase().indexOf(filter) > -1) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function payNow(button) {
    const row = button.closest('tr');

    const amountCell = row.querySelector('.amount');
    const amount = amountCell.textContent;

    alert(`Payment amount: ${amount}`);
}

const ctx = document.getElementById('lineChart');
const ctx2 = document.getElementById('doughnut');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'sugar levels',
            data: [12, 19, 30, 5, 2, 3, 7, 8, 9, 12, 15, 16],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'B.P levels',
            data: [12, 19, 3, 5, 2, 3, 100, 150, 70, 80, 120, 130],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

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
function filterDoctors(id, col) {
    var input, filter, content, appointments, div, i, txtValue;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    content = document.querySelector(".aptsCont");
    appointments = content.getElementsByClassName("aptsRow");

    for (i = 0; i < appointments.length; i++) {
      div = appointments[i].getElementsByTagName("div")[col];
      if (div) {
        txtValue = div.textContent || div.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          appointments[i].style.display = "";
        } else {
          appointments[i].style.display = "none";
        }
      }
    }
}
function setStatus(id, className) {

    const filterSelect = document.getElementById(id);
    const table = document.querySelector(className);
    const tableRows = table.querySelectorAll('.table-row');
    const selectedCategory = filterSelect.value.toLowerCase();
    
    tableRows.forEach(row => {
        const category = row.querySelector('.status').textContent.trim().toLowerCase(); 
        
        console.log(category);
        console.log(selectedCategory);

        if (selectedCategory === 'all' || category === selectedCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function openMedCont(className) {
    document.querySelector(className).style.display = 'flex';
    document.querySelector('body').style.overflow = 'auto';
}

function closeMedCont(className) {
    document.querySelector(className).style.display = 'none';
    document.querySelector('body').style.overflow = 'hidden';
}

function removeMed(btn) {
    const td = btn.parentNode.parentNode;
    td.style.display = 'none'
}

function addMed() {
    const tbody = document.getElementById('tbody');
    const theadTr = document.getElementById('medRow');
    const save = document.getElementById('saveMed');

    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    
    const inpt = document.createElement("input");
    inpt.setAttribute("type", "text");
    inpt.setAttribute("placeholder", "Enter Med Name");
    inpt.classList.add("medName");
    td1.appendChild(inpt)

    const morning = document.createElement('input');
    morning.type = 'checkbox';
    morning.name = 'time';
    morning.value = 'M';
    td2.appendChild(morning)
    
    const afternoon = document.createElement('input');
    afternoon.type = 'checkbox';
    afternoon.name = 'time';
    afternoon.value = 'A';
    td3.appendChild(afternoon)
    
    const night = document.createElement('input');
    night.type = 'checkbox';
    night.name = 'time';
    night.value = 'N';
    td4.appendChild(night)

    const rmBtn = document.createElement('button');
    rmBtn.classList.add('removeMed');
    rmBtn.innerHTML = "&#8722;";
    rmBtn.setAttribute('onclick', 'removeMed(this)');
    td5.appendChild(rmBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    const removeTr = document.createElement('th');
    removeTr.innerText = "remove";
    if (theadTr.children.length == 4) {
        theadTr.appendChild(removeTr);
    }
    tbody.appendChild(tr);
    if (tbody.children.length == 0) {
        save.style.display = 'none'
    } else {
        save.style.display = 'block'
    }
}
function saveMedData() {
    var tbody = document.getElementById('tbody');
    var medData = {};

    var rows = tbody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var inputs = row.getElementsByTagName('input');

        var medName = inputs[0].value.trim();
        var checkboxValues = [];
        var sum = 0;

        for (var j = 1; j < 4; j++) {
            var checkbox = inputs[j];
            checkboxValues.push(checkbox.checked ? 1 : 0);
            sum += checkbox.checked;
        }
        if (medName !== "" && sum !== 0) {
            medData[medName] = checkboxValues;
        } else {
            alert('Please fill all the Fields..!');
            return
        }
    }

    var jsonData = JSON.stringify(medData);

    console.log(jsonData);
    alert('Preciption Saved...!')
}