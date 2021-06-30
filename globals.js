function get() {
    var email = document.getElementById('email').value;
    var url = "http://127.0.0.1:8080/demo/login/" + email;
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {

            if (data.status == "success") {

                sessionStorage.setItem("id_user", data.id);

                console.log(data.id)

                redirect();
            }
            else {
                document.getElementById("email-info").innerHTML = "Invalid Email Id ! You are not an existing user ! Please register";
            }
        });

}
function redirect() {
    window.setTimeout(function () {

        // Move to a new location or you can do something else
        window.location = "displayusers.html";

    }, 1000);
}

