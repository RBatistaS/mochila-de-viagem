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

    //Const para conferir elemento nome no array itens
    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    //transformando a variavel em um objeto que recebe nome e quantidade
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Condicional para conferir se o elemento 
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        //Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        //aqui estamos recolhemos o elementos de nome e quantidade e repassando como parâmetro para a função 
        criaElemento(itemAtual)

        //salvando item no localstorage

        //inserindo a variável no array, utilizando o método push
        itens.push(itemAtual)
    }

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
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)

    novoItem.appendChild(botaoDeleta(item.id))

    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "x"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode)
    
    })

    return elementoBotao
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id),1)

    localStorage.setItem("itens", JSON.stringify(itens))
}