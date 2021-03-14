let inCart = new Array();

function arrayToCart() {
  const cartEl = document.getElementById("userCart");
  inCart = JSON.parse(localStorage.getItem("savedData"));
  let sum = 0;
  for (let i = 0; i < inCart.length; i++) {
    cartEl.innerHTML += `<tr class="item">
        <th scope="row"><img src="${inCart[i].img}" alt="image of ${inCart[i].prdName}" /></th>
        <td>${inCart[i].prdName}</td>
        <td>
          <div class="number-input md-number-input">
            <button class="btn btn-secondary minus">-</button>
            <input
              class="quantity text-center"
              min="1"
              name="quantity"
              value="${inCart[i].quantity}"
              type="number"
            />
            <button class="btn btn-secondary plus">+</button>
          </div>
        </td>
        <td>${inCart[i].prdPrice}$</td>
        <td class="bin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </td>
      </tr>`;
  }

  const sumEl = document.getElementById("summary");

  let minusEl = document.getElementsByClassName("minus");
  let plusEl = document.getElementsByClassName("plus");
  let binEl = document.getElementsByClassName("bin");

  for (let i = 0; i < minusEl.length; i++) {
    minusEl[i].addEventListener("click", () => {
      let field = minusEl[i].parentNode.querySelector("input[type=number]");
      let currentValue = field.getAttribute("value");
      if (currentValue > 1) {
        field.setAttribute("value", Number(currentValue) - 1);
        inCart[i].quantity = Number(currentValue) - 1;

        localStorage.setItem("savedData", JSON.stringify(inCart));

        sum = getSum();
        sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
      }
    });

    plusEl[i].addEventListener("click", () => {
      let field = plusEl[i].parentNode.querySelector("input[type=number]");
      let currentValue = field.getAttribute("value");
      field.setAttribute("value", Number(currentValue) + 1);
      inCart[i].quantity = Number(currentValue) + 1;
      localStorage.setItem("savedData", JSON.stringify(inCart));

      sum = getSum();
      sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
    });

    binEl[i].addEventListener("click", () => {
      let thEl = binEl[i].parentNode;
      while (thEl.firstChild) {
        console.log("test");
        thEl.removeChild(thEl.lastChild);
      }

      inCart.splice(i);

      localStorage.setItem("savedData", JSON.stringify(inCart));

      sum = getSum();
      sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
    });
  }

  sum = getSum();
  sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
}

let createNode = (element) => document.createElement(element);

let addClass = (element, className) => element.classList.add(className);

let append = (parent, el) => parent.appendChild(el);

const row = document.getElementById("products");
const url = "https://fakestoreapi.com/products";

function getData() {
  fetch(url)
    .then((resp) => resp.json())
    .then(createDataToHTML)
    .catch(function (error) {
      console.log(error);
    });
}

function createDataToHTML(data) {
  inCart = JSON.parse(localStorage.getItem("savedData"));
  let products = data;
  return products.map(function (products) {
    let div = createNode("div");
    addClass(div, "col-md-4");
    addClass(div, "border");
    let img = createNode("img");
    let p1 = createNode("p");
    let p2 = createNode("p");
    let p3 = createNode("p");
    let btn = createNode("button");
    addClass(btn, "btn");
    addClass(btn, "btn-primary");
    addClass(btn, "btn-sm");
    addClass(btn, "mt-2");
    addClass(btn, "mb-2");

    btn.innerHTML = `<a href="order.html" class="link-white">Buy or add</a>`;
    btn.addEventListener("click", (e) => {
      if (!inCart.some((e) => e.id === products.id)) {
        let prd = {
          id: products.id,
          img: products.image,
          prdName: products.title,
          prdPrice: products.price,
          quantity: 1,
        };

        inCart.push(prd);
      } else {
        let index = inCart.findIndex((e) => e.id === products.id);
        inCart[index].quantity++;
      }

      localStorage.setItem("savedData", JSON.stringify(inCart));
    });

    img.src = products.image;
    addClass(img, "mt-3");
    p1.innerHTML = `${products.title}`;
    p2.innerHTML = `${products.description}`;
    p3.innerHTML = `${products.price}$`;
    append(div, img);
    append(div, p1);
    append(div, p2);
    append(div, p3);
    append(div, btn);
    append(row, div);
  });
}

function removeFromCart() {}

function getSum() {
  inCart = JSON.parse(localStorage.getItem("savedData"));
  let sum = 0;
  for (let i = 0; i < inCart.length; i++) {
    sum += inCart[i].prdPrice * inCart[i].quantity;
  }
  return sum;
}

function incrementQuantity() {}

function decreasteQuantity() {
  const fieldEl = this.parentNode.querySelector("input[type=number]");
  fieldEl.value -= 1;
}

/*
Prodcuts updates everytime you visit index, which makes it not possible to add more products !FIXED!
Sum price !FIXED!

removeFromCart()

-- and ++ Cart, change sum value and update array

Next stage Cart, enable fieldset

Valdidate fields

Confirmation message
*/
