const socket = io();
const { denormalize, schema } = normalizr;

const productosForm = document.getElementById("productos-form");
const mensajesForm = document.getElementById("mensajes-form");
const welcomeMessageSpan = document.querySelector("#welcome-message span")


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

    chatHTML = chatArr.map((message) => `
      <div class="single-chat">
        <p><span class="email">${message._doc.author.id}</span> [<span class="date">${new Date(message._doc.date).toLocaleString()}</span>] : <span class="message">${message._doc.text}</span></p>
      </div>
    `).join('')
  }

  chatContainer.innerHTML = chatHTML
}



const cookies = document.cookie.split('; ').reduce((prev, current) => {
  const [name, ...value] = current.split('=');
  prev[name] = value.join('=');
  return prev;
}, {});

welcomeMessageSpan.innerHTML = cookies.userLogged



socket.on("productos", (data) => {
  generateList(data, "#list-container");
});
socket.on("mensajes", (data) => {
  const usersSchema = new schema.Entity('users', {}, {idAttribute: 'email'})
  const messageSchema = new schema.Entity('messages', {
      author: usersSchema
  }, {idAttribute: 'date'})
  const messagesSchema = new schema.Entity('all_messages', {
      messages: [messageSchema]
  }, {idAttribute: "id"})
  const denormalizedData = denormalize(data.result, messagesSchema, data.entities)


  const sizeAfterNormalization = JSON.stringify(data).length
  const sizeAfterDenormalization = JSON.stringify(denormalizedData).length
  const compressionRate = Math.ceil(100 - (sizeAfterDenormalization * 100 / sizeAfterNormalization))


  document.querySelector("#compression-rate").innerHTML = compressionRate


  renderChat(denormalizedData.messages, '#chat-container')

});




productosForm.addEventListener("submit", () => {
  socket.emit("actualizacion");
});

mensajesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formElements = e.target.elements


  socket.emit("message", {
    author: {
      id: formElements['chat-email'].value,
      nombre: formElements['chat-name'].value,
      apellido: formElements['chat-last-name'].value,
      edad: formElements['chat-age'].value,
      alias: formElements['chat-nickname'].value,
      avatar: formElements['chat-avatar'].value
    },
    text: formElements['chat-text'].value,
    date: Date.now()
  });

  formElements['chat-text'].value = ''

});