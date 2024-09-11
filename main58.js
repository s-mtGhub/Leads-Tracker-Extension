
// All required Variables

let myLeads = [];
let listItems = "";
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads58"));


// Save Input when "Enter" is pressed
inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action (form submission if inside a form)
        inputBtn.click(); // Trigger the click event on the "Save" button
    }
});

// Save Input when button is clicked
// inputBtn.addEventListener("click", function() {
//     myLeads.push(inputEl.value);
//     inputEl.value = "";

//     localStorage.setItem("myLeads58", JSON.stringify(myLeads));
//     render(myLeads);
// });


// Load saved leads

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Save Tab

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads58", JSON.stringify(myLeads));
        render(myLeads);
    });
});

// Render

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            <button class='delete-btn' data-index='${i}'>Delete</button>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;

    // Add event listeners for delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function() {
            const index = btn.getAttribute("data-index");
            myLeads.splice(index, 1);
            localStorage.setItem("myLeads58", JSON.stringify(myLeads));
            render(myLeads);
        });
    });
}

// Deleting all

deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    console.clear();
    myLeads = [];
    render(myLeads);
});

// Save Input

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads58", JSON.stringify(myLeads));
    render(myLeads);
});
