function advanceFunnelChart(event) {
    var slide = Reveal.getCurrentSlide();
    var value = event.fragment.innerHTML;

    try {
        data = {
            name: event.fragment.id,
            y: JSON.parse(value)
        }
    } catch(e) {
        console.log("Could not read value of fragment id: " + event.fragment.id);
    }

    slide.funnel_chart.series[0].addPoint(data); 
}

function retreatFunnelChart(event) {
    var slide = Reveal.getCurrentSlide();
    slide.funnel_chart.get(event.fragment.id).remove();
}

function processFunnelChartSlide(currentSlide) {
    chart_div = currentSlide.getElementsByTagName('div')[0];
    id = chart_div.getAttribute('id');
    data = chart_div.innerHTML;
    
    if (data === 'undefined') {
        data = [];
    }

    funnel_chart = createFunnelChart(id, data);
    currentSlide.funnel_chart = funnel_chart;
}

function createFunnelChart(id, data, text) {
    console.log(id);
    if (text === 'undefined') {
        text = '';
    }

    if (data === 'undefined') {
        data = [];
    }

    var funnel_chart = new Highcharts.Chart({
        // Core Config
        chart: {
            type: 'funnel',
            renderTo: id,
            spacingRight: 100,
            spacingBottom: 25 
        },
        // Blank title above chart
        title: {
            text: ''
        },
        // Configure the appearance of the funnel layers
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true,
                    crop: false,
                    overflow: "none",
                    style: {"fontSize": "2.5em"}
                },
                neckWidth: '30%',
                neckHeight: '25%'
            }
        },
        legend: {
            enabled: false, 
        },
        series: [{
            name: "Funnel",
            data: [data] 
        }]
    });
    return funnel_chart;
}
