function mostrarPassword() {
    const password = document.querySelector('#password');
    const check = document.querySelector('#mpassword');
    if(password.type == 'password' && check.checked){
        password.type = 'text';
    }else{
        password.type = 'password';
    }
}