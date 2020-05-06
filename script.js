
const display = document.querySelector(".display");

let input = [];
let inputA = "";
let inputB = "";
let operation = "none";
let operating = false; // true if an operator has been activated
let evaluated = false; // true if last user operation has been evaluated

document.querySelectorAll(".digit").forEach(item => item.addEventListener("click", digitPress));
document.querySelectorAll(".function").forEach(item => item.addEventListener("click", funcPress));
document.querySelector(".equals").addEventListener("click", eval);
document.querySelector(".decimal").addEventListener("click", digitPress);
document.querySelector(".backspace").addEventListener("click", backspace);
document.querySelector(".clear").addEventListener("click", clear);

function digitPress(e)
{
    if (evaluated)
    {
        evaluated = false;
        clear();
    }
    
    clickedEffect(e);
    
    if (input.length < 1 || display.textContent == "error" || display.textContent == "0")
    {
        display.textContent = "";
        if (e.target.className.includes("decimal"))
            display.textContent = "0";
    }
    
    if (e.target.className.includes("decimal"))
    {
        console.log("too many decimals!");
        if (input.includes(".") || display.textContent.includes("."))
            return;
    }

    input.push(e.target.textContent);
    
    if (input.length < 9 && display.textContent.length < 9)
    {
        let num = e.target.textContent;
        displayNumber(num);
    }
    else return;

    console.log(e.target.className);
}

function displayNumber(num)
{
    let div = document.createElement("div");
    div.textContent = num.toString(); 
    div.classList.add("burn", "white", "large");
    display.appendChild(div);

    setTimeout(function() { div.classList.remove("burn") }, 500);
    setTimeout(function() { div.classList.remove("large") }, 500);
}

function clear(e)
{
    if (e)
        clickedEffect(e);
    display.textContent = "0";
    operating = false;
    evaluated = false;
    input = [];
    inputA = "";
    inputB = "";

    document.querySelectorAll(".clicked").forEach( item =>
        {
            item.classList.add("done");
            item.classList.remove("clicked");
            setTimeout(function () { item.classList.remove("done") }, 2000)
        });
}

function eval(e)
{
    clickedEffect(e);

    if (operation == "none" || inputA.length == 0 || input.length == 0 )       
        return console.log(inputA.length, input.length, operation);

    if (display.textContent == "error")
        return clear();
    
    document.querySelector(".equals").classList.add("clicked");

    document.querySelectorAll(".clicked").forEach( item =>
    {

        item.classList.add("done");
        item.classList.remove("clicked");
        setTimeout(function () { item.classList.remove("done") }, 2000)
    });

    
    if (operating)
        inputB = parseFloat(input.join(''));
    else inputA = parseFloat(input.join(''));
    
    let a = parseFloat(inputA);
    let b = inputB;

    console.log(a, b);
    console.log(a);
    console.log(input.join(''));

    display.innerHTML = "";
    input = [];
    let result = "";

    switch (operation) {
        case 'add':
            result = add(a, b);
            console.log(input);
            break;
        
        case 'minus':
            result = subtract(a, b);
            break;
        
        case 'divide':
            if (b == 0)
            {
                display.innerHTML = "";
                display.textContent = "error";
                return;
            }
            else
            {
                result = divide(a, b);
                console.log("divide result", result);
            }
            break;
        
        case 'multiply':
            result = multiply(a, b);
            console.log("multiply result", result);
            break;
        
        default:
            displayNumber("");
    } 

    operating = false;

    if (result.toString().length > 7 && result % 1 !== 0)
    {
        let remainingSpace = 7 - Math.round(result).toString().length;
        if (remainingSpace < 0)
            remainingSpace = 0;
        
        result = roundDecimals(result, remainingSpace);
        result.toFixed(remainingSpace);

    }
    else if (result.toString().length > 7)
        result = result.toExponential(3);

    
    evaluated = true;
    input.push([result.toString()]);
    displayNumber(result);

}

function funcPress(e)
{
    evaluated = false;

    if (operating == true)
        return;
    
    operating = true;

    e.target.classList.add("clicked");
    let symbol = e.target.innerText;
    console.log(e.target.innerText);

    if (input.length == 0)
        inputA = "0";
    else inputA = input.join('');
    console.log("inputA is", inputA);

    input = [];

    switch (symbol) {
        case "+":
            operation = "add";
            console.log("add");
            break;
        
        case "-":
            operation = "minus";
            console.log("minus");
            break;
        
        case "/":
            operation = "divide";
            console.log("divide");
            break;
        
        case "x":
            operation = "multiply";
            console.log("multiply");
            break;
        
    }
}

function backspace()
{
    if (evaluated)
        return;

    if (display.textContent.length > 1)
    {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        input.pop();
    }
    else display.textContent = "0";

}

function clickedEffect(e)
{
    e.target.classList.add("clicked", "done");

    
    setTimeout(function () { e.target.classList.remove("clicked") }, 1000);
    setTimeout(function () { e.target.classList.remove("done") }, 2000);
}

function roundDecimals(a, b)
{
    let pow = power(10, b);
    return Math.round(a * pow) / pow;
}

function add(a, b) 
{
    console.log(a + b);
    return a + b;
}

function subtract(a, b) 
{
    return a - b;
}

function sum(...args) 
{
    const flat = args.flat();
    return reduc = flat.reduce((acc, num) => acc + num, 0);
}

function multiply(...args) 
{
    const flat = args.flat();
    return mult = flat.reduce((acc, num) => acc * num, 1);
}

function divide(...args)
{
    const flat = args.flat();
    return divided = flat.reduce((acc, num) => acc / num);
}

function power(a, b) 
{
    return Math.pow(a, b);
}

function factorial(a) 
{
    let acc = 1;
    for (let i = 1; i <= a; i++)
    {
        acc = acc * i;
    }
    return acc;
}