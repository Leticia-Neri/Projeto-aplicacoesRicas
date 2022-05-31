
if (sessionStorage.getItem('token') == null) {
    console.log("Você não está autenticado");
    window.location.href = "login.html";
}

let contaAutent = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
const nome = document.getElementById('nome');
nome.innerHTML = `Olá ${contaAutent.nome}`;

function postagem() {
    let textBox = document.getElementById('textbox');
    let postagem = JSON.parse(localStorage.getItem('postagens')) || [];

    if (textbox.value.match(/^\s+$/) !== null || textbox.value <= 0) {
        console.log("Você deve postar algo");
    } else {
        let postagens = { content: textBox.value, author: contaAutent.nome, date: new Date().toLocaleString() }
        postagem.push(postagens)
        localStorage.setItem("postagens", JSON.stringify(postagem))
        document.location.reload();
    }
}

function receberPostagem() {
    let postagem = JSON.parse(localStorage.getItem('postagens')) || [];
    let feed = document.getElementById('feed');
    postagem.map((post) => {
        feed.innerHTML += `           
        <div class="post">
            <div class="header">
                <img src="imagens/fotoPerfil.jpeg">
                <div class="dados">
                    <p>${post.author}</p>
                    <p>São Paulo</p>
                    <p><time>${post.date}</time></p>
                </div>
            </div>
            <div class="conteudo">
                <p>${post.content}</p>
                <img src="">
            </div>
        </div>`;
    })
}


document.addEventListener("readystatechange", () => {
    if (document.readyState == "complete") receberPostagem();
});