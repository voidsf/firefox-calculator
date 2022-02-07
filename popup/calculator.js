var storedValue = NaN;
var currentOperation = " ";
var displayValue = 0;
var decimalPoint = false;

var memory = 0;


var display = document.getElementById("currentValue");
var prevDisplay = document.getElementById("opValue");

var maxLength = 8;

function updateValue(e) {
    if (displayValue == "0"){
        displayValue = e.target.innerHTML.trim();
    }
    else{
        displayValue += e.target.innerHTML.trim();
    }

    updateDisplay();
}

function operation(e) {
    if (currentOperation != " " && !e.target.innerHTML.includes("=")){
        var temp = displayValue;
        displayValue = calculate(storedValue, temp, currentOperation);
        storedValue = temp;
    }

    var newValue = 0;
    if (e.target.id == "divide") {
        currentOperation = "&divide;";
    }
    
    else if (e.target.id == "multiply"){
        currentOperation = "x";
    }
    else if (e.target.id == "subtract"){
        currentOperation = "-";
    }
    else if (e.target.id == "add" ){
        currentOperation = "+";
    }
    else if (e.target.innerHTML.includes("=")){
        newValue = calculate(storedValue, displayValue, currentOperation);
        currentOperation = " ";
    } 

    storedValue = displayValue;
    displayValue = newValue;
    decimalPoint = false;

    updateDisplay()
}

function calculate(val1, val2, operation){
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);
    if (operation == "&divide;"){
        return val1/val2;
    }
    else if (operation == "x"){
        return val1 * val2;
    }
    else if (operation == "-"){
        return val1 - val2;
    }
    else if (operation == "+"){
        return val1 + val2;
    }
    return 0;
}

function modify(event){
    if (event.target.id == "ce"){
        storedValue = 0;
        displayValue = 0;
        currentOperation = " ";
    }
    else if (event.target.id == "c"){
        displayValue = 0;
    }
    else if (event.target.id == "ms"){
        memory = displayValue;
    }
    else if (event.target.id == "mr"){
        displayValue = memory;
    }

    updateDisplay();
}

function updateDisplay(){
    display.innerHTML = displayValue.toString().slice(-8);
    prevDisplay.innerHTML = storedValue.toString().slice(-8) + " " + currentOperation.toString();
}

function listenForClicks() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("num")){
            updateValue(e);
        }
        else if (e.target.classList.contains("operation")){
            operation(e);
        }
        else if (e.target.classList.contains("point")){
            if (!decimalPoint){
                displayValue += ".";
                decimalPoint = true;
                updateDisplay();
            }
        }
        else if (e.target.classList.contains("mod")){
            modify(e);
        }
    });
}

listenForClicks()