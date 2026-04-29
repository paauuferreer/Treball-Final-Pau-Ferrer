import { obtenirConfigGrafic } from './models.js';

let elMeuGrafic = null;

export async function carregarDadesAPI(nomArxiu) {
    try {
        const resposta = await fetch(`./dades/${nomArxiu}`);
        if (resposta.ok) {
            return await resposta.json();
        }
    } catch (error) {
        console.error("Error carregant s'API:", error);
    }
    return [];
}

export function carregarGrafic(tasques) {
    const canvas = document.getElementById('graficFeines');
    if (!canvas || typeof Chart === 'undefined') return;

    if (elMeuGrafic) elMeuGrafic.destroy();

    const dadesFetes = new Array(12).fill(0);
    const dadesTotals = new Array(12).fill(0);

    tasques.forEach(t => {
        if (t.data) {
            const dataTasca = new Date(t.data);
            if (!isNaN(dataTasca.getTime())) {
                const mes = dataTasca.getMonth();
                dadesTotals[mes]++;
                if (t.realitzada) dadesFetes[mes]++;
            }
        }
    });

    const config = obtenirConfigGrafic(dadesFetes, dadesTotals);
    elMeuGrafic = new Chart(canvas.getContext('2d'), config);
}
