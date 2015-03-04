function processChartSlide(currentSlide) {
    slide = currentSlide;
    chart_div = slide.getElementsByTagName('div')[0];
    id = chart_div.getAttribute('id');
    data = chart_div.innerHTML;

    type = chart_div.getAttribute('class').split(' ')[1];

    if (data === '') {
        if (type == 'pie' || type == 'donut') {
            data = {
                columns: [
                    ["versicolor", 40],
                    ["virginica", 40],
                    ["setosa", 30]
                ],
                type: 'pie'
            };
        } else {
            data = {
                columns: generateChartData(),
                type: type,
                x: 'x',
            };
        }
    }

    if (typeof data == 'string') {
        try {
            if (type == 'pie' || type == 'donut') {
                data = {
                    columns: JSON.parse(data),
                    type: type
                    };
                } else {
                    data = {
                        columns: JSON.parse(data),
                        type: type,
                        x: 'x'
                    };
                }
        } catch (e) {
            data = {
                url: data,
                type: type
            };
        }
    }

    chart = createChart(id, type, data);
    slide.chart = chart;
}

function advanceChart(event) {
    var slide = Reveal.getCurrentSlide();
    value = event.fragment.innerHTML;
    try {
        data = JSON.parse(value);
        slide.chart.load({
            columns: data
        });
        event.fragment.data = data;
    } catch(e) {
        slide.chart.load({
            url: value
        });
        event.fragment.data = data;
    }
}

function retreatChart(event) {
    var slide = Reveal.getCurrentSlide();
    ids = [];
    event.fragment.data.forEach(function(row) {
        ids.push(row[0]);
    });
    slide.chart.unload({
        ids: ids
    });
    event.fragment.data = [];
}

function createChart(id, type, data) {
    if (type == 'pie' || type == 'donut') {
        return c3.generate({
            bindto: "#" + id,
            data: data, 
        });
    } else {
        return c3.generate({
            bindto: "#" + id,
            data: data, 
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
