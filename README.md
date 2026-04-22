# Funcionalitats Principals:

L'aplicació està composta per 3 pàgines HTML amb les següents funcionalitats:

Vista Principal (index.html):
Inclou un menú de navegació per a tot el lloc.
Mostra un llistat complet de totes les activitats.Permet crear, eliminar i marcar tasques com a realitzades.
Mostra un gràfic interactiu amb Chart.js amb les tasques fetes cada mes.Carrega les dades des de localStorage i fitxers JSON externs via fetch(), evitant duplicats.
Formulari de Tasques (crear-tasca.html):Formulari per afegir noves activitats amb validació de dades.Camps: títol, descripció, data, categoria i prioritat (Baixa, Mitjana, Alta).Guarda les tasques a localStorage amb un ID únic (format task-001).
Gestor de Categories (categories.html):Permet afegir i eliminar les categories que s'empren al formulari.Les categories es mantenen guardades a localStorage.
