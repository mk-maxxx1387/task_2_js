var subButt = document.getElementById("butt-submit");
let results = document.getElementById("results");

results.hidden = true;

subButt.addEventListener("click", function() {
    let filter = document.getElementById("filter").value;
    let category = document.getElementById("category").value;
    let url = `https://jsonplaceholder.typicode.com/${category}/${filter}`;

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
            printData(data);
        })
        .catch(function(error) {
            console.log(error);
        });
});

let printData = function(data) {
    let table = document.getElementById("res-table");
    table.innerHTML = "";

    let header = table.insertRow(0);

    if (data[0] instanceof Object) {
        header = setTHeader(header, data[0]);
        for (let obj in data) {
            let row = table.insertRow();

            for (let key in data[obj]) {
                row.insertCell().innerHTML = data[obj][key];
            }
        }
    } else {
        let row = table.insertRow();
        header = setTHeader(header, data);
        for (let key in data) {
            row.insertCell().innerHTML = data[key];
        }
        //console.log(Object.keys(data));
    }
    results.hidden = false;
};

let setTHeader = function(header, obj) {
    for (let key in obj) {
        header.insertCell().innerHTML = key;
    }
    return header;
};
