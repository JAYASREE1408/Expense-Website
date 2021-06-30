
var id = sessionStorage.getItem("id_user");

window.onload = function () { load_data(); }
function load_data() {


    sessionStorage.removeItem("id_expense");
    console.log(id);
    var url = "http://127.0.0.1:8080/demo/user/" + id;
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                sessionStorage.setItem("isadmin", data.data.isadmin);
                document.getElementById('name').value = data.data.name;
                document.getElementById('email').value = data.data.email;
                document.getElementById('role').value = data.data.role;
                document.getElementById('phone').value = data.data.phone;

                document.getElementById('name').readOnly = true;
                document.getElementById('email').readOnly = true;
                document.getElementById('role').readOnly = true;
                document.getElementById('phone').readOnly = true;
                var ele = ``;
                for (i in data.users) {
                    ele = ele + `<h1 style="text-align: center;color: #71ffff"><i class="fa fa-users"></i> User Detail ${parseInt(i)+1}</h1><h1 style="color:white; font-size:20px">Name : ${data.users[i].name} <br> Role :  ${data.users[i].role}<br> Phone :   ${data.users[i].phone}<br>`
                }
                document.getElementById('users').innerHTML = ele;
                if (sessionStorage.getItem("isadmin") == 1) {
                    document.getElementById("settings").innerHTML = '<li><a href="./settings.html"><i class="fa fa-cogs"></i> Settings</a></li>';
                    console.log("done");
                }
                else {
                    document.getElementById("settings").innerHTML = '';
                    console.log(sessionStorage.getItem("isadmin"));

                }

            }

        });



}
function delete_user() {
    var id = sessionStorage.getItem("id_user");
    var url = "http://127.0.0.1:8080/demo/user/" + id;
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
            if (data.status == "success") {
                console.log("deleted");
                logout();
            }
            else {
                document.getElementById('status').innerHTML = data.status;

            }

        });

}
function logout() {

    sessionStorage.removeItem("id_user");
    sessionStorage.removeItem("id_expense");
    sessionStorage.removeItem("isadmin");
    window.location = "index.html";


}

function set_editable() {
    document.getElementById('name').readOnly = false;
    document.getElementById('role').readOnly = false;
    document.getElementById('phone').readOnly = false;


    document.getElementById('save_btn').innerHTML = `<button type="submit"  value ="save" onclick="user_put()"><i class="fa fa-floppy-o" ></i> Save</button>`



}
function set_noteditable() {
    document.getElementById('name').readOnly = true;
    document.getElementById('role').readOnly = true;
    document.getElementById('phone').readOnly = true;


    document.getElementById('save_btn').innerHTML = ``;
    window.setTimeout(function () {
        document.getElementById('status').innerHTML = '';
    }, 1000);
}
function user_put() {
    var id = sessionStorage.getItem("id_user");
    var url = "http://127.0.0.1:8080/demo/user/" + id;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var role = document.getElementById('role').value;
    var st = new Object();
    st.name = name;
    st.email = email;
    st.phone = phone;
    st.role = role;
    console.log(JSON.stringify(st));
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

            document.getElementById('status').innerHTML = data.status;
            set_noteditable();
            document.getElementById('users').innerHTML = ``;
            load_data();
        })
        .catch(console.error);

}
function if_admin_display_users() {




}