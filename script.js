const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  fetchData(); // Initial fetch
  setInterval(fetchData, 5000); // Fetch every 5 seconds
});

function fetchData() {
  // Assuming your API endpoint is 'https://example.com/api/getFault'
  fetch('https://ugfault.onrender.com/getFault')
    .then(response => response.json())
    .then(data => {
      updateTable(data);
      updateArraySize(data.length);
      newFaultsize(data.length)
    })
    
    .catch(error => console.error('Error fetching data:', error));
}

function updateTable(data) {
  const tableBody = document.getElementById('tableBody');

  // Clear existing rows
  tableBody.innerHTML = '';

  // Assuming data is an array of objects
  data.forEach(obj => {
    const newRow = tableBody.insertRow();
    // Assuming obj has properties 'value1' and 'value2'
    const phase = obj.phase;
    const distance = obj.distance
    newRow.insertCell().textContent = ` Ward B, ${phase} phase at ${distance} km`;
    newRow.insertCell().textContent = "John Doe"
    // Add similar lines for other columns if needed
    newRow.insertCell().textContent = '30/12/2023';
    newRow.insertCell().textContent = 'Pending';
    // newRow.insertCell().textContent = 'Static Content 5';
  });
}

function updateArraySize(size) {
  const pendingFaults = document.getElementById('pendingFaults');
  pendingFaults.textContent = size.toString();

}


function newFaultsize(size) {
 
  const newFaults = document.getElementById('newFaults');
  
newFaults.textContent = size.toString();

}