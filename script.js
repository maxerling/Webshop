let inCart = new Array();

function addToCart(productImg,productName,productPrice,cart) {
  /* Kontrollera om produkten finns i quantity
  ifall produkten finns så vill vi +1 in quantity
  i exempelvis en lista/array som uppdateras

  Annars så vill vi lägga till:
  div class="row align-items-center">
  div class="col-md-4">
  img src="$productimg" alt="">
  div class="col-md-4">$productName<>
  div class="col-md-4">Quantity: 1<>  

  sedan uppdatera array med nödvändig information

  sist med inte minst så vill vi ta allas pris och kvanitet sedan plusa in det i en let sum-variabel
  sum =+ (q*p)[0]...[n]

  sedan uppdatera sum i korgen
  
  */

  
}

function createNode(element) {
  return document.createElement(element);
}

function createNode(element) {
  return document.createElement(element);
}

function addClass(element, className) {
    return element.classList.add(className)
}

function append(parent, el) {
  return parent.appendChild(el);
}

const row = document.getElementById("products");
const url = "https://fakestoreapi.com/products";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let products = data;
    console.log(products)
    return products.map(function (products) {
      let div = createNode("div");
      addClass(div,"col-md-4")
      addClass(div,"border")
      let img = createNode("img");
      let p1 = createNode("p");
      let p2 = createNode("p");
      let p3 = createNode("p");
      let btn = createNode("button");
      addClass(btn,"btn")
      addClass(btn,"btn-primary")
      addClass(btn,"btn-sm")
      addClass(btn,"mt-2")
      addClass(btn,"mb-2")
      btn.innerHTML = "Buy or add";
      btn.addEventListener("click",addToCart(products.image,`${products.title}`,`${products.price}`,inCart))
     
      img.src = products.image;
      addClass(img,"mt-3")
      p1.innerHTML = `${products.title}`;
      p2.innerHTML = `${products.description}`
      p3.innerHTML = `${products.price}$`
      append(div, img);
      append(div, p1);
      append(div, p2);
      append(div, p3);
      append(div, btn)
      append(row, div);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
