var max_fields = 10;
var wrapper = $(".input_fields_wrap");
var add_button = $(".add_field_button");
var remove_button = $(".remove_field_button");
window.onload = function () {
    if (sessionStorage.getItem("isadmin") == 1) {
        document.getElementById("settings").innerHTML = '<li><a href="./settings.html"><i class="fa fa-cogs"></i> Settings</a></li>';
        console.log("done");
    }
    else {
        document.getElementById("settings").innerHTML = '';
        console.log(sessionStorage.getItem("isadmin"));

    }
    
    set_currency();

    var max_fields = 10;
    var wrapper = $(".input_fields_wrap");
    var add_button = $(".add_field_button");
    var remove_button = $(".remove_field_button");
    $(wrapper).append(`<div class="category-container" id="${1}">
    <label for="category">Category</label>
    <input name = "category" id = "category${1}" list="categorydata${1}" onkeyup="validateCategory()" placeholder="Enter your category" autocomplete="off" required>
    <datalist id = "categorydata${1}"></datalist>
    <h4 id="category-info"></h4>
    </div><div class="amount">
    <label for="amount">Amount</label><input type="number" id="amount${1}" onkeyup="validateAmount()" placeholder="Enter the amount" required/>
    <h4 id="amount-info"></h4>
    </div><div class="description-field-container">
    <label for="description">Description</label>
    <textarea  onkeyup="validateDescription()" rows="4" cols="50" name="description" id="description${1}" placeholder="Enter description" required></textarea>
    <h4 id="description-info" ></h4>
    </div>`);


    set_category();

    document.getElementById("add_field_button").onclick = function () {

        var total_fields = wrapper[0].childNodes.length;
        var c = document.getElementById("input_fields_wrap").childElementCount;
        if ((c / 3) < max_fields) {
            var cnt = (c / 3) + 1;
            $(wrapper).append(`<div class="category-container" ><label for="category">Category</label>
            <input name = "category" id = "category${cnt}" list="categorydata${cnt}" onkeyup="validateCategory()" placeholder="Enter your category"  autocomplete="off" required>
            <datalist id = "categorydata${cnt}"></datalist><h4 id="category-info"></h4></div><div class="amount"><label for="amount">Amount</label><input type="number" id="amount${cnt}" onkeyup="validateAmount()" placeholder="Enter the amount" required/><h4 id="amount-info"></h4></div><div class="description-field-container"><label for="description">Description</label><textarea  onkeyup="validateDescription()" rows="4" cols="50" name="description" id="description${cnt}" placeholder="Enter description" required></textarea><h4 id="description-info" ></h4></div>`);
        }
        set_category();

    }

    document.getElementById("remove_field_button").onclick = function () {

        var total_fields = wrapper[0].childNodes.length;
        var c = document.getElementById("input_fields_wrap").childElementCount;
        console.log(c);
        if ((c / 3) > 1) {
            wrapper[0].childNodes[total_fields - 1].remove();
            wrapper[0].childNodes[total_fields - 2].remove();
            wrapper[0].childNodes[total_fields - 3].remove();

        }
    };
}

function post_expense() {

    var name = document.getElementById("name").value;
    var dob = document.getElementById("dobs").value;

    var ref = document.getElementById("ref").value;

    var currency = document.getElementById("currency").value;
    var st = new Object();
    st.customer = name;
    st.date = dob;
    st.refno = ref;
    st.currency = currency;


    var expense_items = [];
    var total = parseInt(0);

    var c = document.getElementById("input_fields_wrap").childElementCount;
    for (var i = 1; i <= c / 3; i++) {
        total = parseInt(total) + parseInt(document.getElementById(`amount${i}`).value);
        expense_items.push({
            "category": document.getElementById(`category${i}`).value,
            "amount": document.getElementById(`amount${i}`).value,
            "description": document.getElementById(`description${i}`).value
        });
        console.log(document.getElementById(`category${i}`).value);
        console.log(document.getElementById(`amount${i}`).value);
        console.log(document.getElementById(`description${i}`).value);

    }
    st.expense_item = expense_items;
    st.total = total;
    console.log(JSON.stringify(st));
    post_data(st);
}

function post_data(st) {
    var id = sessionStorage.getItem("id_user");
    var url = "http://127.0.0.1:8080/demo/expense/" + id;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(st),
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }

    })
        .then(response => {
            return response.json();
        })
        .then(data => {

            if (data.status == "success") {
                document.getElementById('status').innerHTML = data.status;
                window.setTimeout(function () {
                    window.location = "expense.html";
                }, 1000);

            }
            else {
                document.getElementById('ref-info').innerHTML = 'Reference no Already exists';
            }


        })
        .catch(console.error);



}
function set_currency() {
    var url = "http://127.0.0.1:8080/demo/cy/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                for (i in data.data) {
                    ele += `<option value="${data.data[i].code}">${data.data[i].name}</option>`
                }
                document.getElementById("currencylist12").innerHTML = ele;
            }

        });
    var url = "http://127.0.0.1:8080/demo/m/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                for (i in data.data) {
                    ele += `<option value="${data.data[i].name}">${data.data[i].description}</option>`
                }
                document.getElementById("merchant").innerHTML = ele;
            }

        });
}
function set_category() {
    var url = "http://127.0.0.1:8080/demo/cr/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                console.log(data.data);
                for (i in data.data) {
                    ele += `<option value="${data.data[i].category}">${data.data[i].description}</option>`
                }
                var c = document.getElementById("input_fields_wrap").childElementCount;
                for (var i = 1; i <= c / 3; i++) {
                    document.getElementById(`categorydata${i}`).innerHTML = ele;
                }
            }

        });
}






