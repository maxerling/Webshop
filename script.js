function arrayToCart() {
  const cartEl = document.getElementById("userCart");
  inCart = JSON.parse(localStorage.getItem("savedData"));
  let sum = 0;
  for (let i = 0; i < inCart.length; i++) {
    cartEl.innerHTML += `<tr class="item"><th scope="row"><img src="${inCart[i].img}" alt="image of ${inCart[i].prdName}" /></th>
        <td>${inCart[i].prdName}</td>
        <td>
          <div class="number-input md-number-input">
            <button class="btn btn-secondary minus">-</button>
            <input
              class="quantity text-center disabled noselect"
              min="1"
              name="quantity"
              value="${inCart[i].quantity}"
              type="number"
              readonly 
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
        </td></tr>`;
  }

  const sumEl = document.getElementById("summary");
  const minusEl = document.getElementsByClassName("minus");
  const plusEl = document.getElementsByClassName("plus");
  const binEl = document.getElementsByClassName("bin");

  const statusEl = document.getElementById("status");

  console.log(minusEl);
  console.log(inCart);
  addEventToCartButtons(minusEl, plusEl, binEl, sumEl, statusEl);

  const nextEl = document.getElementById("next");
  nextEl.addEventListener("click", () => {
    if (inCart.length != 0) {
      statusEl.removeAttribute("disabled");
    }
  });

  const submitEl = document.getElementById("submit");
  submitEl.addEventListener("click", () => {
    return validateForm();
  });

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
  let inCart = new Array();
  console.log(inCart);

  if (null != JSON.parse(localStorage.getItem("savedData"))) {
    inCart = JSON.parse(localStorage.getItem("savedData"));
  }
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

      console.log(inCart + " ddd");
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

function addEventToCartButtons(minusEl, plusEl, binEl, sumEl, statusEl) {
  for (let i = 0; i < minusEl.length; i++) {
    minusEl[i].addEventListener("click", () => {
      statusEl.setAttribute("disabled", "disabled");
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
      statusEl.setAttribute("disabled", "disabled");
      let field = plusEl[i].parentNode.querySelector("input[type=number]");
      let currentValue = field.getAttribute("value");
      field.setAttribute("value", Number(currentValue) + 1);
      inCart[i].quantity = Number(currentValue) + 1;
      localStorage.setItem("savedData", JSON.stringify(inCart));

      sum = getSum();
      sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
    });

    binEl[i].addEventListener("click", (e) => {
      statusEl.setAttribute("disabled", "disabled");
      let thEl = binEl[i].parentNode.parentNode;
      thEl.innerHTML = "";
      inCart.splice(i, 1);
      localStorage.setItem("savedData", JSON.stringify(inCart));

      sum = getSum();
      sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
      arrayToCart();
    });
  }
}

function validateForm() {
  const nameField = document.getElementById("nameInput");
  const numberField = document.getElementById("numberInput");
  const emailField = document.getElementById("emailInput");
  const addressField = document.getElementById("addressInput");

  const nameRep = document.getElementById("nameResponse");
  const numberRep = document.getElementById("numberResponse");
  const emailRep = document.getElementById("emailResponse");
  const addressRep = document.getElementById("addressResponse");

  let txt;
  /*
  NAME
    NOT EMPTY
    ONLY LETTERS
  NUMBER
    NOT EMPTY
    ONLY NUMBERS

  EMAIL
    NOT EMPTY
    NEEDS @

  ADDRESS
    NOT EMPTY
  
  */
  if (nameField.value === "") {
    txt = "Required field!";
    nameRep.innerHTML = txt;
    nameField.setCustomValidity(txt);
    nameField.reportValidity();
  } else if (!nameCheck(nameField.value)) {
    txt = "Only letters are allowed";
    nameRep.innerHTML = txt;
    nameField.setCustomValidity(txt);
    nameField.reportValidity();
  } else if (nameCheck(nameField.value)) {
    nameRep.innerHTML = "";
    nameField.setCustomValidity("");
    nameField.reportValidity();
  }

  if (numberField.value === "") {
    txt = "Required field!";
    numberRep.innerHTML = txt;
    numberField.setCustomValidity(txt);
    numberField.reportValidity();
  } else {
    numberField.setCustomValidity("");
    numberField.reportValidity();
  }

  if (emailField.value === "") {
    txt = "Required field!";
    emailRep.innerHTML = txt;
    emailField.setCustomValidity(txt);
    emailField.reportValidity();
  } else {
    emailField.setCustomValidity("");
    emailField.reportValidity();
  }

  if (addressField.value === "") {
    txt = "Required field!";
    addressRep.innerHTML = txt;
    addressField.setCustomValidity(txt);
    addressField.reportValidity();
  } else {
    addressField.setCustomValidity("");
    addressField.reportValidity();
  }
}

function nameCheck(name) {
  console.log(name.match(/^[a-zA-ZäöåÄÖÅ]+$/));
  if (name.match(/^[a-zA-ZäöåÄÖÅ]+$/)) {
    return true;
  }

  return false;
}

function numCheck(number) {}

/*
Prodcuts updates everytime you visit index, which makes it not possible to add more products !FIXED!
Sum price !FIXED!

removeFromCart() !FIXED!

-- and ++ Cart, change sum value and update array !FIXED!

Next stage Cart, enable fieldset !FIXED!
Pressing cart options will disable fieldset !FIXED!

adding procduct[n+1] and product[n] removing both when removing procduct[n+1] deletes both
procduct[n+1] and product[n] -- product[n] works !FIXED!


Valdidate fields



Confirmation message



fieldRespone, removed when fieldset is disabled
*/
