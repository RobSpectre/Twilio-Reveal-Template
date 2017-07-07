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

  if (event.fragment.hasAttribute('data-select-items')) {
    advanceSelectItems(slide, event);
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

  if (event.fragment.hasAttribute('data-select-items')) {
    retreatSelectItems(slide, event);
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
  event.fragment.previous_window = slide.timeline.getWindow();

  var ids = getIds(event.fragment.dataset.setWindow);

  slide.timeline.setWindow(ids[0], ids[1]);
}

function retreatSetWindow(slide, event) {
  slide.timeline.setWindow(event.fragment.previous_window.start,
                           event.fragment.previous_window.end);
}

function advanceMoveToDate(slide, event) {
  event.fragment.previous_date = slide.timeline.getWindow();

  slide.timeline.moveTo(event.fragment.dataset.moveToDate);
}

function retreatMoveToDate(slide, event) {
  slide.timeline.setWindow(event.fragment.previous_date.start,
                           event.fragment.previous_date.end);
}

function advanceFit(slide, event) {
  event.fragment.previous_fit = slide.timeline.getWindow();
  slide.timeline.fit();
}

function retreatFit(slide, event) {
  slide.timeline.setWindow(event.fragment.previous_fit.start,
                           event.fragment.previous_fit.end);
}

function advanceSelectItems(slide, event) {
  var selection = slide.timeline.getSelection();

  if (selection.length == 0) {
    event.fragment.previous_selection = slide.timeline.getWindow();
  } else {
    event.fragment.previous_selection = selection;
  }
  
  var ids = getIds(event.fragment.dataset.selectItems);
  slide.timeline.setSelection(ids,
                              {focus: true});
}

function retreatSelectItems(slide, event) {
  if (Array.isArray(event.fragment.previous_selection)) {
    slide.timeline.setSelection(event.fragment.previous_selection,
                                {focus: true});
  } else {
    slide.timeline.setSelection([]);
    slide.timeline.setWindow(event.fragment.previous_selection.start,
                             event.fragment.previous_selection.end);
  }
}

function getIds(value) {
  return value.split(',').map(function (value) {
    return value.trim();
  });
}
