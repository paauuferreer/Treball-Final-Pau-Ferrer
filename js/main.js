import { carregarGrafic } from './grafics.js';

async function carregarDades(nomArxiu = 'activitats_001.json') {
    try {
        const resposta = await fetch(`./dades/${nomArxiu}`);
        if (!resposta.ok) throw new Error('Error en sa resposta');
        
        const dades = await resposta.json();
        carregarGrafic(dades);
    } catch (error) {
        console.error("Error carregant s'API de dades:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDades();

    const botoImportar = document.getElementById('boto-importar');
    const inputArxiu = document.getElementById('nom-arxiu-json');

    const botoNovaFeina = document.getElementById('boto-nova-feina');
    if (botoNovaFeina) {
        botoNovaFeina.addEventListener('click', () => {
            window.location.href = 'crear-tasca.html';
        });
    }

    if (botoImportar && inputArxiu) {
        botoImportar.addEventListener('click', () => {
            const fitxer = inputArxiu.value;
            if (fitxer) {
                carregarDades(fitxer);
            }
        });
    }
});
