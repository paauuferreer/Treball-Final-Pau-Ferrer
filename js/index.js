import { carregarGrafic } from './grafics.js';

let tasquesAPI = [];
let tasquesLocal = [];

async function carregarDadesJSON(nomArxiu) {
    try {
        const resposta = await fetch(`./dades/${nomArxiu}`);
        if (resposta.ok) {
            tasquesAPI = await resposta.json();
            pintarTot();
        }
    } catch (error) {
        console.error("Error carregant s'API:", error);
    }
}

function inicialitza() {
    tasquesLocal = JSON.parse(localStorage.getItem('tasques')) || [];
    pintarTot();
}

function pintarTot() {
    const ordrePrioritat = { 'Alta': 1, 'Mitjana': 2, 'Baixa': 3 };
    
    const totes = [...tasquesAPI, ...tasquesLocal].sort((a, b) => {
        return (ordrePrioritat[a.prioritat] || 99) - (ordrePrioritat[b.prioritat] || 99);
    });
    
    const pendentsContenidor = document.getElementById('feines-pendents');
    const acabadesContenidor = document.getElementById('feines-enllestides');
    
    pendentsContenidor.innerHTML = '';
    acabadesContenidor.innerHTML = '';
    
    totes.forEach(tasca => {
        const card = crearTargeta(tasca);
        if (tasca.realitzada) {
            acabadesContenidor.appendChild(card);
        } else {
            pendentsContenidor.appendChild(card);
        }
    });
    
    carregarGrafic(totes);
}

function crearTargeta(tasca) {
    const div = document.createElement('div');
    div.className = `tasca-card prioritat-${tasca.prioritat.toLowerCase()}`;
    if (tasca.realitzada) div.classList.add('realitzada');
    
    div.innerHTML = `
        <div class="tasca-header">
            <span class="tasca-titol">${tasca.titol}</span>
            <span class="tasca-prioritat-tag">${tasca.prioritat}</span>
        </div>
        <div class="tasca-cos">
            <span class="tasca-categoria-tag" style="background-color: ${tasca.categoria.color || '#ddd'}">
                ${tasca.categoria.nom}
            </span>
            <div class="tasca-data">${tasca.data}</div>
            <p class="tasca-desc">${tasca.descripcio}</p>
        </div>
        <div class="tasca-accions">
            <svg class="icona-svg-tasca" onclick="canviarEstat('${tasca.id}')" viewBox="0 0 24 24" title="Marcar com feta">
                ${tasca.realitzada 
                    ? '<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />' 
                    : '<rect x="3" y="3" width="18" height="18" rx="2" />'}
            </svg>
            <svg class="icona-svg-tasca" onclick="eliminarTasca('${tasca.id}')" viewBox="0 0 24 24" title="Eliminar">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
        </div>
    `;
    return div;
}

window.canviarEstat = function(id) {
    let trobada = false;
    tasquesLocal = tasquesLocal.map(t => {
        if (t.id === id) {
            t.realitzada = !t.realitzada;
            trobada = true;
        }
        return t;
    });
    
    if (trobada) {
        localStorage.setItem('tasques', JSON.stringify(tasquesLocal));
    } else {
        tasquesAPI = tasquesAPI.map(t => {
            if (t.id === id) t.realitzada = !t.realitzada;
            return t;
        });
    }
    
    pintarTot();
}

window.eliminarTasca = function(id) {
    tasquesLocal = tasquesLocal.filter(t => t.id !== id);
    localStorage.setItem('tasques', JSON.stringify(tasquesLocal));
    tasquesAPI = tasquesAPI.filter(t => t.id !== id);
    pintarTot();
}

window.carregarDadesJSON = carregarDadesJSON;

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
            if (fitxer) carregarDadesJSON(fitxer);
        };
    }
});
