const btns = document.querySelectorAll(".button");
const display = document.getElementById("display");

btns.forEach((button) => {
    button.addEventListener('click', () =>{
        display.textContent = button.textContent;
    });
});

const operator = document.querySelectorAll('#add, #subtract, #multiply, #divide');
const num = document.querySelectorAll('#one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
const AC = document.querySelector('#AC');
const del = document.querySelector('#del');
const percent = document.querySelector('#percent');
const decimal = document.querySelector('#decimal-point');
const sd = document.querySelector('#S-D');
const signChange = document.querySelector('#sign-change');

