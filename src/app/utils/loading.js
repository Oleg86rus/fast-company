export function loading() {
    const loader = document.querySelector('.loader');
    setTimeout(()=>{
        if (loader) loader.remove();
    }, 2050);
}
