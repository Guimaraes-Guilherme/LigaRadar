
function mostrarCampeonato(nome, botao) {

    // remover active de todos
    document.querySelectorAll('.tab-button')
    .forEach(btn => btn.classList.remove('active'))

    // ativar o clicado
    botao.classList.add('active')


    // esconder todos
    document.querySelectorAll('.match-group')
    .forEach(group => group.classList.add('hidden'))


    // mostrar selecionado
    if(nome === 'all') {

        document.querySelectorAll('.match-group')
        .forEach(group => group.classList.remove('hidden'))

    }
    else {

        document.querySelector('.' + nome)
        .classList.remove('hidden')

    }

}