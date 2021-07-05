(function() {

    const button_plus = document.getElementById('button-plus')
    const button_close = document.getElementById('button-close')

    button_plus.addEventListener('click', function() {
        button_plus.style.display = 'none'
        button_close.style.display = 'block'
        document.getElementById('overview').style.display = 'block'
        document.getElementById('poster-img').setAttribute('style', 'filter: blur(3px)')
    })

    button_close.addEventListener('click', function() {
        button_close.style.display = 'none'
        button_plus.style.display = 'block'
        document.getElementById('overview').style.display = 'none'
        document.getElementById('poster-img').removeAttribute('style', 'filter: blur(0)')
    })

}())