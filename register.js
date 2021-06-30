
function user_post() {
    var url = "http://127.0.0.1:8080/demo/user";
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('mobile').value;
    var role = document.getElementById('role').value;
    var st = new Object();
    st.name = name;
    st.email = email;
    st.phone = parseInt(phone);
    st.role = role;
    console.log(JSON.stringify(st));
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
            document.getElementById('status').innerHTML = data.status;



        })
        .catch(console.error);

}
