function mostrarPassword() {
    const password = document.querySelector('#password');
    const check = document.querySelector('#mpassword');
    if(password.type == 'password' && check.checked){
        password.type = 'text';
    }else{
        password.type = 'password';
    }
}


async function deleteUsers(){
    const cpfs = document.querySelectorAll('#usercpf');
    const users = [];
    cpfs.forEach(cpf => {
        if (cpf.checked) {
            users.push(cpf.value)    
        }
    })
    let myHeaders = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
    });
    let params = {
        method: 'DELETE',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body: JSON.stringify(users)
    };
    const msg = document.querySelector('#msg');
    console.log(msg);
    if(users.length == 0){
        msg.classList.remove('alert');
        msg.classList.remove('alert-success');
        msg.classList.add('alert');
        msg.classList.add('alert-success');
        msg.innerText = '';
        msg.innerText = 'Nenhum usuário escolhido.';
    }else{
        const resposta = await fetch('users/delete', params);
        if(resposta.ok){
            window.location.href = 'users/deletesuccess';
        }else{
            msg.classList.remove('alert');
            msg.classList.remove('alert-success');
            msg.classList.add('alert');
            msg.classList.add('alert-success');
            msg.innerText = '';
            msg.innerText = 'Houve erros na exclusão dos usuários.';
        }
    }
}

/*function validation(){
    const cpf = document.querySelector('#cpf');
    const nome = document.querySelector('#nome');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');
    console.log(cpf.value.length);
    if(cpf.value == "" || cpf.value.length != 11){
        alert('Você precisa preencher um CPF válido!');
        cpf.focus();
        return false;
    }else if(nome.value == ''){
        alert('Campo nome não pode ser vazio!');
        nome.focus();
        return false;
    }else if(password.value == ''){
        alert('Campo password não pode ser vazio!');
        password.focus();
        return false;
    }else if(email.value == ''){
        alert('Campo email não pode ser vazio!');
        email.focus();
        return false;
    }else{
        return true;
    }
}*/

function selectAll(){
    const checks = document.querySelectorAll('#usercpf');
    const selectAll = document.querySelector('#selectAll');
    checks.forEach(check => {
        if(selectAll.checked){
            check.checked = true;
        }else{
            check.checked = false;
        }
    })
}