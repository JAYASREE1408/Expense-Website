window.onload = function () {
    var status = sessionStorage.getItem("id_user");
    console.log(sessionStorage.getItem("id_user"));
    if (status !== null) {
        console.log(sessionStorage.getItem("id_user"));
        window.location = "displayusers.html";
    }
    else {
        console.log("not satisfied");
    }

}