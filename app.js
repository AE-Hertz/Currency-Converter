const BASE_URL = "https://v6.exchangerate-api.com/v6/fee78ca102e5fe36a03d11be/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

document.addEventListener("load", () => {
    updateExchangeRate();
} );

for(let select of dropdowns){
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue <1 ){
        amountValue = 1;
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`; 
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    //console.log(response);
    //console.log(rate);

    let finalAmount = (amountValue * rate).toFixed(4) ;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    gettingOldData(toCurr.value);
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    //console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

button.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

document.addEventListener("change", () => {
    updateExchangeRate();
});







// ---------------- FAILED ATTEMPT TO MAKE GRAPH LIKE MICROSOFT WINDOWS WIDGET ---------------- no documentation nothing 

// //https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_R4uWedmnOHlKKDoARiB5AmXJalNypQEAcR5ZYvwW

// function getRandomDate() {
//     const startYear = 2001;
//     const endYear = 2023;

//     // Generate a random year between startYear and endYear
//     const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

//     // Generate a random month between 0 and 11 (JavaScript Date months are zero-indexed)
//     const month = Math.floor(Math.random() * 12);

//     // Generate a random day for the month and year
//     const day = Math.floor(Math.random() * (new Date(year, month + 1, 0).getDate())) + 1;

//     // Format the date as YYYY-MM-DD
//     const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

//     return formattedDate;
// }
// const randomDate = getRandomDate();



// // Chart making
// const ctx = document.getElementById('myChart');

// async function gettingOldData(toCurr){

//     console.log(toCurr);
//     console.log(randomDate);



//     const apiURL = `https://api.currencybeacon.com/v1/historical?api_key=ZJfASERqMEMQIfv3w6cFzXW9srQc56mx&base=${toCurr}&date=${randomDate}`;

//     const response = await fetch(apiURL)
//     const lineChartData = await response.json()

//     //console.log(response);
    
//     const rate1 = lineChartData.rates.map( (x) => x.response.rate )
//     console.log(rate1);
// }


// // function createChart(data){
// //     console.log(data);
// // new Chart(ctx, {
// // type: 'line',

// // data: {
// //     labels: [] ,
// //     datasets: [{
// //         label: '# of Votes',
// //         data: [12, 19, 3, 5, 2, 3],
// //         borderWidth: 1
// //     }]
// // },
// // options: {
// //     scales: {
// //         y: {
// //         beginAtZero: true
// //         }
// //         }
// //     }
// // });
// // }