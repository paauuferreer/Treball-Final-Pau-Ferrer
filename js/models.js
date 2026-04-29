// Lògica per pintar ses targetes de ses tasques
export function crearTargeta(tasca) {
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

// Configuració del gràfic activitat
export function obtenirConfigGrafic(dadesFetes, dadesTotals) {
    const mesosLabels = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
    
    return {
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
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    };
}
