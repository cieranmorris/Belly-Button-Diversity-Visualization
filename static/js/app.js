//This starter code is pulled from the office hours discussion with Dom
console.log("app.js is loaded");



function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown
    var selector = d3.select("#sel-Dataset");

    //read data from samples.json using D3
    d3.json("data/samples.json").then(function(data) {
        console.log(data);
    });



    //update bar graph


    //update bubble chart


    // update demographic information
}

InitDashboard();