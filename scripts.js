//Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


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

console.log(newExpense)

}

