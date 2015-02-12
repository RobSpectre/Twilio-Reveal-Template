function advanceChart(slide) {
    if (slide.className.indexOf("chart-pie") > -1) {
        var chart = c3.generate({
            bindto: '#pie',
            data: {
                columns: [
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                    ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                    ["setosa", 30]
                ],
                type: 'pie'
            }
        });
    } else if (slide.className.indexOf("chart-line") > -1) {
        var chart = c3.generate({
            bindto: '#line',
            data: {
                x: 'x',
                columns: generateChartData(),
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d',
                    }
                }
            }
        });
    } else if (slide.className.indexOf("chart-bar") > -1) {
        var chart = c3.generate({
            bindto: '#bar',
            data: {
                x: 'x',
                columns: generateChartData(),
                type: 'bar'
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d',
                    }
                }
            }
        });
    } else if (slide.className.indexOf("chart-area") > -1) {
        var chart = c3.generate({
            bindto: '#area',
            data: {
                x: 'x',
                columns: generateChartData(),
                type: 'area'
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d',
                    }
                }
            }
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

    var x = ['x'];
    var visits = ['Visits'];
    for (i=0; i < 100; i++) {
        x.push(chartData[i].date);
        visits.push(chartData[i].visits);
    }
    return [x, visits];
}
