import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";
import { BodyPresenceSensor } from "body-presence";

// Update the clock every second.
clock.granularity = "seconds";

const myHRM = document.getElementById("myHRM");
import { HeartRateSensor } from "heart-rate";

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () =>  {
      
       myHRM.text=`${hrm.heartRate}`;
  });
 
  hrm.start();
}

if (BodyPresenceSensor) {
  const body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (!body.present) {
     myHRM.text="--"
    } else {
      
    }
  });
  body.start();
}

// Get a handle on the <text> element
const currentTime = document.getElementById("currentTime");
const myMonth = document.getElementById("myMonth");
const myDay = document.getElementById("myDay");
const theYear = document.getElementById("theYear");
const myBattery = document.getElementById("myBattery");
const myDrinkImg = document.getElementById("myDrinkImg");

//Reads the battery to tell the battery level.
myBattery.text=(Math.floor(battery.chargeLevel) + "%");
const myBatteryImg = document.getElementById("myBatteryImg");
if (battery.chargeLevel >= 76)
  {
    myBatteryImg.href = "Battery100.png"; // 76-100
  }
  else if (battery.chargeLevel >= 51)
  {
    myBatteryImg.href = "Battery75.png"; // 51-75
  }
  else if (battery.chargeLevel >= 26)
  {
    myBatteryImg.href = "Battery50.png"; // 26-50
  }
  else if (battery.chargeLevel >= 11)
  {
    myBatteryImg.href = "Battery25.png"; // 6-25
  }
  else
  {
    myBatteryImg.href = "Battery10.png";
  }

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let monthnum = today.getMonth();
  let day = today.getDate();
  let year = today.getFullYear();
  var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";  
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
  let monthname = month[monthnum];
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  currentTime.text = `${hours}:${mins}:${secs}`;
  myMonth.text = `${monthname}`;
  myDay.text = `${day}`; 
  theYear.text = `${year}`;
  if (util.zeroPad(hours) >= 19 && util.zeroPad(hours) < 23)
  {
    myDrinkImg.href = "Moonblast.png";
  }
  else if (util.zeroPad(hours) >= 15 && util.zeroPad(hours) < 19)
  {
    myDrinkImg.href = "ZenStar.png";
  }
  else if (util.zeroPad(hours) >= 11 && util.zeroPad(hours) < 15)
  {
    myDrinkImg.href = "PianoWoman.png";
  }
  else if (util.zeroPad(hours) >= 7 && util.zeroPad(hours) < 11)
  {
    myDrinkImg.href = "SunshineCloud.png";
  }
  else if (util.zeroPad(hours) >= 3 && util.zeroPad(hours) < 7)
  {
    myDrinkImg.href = "CobaltVelvet.png";
  }
  else
  {
    myDrinkImg.href = "FluffyDream.png";
  }
}
