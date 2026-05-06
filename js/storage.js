// Gestió de dades a localStorage
export function getTasques() {
    return JSON.parse(localStorage.getItem('tasques')) || [];
}

export function saveTasques(tasques) {
    localStorage.setItem('tasques', JSON.stringify(tasques));
}

export function eliminarTascaStorage(id) {
    const filtrades = getTasques().filter(t => t.id !== id);
    saveTasques(filtrades);
    return filtrades;
}

export function generarSeguentId() {
    const tasques = getTasques();
    let max = 0;
    tasques.forEach(t => {
        if (t.id && t.id.startsWith('task-')) {
            const num = parseInt(t.id.split('-')[1]);
            if (!isNaN(num) && num > max) max = num;
        }
    });
    return `task-${(max + 1).toString().padStart(3, '0')}`;
}

export function afegirTasques(tasquesNoves) {
    const actuals = getTasques();
    
    let maxIdNum = 0;
    actuals.forEach(t => {
        if (t.id && t.id.startsWith('task-')) {
            const num = parseInt(t.id.split('-')[1]);
            if (!isNaN(num) && num > maxIdNum) maxIdNum = num;
        }
    });

    const preparades = tasquesNoves.map(t => {
        let idFinal = t.id;
        if (!idFinal || !idFinal.startsWith('task-')) {
            maxIdNum++;
            idFinal = `task-${maxIdNum.toString().padStart(3, '0')}`;
        }
        
        return {
            ...t,
            id: idFinal,
            realitzada: t.realitzada || false
        };
    });

    const idsActuals = actuals.map(t => t.id);
    const filtrades = preparades.filter(t => !idsActuals.includes(t.id));
    
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
