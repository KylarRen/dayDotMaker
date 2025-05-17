const now = new Date();

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

var dayDots = [];

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

                elem.innerHTML = dayDots[i] + "<br>" + getDayOfWeek(newTime) + "<br>" + formatDate(newTime);

            }

            else {
               
                elem.innerHTML = dayDots[i] + "<br>" + getDayOfWeek(newTime) + "<br>" + formatDate(newTime);

            }       

        }
        
        setColor(elem,newTime);
    
    }
}

// Initial call
updateDayDots();

// Update every second
setInterval(updateDayDots, 1000);