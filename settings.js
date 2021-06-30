var currency_items = [];
var category_items = [];
var merchant_items = [];
window.onload = function () {

    load_datas();
}

function load_datas() {
    category();
    currency();
    merchant();
}

function category() {
    var url = "http://127.0.0.1:8080/demo/cr/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;

                for (i in data.data) {
                    category_items.push(data.data[i].id);
                    ele += `<input type="text" style="color:blue" value="${data.data[i].category}" id="caname${data.data[i].id}" />
                    <input type="text" value=" ${data.data[i].description}" id="cades${data.data[i].id}" />`
                }


                document.getElementById(`category`).innerHTML = ele

                    + ` <span style="text-align: center;" id="categorystatus"><br><br></span><div style="text-align: center;">
                    <button style="text-align: center;" type="submit"  onclick="save_category()"><i class="fa fa-save"></i> Save</button></center><br></div>`;

            }

        });
}

function currency() {
    var url = "http://127.0.0.1:8080/demo/cy/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                console.log(data.data);
                for (i in data.data) {
                    currency_items.push(data.data[i].id);
                    ele += `<input type="text" style="color:blue" value="${data.data[i].code}"  id="ccode${data.data[i].id}" />
                    <input type="text" value=" ${data.data[i].name}"   id="cname${data.data[i].id}"/>`
                }


                document.getElementById(`currency`).innerHTML = ele
                    + ` 
                    <span id="currencystatus"><br><br></span><div style="text-align: center;">
                    <button style="text-align: center;" type="submit"  onclick="save_currency()"><i class="fa fa-save"></i> Save</button></center><br></div>`;


            }

        });
}
function merchant() {
    var url = "http://127.0.0.1:8080/demo/m/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;

                for (i in data.data) {
                    merchant_items.push(data.data[i].id);
                    ele += `<input type="text" style="color:blue" value="${data.data[i].name}" id="mname${data.data[i].id}" />
                    <input type="text" value=" ${data.data[i].description}"  id="mdes${data.data[i].id}" />`
                }


                document.getElementById(`merchant`).innerHTML = ele
                    + ` 
                    <span id="merchantstatus"><br><br></span><div style="text-align: center;">
                    <button style="text-align: center;" type="submit"  onclick="save_merchant()"><i class="fa fa-save"></i> Save</button></center><br><div>`;


            }

        });
}

function save_currency() {

    var st = new Object();
    var expense_items = [];
    var name, code;
    console.log(currency_items.toString());
    for (i in currency_items) {
        name = document.getElementById(`cname${currency_items[i]}`).value;
        code = document.getElementById(`ccode${currency_items[i]}`).value;
        if (name.trim() != '' && code.trim() != '') {
            expense_items.push({
                "id": currency_items[i],
                "name": name,
                "code": code
            });
        }

    }
    st.currency_item = expense_items;

    console.log(JSON.stringify(st));
    put_currency(st);

}
function put_currency(st) {
    var url = "http://127.0.0.1:8080/demo/cy";
    fetch(url, {
        method: 'PUT',
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

            console.log(data);

            document.getElementById('currencystatus').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);
}
function save_merchant() {

    var st = new Object();
    var expense_items = [];
    var name, code;
    console.log(currency_items.toString());
    for (i in merchant_items) {
        name = document.getElementById(`mname${merchant_items[i]}`).value;
        code = document.getElementById(`mdes${merchant_items[i]}`).value;
        if (name.trim() != '' && code.trim() != '') {
            expense_items.push({
                "id": merchant_items[i],
                "name": name,
                "description": code
            });
        }

    }
    st.merchant_item = expense_items;

    console.log(JSON.stringify(st));
    put_merchant(st);

}
function put_merchant(st) {
    var url = "http://127.0.0.1:8080/demo/m";
    fetch(url, {
        method: 'PUT',
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

            console.log(data);

            document.getElementById('merchantstatus').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);
}


function save_category() {

    var st = new Object();
    var expense_items = [];
    var name, code;

    for (i in category_items) {
        name = document.getElementById(`caname${category_items[i]}`).value;
        code = document.getElementById(`cades${category_items[i]}`).value;
        if (name.trim() != '' && code.trim() != '') {
            expense_items.push({
                "id": category_items[i],
                "name": name,
                "description": code
            });
        }

    }
    st.category_item = expense_items;

    console.log(JSON.stringify(st));
    put_category(st);

}
function put_category(st) {
    var url = "http://127.0.0.1:8080/demo/cr";
    fetch(url, {
        method: 'PUT',
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

            console.log(data);

            document.getElementById('categorystatus').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);
}
function post_currency() {

    var code = document.getElementById('currency_code').value;

    var name = document.getElementById('currency_name').value;
    var st = new Object();
    st.code = code;
    st.name = name;
    console.log(JSON.stringify(st));
    var url = "http://127.0.0.1:8080/demo/cy";
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

            console.log(data);

            document.getElementById('currency_status').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);


}
function post_merchant() {

    var des = document.getElementById('merchant_description').value;

    var name = document.getElementById('merchant_name').value;
    var st = new Object();
    st.description = des;
    st.name = name;
    console.log(JSON.stringify(st));
    var url = "http://127.0.0.1:8080/demo/m";
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

            console.log(data);

            document.getElementById('merchant_status').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);


}
function post_category() {

    var des = document.getElementById('category_description').value;

    var name = document.getElementById('category_name').value;
    var st = new Object();
    st.description = des;
    st.name = name;
    console.log(JSON.stringify(st));
    var url = "http://127.0.0.1:8080/demo/cr";
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

            console.log(data);

            document.getElementById('category_status').innerHTML = data.status;
            load_datas();

        })
        .catch(console.error);


}

