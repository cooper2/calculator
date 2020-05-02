

console.log("lol");
const display = document.querySelector(".display");

let input = [];
let savedValue = 0;
let operation;

document.querySelectorAll(".digit").forEach(item => item.addEventListener("click", digitPress));
document.querySelectorAll(".function").forEach(item => item.addEventListener("click", funcPress));

function digitPress(e)
{
    e.target.classList.add("clicked", "done");

    setTimeout(function () { e.target.classList.remove("clicked") }, 1000);
    setTimeout(function () { e.target.classList.remove("done") }, 2000);
    
    if (input.length < 1)
    {
        display.textContent = "";
    }

    if (input.length < 9)
    {
        input.push(e.target.textContent)
        let text = input.join('');

        let div = document.createElement("div");
        div.classList.add("burn", "white");
        div.textContent = e.target.textContent;
        setTimeout(function() { div.classList.add("large") }, 0);
        display.appendChild(div);
        setTimeout(function() { div.classList.remove("burn") }, 500);
        setTimeout(function() { div.classList.remove("large") }, 500);

    }

    console.log(e.target.className);
}

function funcPress(e)
{
    let symbol = e.target.textContent;

    switch (symbol) {
        case '+':
            operation = "add";
            break;
        
        case '-':
            operation = "minus";
            break;
        
        case '/':
            operation = "divide";
            break;
        
        case '×':
            operation = "multiply";
            break;
    }
}