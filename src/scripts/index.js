// Imports
import { insertedValues } from "./valuesData.js"

// DOM Elements

const divValueSpan = document.querySelector(".div__value-span")
const ulValues = document.querySelector(".ul__values")
const radioEntrada = document.querySelector(".radio-entrada")
const modalInputValue = document.querySelector(".modal__text-input-value")
const modalCancel = document.querySelector("#cancel")
const modalInsert = document.querySelector("#insert")
const todosButton = document.querySelector("#todos")
const entradasButton = document.querySelector("#entradas")
const saidasButton = document.querySelector("#saidas")
const closeButton = document.querySelector("#close")
const inputValue = document.getElementById('modal__input')
const openModalButtons = document.querySelectorAll(".open-modal")
const dialog = document.querySelector(".modal")
const divEmpty = document.querySelector('.div__empty')

// Event Listeners

modalInsert.addEventListener("click", insertValue)
modalCancel.addEventListener("click", closeModal)
closeButton.addEventListener("click", closeModal)
todosButton.addEventListener("click", () => updateValues())
entradasButton.addEventListener("click", () => filterAndRenderValues(0))
saidasButton.addEventListener("click", () => filterAndRenderValues(1))

// Modal
openModalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    dialog.showModal()
  })
})

// Functions

// Essa função recebe um array como parâmetro e calcula a soma dos valores da propriedade
// "value" dos objetos dentro do array usando a função reduce. Em seguida, ela atualiza o 
// conteúdo do elemento "divValueSpan" com o resultado formatado em reais com duas casas 
// decimais.
function updateToCategototy(array) {
  const total = array.reduce((total, value) => total + value.value, 0)
  divValueSpan.textContent = `R$ ${total.toFixed(2)}`
}

// Essa função recebe um ID de categoria como parâmetro e filtra os valores associados a essa 
// categoria. Em seguida, ela limpa a lista de valores e cria um novo conjunto de elementos HTML 
// para cada valor filtrado, adicionando botões de seleção de categoria e de remoção. Esses 
// elementos são adicionados à lista de valores existente na página HTML. Por fim, a função chama 
// a função updateToCategototy para atualizar o valor total da categoria exibido na página.
function filterAndRenderValues(categoryID) {
  const filteredValues = filterValues(categoryID)
  ulValues.innerHTML = ""
  filteredValues.forEach((value) => {
    const li = document.createElement("li")
    li.dataset.id = value.id
    li.classList.add("li__values")
    const spanValue = document.createElement("span")
    spanValue.classList.add("span_values")
    spanValue.textContent = `R$ ${value.value.toFixed(2)}`
    li.appendChild(spanValue)
    const divButtonsSelect = document.createElement("div")
    divButtonsSelect.classList.add("div__buttons-select")
    const buttonCategory = document.createElement("button")
    buttonCategory.classList.add("button__category", "text-2-regular")
    buttonCategory.textContent = value.categoryID === 0 ? "Entrada" : "Saída"
    divButtonsSelect.appendChild(buttonCategory)
    const buttonTrash = document.createElement("button")
    buttonTrash.classList.add("button__trash")
    buttonTrash.innerHTML = '<i class="fa-solid fa-trash"></i>'
    buttonTrash.addEventListener("click", removeValue)
    divButtonsSelect.appendChild(buttonTrash)
    li.appendChild(divButtonsSelect)
    ulValues.appendChild(li)
  })
  updateToCategototy(filteredValues)
}
// A função "filterValues" recebe um parâmetro "categoryID" e verifica se é indefinido ou 
// não, retornando todos os valores inseridos se for. Caso contrário, filtra os valores 
// inseridos pelo ID da categoria.
function filterValues(categoryID) {
  if (categoryID === undefined) {
    return insertedValues
  }
  return insertedValues.filter((value) => value.categoryID === categoryID)
}

// A função updateValue atualiza o valor total das despesas ou receitas, somando todos os valores
// armazenados no array insertedValues e exibindo o resultado na tela.
function updateValue() {
  const totalValue = insertedValues.reduce((total, value) => total + value.value, 0)
  divValueSpan.textContent = `R$ ${totalValue.toFixed(2)}`
}

