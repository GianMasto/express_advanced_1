const socket = io();

const form = document.getElementById("productos-form");

const generateList = (productsArray, listContainerSelector) => {
  console.log(productsArray);

  const listContainer = document.querySelector(listContainerSelector);

  let listHTML = "";

  if (productsArray.error) {
    listHTML = `
    <div class="alert alert-warning" role="alert">
      ${productsArray.error}
    </div>
    `;
  } else {
    let productRows = productsArray
      .map(
        (producto) =>
          `
          <tr>
            <td>${producto.title}</td>
            <td>$${producto.price}</td>
            <td><img src="${producto.thumbnail}" style="width:50px;height:50px;object-fit:contain;object-position:center;"></td>
          </tr>
        `
      )
      .join("");

    listHTML = `
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Foto</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>
    `;
  }

  listContainer.innerHTML = listHTML;
};

socket.on("productos", (data) => {
  generateList(data, "#list-container");
});

form.addEventListener("submit", () => {
  socket.emit("actualizacion");
});
