🛡️ Mòdul 05: Hacking Ètic
Curs d'Especialització en Ciberseguretat en Entorns de les Tecnologies de la Informació
Institut Nicolau Copèrnic — Terrassa
![alt text](https://img.shields.io/badge/Estat-En%20Desenvolupament-green)
![alt text](https://img.shields.io/badge/Versi%C3%B3-1.0-blue)
![alt text](https://img.shields.io/badge/Llic%C3%A8ncia-Educativa-orange)
📖 Descripció del Projecte
Aquest projecte consisteix en el desenvolupament d'un Portal Web Educatiu per al mòdul professional M05 (Hacking Ètic). Aquesta iniciativa s'emmarca dins del Curs d'Especialització en Ciberseguretat, que s'imparteix per primera vegada aquest any a l'Institut Nicolau Copèrnic.
L'objectiu de la plataforma és oferir als alumnes un entorn interactiu, modern i visualment atractiu on puguin consultar teoria, realitzar exercicis d'autoavaluació i desbloquejar recursos avançats mitjançant la gamificació.
✨ Característiques Principals
Disseny Modern i Responsive: Estètica "Dark Mode" inspirada en entorns de ciberseguretat, adaptada a dispositius mòbils i escriptori.
Interactivitat:
Qüestionaris tipus test (Multichoice).
Exercicis d'arrossegar i deixar anar (Drag & Drop) per relacionar conceptes.
Gamificació: Sistema de validació de notes. Els alumnes han d'obtenir una puntuació superior al 80% als exercicis pràctics per desbloquejar l'accés al Manual de Configuració Segura.
Estructura Modular: Disseny escalable preparat per allotjar les 5 unitats formatives del curs.
📂 Estructura del Projecte
El projecte està organitzat seguint les bones pràctiques de desenvolupament web estàtic:
code
Bash
/
├── index.html            # Portada principal (Syllabus del curs)
├── xarxes.html           # Contingut teòric i pràctic de la Unitat 2
├── manual_wpa.html       # Recurs desbloquejable (Manual TP-Link/Mercusys)
├── css/
│   └── xarxes_style.css  # Full d'estils global (variables CSS, flexbox, grid)
├── js/
│   └── xarxes_script.js  # Lògica dels exercicis, càlcul de notes i validació
└── images/               # Recursos gràfics (diagrames, captures, logos)
    ├── image1.png
    └── ...
📚 Continguts del Curs (M05)
El portal està dissenyat per cobrir el següent temari:
🛡️ Introducció al Hacking Ètic: Conceptes, fases d'atac i marc legal.
📡 Atac a Xarxes Sense Fils: (Mòdul actualment desenvolupat)
Rogue AP i Evil Twin.
Atacs de desautenticació (Deauth).
Vulnerabilitats WEP/WPA/WPA2/WPA3.
War Driving i Jamming.
🎣 Accés Inicial: Enginyeria social i Phishing.
🚀 De l'Execució a l'Impacte: Escalada de privilegis i persistència.
🌐 Atacs a Aplicacions Web: OWASP Top 10 i vulnerabilitats web.
🛠️ Tecnologies Utilitzades
HTML5 Semàntic: Estructura clara i accessible.
CSS3: Ús de CSS Grid i Flexbox per a la maquetació, i variables CSS (:root) per a la gestió de la paleta de colors.
JavaScript (Vanilla): Lògica del client sense dependències pesades.
LocalStorage: Per guardar el progrés de l'alumne (desbloqueig del manual).
Librerias Externes:
SortableJS: Per a la funcionalitat d'arrossegar i deixar anar (Drag & Drop).
🚀 Instal·lació i Ús
Aquest és un projecte web estàtic, per la qual cosa no requereix instal·lació de bases de dades ni servidors complexos (Backend).
Clonar el repositori:
code
Bash
git clone https://github.com/el-teu-usuari/hacking-etic-copernic.git
Executar:
Pots obrir directament el fitxer index.html amb el teu navegador preferit.
Recomanat: Utilitzar una extensió com "Live Server" (VS Code) per simular un servidor local.
⚠️ Avís Legal (Disclaimer)
Aquest material ha estat creat amb finalitats exclusivament educatives per als alumnes de l'Institut Nicolau Copèrnic.
Les tècniques explicades (com el crackeig de contrasenyes o atacs de xarxa) només s'han de practicar en entorns controlats (laboratoris) o sobre sistemes propis amb autorització explícita.
L'ús indegut d'aquests coneixements sobre sistemes de tercers sense consentiment és il·legal i està penalitzat per la llei.
👥 Autoria
Institut Nicolau Copèrnic (Terrassa)
Departament d'Informàtica
© 2025 - Tots els drets reservats.