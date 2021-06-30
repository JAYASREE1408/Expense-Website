window.onload = function () {
    if (sessionStorage.getItem("isadmin") == 1) {
        document.getElementById("settings").innerHTML = '<li><a href="./settings.html"><i class="fa fa-cogs"></i> Settings</a></li>';
        console.log("done");
    }
    else {
        document.getElementById("settings").innerHTML = '';
        console.log(sessionStorage.getItem("isadmin"));

    }

    display_id(sessionStorage.getItem("id_expense"));

};
var child_items_id = [];
function display_id(id) {
    var url = "http://127.0.0.1:8080/demo/expense/" + id;
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            var ele = ``;
            if (data.status == "success") {

                for (count in data.data) {
                    console.log(data.data[count].id);
                    ele = ele + `<h4>
                    <p>Currency    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     : <input type="text" value="${data.data[count].currency}" id="currency${id}" list="curr${id}" autocomplete="off"readOnly >
                    <datalist id="curr${id}"></datalist><br>
                   <br>Date     &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       : <input type="text" value="${data.data[count].date}" id="date${id}" readOnly><br>
                   <br>Refno   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      : <input type="text" value="${data.data[count].refno}" id="refno${id}" readOnly><br>
                   <br>Total Amount &nbsp;: <input type="number" value="${data.data[count].total}" id="total${id}" readOnly><br>
                    
                   <br>Merchant  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :<input type="text" value="${data.data[count].customer}" id="customer${id}" autocomplete="off"readOnly list="mer${id}"><datalist id="mer${id}"></datalist></p></h4><br>
                   `;
                    for (item in data.data[count].expense_item) {
                        ele = ele + `         <div id="divs${data.data[count].expense_item[item].id}">
                        <div class="form-container">
                        <h1 class="box">Expense Item${parseInt(item) + 1}</h1></div>
               
                        <h4>Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        <input type="text" value="${data.data[count].expense_item[item].category}" id="category${data.data[count].expense_item[item].id}" 
                        list="catdata${data.data[count].expense_item[item].id}" autocomplete="off" readOnly >
                        <datalist id="catdata${data.data[count].expense_item[item].id}"></datalist><br><br>
                        Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input type="text" value="${data.data[count].expense_item[item].amount}" id="amount${data.data[count].expense_item[item].id}" readOnly><br><br>
                        Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input type="text" value="${data.data[count].expense_item[item].description}" id="description${data.data[count].expense_item[item].id}" readOnly></h4>
                        <span id="delete_item${data.data[count].expense_item[item].id}"></span></div>
                       `;
                        child_items_id.push(data.data[count].expense_item[item].id);
                    }
                    ele = ele + `<br>  <button type="submit"  onclick="edit(\'' + ${id} + '\')"><i class="fa fa-pencil"></i> Edit</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit"  onclick="delete_id(\'' + ${id} + '\')"><i class="fa fa-trash"></i> Delete</button></center><br>
                    <br><span id="save"></span>`;


                }
                console.log(data.data[count].total);
                document.getElementById(`expenses_div`).innerHTML = ele;
            }
        });

}
function delete_id(id) {
    var url = "http://127.0.0.1:8080/demo/expense/" + id;
    fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        }).then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            if (data.status == "success") {
                console.log("deleted");
                window.setTimeout(function () {
                    window.location = "expense.html";
                }, 1000);

            }

        });
}
function add_readOnly(id) {
    document.getElementById(`currency${id}`).readOnly = true;
    document.getElementById(`date${id}`).readOnly = true;
    document.getElementById(`total${id}`).readOnly = true;
    document.getElementById(`refno${id}`).readOnly = true;
    document.getElementById(`customer${id}`).readOnly = true;
}
function remove_readOnly(id) {
    document.getElementById(`currency${id}`).readOnly = false;
    document.getElementById(`date${id}`).readOnly = false;
    document.getElementById(`total${id}`).readOnly = false;
    document.getElementById(`refno${id}`).readOnly = false;
    document.getElementById(`customer${id}`).readOnly = false;

}
function remove_readOnly_item(item) {
    for (id in item) {
        document.getElementById(`category${item[id]}`).readOnly = false;
        document.getElementById(`amount${item[id]}`).readOnly = false;
        document.getElementById(`description${item[id]}`).readOnly = false;
    }
}
function add_readOnly_item(id) {
    document.getElementById(`category${id}`).readOnly = true;
    document.getElementById(`amount${id}`).readOnly = true;
    document.getElementById(`description${id}`).readOnly = true;
}
function edit(id) {
    remove_readOnly(id);
    remove_readOnly_item(child_items_id);
    set_data(id);
    document.getElementById("save").innerHTML = `<button type="submit"  onclick="put_expense(\'' + ${id} + '\')"><i class="fa fa-save"></i> Save</button>`;
    var item = child_items_id;
    if (child_items_id.length > 1) {
        for (id in item) {
            document.getElementById(`delete_item${item[id]}`).innerHTML = `<br><button type="submit"  onclick="remove_item(\'' + ${item[id]} + '\')"><i class="fa fa-eraser"></i> Remove</button>`;

        }

    }

    for (id in item) {
        set_category(item[id]);
    }



}
function check_remove() {
    var item = child_items_id;
    if (child_items_id.length <= 1) {
        for (id in item) {
            document.getElementById(`delete_item${item[id]}`).innerHTML = ``;

        }

    }
}
function remove_item(id) {
    var indexs = child_items_id.indexOf(parseInt(id));
    if (indexs > -1) {
        child_items_id.splice(indexs, 1);
    }
    document.getElementById(`divs${id}`).remove();
    console.log(child_items_id);
    check_remove();
}
function put_expense(id) {

    var name = document.getElementById(`customer${id}`).value;
    var dob = document.getElementById(`date${id}`).value;
    var ref = document.getElementById(`refno${id}`).value;
    var currency = document.getElementById(`currency${id}`).value;


    var st = new Object();
    st.customer = name;
    st.date = dob;
    st.refno = ref;
    st.currency = currency;


    var expense_items = [];
    var total = parseInt(0);

    for (i in child_items_id) {
        total = parseInt(total) + parseInt(document.getElementById(`amount${child_items_id[i]}`).value);
        expense_items.push({
            "id": child_items_id[i],
            "category": document.getElementById(`category${child_items_id[i]}`).value,
            "amount": document.getElementById(`amount${child_items_id[i]}`).value,
            "description": document.getElementById(`description${child_items_id[i]}`).value
        });
    }
    st.expense_item = expense_items;
    st.total = total;
    console.log(JSON.stringify(st));
    put_data(st, id);
}

function put_data(st, id) {
    var url = "http://127.0.0.1:8080/demo/expense/" + id;
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

            if (data.status == "success") {

                window.setTimeout(function () {
                    window.location = "expense.html";
                }, 1000);

            }


        })
        .catch(console.error);
}
function set_data(id) {
    console.log(id);
    var url = "http://127.0.0.1:8080/demo/cy/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                for (i in data.data) {
                    ele += `<option value="${data.data[i].code}"> ${data.data[i].name}</option>`
                }
                document.getElementById(`curr${id}`).innerHTML = ele;
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
                document.getElementById(`mer${id}`).innerHTML = ele;
            }

        });
}
function set_category(id) {
    var url = "http://127.0.0.1:8080/demo/cr/all";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                var ele = ``;
                for (i in data.data) {
                    ele += `<option value="${data.data[i].category}">${data.data[i].description}</option>`
                }
                document.getElementById(`catdata${id}`).innerHTML = ele;
            }

        });
}