const role = {
    admin : 'admin',
    regular: 'regular'
}

const dataFormated = (posts) => {
    let ano, mes, dia, data;
    let dataFormated = [];
    data = '';
    ano = 'cdcdscsddsc';
    mes = ano.substring(0, 4);
    let meses = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let mesesExtenso = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        
    for (let i = 0; i < posts.length; i++) {
        data = posts[i].createdAt.toString();
        console.log(data);
        ano = data.substring(11, 15);
        mes = data.substring(4, 7);
        for (let j = 0; j < meses.length; j++){
            if(mes == meses[j]){
                mes = mesesExtenso[j];
            }
        }
        dia = data.substring(8,10);
        data = dia + ' de ' + mes + ' de ' + ano;
        dataFormated.push(data);
    }

    return dataFormated;
}

module.exports = { role, dataFormated }