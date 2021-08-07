const button = document.querySelector(".btn");
const chest = document.querySelector(".chest");
const selector = document.querySelector(".selector");

var ctx = document.getElementById('myChart');
ctx.parentNode.style.height = '500px';
ctx.parentNode.style.width = '500px';

document.addEventListener("DOMContentLoaded", function start() {
  fetch("https://covid-193.p.rapidapi.com/countries", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5a0fac7954msh44654d1321758e8p1a8737jsn1d57f1a7bb15",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log(response.response);
      const countryNames = response.response;


      countryNames.forEach((element) => {
        const title = document.createElement("h1");
        const head = document.querySelector(".head");
        title.innerText = element;
        title.classList.add("header");
        head.appendChild(title);

        title.addEventListener("click", function () {
          window.open(
            `https://en.wikipedia.org/wiki/COVID-19_pandemic_in_${element}`
          );
      
          

        });
      });
    })
    .catch((err) => {
      console.error(err);
    });

  function getAllCountries() {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5a0fac7954msh44654d1321758e8p1a8737jsn1d57f1a7bb15",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.response);



        const countryNames = response.response;

        countryNames.forEach((element) => {
          const pullDownBar = document.querySelector(".selector");
          const options = document.createElement("option");
          options.classList.add("options");
          pullDownBar.appendChild(options);
          options.value = element;
          options.innerText = element;
          

         
          // console.log(options.value)
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getAllCountries();

  function allData() {
    fetch("https://covid-193.p.rapidapi.com/statistics?country=all", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5a0fac7954msh44654d1321758e8p1a8737jsn1d57f1a7bb15",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.response[0]);

        const totalCases = document.createElement("h1");
        const activeCases = document.createElement("h1");
        const newCases = document.createElement("h1");
        const deaths = document.createElement("h1");
        const chestChild = document.createElement("div");
        chestChild.classList.add("chest-Child");
        const countryName = document.createElement("h1");

        chest.appendChild(chestChild);
        chestChild.appendChild(countryName);
        chestChild.appendChild(newCases);
        chestChild.appendChild(activeCases);
        chestChild.appendChild(deaths);
        chestChild.appendChild(totalCases);
        countryName.innerText = `Country : ${response.response[0].country}`;
        activeCases.innerText = `Active Cases : ${response.response[0].cases.active}`;
        newCases.innerText = `New Cases : ${response.response[0].cases.new}`;
        deaths.innerText = `Total Deaths : ${response.response[0].deaths.total}`;
        totalCases.innerText = `Overall Cases : ${response.response[0].cases.total}`;

         ////Chart

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Active Cases', 'New Cases', 'Total Deaths', 'Overall Cases'],
        datasets: [{
            label: 'Covid Data',
            data: [response.response[0].cases.active, response.response[0].cases.new, response.response[0].deaths.total, response.response[0].cases.total],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

          ////Chart end
      })
      .catch((err) => {
        console.error(err);
      });
  }

  allData();
});

button.addEventListener("click", getData);

function getData() {
  const inputValue = document.getElementById("inputValue").value;

  fetch(`https://covid-193.p.rapidapi.com/statistics?country=${inputValue}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5a0fac7954msh44654d1321758e8p1a8737jsn1d57f1a7bb15",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response);

      const getCountryName = response.response[0].country;

      const getNewCases = response.response[0].cases.new;

      const activeCases = document.createElement("h1");
      const newCases = document.createElement("h1");
      const deaths = document.createElement("h1");
      const countryName = document.createElement("h1");
      const totalCases = document.createElement("h1");

      chest.removeChild(chest.firstChild);

      const newDiv = document.createElement("div");
      newDiv.classList.add("chest-Child_two");
      chest.appendChild(newDiv);
      newDiv.appendChild(countryName);
      newDiv.appendChild(newCases);
      newDiv.appendChild(activeCases);
      newDiv.appendChild(deaths);
      newDiv.appendChild(totalCases);

      countryName.innerText = `Country : ${getCountryName} `;
      newCases.innerText = `New Cases : ${getNewCases}`;
      activeCases.innerText = `Active Cases : ${response.response[0].cases.active}`;
      deaths.innerText = `Total Deaths : ${response.response[0].deaths.total}`;
      totalCases.innerText = `Overall Cases : ${response.response[0].cases.total}`;

      ////Chart

     
var myChart = new Chart(ctx, {
 type: 'bar',
 data: {
     labels: ['Active Cases', 'New Cases', 'Total Deaths', 'Overall Cases'],
     datasets: [{
         label: 'Covid Data',
         data: [response.response[0].cases.active, getNewCases, response.response[0].deaths.total, response.response[0].cases.total],
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             
             
         ],
         borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             
             
         ],
         borderWidth: 1
     }]
 },
 options: {
     scales: {
         y: {
             beginAtZero: true
         }
     }
 }
});

       ////Chart end

      ///
      // active cases
      // deaths
    })
    .catch((err) => {
      console.error(err);
    });
}

selector.addEventListener("click", function () {
  const pullDownValue = selector.value;

  fetch(
    `https://covid-193.p.rapidapi.com/statistics?country=${pullDownValue}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5a0fac7954msh44654d1321758e8p1a8737jsn1d57f1a7bb15",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response);

      const getCountryName = response.response[0].country;

      const getNewCases = response.response[0].cases.new;

      const activeCases = document.createElement("h1");
      const newCases = document.createElement("h1");
      const deaths = document.createElement("h1");
      const countryName = document.createElement("h1");
      const totalCases = document.createElement("h1");

      chest.removeChild(chest.firstChild);

      const newDiv = document.createElement("div");
      newDiv.classList.add("chest-Child_two");
      chest.appendChild(newDiv);
      newDiv.appendChild(countryName);
      newDiv.appendChild(newCases);
      newDiv.appendChild(activeCases);
      newDiv.appendChild(deaths);
      newDiv.appendChild(totalCases);

      countryName.innerText = `Country : ${getCountryName} `;
      newCases.innerText = `New Cases : ${getNewCases}`;
      activeCases.innerText = `Active Cases : ${response.response[0].cases.active}`;
      deaths.innerText = `Total Deaths : ${response.response[0].deaths.total}`;
      totalCases.innerText = `Overall Cases : ${response.response[0].cases.total}`;

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Active Cases', 'New Cases', 'Total Deaths', 'Overall Cases'],
            datasets: [{
                label: 'Covid Data',
                data: [response.response[0].cases.active, response.response[0].cases.new, response.response[0].deaths.total, response.response[0].cases.total],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    
                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    
              ////Chart end

      ///
      // active cases
      // deaths
    })
    .catch((err) => {
      console.error(err);
    });
});
