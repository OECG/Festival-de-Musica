document.addEventListener('DOMContentLoaded', function() {  
    iniciarApp();
})

function iniciarApp() {
    navegacioFija();
    crearGaleria();
    scrollNav();
}

function navegacioFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    console.log(barra)
    const body = document.querySelector('body');

    window.onscroll = () => {
        const header = document.querySelector('.header');
        const headerHeight = header.offsetHeight + 1 ;

        if (sobreFestival.getBoundingClientRect().bottom < headerHeight) {
            barra.classList.add('fijo');
            if (window.innerWidth > 768) {
                body.style.paddingTop = `${barra.clientHeight}px`;
            }
        } else {
            barra.classList.remove('fijo');
            body.removeAttribute('style');
        }
    };

}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach(enlace => {
        // enlace.addEventListener('click', clickHandler);
        enlace.onclick = clickHandler;
    });
}

function clickHandler(e) {
    e.preventDefault();
    const seccionScroll = e.target.attributes.href.value;
    const seccion = document.querySelector(seccionScroll);

    // Video 203 : Comentario de Jose Miguel
    let offsetTop = seccion.offsetTop;
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    let top
    if (window.innerWidth > 768){
        top = offsetTop - headerHeight;
    }
    else{  top = offsetTop;}
    scroll({ 
        top: top,
        behavior: "smooth" });

    // Metodo del profesor
    // seccion.scrollIntoView({behavior: "smooth"});
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galería" title="Imagen Galería">
        `;
        imagen.onclick = () => mostrarImagen(i);
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galería" title="Imagen Galería">
    `;
   
    // Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    overlay.appendChild(cerrarModal);
    cerrarModal.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Añadir al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}