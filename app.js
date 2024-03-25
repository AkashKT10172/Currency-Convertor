const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
console.log(fromCurr.innerText);
for(let select of  dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
}
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
const updateExchange = async () => {
    let eurr = await fetch(URL);
    let eurJ = await eurr.json();
    const fromCurrL = fromCurr.value.toLowerCase();
    const toCurrL = toCurr.value.toLowerCase();
    let fromV = eurJ.eur[fromCurrL];
    let toV = eurJ.eur[toCurrL];
    console.log(fromV);
    console.log(toV);
    let amount = document.querySelector(".amount input");
    let amnt = amount.value;
    if(amnt=="" || amnt<1) {
        amnt = 1;
        amount.value = 1;
    }
    msg.innerText = `${amnt} ${fromCurr.value} = ${toV/fromV * amnt} ${toCurr.value}`;
}
btn.addEventListener(("click"), (evt) => {
    evt.preventDefault();
    updateExchange();
})
window.addEventListener(("load"), () => {
    updateExchange();
})