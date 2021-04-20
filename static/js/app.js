//This starter code is pulled from the office hours discussion with Dom
console.log("app.js is loaded");



function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown
    var selector = d3.select("#selDataset");

    //read data from samples.json using D3
    d3.json("data/samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
    });





    //update bar graph


    //update bubble chart


    // update demographic information
}

InitDashboard();