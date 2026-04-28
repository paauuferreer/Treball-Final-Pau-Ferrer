const formulari = document.getElementById('formulari-feina');
const titolInput = document.getElementById('titol');
const descInput = document.getElementById('descripcio');
const dataInput = document.getElementById('data');
const catSelect = document.getElementById('categoria');
const prioritatSelect = document.getElementById('prioritat');

const errorTitol = document.getElementById('error-titol');
const errorData = document.getElementById('error-data');

let categories = JSON.parse(localStorage.getItem('categories')) || [];
let tasques = JSON.parse(localStorage.getItem('tasques')) || [];

function carregarCategories() {
    catSelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.nom;
        option.textContent = cat.nom;
        catSelect.appendChild(option);
    });
}

formulari.onsubmit = function(e) {
    e.preventDefault();

    let totCorrecte = true;

    if (titolInput.value.trim() === '') {
        errorTitol.style.display = 'block';
        totCorrecte = false;
    } else {
        errorTitol.style.display = 'none';
    }

    if (dataInput.value === '') {
        errorData.style.display = 'block';
        totCorrecte = false;
    } else {
        errorData.style.display = 'none';
    }

    if (totCorrecte) {
        const novaTasca = {
            id: Date.now(),
            titol: titolInput.value,
            descripcio: descInput.value,
            data: dataInput.value,
            categoria: catSelect.value,
            prioritat: prioritatSelect.value,
            estat: 'pendent'
        };

        tasques.push(novaTasca);
        localStorage.setItem('tasques', JSON.stringify(tasques));

        window.location.href = 'index.html';
    }
};

carregarCategories();
