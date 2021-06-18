const socket = io();

const productosForm = document.getElementById("productos-form");
const mensajesForm = document.getElementById("mensajes-form");


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

const renderChat = (chatArr, chatContainerSelector) => {
  const chatContainer = document.querySelector(chatContainerSelector)

  let chatHTML = ''

  if(chatArr.error) {
    chatHTML = `
    <div class="alert alert-danger" role="alert">
      Error: ${chatArr.error}
    </div>`
  } else {

    chatHTML = chatArr.map(({email, message, date}) => `
      <div class="single-chat">
        <p><span class="email">${email}</span> [<span class="date">${new Date(date).toLocaleString()}</span>] : <span class="message">${message}</span></p>
      </div>
    `).join('')
  }

  chatContainer.innerHTML = chatHTML
}


socket.on("productos", (data) => {
  generateList(data, "#list-container");
});
socket.on("mensajes", (data) => {
  renderChat(data, '#chat-container')
});




productosForm.addEventListener("submit", () => {
  socket.emit("actualizacion");
});

mensajesForm.addEventListener("submit", (e) => {
  e.preventDefault();


  socket.emit("message", {
    email: e.target.elements['chat-email'].value,
    message: e.target.elements['chat-text'].value,
    date: Date.now()
  });

  e.target.elements['chat-text'].value = ''

});