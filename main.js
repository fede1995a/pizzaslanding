//Cosas para el render de las pizzas
const categoria = document.getElementById("categorias");
const populares = document.getElementById("populares");
const recomendados = document.getElementById("recomendados");

//Cosas del carrito
const cartContainer = document.getElementById("cartContainer");
const openCart = document.getElementById("openBtn");
const closeCart = document.getElementById("closeBtn");
const listContainer = document.getElementById("lista-container");
const subTotal = document.getElementById("subtotal");
const envio = document.getElementById("envio");
const total = document.getElementById("total");
const comprarBtn = document.getElementById('comprarBtn')

//Array para el carrito
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        cartListAdder()
    }
})
//Condicional para mostrar mensaje de carrito vacio
if (carrito.length == 0) {
  listContainer.innerHTML = `
    <p>Carrito vacio</p>
    `;
}

//ForEach para renderizar HTML de los Recomendados
recomendadosArray.forEach((pizzaRecomendada) => {
  const div = document.createElement("div");
  div.classList.add("recomendado");

  div.innerHTML = `
    <img src="${pizzaRecomendada.imagen}" alt="${pizzaRecomendada.nombre}">
        <div class="text__box">
        <span class="nombre">${pizzaRecomendada.nombre}</span>
        <span class="descripcion">${pizzaRecomendada.descripcion}</span>
        <span class="precio">$${pizzaRecomendada.precio}</span>
        </div>
        <input type="submit" value="Agregar" class="submit__recomendados" id="add${pizzaRecomendada.nombre}">
    `;
  recomendados.appendChild(div);

  const add = document.getElementById(`add${pizzaRecomendada.nombre}`);

  add.addEventListener("click", () => addToCart1(pizzaRecomendada.nombre));
});

//Funcion para agregar al carrito las pizzas recomendadas
const addToCart1 = (pizzaName) => {

  const pizza = recomendadosArray.find((pizza) => pizza.nombre === pizzaName);
  carrito.push(pizza);
  cartListAdder();
  console.log(carrito);
};

//ForEach para renderizar HTML de las Categorias
categoriaArray.forEach((categoriaPizza) => {
  const div = document.createElement("div");
  div.classList.add("categoria");

  div.innerHTML = `
    <img src="${categoriaPizza.imagen}" alt="">
     <h3>${categoriaPizza.nombre}</h3>
     <span></span>
    `;
  categoria.appendChild(div);
});

//ForEach para renderizar HTML de loas Populares
popularesArray.forEach((popularesPizza) => {
  const div = document.createElement("div");
  div.classList.add("popular");

  div.innerHTML = `
    <img src="${popularesPizza.imagen}" alt="">
        <div class="box">
          <div class="text__box">
            <h2 class="nombre">${popularesPizza.nombre}</h2>
            <spam class="descripcion">${popularesPizza.descripcion}</spam>
            <span class="precio"> $ ${popularesPizza.precio}</span>
          </div>
          <input type="submit" value="Agregar" id="add${popularesPizza.nombre}">
        </div>
    `;
  populares.appendChild(div);

  const add = document.getElementById(`add${popularesPizza.nombre}`);

  add.addEventListener("click", () => addToCart2(popularesPizza.nombre));
});

//Funcion para agregar al carrito las pizzas populares
const addToCart2 = (pizzaName) => {
  const pizza = popularesArray.find((pizza) => pizza.nombre === pizzaName);
  carrito.push(pizza);
  cartListAdder();
  console.log(carrito);
};

//Eventos para abrir y cerrar el carrito
openCart.addEventListener("click", () =>
  cartContainer.classList.remove("hidden")
);
closeCart.addEventListener("click", () =>
  cartContainer.classList.add("hidden")
);

//Funcion para eliminar productos del carrito
const cartListDeleter = (pizzaName) => {
  const pizza = carrito.find((pizza) => pizza.nombre === pizzaName);
  const index = carrito.indexOf(pizza);
  carrito.splice(index, 1);
  cartListAdder();
};

const cartListAdder = () => {
  listContainer.innerHTML = "";


  //Condicional para mostrar mensaje de carrito vacio
if (carrito.length == 0) {
    listContainer.innerHTML = `
      <p>Carrito vacio</p>
      `;
  }

  carrito.forEach((pizzas) => {
    const div = document.createElement("div");
    div.classList.add("recomendado");

    div.innerHTML = `
                <img src="${pizzas.imagen}" alt="imagen">
                <div class="text__box">
                    <span class="nombre">${pizzas.nombre}</span>
                    <span class="descripcion">${pizzas.descripcion}</span>
                    <span class="precio">$ ${pizzas.precio}</span>
                </div>
                <div class="contador">
                    <button class="btn-disminuir">-</button>
                    <span class="cantidad">1</span>
                    <button class="btn-aumentar">+</button>
                    <button onclick="cartListDeleter(${carrito.indexOf(
                      pizzas.nombre
                    )})"><i class="deleteBtn fa-solid fa-trash-can"></i></button>
                </div>
        `;
    listContainer.appendChild(div);

    localStorage.setItem('carrito', JSON.stringify(carrito))
  });

  total.innerText = `$${carrito.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.precio), 0)}`;
  subTotal.innerText = `$${carrito.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.precio), 0)}`;

  if (carrito.length === 0) {
    envio.innerText = ""
    comprarBtn.classList.add('hidden')
  } else{
    envio.innerHTML = "Gratis"
    comprarBtn.classList.remove('hidden')
  }

};