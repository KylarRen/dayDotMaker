var dayDotList = []

dayDotList.push(document.getElementById("12hours"));
dayDotList.push(document.getElementById("24hours"));
dayDotList.push(document.getElementById("2days"));
dayDotList.push(document.getElementById("3days"));
dayDotList.push(document.getElementById("5days"));
dayDotList.push(document.getElementById("1week"));
dayDotList.push(document.getElementById("2weeks"));
dayDotList.push(document.getElementById("30days"));


for(i=0;i<dayDotList.length;i++){

    dayDotList[i].innerHTML = "hello " + i;

}