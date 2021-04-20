//This starter code is pulled from the office hours discussion with Dom
console.log("app.js is loaded");

//Create stubs for bar graph, bubble chart, and demographic metadata
function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);
}

function drawBubblechart(sampleId) {
    console.log(`drawBubblechart(${sampleId})`);
}

function showMetadata(sampleId) {
    console.log(`showMetadata (${sampleId})`);
}

function optionChanged(newsampleId) {
    console.log(`User selected ${newsampleId}`);

    drawBargraph(newsampleId);
    drawBubblechart(newsampleId);
    showMetadata(newsampleId);
}


function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown
    var selector = d3.select("#selDataset");

    //read data from samples.json using D3
    d3.json("data/samples.json").then(data => {
        // console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        
        var id = sampleNames[0];

        drawBargraph(id);
        drawBubblechart(id);
        showMetadata(id);
    });





    //update bar graph


    //update bubble chart


    // update demographic information
}

InitDashboard();