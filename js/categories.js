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
            <button class="boto-eliminar" data-id="${index}">Eliminar</button>
        `;

        llistaCat.appendChild(item);
    });

    const botonsEliminar = document.querySelectorAll('.boto-eliminar');
    botonsEliminar.forEach(boto => {
        boto.onclick = function() {
            const index = this.getAttribute('data-id');
            categories.splice(index, 1);
            guardarCategories();
            pintarCategories();
        };
    });
}

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
