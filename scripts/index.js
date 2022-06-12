if (sessionStorage.getItem("token") == null) {
    alert('Você precisa estar autenticado na Aplicação.');
  }

  getPostData();
  
  let usuarioAutenticado = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
  const nomeUsuario = document.getElementById("nomeUsuario");
  nomeUsuario.innerHTML = `Oi ${usuarioAutenticado.nome}`;
  
  
  function postagem() {
    let textoPostagem = document.getElementById("textbox");
    let posts = JSON.parse(localStorage.getItem("postagens")) || [];
    let file = document.getElementById("arquivo").files[0];
    if (textoPostagem.value <= 0) {
        alert('Você precisa digitar algo');
    } else if (file) {
      let reader = new FileReader(); 
      reader.readAsDataURL(file); 
      reader.onload = function () {
        let arquivoConvertido = reader.result;
        let post = {
          conteudo: textoPostagem.value,
          arquivo: arquivoConvertido,
          data: new Date(),
          usuario: usuarioAutenticado.nome
        };
        posts.push(post);
        localStorage.setItem("postagens", JSON.stringify(posts));
        document.location.reload();
      };
    } else {
      let post = {
        conteudo: textoPostagem.value,
        data: new Date(),
        usuario: usuarioAutenticado.nome,
      };
      posts.push(post);
      localStorage.setItem("postagens", JSON.stringify(posts));
      document.location.reload();
    }
  }
  
  function getPostData() {
    let posts = JSON.parse(localStorage.getItem("postagens")) || [];
    let feed = document.getElementById("feed");
    posts.map((postagem) => {
      if (postagem.arquivo == null) {
    
        feed.innerHTML += `  
        <div class="post">
        <div class="header">
            <img src="imagens/fotoPerfil.jpeg">
            <div class="dados">
                <p>${postagem.usuario}</p>
                <p>São Paulo</p>
                <p>${postagem.data}</p>
            </div>
        </div>
        <div class="conteudo">
            <p>${postagem.conteudo}</p>
        </div>
    </div>`;
      } else if (postagem.arquivo.includes("data:image/png;base64")) {
        feed.innerHTML += `  
        
        <div class="post">
        <div class="header">
            <img src="imagens/fotoPerfil.jpeg">
            <div class="dados">
                <p>${postagem.usuario}</p>
                <p>São Paulo</p>
                <p>${postagem.data}</p>
            </div>
        </div>
        <div class="conteudo">
            <p>${postagem.conteudo}</p>
            <img src="${postagem.arquivo}">
        </div>
    </div>`;
      } else if (
        postagem.arquivo.includes("data:video/mp4;base64")) {
            feed.innerHTML += `  
            <div class="post">
            <div class="header">
                <img src="imagens/fotoPerfil.jpeg">
                <div class="dados">
                    <p>${postagem.usuario}</p>
                    <p>São Paulo</p>
                    <p>${postagem.data}</p>
                </div>
            </div>
            <div class="conteudo">
                <p>${postagem.conteudo}</p>
                <video controls autoplay muted>
                <source src="${postagem.arquivo}" type="video/mp4">
               </audio>
            </div>
        </div>`;
      } else if (
        postagem.arquivo.includes("data:audio/mpeg")) {
            feed.innerHTML += `  
            <div class="post">
            <div class="header">
                <img src="imagens/fotoPerfil.jpeg">
                <div class="dados">
                    <p>${postagem.usuario}</p>
                    <p>São Paulo</p>
                    <p>${postagem.data}</p>
                </div>
            </div>
            <div class="conteudo">
                <p>${postagem.conteudo}</p>
                <audio controls>
                <source src="${postagem.arquivo}" type="audio/mpeg">
               </audio>
            </div>
        </div>`;
      }
    });
  }



const gCanvas = document.querySelector('#drawing-board');
const toolbar = document.getElementById('toolbar');
const gCtx = gCanvas.getContext('2d');


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    }
});


function onMouseDown(e) {
    e.preventDefault();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    e.preventDefault();
    gCtx.fillRect(e.offsetX - 4, e.offsetY - 4, 8, 8);
}

function onMouseUp(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

}

function onSave() {
    gCanvas.toBlob((blob) => {
        const timestamp = Date.now().toString();
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `export-${timestamp}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
        toolbar.style.display = 'none';
    });
}


gCanvas.addEventListener('mousedown', onMouseDown);
document.querySelector('#save').addEventListener('click', onSave);
  
  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userLogado");
    window.location.href = "/index.html";
  }