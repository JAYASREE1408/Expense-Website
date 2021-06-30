window.onload = function () {
    if (sessionStorage.getItem("isadmin") == 1) {
        document.getElementById("settings").innerHTML = '<li><a href="./settings.html"><i class="fa fa-cogs"></i> Settings</a></li>';
        console.log("done");
        var data_api;
        let dat = async function () {
            {

                var url = "http://127.0.0.1:8080/demo/analytics";
                const response = await fetch(url);
                const data = await response.json();
                if (data.status == "success") {
                    var rowss = [];
                    for (item in data.data) {
                        var row = [];
                        row.push(data.data[item].currency);
                        row.push(data.data[item].total);
                        rowss.push(row);

                    }

                    var datas = {
                        header: ["Name", "Total Amount"],
                        rows: rowss
                    };
                    return datas;
                }
            }
        };
        dat().then((value) => {

            anychart.onDocumentReady(function () {



                // create the chart
                var chart = anychart.column();

                // add the data
                chart.data(value);

                // set the chart title
                chart.title("Top Currency Expense(All Users)");

                // draw
                chart.container("containers_admin");

                chart.draw();
            });
        });


    }


    else {
        document.getElementById("settings").innerHTML = '';
        console.log(sessionStorage.getItem("isadmin"));

    }

    var data_api;
    let dat = async function () {
        {
            var id = sessionStorage.getItem("id_user");
            var url = "http://127.0.0.1:8080/demo/analytics/" + id;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status == "success") {
                var rowss = [];
                for (item in data.data) {
                    var row = [];
                    row.push(data.data[item].currency);
                    row.push(data.data[item].total);
                    rowss.push(row);

                }

                var datas = {
                    header: ["Name", "Total Amount"],
                    rows: rowss
                };
                return datas;
            }
        }
    };
    dat().then((value) => {


        anychart.onDocumentReady(function () {


            // set the data
            // var data = {
            //     header: ["Name", "Total Amount"],
            //     rows: [
            //         [``, `1500`],
            //         ["Messina ", 7000],
            //         ["Ashgabat", 5000],
            //         ["Chile ", 1000],
            //         ["Tian Shan ", 2000],
            //         ["Armenia ", 2000],
            //         ["Iran ", 5000]
            //     ]
            // };

            // create the chart
            var chart = anychart.column();

            // add the data
            chart.data(value);

            // set the chart title
            chart.title("Top Currency Expense by You");

            // draw
            chart.container("containers");

            chart.draw();
        });
    });


}

async function get_data() {
    var datas;
    var url = "http://127.0.0.1:8080/demo/analytics";
    fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            if (data.status == "success") {
                console.log(data.data);

                var rowss = [];

                for (item in data.data) {
                    var row = [];
                    row.push(data.data[item].currency);
                    row.push(data.data[item].total);
                    rowss.push(row);

                }
                // console.log(rowss);
                datas = {
                    header: ["Name", "Total Amount"],
                    rows: rowss
                };
                return datas;

            }

        });
}