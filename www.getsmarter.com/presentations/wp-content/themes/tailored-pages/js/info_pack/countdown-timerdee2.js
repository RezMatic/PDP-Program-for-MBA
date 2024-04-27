window.addEventListener('DOMContentLoaded', () => {
    // Set Registration Date
    var regCloseDateObj = new Date(regCloseDate).getTime();
    // Set late registration date
    var startDateObj = new Date(startDate).getTime();
    
    // Number of split seconds in 21 days
    var dateLimit = 1814000000;
    // Number of split seconds in 1 day
    var oneDay = 86400000;
  
    // get distance of registration close date
    var distanceRegCloseDate = calcDistance(regCloseDateObj);
  
    if (distanceRegCloseDate <= dateLimit) {
      var x = setInterval(function () {
        // get distance of start date
        var distanceStartDate = calcDistance(startDateObj);

        var countDownTimerCounter = document.getElementById("countdown-timer-counter");

        // check that distance to registration close date is greater than one day and less than 21 days
        if (distanceRegCloseDate > oneDay && distanceRegCloseDate <= dateLimit) {
          var time = countTime(distanceRegCloseDate, "regDate");
          addText("regDate");
          countDownTimerCounter.innerHTML = `${time.days} Days left to register`;
        }
        // Check that the distance of registration is within one day 
        else if (distanceRegCloseDate > 0 && distanceRegCloseDate < oneDay) {
          var time = countTime(distanceRegCloseDate, "regDate");
          addText("regDate");
          countDownTimerCounter.innerHTML = `${time.hours} Hours left to register`;
        }
        // check that distance to registration date has passed, and still a few days till start date
        else if (distanceRegCloseDate < 0 && distanceStartDate > 0) {
          var time = countTime(distanceStartDate, "startDate");
          addText("startDate");
          countDownTimerCounter.innerHTML = `${time.days}d : ${time.hours}h : ${time.minutes}m : ${time.seconds}s`;
        } else {
          clearInterval(x);
          clearTimer();
        }
      }, 1000);
    }
  });
  
  // add text to span tags
  function addText(str) {
    // Get the day, month and year of start date, month in short version. 
    var d = new Date(startDate);
    var date = d.getDate();
    var month = d.toLocaleDateString(undefined, { month: 'short' });
    var year = d.getFullYear();
    var dates = date + " " + month + " " + year;

    var countDownTimerText = document.getElementById("countdown-timer-text");
  
    if (str === "regDate") {
      countDownTimerText.innerHTML = `Start date: ${dates}`;
      countDownTimerText.classList.remove('late');
    } else {
      countDownTimerText.innerHTML = `Late registration closes in`;
      countDownTimerText.classList.add('late');
    }
  }
  
  // function to calculate time of distance
  function countTime(distance, str) {
    var days;
    var hours;
    if (str === "regDate") {
      days = Math.ceil(distance / (1000 * 60 * 60 * 24));
      hours = Math.ceil((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    } else {
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
    return { days, hours, minutes, seconds };
  }
  
  // clear the timer and text 
  function clearTimer() {
    document.getElementById("countdown-timer-text").innerHTML = "";
    document.getElementById("countdown-timer-counter").innerHTML = "";
  }
  
  // calculate distance to start or registration date
  function calcDistance(date) {
    var now = new Date().getTime();
    return (date - now);
  }