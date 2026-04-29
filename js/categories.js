const llistaCat = document.getElementById('llista-categories');
const nomCatInput = document.getElementById('nom-categoria');
const colorCatInput = document.getElementById('color-categoria');
const botoAfegir = document.getElementById('boto-afegir-cat');

let categories = carregarCategories();

function carregarCategories() {
    const dades = localStorage.getItem('categories');
    if (dades) {
        return JSON.parse(dades);
    }
    return [];
}

function guardarCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function pintarCategories() {
    llistaCat.innerHTML = '';

    categories.forEach((cat, index) => {
        const item = document.createElement('div');
        item.className = 'categoria-item';

        item.innerHTML = `
            <div class="categoria-info">
                <div class="cercle-color" style="background-color: ${cat.color}"></div>
                <span>${cat.nom}</span>
            </div>
            <div class="tasca-accions">
                <svg class="icona-svg-tasca" onclick="eliminarCat(${index})" viewBox="0 0 24 24">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </div>
        `;

        llistaCat.appendChild(item);
    });
}

window.eliminarCat = function(index) {
    categories.splice(index, 1);
    guardarCategories();
    pintarCategories();
};

botoAfegir.onclick = function() {
    const nom = nomCatInput.value.trim();
    const color = colorCatInput.value;

    if (nom !== '') {
        const novaCat = {
            nom: nom,
            color: color
        };

        categories.push(novaCat);
        guardarCategories();
        pintarCategories();

        nomCatInput.value = '';
    } else {
        alert('Per favor, posa un nom a la categoria!');
    }
};

pintarCategories();
