// Gestió de dades a localStorage
export function getTasques() {
    return JSON.parse(localStorage.getItem('tasques')) || [];
}

export function saveTasques(tasques) {
    localStorage.setItem('tasques', JSON.stringify(tasques));
}

export function afegirTasques(tasquesNoves) {
    const actuals = getTasques();
    
    const idsActuals = actuals.map(t => t.id);
    const filtrades = tasquesNoves.filter(t => !idsActuals.includes(t.id));
    
    const llistaFinal = [...actuals, ...filtrades];
    saveTasques(llistaFinal);
    
    return llistaFinal;
}

export function updateTasca(id, canvis) {
    const tasques = getTasques().map(t => {
        if (t.id === id) return { ...t, ...canvis };
        return t;
    });
    saveTasques(tasques);
    return tasques;
}

export function eliminarTascaStorage(id) {
    const filtrades = getTasques().filter(t => t.id !== id);
    saveTasques(filtrades);
    return filtrades;
}

export async function importarTasques(nomArxiu) {
    try {
        const resposta = await fetch(`./dades/${nomArxiu}`);
        if (resposta.ok) {
            const tasquesNoves = await resposta.json();
            return afegirTasques(tasquesNoves);
        }
    } catch (error) {
        console.error("Error fent el fetch:", error);
    }
    return getTasques();
}
