import { afegirTasques } from './storage.js';

const formulari = document.getElementById('formulari-feina');
const titolInput = document.getElementById('titol');
const descInput = document.getElementById('descripcio');
const dataInput = document.getElementById('data');
const catSelect = document.getElementById('categoria');
const prioritatSelect = document.getElementById('prioritat');

const errorTitol = document.getElementById('error-titol');
const errorData = document.getElementById('error-data');

let categories = JSON.parse(localStorage.getItem('categories')) || [
    { nom: 'General', color: '#4285f4' },
    { nom: 'Feina', color: '#34a853' },
    { nom: 'Personal', color: '#fbbc05' }
];

function carregarCategories() {
    if (!catSelect) return;
    catSelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.nom;
        option.textContent = cat.nom;
        catSelect.appendChild(option);
    });
}

if (formulari) {
    formulari.addEventListener('submit', function(e) {
        e.preventDefault();

        let totCorrecte = true;

        if (!titolInput.value.trim()) {
            errorTitol.style.display = 'block';
            totCorrecte = false;
        } else {
            errorTitol.style.display = 'none';
        }

        if (!dataInput.value) {
            errorData.style.display = 'block';
            totCorrecte = false;
        } else {
            errorData.style.display = 'none';
        }

        if (totCorrecte) {
            let categoriaInfo = categories.find(c => c.nom === catSelect.value);

            if (!categoriaInfo) {
                categoriaInfo = categories[0];
            }

            const novaTasca = {
                titol: titolInput.value,
                descripcio: descInput.value,
                data: dataInput.value,
                categoria: categoriaInfo,
                prioritat: prioritatSelect.value,
                realitzada: false 
            };

            afegirTasques([novaTasca]);
            window.location.href = 'index.html';
        }
    });
}

carregarCategories();
