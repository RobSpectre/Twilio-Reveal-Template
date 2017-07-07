function processTimelineSlide(currentSlide) {
  var timeline_div = currentSlide.getElementsByClassName('timeline')[0];
  var value = timeline_div.innerHTML;
  timeline_div.innerHTML = '';
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

function advanceTimelineChart(event) {
  var slide = Reveal.getCurrentSlide();

  advanceContent(slide, event);

  if (event.fragment.hasAttribute('data-set-window')) {
    advanceSetWindow(slide, event);
  }

  if (event.fragment.hasAttribute('data-move-to-date')) {
    advanceMoveToDate(slide, event);
  }

  if (event.fragment.hasAttribute('data-fit')) {
    advanceFit(slide, event);
  }
}

function retreatTimelineChart(event) {
  var slide = Reveal.getCurrentSlide();

  retreatContent(slide, event);

  if (event.fragment.hasAttribute('data-set-window')) {
    retreatSetWindow(slide, event);
  }

  if (event.fragment.hasAttribute('data-move-to-date')) {
    retreatMoveToDate(slide, event);
  }

  if (event.fragment.hasAttribute('data-fit')) {
    retreatFit(slide, event);
  }
}

function advanceContent(slide, event) {
  var content_div = slide.getElementsByClassName('timeline-content')[0];
  content_div.innerHTML = event.fragment.innerHTML;
}

function retreatContent(slide, event) {
  var content_div = slide.getElementsByClassName('timeline-content')[0];

  if (event.fragment.dataset.fragmentIndex == 0) {
    content_div.innerHTML = '';
  } else {
    var previous_index = event.fragment.dataset.fragmentIndex - 1; 
    var previous_div = slide.getElementsByClassName('fragment')[previous_index];
    content_div.innerHTML = previous_div.innerHTML;
  }
}

function advanceSetWindow(slide, event) {
  slide.previous_window = slide.timeline.getWindow();

  var ids = getIds(event.fragment.dataset.setWindow);

  slide.timeline.setWindow(ids[0], ids[1]);
}

function retreatSetWindow(slide, event) {
  slide.timeline.setWindow(slide.previous_window.start, slide.previous_window.end);
}

function advanceMoveToDate(slide, event) {
  slide.previous_date = slide.timeline.getWindow();

  slide.timeline.moveTo(event.fragment.dataset.moveToDate);
}

function retreatMoveToDate(slide, event) {
  slide.timeline.setWindow(slide.previous_date.start, slide.previous_date.end);
}

function advanceFit(slide, event) {
  slide.previous_fit = slide.timeline.getWindow();
  slide.timeline.fit();
}

function retreatFit(slide, event) {
  slide.timeline.setWindow(slide.previous_fit.start, slide.previous_fit.end);
}

function getIds(value) {
  return value.split(',').map(function (value) {
    return value.trim();
  });
}