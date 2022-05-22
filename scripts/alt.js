function cadastro() {
    var name = document.getElementById('nome');
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');
    var senha2 = document.getElementById('senha2');
    var cpf = document.getElementById('cpf');
    var tellefone = document.getElementById('tel');

    if (senha.value != senha2.value) {
        console.log("senhas são diferentes");
    } else {
        var conta = JSON.parse(localStorage.getItem('contas')) || [];
        conta.push({
            nome: name.value,
            email: email.value,
            senha: senha.value,
            cpf: cpf.value
        });
        localStorage.setItem('contas', JSON.stringify(conta));
        console.log("funcionou");
    }
}

function autenticacao() {
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');

    var contaAutenticada = {
        nome: "",
        senha: "",
        email: ""
    };
    conta = JSON.parse(localStorage.getItem('contas')) || [];

    conta.forEach((usuario) => {
        if(email.value == usuario.email && senha.value == usuario.senha){
            contaAutenticada = {nome: usuario.nome, senha: usuario.senha, email: usuario.email}
        }
    });
    console.log("autenticada");

    if(email.value == "" || senha.value == ""){
        console.log("é necessário email e senha");
    }else{
        if(email.value == contaAutenticada.email && senha.value == contaAutenticada.senha){
            var token = Math.random().toString(16).substring(2,20);
            console.log("foi");
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("usuarioAutenticado", JSON.stringify(contaAutenticada));
            window.location.href = "index.html";
        }else{
            console.log("erro")
            console.log(senha.value)
            console.log(senha.contaAutenticada)
        }

    }
}

