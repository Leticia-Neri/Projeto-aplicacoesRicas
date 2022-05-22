if(sessionStorage.getItem('token') == null){
    console.log("Você não está autenticado");
    window.location.href = "login.html";
}