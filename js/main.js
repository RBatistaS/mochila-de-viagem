const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
//declaração do array de nome itens
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach((elemento) => {
    criaElemento(elemento)
})

//evento de interação do usuário que recebe os dados passados utilizando os imputs
form.addEventListener("submit", (evento) => {
    //com esse codigo abaixo fazemos com que o formulaáio pare de enviar os dados para o navegador
    evento.preventDefault()

    //variáveis para acessar os valores enviados
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //transformando a variavel em um objeto que recebe nome e quantidade
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //aqui estamos recolhemos o elementos de nome e quantidade e repassando como parâmetro para a função 
    criaElemento(itemAtual)

    //salvando item no localstorage

    

    //inserindo a variável no array, utilizando o método push
    itens.push(itemAtual)
    //o localstorage so nos deixa guardar string por isso usamos o método stringfy do json para transformar o objeto em uma string

    localStorage.setItem("itens",JSON.stringify(itens))

    //código para que as variaveis fiquem vazias após o envio de formulários
    nome.value =""
    quantidade.value =""
})

//criando elementos

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)

    
}