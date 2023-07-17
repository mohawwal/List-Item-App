//Greetings
const greetingsEL = document.querySelector(".greetings")
const dayOfTheWeekEL = document.querySelector(".dayOfTheWeek")
const todaysDateEL = document.querySelector(".todaysDate")

function getGreetings() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 0 && currentHour < 12) {
        greeting = "Good <br/> Morning ";
    }else if (currentHour >=12 && currentHour < 18) {
        greeting = "Good <br/> Afternoon"
    }else {
        greeting = "Good <br/> Evening"
    }

    return greeting
}
greetingsEL.innerHTML = getGreetings()

//Days of the week
function getDayOfWeek() {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const currentDayIndex = new Date().getDay();
    return daysOfWeek[currentDayIndex]
}
const daysOfWeek = getDayOfWeek();
dayOfTheWeekEL.innerHTML =  daysOfWeek

//Month Date & Year
function getMonth() {
    const monthsOfYearList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    const currentMonthsInYear = new Date().getMonth();
    return monthsOfYearList[currentMonthsInYear]
}
const currentMonth = getMonth()
const currentDate = new Date().getDate()
const currentYear = new Date().getFullYear()
todaysDateEL.textContent = currentMonth + " " + currentDate + ", " + currentYear;




//Data file
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-5f7ca-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEL = document.querySelector(".input-field")
const addButtonEL = document.querySelector(".addButton")
const shoppingListEL = document.querySelector(".shoppingList")


addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEL.value
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEL()

})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

    clearShoppingListEL()

    for (let i=0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        

        appendItemToShoppingList(currentItem)
    }
}else {
    shoppingListEL.innerHTML = "No items here...yet"
}
    

})

function clearShoppingListEL() {
    shoppingListEL.innerHTML = ""
}

function clearInputFieldEL() {
    inputFieldEL.value = ""
}

function appendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li");
    newEL.textContent = itemValue

    newEL.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEL.append(newEL)
}


