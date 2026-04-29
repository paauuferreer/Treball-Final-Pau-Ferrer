let elMeuGrafic = null;

export function carregarGrafic(tasques) {
    const canvas = document.getElementById('graficFeines');
    if (!canvas) {
        console.error("No s'ha trobat el canvas 'graficFeines'");
        return;
    }

    if (typeof Chart === 'undefined') {
        console.error("Chart.js no s'ha carregat encara. Reintentant...");
        setTimeout(() => carregarGrafic(tasques), 500);
        return;
    }

    if (elMeuGrafic) {
        elMeuGrafic.destroy();
    }

    const ctx = canvas.getContext('2d');
    const mesosLabels = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
    const dadesFetes = new Array(12).fill(0);
    const dadesTotals = new Array(12).fill(0);

    tasques.forEach(t => {
        if (t.data) {
            const dataTasca = new Date(t.data);
            if (!isNaN(dataTasca.getTime())) {
                const mes = dataTasca.getMonth();
                dadesTotals[mes]++;
                if (t.realitzada) {
                    dadesFetes[mes]++;
                }
            }
        }
    });

    elMeuGrafic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mesosLabels,
            datasets: [
                {
                    label: 'Tasques fetes',
                    data: dadesFetes,
                    borderColor: '#5fb9b0',
                    backgroundColor: 'rgba(95, 185, 176, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Total tasques',
                    data: dadesTotals,
                    borderColor: '#ddd',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
