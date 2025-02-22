let createNode = (element) => document.createElement(element);

let addClass = (element, className) => element.classList.add(className);

let append = (parent, el) => parent.appendChild(el);

addEventToCartButton();

function getData() {
  const url = "https://webacademy.se/fakestore/";
  fetch(url)
    .then((resp) => resp.json())
    .then(createDataToHTML)
    .catch(function (error) {
      console.log(error);
    });
}

function createDataToHTML(data) {
  let inCart = new Array();

  if (null != JSON.parse(localStorage.getItem("savedData"))) {
    inCart = JSON.parse(localStorage.getItem("savedData"));
  } else {
    localStorage.setItem("savedData", JSON.stringify(inCart));
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

    addEventToBuyOrAddButton(btn, inCart, products);
    const row = document.getElementById("products");
    img.src = products.image;
    img.alt = `image of ${products.title}`;
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

function addEventToBuyOrAddButton(btn, inCart, products) {
  btn.innerHTML = "Buy or add";
  btn.addEventListener("click", () => {
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
    window.location.href = "order.html";
  });
}

function arrayToCart() {
  const cartEl = document.getElementById("userCart");
  let inCart = JSON.parse(localStorage.getItem("savedData"));
  let sum = 0;
  for (let i = 0; i < inCart.length; i++) {
    addCartElements(i, cartEl, inCart);
  }

  const sumEl = document.getElementById("summary");
  const minusEl = document.getElementsByClassName("minus");
  const plusEl = document.getElementsByClassName("plus");
  const binEl = document.getElementsByClassName("bin");

  const statusEl = document.getElementById("status");

  addEventToCartButtons(minusEl, plusEl, binEl, sumEl, statusEl, inCart);

  addEventToNextButton(statusEl);
  addEventToSubmitButton();

  sum = getSum();
  sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
}

function getSum() {
  inCart = JSON.parse(localStorage.getItem("savedData"));
  let sum = 0;
  for (let i = 0; i < inCart.length; i++) {
    sum += inCart[i].prdPrice * inCart[i].quantity;
  }
  return sum;
}

function addCartElements(i, cartEl, inCart) {
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

function addEventToCartButton() {
  const cartBt = document.getElementById("cart");
  cartBt.addEventListener("click", function () {
    window.location.href = "order.html";
  });
}

function addEventToSubmitButton() {
  const submitEl = document.getElementById("submit");
  submitEl.addEventListener("click", () => {
    if (validateForm()) {
      alert("Thanks for your order!");
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}

function addEventToNextButton(statusEl) {
  const nextEl = document.getElementById("next");
  nextEl.addEventListener("click", () => {
    if (inCart.length != 0) {
      statusEl.removeAttribute("disabled");
    }
  });
}

function addEventToCartButtons(
  minusEl,
  plusEl,
  binEl,
  sumEl,
  statusEl,
  inCart
) {
  for (let i = 0; i < minusEl.length; i++) {
    minusEl[i].addEventListener("click", () => {
      let field = minusEl[i].parentNode.querySelector("input[type=number]");
      let currentValue = field.getAttribute("value");
      if (Number(currentValue) - 1 > 0) {
        statusEl.setAttribute("disabled", "disabled");
        field.setAttribute("value", Number(currentValue) - 1);
        inCart[i].quantity = Number(currentValue) - 1;
        localStorage.setItem("savedData", JSON.stringify(inCart));
        clearInputValues();

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
      clearInputValues();

      sum = getSum();
      sumEl.innerHTML = `Sum: ${sum.toFixed(2)}$`;
    });

    binEl[i].addEventListener("click", () => {
      statusEl.setAttribute("disabled", "disabled");
      let thEl = binEl[i].parentNode.parentNode;
      thEl.innerHTML = "";
      inCart.splice(i, 1);
      localStorage.setItem("savedData", JSON.stringify(inCart));
      clearInputValues();

      arrayToCart();
    });
  }
}

function validateForm() {
  const fields = new Array();
  let validator = 0;

  const firstNameField = document.getElementById("firstNameInput");
  const lastNameField = document.getElementById("lastNameInput");
  const numberField = document.getElementById("numberInput");
  const emailField = document.getElementById("emailInput");
  const addressField = document.getElementById("addressInput");
  fields.push(firstNameField);
  fields.push(lastNameField);
  fields.push(numberField);
  fields.push(emailField);
  fields.push(addressField);

  const firstNameRep = document.getElementById("firstNameResponse");
  const lastNameRep = document.getElementById("lastNameResponse");
  const numberRep = document.getElementById("numberResponse");
  const emailRep = document.getElementById("emailResponse");
  const addressRep = document.getElementById("addressResponse");

  let txt;

  if (firstNameField.value === "") {
    txt = "Required field!";
    firstNameRep.innerHTML = txt;
    firstNameField.setCustomValidity(txt);
    firstNameField.reportValidity();
  } else if (!nameCheck(firstNameField.value)) {
    txt = "Only letters are allowed";
    firstNameRep.innerHTML = txt;
    firstNameField.setCustomValidity(txt);
    firstNameField.reportValidity();
  } else if (nameCheck(firstNameField.value)) {
    firstNameRep.innerHTML = "";
    firstNameField.setCustomValidity("");
    firstNameField.reportValidity();
    validator++;
  }

  if (lastNameField.value === "") {
    txt = "Required field!";
    lastNameRep.innerHTML = txt;
    lastNameField.setCustomValidity(txt);
    lastNameField.reportValidity();
  } else if (!nameCheck(lastNameField.value)) {
    txt = "Only letters are allowed";
    lastNameRep.innerHTML = txt;
    lastNameField.setCustomValidity(txt);
    lastNameField.reportValidity();
  } else if (nameCheck(lastNameField.value)) {
    lastNameRep.innerHTML = "";
    lastNameField.setCustomValidity("");
    lastNameField.reportValidity();
    validator++;
  }

  if (numberField.value === "") {
    txt = "Required field!";
    numberRep.innerHTML = txt;
    numberField.setCustomValidity(txt);
    numberField.reportValidity();
  } else if (!numCheck(numberField.value)) {
    txt = "Only numbers are allowed";
    numberRep.innerHTML = txt;
    numberField.setCustomValidity(txt);
    numberField.reportValidity();
  } else if (numCheck(numberField.value)) {
    numberRep.innerHTML = "";
    numberField.setCustomValidity("");
    numberField.reportValidity();
    validator++;
  }
  if (emailField.value === "") {
    txt = "Required field!";
    emailRep.innerHTML = txt;
    emailField.setCustomValidity(txt);
    emailField.reportValidity();
  } else if (!emailCheck(emailField.value)) {
    txt = "Enter a valid email";
    emailRep.innerHTML = txt;
    emailField.setCustomValidity(txt);
    emailField.reportValidity();
  } else if (emailCheck(emailField.value)) {
    emailRep.innerHTML = "";
    emailField.setCustomValidity("");
    emailField.reportValidity();
    validator++;
  }

  if (addressField.value === "") {
    txt = "Required field!";
    addressRep.innerHTML = txt;
    addressField.setCustomValidity(txt);
    addressField.reportValidity();
  } else {
    addressRep.innerHTML = "";
    addressField.setCustomValidity("");
    addressField.reportValidity();
    validator++;
  }

  if (validator === fields.length) {
    return true;
  }

  return false;
}

function nameCheck(name) {
  if (name.match(/^[a-zA-ZäöåÄÖÅ]+$/)) {
    return true;
  }

  return false;
}

function numCheck(number) {
  if (number.match(/^[0-9]+$/)) {
    return true;
  }

  return false;
}

function emailCheck(email) {
  if (email.match(/\S+@\S+\.\S+/)) {
    return true;
  }
  return false;
}

function clearInputValues() {
  const firstNameField = document.getElementById("firstNameInput");
  const lastNameField = document.getElementById("lastNameInput");
  const numberField = document.getElementById("numberInput");
  const emailField = document.getElementById("emailInput");
  const addressField = document.getElementById("addressInput");

  const firstNameRep = document.getElementById("firstNameResponse");
  const lastNameRep = document.getElementById("lastNameResponse");
  const numberRep = document.getElementById("numberResponse");
  const emailRep = document.getElementById("emailResponse");
  const addressRep = document.getElementById("addressResponse");

  firstNameField.value = "";
  firstNameRep.innerHTML = "";
  firstNameField.setCustomValidity("");
  firstNameField.reportValidity();

  lastNameField.value = "";
  lastNameRep.innerHTML = "";
  lastNameField.setCustomValidity("");
  lastNameField.reportValidity();

  numberField.value = "";
  numberRep.innerHTML = "";
  numberField.setCustomValidity("");
  numberField.reportValidity();

  emailField.value = "";
  emailRep.innerHTML = "";
  emailField.setCustomValidity("");
  emailField.reportValidity();

  addressField.value = "";
  addressRep.innerHTML = "";
  addressField.setCustomValidity("");
  addressField.reportValidity();
}
