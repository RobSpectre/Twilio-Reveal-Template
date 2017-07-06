function processTimelineSlide(currentSlide) {
  var timeline_div = currentSlide.getElementsByClassName('timeline')[0];
  var value = timeline_div.innerHTML;
  timeline_div.innerHTML = '';
  var timeline_data = undefined;

  try {
    if (value.indexOf('data/') == 0) {
      $.ajax({
        dataType: "json",
        url: value,
        success: function(data) {
          createTimeline(timeline_div, data);
        },
        error: function(error) {
          console.log("Error loading " + value + ": " + error);
          console.log(error);
        }
      });
    } else {
      timeline_data = JSON.parse(value);
      createTimeline(timeline_div, timeline_data);
    }
  } catch(e) {
    console.log("Error processing timeline.");
  }
}

function advanceTimelineChart(event) {
  var slide = Reveal.getCurrentSlide();
  var content_div = slide.getElementsByClassName('timeline-content')[0];
  content_div.innerHTML = event.fragment.innerHTML;
}

function retreatTimelineChart(event) {
  var slide = Reveal.getCurrentSlide();
  var content_div = slide.getElementsByClassName('timeline-content')[0];

  console.log(event.fragment.dataset);

  if (event.fragment.dataset.fragmentIndex == 0) {
    content_div.innerHTML = '';
  } else {
    var previous_index = event.fragment.dataset.fragmentIndex - 1; 
    var previous_div = slide.getElementsByClassName('fragment')[previous_index];
    content_div.innerHTML = previous_div.innerHTML;
  }
}

function createTimeline(container, data) {
  var slide = Reveal.getCurrentSlide();
  var items = new vis.DataSet(data);
  var options = {};

  var timeline = new vis.Timeline(container, data, options);
  
  slide.timeline = timeline;

  var content_div = document.createElement('div');
  content_div.className = "timeline-content";
  container.insertAdjacentElement("afterend", content_div);
}
