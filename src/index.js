var subButt = document.getElementById("butt-submit");
let results = document.getElementById("results");
let filter = document.getElementById("filter");
let category = document.getElementById("category");
results.hidden = true;

window.onload = function() {
    alert(localStorage.getItem("category"));
    filter.value = localStorage.getItem("filter") || "";
    category.value = localStorage.getItem("category") || "posts";
    let lsData = localStorage.getItem("data") || false;
    console.log(lsData);
    if (lsData) {
        printData(JSON.parse(lsData));
    }
};

subButt.addEventListener("click", function() {
    let url = `https://jsonplaceholder.typicode.com/${category.value}`;
    if (filter.value) {
        url += filter;
    }

    let json_res = "";

    fetch(url)
        .then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                throw "Data not found";
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            localStorage.setItem("data", JSON.stringify(data));
            localStorage.setItem("filter", filter.value);
            localStorage.setItem("category", category.value);
            printData(data);
        })
        .catch(function(error) {
            console.log(error);
        });
});

let getRemoteData;

let printData = function(data) {
    let table = document.getElementById("res-table");
    table.innerHTML = "";

    let header = table.insertRow(0);
    console.log(data);
    if (data[0] instanceof Object) {
        header = setTHeader(header, data[0]);
        for (let obj in data) {
            let row = table.insertRow();

            row = setRow(row, data[obj]);
        }
    } else {
        let row = table.insertRow();

        header = setTHeader(header, data);
        row = setRow(row, data);
    }
    results.hidden = false;
};

let setRow = function(row, data) {
    for (let key in data) {
        if (key === "address") {
            let addrObj = data[key];
            let address = `${addrObj["city"]}, ${addrObj["street"]} str., 
                ${addrObj["suite"]}`;
            row.insertCell().innerHTML = address;
            continue;
        }
        if (key === "company") {
            row.insertCell().innerHTML = data[key]["name"];
            continue;
        }
        row.insertCell().innerHTML = data[key];
    }
    return row;
};

let setTHeader = function(header, obj) {
    for (let key in obj) {
        header.insertCell().innerHTML = key;
    }
    return header;
};

document.addEventListener("DOMContentLoaded", function() {
    alert("1");
});
