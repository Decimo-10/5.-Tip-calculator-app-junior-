const input = document.querySelector(".input");
const tipWrapper = document.querySelector(".input__tip-wrapper");

const bill = document.querySelector("#bill-input");/* Bill input field */
const customTip = document.querySelector(".input__tip--field");/* Custom tip input field */
const numOfPeople = document.querySelector("#people-input");/* Number of people input field */

const outPutTexts = document.querySelectorAll(".output__amount");
const tipAmountText = outPutTexts[0];/* Tip amount result */
const totalAmountText = outPutTexts[1];/* Total amount result */

const errorMessages = document.querySelectorAll(".input__error-message");
const billErrorMessage = errorMessages[0];
const peopleErrorMessage = errorMessages[1];

const resetBtn = document.querySelector(".output__reset");

const isBillValid = () => bill.value.length >= 1 && bill.checkValidity();/* Needed the length check beacuse "checkValidity()" returns true if the field is empty */
const isCustomTipValid = () => customTip.value.length >= 1 && customTip.checkValidity();
const isNumOfPeopleValid = () => numOfPeople.value.length >= 1 && numOfPeople.checkValidity();

/* Variables needed to calculate results. Given initital value in case the user reloads the page(the values in the input fields remain even after that). */
let tipValue = customTip.value;
let billValue = bill.value;
let peopleValue = numOfPeople.value;

let prevBtn = 0;/* Variable to store reference to the last clicked button. Given initial value for the case of the first clicking where there isn't a previously clicked button. */
tipWrapper.addEventListener("click", (event) => {/* Event listener on the tip buttons' container. Because of event bubbling don't have to put listener on every button. */
     if(event.target.tagName.toLowerCase() === "button"){/* Button was clicked*/
        if(prevBtn === 0){/* First click's case */
            event.target.classList.add("active-btn");/* Indicate to the user that this is now the active button. */
            customTip.classList.remove("active-custom-tip");/* Remove active status from custom tip field */
            prevBtn = event.target;
            tipValue = event.target.value;
        } else {
            prevBtn.classList.remove("active-btn");/* Remove active status from previous button. */
            event.target.classList.add("active-btn");
            customTip.classList.remove("active-custom-tip");
            prevBtn = event.target;
            tipValue = event.target.value;
        }
    } else if(event.target === customTip){/* Custom tip input field was clicked*/
        if(prevBtn !== 0){/* If a button was previously clicked remove the active status indication class from it. */
            prevBtn.classList.remove("active-btn");
        }
        event.target.classList.add("active-custom-tip");/*  */
        tipValue = event.target.value;/* Left it here in case the user writes in the custom tip field then clicks on a tip button but after that wants to choose the custom value again.
            With this they don't have to write in the value again for the script to register it. */
    }
    result();
});


/* Bill input field*/
bill.addEventListener("keyup", () => {/* Changed event from "onchange" to "keyup. With this the user gets error message/result after every key pressed. */
    if(isBillValid()){
        billErrorMessage.style.display = "none";
    } else {
        billErrorMessage.style.display = "block";
    }
    billValue = bill.value;
    resetBtn.classList.remove("disabled");/* Makes the reset button clickable. */
    result();
});

/* Custom tip input field*/
customTip.addEventListener("keyup", () => {
    tipValue = customTip.value;
    resetBtn.classList.remove("disabled");
    result();
});

/* Number of people input field*/
numOfPeople.addEventListener("keyup", () => {
    if(isNumOfPeopleValid()){
        peopleErrorMessage.style.display = "none";
    } else {
        peopleErrorMessage.style.display = "block";
    }
    peopleValue = numOfPeople.value;
    resetBtn.classList.remove("disabled");
    result();
});

function result(){/* Checks validity of values and displays results. */
    if(isBillValid() && isNumOfPeopleValid() && (isCustomTipValid() || tipValue > 0)){
            /* The last || conditinal case: "isCustomTipValid()" if custom tip was choosen and it's valid OR fix tip button was chosen */
        totalAmountText.textContent = `$${(parseFloat(billValue) / parseFloat(peopleValue) + (parseFloat(billValue) / (100 / parseFloat(tipValue)) / parseFloat(peopleValue))).toFixed(2)}`;
        tipAmountText.textContent = `$${(parseFloat(billValue) / (100 / parseFloat(tipValue)) / parseFloat(peopleValue)).toFixed(2)}`
        
        resetBtn.classList.remove("disabled");
    }
}

function reset(prevBtn){
    bill.value = "";
    customTip.value = "";
    numOfPeople.value = "";
    tipAmountText.textContent = "$0.00";
    totalAmountText.textContent = "$0.00";
    resetBtn.classList.add("disabled");
    billErrorMessage.style.display = "none";/* Remove error message */
    peopleErrorMessage.style.display = "none";
    if(prevBtn !== 0){
        prevBtn.classList.remove("active-btn");/* Remove active status styles. */
    }
    customTip.classList.remove("active-custom-tip");/* Remove active status styles. */
}

resetBtn.addEventListener("click", () => reset(prevBtn));


