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