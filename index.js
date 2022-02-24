const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value =  '';
    document.getElementById('cidade').value =  '';
    document.getElementById('estado').value =  '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCEP = async() => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    /*TRATAR PARA QUE O USUÁRIO MANDE PARA O FECTH UM CEP VALIDO*/
    if(cepValido(cep)){
        const dados = await fetch(url);
    const endereco = await dados.json();

    /*O IF PARA TRATAR O ERRO DE UM CEP QUE NÃO EXISTE*/
    if(endereco.hasOwnProperty('erro')){
        document.getElementById('endereco').value = 'CEP não encontrado!'
    } else{
        preencherFormulario(endereco);
    } 
} else {
    document.getElementById('endereco').value = 'CEP incorreto!'
}
    
}


document.getElementById('cep')
    .addEventListener('focusout', pesquisarCEP);