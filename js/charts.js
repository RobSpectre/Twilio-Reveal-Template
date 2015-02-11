function advanceChart(slide) {
    if (slide.className.indexOf("chart-pie") > -1) {
        var chart = AmCharts.makeChart("pie",{
            "type"      : "pie",
            "titleField"    : "category",
            "valueField"    : "column-1",
            "startEffect"   : "easeOutSine",
            "startDuration" : 1,
            "dataProvider"  : [
                {
                    "category": "category 1",
                    "column-1": 8
                },
                {
                    "category": "category 2",
                    "column-1": 6
                },
                {
                    "category": "category 3",
                    "column-1": 2
                }
            ]
        });
    } else if (slide.className.indexOf("chart-line") > -1) {
        var chart = AmCharts.makeChart("line", {
            "dataProvider"  : generateChartData(), 
            "animationPlayed" : false,
            "type": 'serial',
            "graphs": [
                {
                    
                    "valueField"    : "visits",
                }
            ]
        });
    } else if (slide.className.indexOf("chart-bar") > -1) {
        var chart = AmCharts.makeChart("bar", {
            "dataProvider"  : generateChartData(), 
            "animationPlayed" : true,
            "type": 'serial',
            "graphs": [
                {
                    "type": "column",
                    "valueField"    : "visits",
                    "fillAlphas": 1 
                }
            ]
        });
    } else if (slide.className.indexOf("chart-area") > -1) {
        var chart = AmCharts.makeChart("area", {
            "dataProvider"  : generateChartData(), 
            "animationPlayed" : true,
            "type": 'serial',
            "graphs": [
                {
                    "valueField"    : "visits",
                    "fillAlphas": 1 
                }
            ]
        });
    }

}

function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);

    for (var i = 0; i < 100; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}
