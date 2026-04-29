const formulari = document.getElementById('formulari-feina');
const titolInput = document.getElementById('titol');
const descInput = document.getElementById('descripcio');
const dataInput = document.getElementById('data');
const catSelect = document.getElementById('categoria');
const prioritatSelect = document.getElementById('prioritat');

const errorTitol = document.getElementById('error-titol');
const errorData = document.getElementById('error-data');

let categories;
try {
    categories = JSON.parse(localStorage.getItem('categories'));
} catch (e) {
    categories = null;
}

if (!categories || categories.length === 0) {
    categories = [
        { nom: 'General', color: '#4285f4' },
        { nom: 'Feina', color: '#34a853' },
        { nom: 'Personal', color: '#fbbc05' }
    ];
}

let tasques;
try {
    tasques = JSON.parse(localStorage.getItem('tasques')) || [];
} catch (e) {
    tasques = [];
}

console.log("Script form-tasca carregat. Categories actuals:", categories);

function carregarCategories() {
    if (!catSelect) {
        console.error("No s'ha trobat el select de categories");
        return;
    }
    catSelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.nom;
        option.textContent = cat.nom;
        catSelect.appendChild(option);
    });
    console.log("Categories carregades al select");
}

if (formulari) {
    formulari.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Intentant enviar formulari...");

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
            const categoriaInfo = categories.find(c => c.nom === catSelect.value) || categories[0];

            const novaTasca = {
                id: "task-" + Date.now(),
                titol: titolInput.value,
                descripcio: descInput.value,
                data: dataInput.value,
                categoria: categoriaInfo,
                prioritat: prioritatSelect.value,
                realitzada: false 
            };

            console.log("Guardant nova tasca:", novaTasca);
            tasques.push(novaTasca);
            localStorage.setItem('tasques', JSON.stringify(tasques));

            console.log("Redirigint a index.html...");
            window.location.href = 'index.html';
        } else {
            console.warn("Validació fallida");
        }
    });
} else {
    console.error("No s'ha trobat el formulari amb ID 'formulari-feina'");
}

carregarCategories();
