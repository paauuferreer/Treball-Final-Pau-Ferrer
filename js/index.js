import { carregarGrafic } from './grafics.js';
import { crearTargeta } from './models.js';
import { getTasques, afegirTasques, updateTasca, eliminarTascaStorage, importarTasques } from './storage.js';

let tasquesActuals = [];

async function importarDadesJSON(nomArxiu) {
    tasquesActuals = await importarTasques(nomArxiu);
    pintarTot();
}

function inicialitza() {
    tasquesActuals = getTasques();
    pintarTot();
}

function pintarTot() {
    const ordrePrioritat = { 'Alta': 1, 'Mitjana': 2, 'Baixa': 3 };
    const ordenades = [...tasquesActuals].sort((a, b) => {
        return (ordrePrioritat[a.prioritat] || 99) - (ordrePrioritat[b.prioritat] || 99);
    });
    
    const pendentsContenidor = document.getElementById('feines-pendents');
    const acabadesContenidor = document.getElementById('feines-enllestides');
    
    if (pendentsContenidor) pendentsContenidor.innerHTML = '';
    if (acabadesContenidor) acabadesContenidor.innerHTML = '';
    
    ordenades.forEach(tasca => {
        const card = crearTargeta(tasca);
        if (tasca.realitzada) {
            acabadesContenidor?.appendChild(card);
        } else {
            pendentsContenidor?.appendChild(card);
        }
    });
    
    carregarGrafic(ordenades);
}

window.canviarEstat = function(id) {
    const tasca = tasquesActuals.find(t => t.id === id);
    if (tasca) {
        tasquesActuals = updateTasca(id, { realitzada: !tasca.realitzada });
        pintarTot();
    }
}

window.eliminarTasca = function(id) {
    tasquesActuals = eliminarTascaStorage(id);
    pintarTot();
}

window.carregarDadesJSON = importarDadesJSON;

document.addEventListener('DOMContentLoaded', () => {
    inicialitza();

    const botoNovaFeina = document.getElementById('boto-nova-feina');
    if (botoNovaFeina) {
        botoNovaFeina.onclick = () => window.location.href = 'crear-tasca.html';
    }

    const botoImportar = document.getElementById('boto-importar');
    const inputArxiu = document.getElementById('nom-arxiu-json');

    if (botoImportar && inputArxiu) {
        botoImportar.onclick = () => {
            const fitxer = inputArxiu.value;
            if (fitxer) importarDadesJSON(fitxer);
        };
    }
});
