/*
Зробити програму з навігаційним меню яке буде показувати один з варіантів. 

Курс валют НБУ з датою на який день, 

героїв зоряних війн, 

список справ з https://jsonplaceholder.typicode.com/ 
//виводити які з можливістю редагування при натискані 
*/
let button1 = false;
let button2 = false;
let button3 = false;
let button4 = false;
let button5 = false;
let button6 = false;

const req = async (url) => {
  document.querySelector(".box_loader").classList.add("show");
  const data = await fetch(url);
  return await data.json();
};

const nav = document.querySelector(".nav").addEventListener("click", (e) => {
  if (e.target.dataset.link === "nbu") {
    req(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    ).then((info) => {
      show(info);
    });
  } else if (e.target.dataset.link === "todo") {
    req("https://jsonplaceholder.typicode.com/todos").then((info) => {
      show(info);
    });
  } else if (e.target.dataset.link === "star") {
  

    req("https://swapi.dev/api/planets/").then((info) => {
      show(info);
      button1 = true;
      document.querySelector("#page1").classList.add("active");
    });

    let div = document.createElement("div");
    document.body.append(div);
    div.classList.add("pagination");

    let button1 = createNode("button");
    button1.classList.add("btn");
    button1.innerHTML = "1";
    button1.setAttribute("id", "page1");
    button1.classList.add("active");
    append(div, button1);

    let button2 = createNode("button");
    button2.classList.add("btn");
    button2.innerHTML = "2";
    button2.setAttribute("id", "page2");
    append(div, button2);

    let button3 = createNode("button");
    button3.classList.add("btn");
    button3.innerHTML = "3";
    button3.setAttribute("id", "page3");
    append(div, button3);

    let button4 = createNode("button");
    button4.classList.add("btn");
    button4.innerHTML = "4";
    button4.setAttribute("id", "page4");
    append(div, button4);

    let button5 = createNode("button");
    button5.classList.add("btn");
    button5.innerHTML = "5";
    button5.setAttribute("id", "page5");
    append(div, button5);

    let button6 = createNode("button");
    button6.classList.add("btn");
    button6.innerHTML = "6";
    button6.setAttribute("id", "page6");
    append(div, button6);



    const btn1 = document.querySelector("#page1");
    const btn2 = document.querySelector("#page2");
    const btn3 = document.querySelector("#page3");
    const btn4 = document.querySelector("#page4");
    const btn5 = document.querySelector("#page5");
    const btn6 = document.querySelector("#page6");

    let [...buttonEl] = document.querySelectorAll(".pagination button");



    buttonEl.forEach((button) => {
      button.addEventListener("click", () => {
        let active = document.querySelector(".pagination button.active");
        if (active) {
          active.classList.remove("active");
        }

        btn1.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=1").then((info) => {
            show(info);

            active = btn1;
            btn1.classList.add("active");
          });
        });

        btn2.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=2").then((info) => {
            show(info);

            active = btn2;
            btn2.classList.add("active");
          });
        });

        btn3.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=3").then((info) => {
            show(info);

            active = btn3;
            btn3.classList.add("active");
          });
        });

        btn4.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=4").then((info) => {
            show(info);

            active = btn4;
            btn4.classList.add("active");
          });
        });

        btn5.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=5").then((info) => {
            show(info);

            active = btn5;
            btn5.classList.add("active");
          });
        });

        btn6.addEventListener("click", () => {
          req("https://swapi.dev/api/planets/?page=6").then((info) => {
            show(info);

            active = btn6;
            btn6.classList.add("active");
          });
        });
      });
    });
   

  } else {
  }
});


function show(data = []) {
  console.log(data);

  const star = data.results;
  console.log(star);

  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  if (star) {
    const starArr = star.map(({ name, terrain, population }, i) => {
      return {
        id: i + 1,
        name: name,
        info1: terrain,
        info2: population,
      };
    });
    starArr.forEach(({ name, id, info1, info2 }) => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
                  <tr> 
                  <td>${id}</td>
                  <td>${name}</td>
                  <td>${info1}</td>
                  <td>${info2}</td>
                  </tr>
                  `
      );
    });
  } else {
    const newArr = data.map(
      ({ txt, rate, exchangedate, title, completed }, i) => {
        return {
          id: i + 1,
          name: txt || title,
          info1: rate || completed,
          info2: exchangedate || "тут пусто",
        };
      }
    );

    newArr.forEach(({ name, id, info1, info2 }) => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr> 
        <td>${id}</td>
        <td>${name}</td>
        <td>${info1}</td>
        <td>${info2}</td>
        </tr>
        `
      );
    });
  }

  document.querySelector(".box_loader").classList.remove("show");
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