// A função "updateValues" atualiza a lista de valores na página HTML. Para cada valor na lista 
// "insertedValues", cria um novo elemento de lista, adiciona o valor e os botões para seleção de 
// categoria e exclusão, e, em seguida, atualiza o valor total. Por fim, adiciona esse novo 
// elemento de lista à lista HTML na página.
function updateValues() {
  ulValues.innerHTML = ""
  insertedValues.forEach((value) => {
    const li = document.createElement("li")
    li.dataset.id = value.id
    li.classList.add("li__values")
    const spanValue = document.createElement("span")
    spanValue.classList.add("span_values")
    spanValue.textContent = `R$ ${value.value.toFixed(2)}`
    li.appendChild(spanValue)
    const divButtonsSelect = document.createElement("div")
    divButtonsSelect.classList.add("div__buttons-select")
    const buttonCategory = document.createElement("button")
    buttonCategory.classList.add("button__category", "text-2-regular")
    buttonCategory.textContent = value.categoryID == 0 ? "Entrada" : "Saída"
    divButtonsSelect.appendChild(buttonCategory)
    const buttonTrash = document.createElement("button")
    buttonTrash.classList.add("button__trash")
    buttonTrash.innerHTML = '<i class="fa-solid fa-trash"></i>'
    buttonTrash.addEventListener("click", removeValue)
    divButtonsSelect.appendChild(buttonTrash)
    li.appendChild(divButtonsSelect)
    ulValues.appendChild(li)
    updateValue() 
  })
}

// A função verifica se a lista de valores inseridos está vazia e, se estiver, remove a classe 
// "hide" do elemento divEmpty, caso contrário, adiciona a classe "hide".
function noValues() {
  if (insertedValues.length === 0) {
    divEmpty.classList.remove('hide')
  } else {
    divEmpty.classList.add('hide')
  }
}

// A função "insertValue" cria um novo objeto "newValue" com os valores obtidos dos inputs do modal 
// e adiciona-o ao array "insertedValues" usando o método "push". Se o valor digitado for inválido, 
// a função exibe um alerta e retorna sem adicionar o novo objeto. Em seguida, a função atualiza a 
// lista de valores na página chamando a função "updateValues", verifica se há valores na lista 
// usando a função "noValues" e fecha o modal limpando o input.
function insertValue() {
  const value = modalInputValue.value
  const categoryID = radioEntrada.checked ? 0 : 1
  const id = insertedValues.length > 0 ? insertedValues[insertedValues.length - 1].id + 1 : 1
  const newValue = { id, value: parseFloat(value), categoryID }
  if (isNaN(value) || value === "") {
    alert("Digite um valor")
    return
  }
  insertedValues.push(newValue)
  updateValues()
  noValues()
  closeModal()
  modalInputValue.value = ""
}

// A função remove um elemento do array insertedValues e do HTML. Ela identifica o elemento a partir 
// do evento de clique, remove o elemento correspondente do array, remove o elemento correspondente 
// do HTML e atualiza a exibição dos valores e a mensagem de "nenhum valor adicionado".
function removeValue(event) {
  const li = event.target.closest("li")
  const id = parseInt(li.dataset.id) - 1
  const liIndexOfArray = [...li.parentElement.children].indexOf(li)
  insertedValues.splice(liIndexOfArray, 1)
  li.remove()
  updateValue()
  noValues()
}

// Essa função remove caracteres não-numéricos de um input, mantendo apenas os números. A função 
// verifica se o valor do input não é um número (isNaN) e, caso não seja, utiliza a função replace 
// com expressão regular para substituir todos os caracteres que não são números por uma string vazia.
function removeNotNumber(input) {
  if (isNaN(input.value)) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}

// Essa função simplesmente fecha a janela modal, através do método close() do objeto dialog.
function closeModal() {
  dialog.close()
}

// Essa linha de código adiciona um evento de "keyup" ao elemento "inputValue" que chama a função 
// "removeNotNumber" sempre que uma tecla é solta no input.
inputValue.addEventListener('keyup', () => {
  removeNotNumber(inputValue)
})

// Initial execution
updateValues()
openModal() 
updateValues() 
noValues() 