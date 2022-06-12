function cadastro() {
    var letrasMaiscula = /[A-Z]/g;
    var numeros = /[0-9]/g;
    var name = document.getElementById('nome');
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');
    var senha2 = document.getElementById('senha2');
    var tel = document.getElementById('tel');
    

    if (senha.value.length < 6) {
        alert('é necessário um mínimo de 6 caracteres')
      } else if (senha.value != senha2.value) {
        alert('Senhas não confere')
      } else if (!senha.value.match(numeros)) {
        alert('Necessário pelo menos 1 numero')
      } else if (!senha.value.match(letrasMaiscula)) {
        alert('Necessário uma letra maiscula')
      }else {
        var conta = JSON.parse(localStorage.getItem('contas')) || [];
        conta.push({
            nome: name.value,
            email: email.value,
            senha: senha.value,
            cpf: cpf.value,
            tel: tel.value
        });
        localStorage.setItem('contas', JSON.stringify(conta));
        alert('Conta Criada');
        window.location.href = "index.html";
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
            window.location.href = "posts.html";
        }else{
            alert('Usuário ou senha Incorretos.');
        }

    }
}

