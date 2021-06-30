window.onload = function () {
    sessionStorage.removeItem("id_expense");
    var id = sessionStorage.getItem("id_user");

    if (sessionStorage.getItem("isadmin") == 1) {
        document.getElementById("settings").innerHTML = '<li><a href="./settings.html"><i class="fa fa-cogs"></i> Settings</a></li>';
        console.log("done");
    }
    else {
        document.getElementById("settings").innerHTML = '';
        console.log(sessionStorage.getItem("isadmin"));

    }





    load_data(id);
    if (id)
        document.getElementById("newbutton").innerHTML = ` <a href="./expensedetails.html"><button style="position: fixed;
    top: 50px;
    right: 10px;"><i class="fa fa-plus-square" ></i> New</button></a>`;
};
var shown = 0;
function load_data(id) {

    var url = "http://127.0.0.1:8080/demo/expenses/" + id;
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            var ele = ``;
            if (data.status == "success") {

                for (count in data.data) {
                    console.log(data.data[count].id);
                    ele = ele + `
                   
                        
                    <h4>
                    <p>Currency    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     : <input type="text" value="${data.data[count].currency}" id="currency${data.data[count].id}" readOnly ><br>
                   <br>Date     &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       : <input type="text" value="${data.data[count].date}" id="date${data.data[count].id}" readOnly><br>
                   <br>Refno   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      : <input type="text" value="${data.data[count].refno}" id="refno${data.data[count].id}" readOnly><br>
                   <br>Total Amount &nbsp;: <input type="number" value="${data.data[count].total}" id="total${data.data[count].id}" readOnly><br>
                    
                   <br>Merchant  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :<input type="text" value="${data.data[count].customer}" id="customer${data.data[count].id}" readOnly></h4></p><br>
                    <center><button type="submit"  onclick="redirect(\'' + ${data.data[count].id} + '\')"><i class="fa fa-eye" ></i> View</button>
                   
                    `;

                }
                console.log(data.data[count].total);
                document.getElementById('expenses_div').innerHTML = ele;

            }


        });
}

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
                    // ele = ele + `



                    // <p>${data.data[count].currency}
                    // ${data.data[count].date}
                    // ${data.data[count].refno}
                    // ${data.data[count].total}`;

                    for (item in data.data[count].expense_item) {
                        ele = ele + `
                        <h4>Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input type="text" value="${data.data[count].expense_item[item].category}" id="category${data.data[count].expense_item[item].id}" readOnly><br><br>
                        Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input type="text" value="${data.data[count].expense_item[item].amount}" id="amount${data.data[count].expense_item[item].id}" readOnly><br><br>
                        Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input type="text" value="${data.data[count].expense_item[item].description}" id="description${data.data[count].expense_item[item].id}" readOnly></h4><br><br><hr>
                        
                       `;
                    }
                    ele = ele + `<span id="save${data.data[count].id}"></span>`;

                }
                console.log(data.data[count].total);
                document.getElementById(`span${id}`).innerHTML = ele;
                shown = 1;

            }

        });
}

function redirect(id) {
    window.setTimeout(function () {
        window.location = "expenseedit.html";
        sessionStorage.setItem("id_expense", id);
    }, 1000);
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
    // document.getElementById(`category${id}`).readOnly = true;
    // document.getElementById(`amount${id}`).readOnly = true;
    // document.getElementById(`description${id}`).readOnly = true;
}
function remove_readOnly(id) {
    document.getElementById(`currency${id}`).readOnly = false;
    document.getElementById(`date${id}`).readOnly = false;
    document.getElementById(`total${id}`).readOnly = false;
    document.getElementById(`refno${id}`).readOnly = false;
    document.getElementById(`customer${id}`).readOnly = false;

}
function remove_readOnly_item(id) {
    document.getElementById(`category${id}`).readOnly = false;
    document.getElementById(`amount${id}`).readOnly = false;
    document.getElementById(`description${id}`).readOnly = false;
}
function add_readOnly_item(id) {
    document.getElementById(`category${id}`).readOnly = true;
    document.getElementById(`amount${id}`).readOnly = true;
    document.getElementById(`description${id}`).readOnly = true;
}
function get_ids(id) {
    display_id(id);
    var url = "http://127.0.0.1:8080/demo/expense/" + id;
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {

                for (count in data.data) {
                    for (item in data.data[count].expense_item) {
                        remove_readOnly_item(data.data[count].expense_item[item].id);
                    }

                }
            }

        });


}
function edit_id(id) {
    display_id(id);
    remove_readOnly(id);
    get_ids(id);
    //document.getElementById(`save${id}`).innerHTML = `<button type="submit"  onclick="delete_id(\'' + ${id} + '\')">save</button>`;

}
