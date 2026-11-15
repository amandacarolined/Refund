//Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const ExpenseList = document.querySelector("ul")
const ExpensesQuantity = document.querySelector("aside header p span")
const ExpenseTotal = document.querySelector("aside header h2")

//Observa quando entrar algum conteúdo no input. Toda vez que tiver um
//conteúdo, ele dispara o evento abaixo.
amount.oninput = () => {
    //recebendo o valor do input e removendo as letras
let value = amount.value.replace(/\D/g, "")

   //Transformando o valor em centavos
   value = Number(value) / 100

//devolvendo somente números. (Não será possível digitar letras)
amount.value = formatCurrencyBRL(value)

}

//Criando função para formatar os números para real brasileiro
function formatCurrencyBRL(value){
value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
})

//retorna o valor formatado
return value 
}


//Não permite que a página recarregue e as informações inseridas apaguem
form.onsubmit = (event) => {
    //previne o comportamento padrao de recarregar a página.
event.preventDefault()


//Criando objeto para centralizar nele todas as informações relacionadas a uma dispesa
const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
}
//chama a função que irá adicionar um item na lista
expenseAdd (newExpense)

}

function expenseAdd(newExpense) {
try {
//cria o elemento de li (item) para adicionar na lista (ul)
const expenseItem = document.createElement("li")
expenseItem.classList.add("expense")

//criando o ícone da categoria
const expenseIcon = document.createElement("img")
expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
expenseIcon.setAttribute("alt", newExpense.category_name)

//Cria a info da despesa
const expenseInfo = document.createElement("div")
expenseInfo.classList.add("expense-info")

//Cria o nome da despesa
//strong é o nome da despesa
const expenseName = document.createElement("strong")
expenseName.textContent = newExpense.expense 

//Cria a categoria da despesa
//span é o nome da categoria
const expenseCategory = document.createElement("span")
expenseCategory.textContent = newExpense.category_name

//Adiciona nome e categoria nas informações da despesa
expenseInfo.append(expenseName, expenseCategory)

//Adiciona o valor da despesa
const expenseAmount = document.createElement("span")
expenseAmount.classList.add("expense-amount")
expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.replace("R$", "").trim()}`

//criando o botão de remover despesa
const removeIcon = document.createElement("img")
removeIcon.classList.add("remove-icon")
removeIcon.setAttribute("src", "img/remove.svg")
removeIcon.setAttribute("alt", "Remover despesa")


//Adiciona as informações no item
expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

//Adiciona o item na lista
ExpenseList.append(expenseItem)



//atualiza o valor total das despesas
updateTotals()

//Limpa os campos do formulário para adicionar nova despesa
clearForm()
} catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
}
}

//Atualiza o valor total das despesas
function updateTotals() {
try {
    //recupera todos os itens (li) da lista de despesas (ul)
    const items = ExpenseList.children

    //atualiza a quantidade de despesas
    ExpensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //soma o valor de todas as despesas
    let total = 0
    for (let item = 0; item < items.length; item++) {
        const itemAmount = items[item].querySelector(".expense-amount")

        //remove tudo que não for número ou vírgula e troca a vírgula por ponto
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
        value = parseFloat(value)

        if (isNaN(value)) {
            return alert("Não foi possível calcular o total. O valor não parece ser um número.")
        }

        total += value
    }

    //Criando a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    //Limpa o conteúdo do elemento
    ExpenseTotal.innerHTML = ""

    //Adiciona o R$ e o valor total das despesas
    ExpenseTotal.append(symbolBRL, total)

} catch (error) {
    alert("Não foi possível atualizar o valor total das despesas.")
    console.log(error)
}
}

//Criando o evento que captura o clique no botão de remover despesa

ExpenseList.addEventListener("click", function (event) {
//Verifica se o elemento clicado é o botão de remover despesa
if(event.target.classList.contains("remove-icon")) {
//Obtendo a li pai do elemento clicado (botão de remover despesa)
const item = event.target.closest("li")
//Remove o item da lista
item.remove()
}

//Atualiza o valor total das despesas
updateTotals()
})

function clearForm() {
    //limpa os imputs do formulário para adicionar nova despesa
expense.value = ""
category.value = ""
amount.value = ""

//coloca o foco no input de despesa para adicionar nova despesa
    expense.focus()

}
