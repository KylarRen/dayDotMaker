const now = new Date();

var dayDots = [];

const idOfDayDots = [

    ["twelveHours",12],
    ["twentyFourHours",24],
    ["twoDays",48],
    ["threeDays",72],
    ["fiveDays",120],
    ["oneWeek",168],
    ["twoWeeks",336],
    ["thirtyDays",720]

];

function setColor(elem, date) {

    if (elem) {

        const day = date.getDay();
       
        switch (day) {

            case 0: // Sunday
                elem.style.backgroundColor = "black"; 
                elem.style.color = "white"; 
                break;  

            case 1: // Monday
                elem.style.backgroundColor = "blue"; 
                elem.style.color = "white";
                break;

            case 2: // Tuesday
                elem.style.backgroundColor = "yellow"; 
                break;

            case 3: // Wednesday
                elem.style.backgroundColor = "red"; 
                break;

            case 4: // Thursday
                elem.style.backgroundColor = "brown"; 
                break;

            case 5: // Friday
                elem.style.backgroundColor = "green"; 
                break;

            case 6: // Saturday
                elem.style.backgroundColor = "orange"; 
                break;
                
            default:
                elem.style.backgroundColor = "purple"; 
                break;  

        }

    }


}

function formatDate(date) {

    if(isNaN(date) || date == null){

        new Error("Invalid date");
        return;

    }

    else{

        const options = {

            month: 'numeric',     // e.g., "01"
            day: 'numeric',    // e.g., "16"
            hour: '2-digit',   // e.g., "08"
            minute: '2-digit'  // e.g., "05"

        };

        return date.toLocaleString(undefined, options);

    }

}


function getDayOfWeek(date) {
   
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];

}

function addHours(date, hours) {

    const dateCopy = new Date(date.getTime());
    dateCopy.setHours(date.getHours() + hours);

    if(dateCopy.getMinutes()>20 && dateCopy.getMinutes()<50){

        dateCopy.setMinutes(30);

    } 
    else if(dateCopy.getMinutes()>=50){

        dateCopy.setMinutes(0);
        dateCopy.setHours(dateCopy.getHours()+1);

    } else {

        dateCopy.setMinutes(0);

    }

    return dateCopy;

}

for (let i = 0; i < idOfDayDots.length; i++) {

    const elem = document.getElementById(idOfDayDots[i][0]);
    
    if (elem) {
    
        dayDots.push(elem.innerHTML);
    
    }

}

function updateDayDots() {

    const now = new Date();

    for (let i = 0; i < idOfDayDots.length; i++) {

        var newTime = addHours(now, idOfDayDots[i][1]);

        const elem = document.getElementById(idOfDayDots[i][0]);

        if (elem) {

            if (i !== 0) {

                if(newTime.getHours() > 21){

                    newTime.setHours(21);
                    newTime.setMinutes(0);

                }

                elem.innerHTML = dayDots[i] + "<br>" + getDayOfWeek(newTime) + "<br>" + formatDate(newTime);

            }

            else {
               
                if(newTime.getDay() > now.getDay()){
;
                    newTime.setHours(21);
                    newTime.setMinutes(0);
                    newTime.setHours(newTime.getHours() -24);

                }

                else if(newTime.getDay() !== now.getDay() && newTime.getDay() == 0){

                    newTime.setHours(21);
                    newTime.setMinutes(0);
                    newTime.setHours(newTime.getHours() -24);
                    
                }

                elem.innerHTML = dayDots[i] + "<br>" + getDayOfWeek(newTime) + "<br>" + formatDate(newTime);

            }       

        }
        
        setColor(elem,newTime);
    
    }
}

// Ensure DOM is fully loaded before initial calls
document.addEventListener("DOMContentLoaded", () => {

    updateDayDots();
    scheduleNextUpdate();

});

function scheduleNextUpdate() {

    document.addEventListener("DOMContentLoaded", () => {

        const now = new Date();
        var nextUpdate = 100;

        if (now.getHours() > 21) {

            nextUpdate = (24 * 60 * 60 * 1000) - (now.getHours() * 60 * 60 * 1000) - (now.getMinutes() * 60 * 1000) - (now.getSeconds() * 1000) + 500;

        }

        else if (now.getMinutes() > 20 && now.getMinutes() < 50) {

            nextUpdate = (50 * 60 * 1000) + 500 - (now.getMinutes() * 60 * 1000);

        }

        else if(now.getMinutes() >= 50){

            nextUpdate = (60 * 60 * 1000) - (now.getMinutes() * 60 * 1000) + 500;

        }

        else if(now.getMinutes() < 20){

            nextUpdate = (20 * 60 * 1000) - (now.getMinutes() * 60 * 1000) + 500;

        }

        else{

            nextUpdate = 100;

        }

        console.log("Next update in: " + nextUpdate + "ms");

        setInterval(() => {

            console.log("Updating day dots..." + nextUpdate);
            updateDayDots();

        }, nextUpdate); // Update every 60 seconds
    });
}

// Initial call
scheduleNextUpdate();
