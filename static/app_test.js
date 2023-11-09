let data;

fetch('../housing.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        const dropdownMenu = d3.select("#selState");

        const StateNames = [...new Set(data.map(item => item.STATE))];

        dropdownMenu
            .selectAll("option")
            .data(StateNames)
            .enter()
            .append("option")
            .text(statename => statename)
            .attr("value", statename => statename);
        
            UnitsOptionChanged(StateNames[0]);
    });

function UnitsOptionChanged(selectedState) {
    const filteredData = data.filter(item => item.STATE === selectedState);

    const years = filteredData.map(item => item.YEAR);
    const house = filteredData.map(item => item.TOTAL_HOME_UNITS);

    const StatePlot = {
        x: years,
        y: house,
        type: 'bar',
        name: 'Public Housing Built',
        opacity: 0.7,
        marker: {
            color: 'green',
        },
    };

    const layout = {
        title: 'Public Housing',
        xaxis: {
            title: 'Year',
        },
        yaxis: {
            title: 'Housing Units Built',
        },
    };

    Plotly.newPlot('bar', [StatePlot], layout);
}