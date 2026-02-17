// ===================================
// Accés Protegit (Password)
// ===================================

const ACCESS_PASSWORD = 'copernic'; // Pots canviar aquesta contrasenya

function checkAccess() {
    const input = document.getElementById('access-password');
    const error = document.getElementById('password-error');
    const overlay = document.getElementById('password-overlay');
    const content = document.getElementById('protected-content');

    if (input.value === ACCESS_PASSWORD) {
        // Guardar l'accés en la sessió actual
        sessionStorage.setItem('is-authenticated', 'true');

        // Efecte de sortida
        overlay.classList.add('hidden');
        content.style.display = 'block';

        // Carregar exercicis
        Object.keys(exercisesData).forEach(id => {
            initExercise(parseInt(id));
        });
    } else {
        error.textContent = 'Contrasenya incorrecta. Torna-ho a provar.';
        input.value = '';
        input.focus();

        // Efecte de vibració a la card
        const card = document.querySelector('.password-card');
        card.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => card.style.animation = '', 400);
    }
}

// Comprovar si ja s'ha loguejat en aquesta sessió
document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    const overlay = document.getElementById('password-overlay');
    const content = document.getElementById('protected-content');
    const input = document.getElementById('access-password');

    if (isAuthenticated === 'true') {
        overlay.style.display = 'none';
        content.style.display = 'block';
        Object.keys(exercisesData).forEach(id => {
            initExercise(parseInt(id));
        });
    } else {
        // Enfocar l'input quan es carrega
        input.focus();

        // Permetre entrar amb Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAccess();
        });
    }
});

// ===================================
// Exercicis Git - Sortable List Logic
// ===================================

let currentDifficulty = 'hard';

function setDifficulty(level) {
    currentDifficulty = level;

    // Actualitzar estils dels botons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });

    // Reiniciar tots els exercicis amb la nova dificultat
    Object.keys(exercisesData).forEach(id => {
        initExercise(parseInt(id));
        const resultDiv = document.getElementById(`result-${id}`);
        if (resultDiv) resultDiv.classList.remove('show');
    });

    console.log(`🎮 Dificultat canviada a: ${level}`);
}

// Configuració dels exercicis
const exercisesData = {
    1: {
        correctOrder: ['B', 'C', 'D', 'A', 'E', 'F', 'G', 'H'],
        steps: {
            'A': 'Escriure el codi',
            'B': 'git checkout main',
            'C': 'git pull origin main',
            'D': 'git checkout -b feature/api',
            'E': 'Executar tests',
            'F': 'git add .',
            'G': 'git commit -m "Nova API"',
            'H': 'git push origin feature/api'
        }
    },
    2: {
        correctOrder: ['E', 'G', 'C', 'A', 'B', 'D', 'F', 'H'],
        steps: {
            'A': 'Editar el fitxer amb marcadors de conflicte',
            'B': 'git add fitxer.py',
            'C': 'git merge feature/x',
            'D': 'git commit',
            'E': 'git checkout dev',
            'F': 'Executar tests',
            'G': 'git pull origin dev',
            'H': 'git push origin dev'
        }
    },
    3: {
        correctOrder: ['H', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        steps: {
            'A': 'Escriure test',
            'B': 'Executar test (falla)',
            'C': 'Escriure codi mínim',
            'D': 'Executar test (passa)',
            'E': 'Refactoritzar',
            'F': 'git add .',
            'G': 'git commit -m "Feature segura"',
            'H': 'git checkout -b feature/auth'
        }
    },
    4: {
        correctOrder: ['G', 'C', 'D', 'B', 'F', 'E', 'A'],
        steps: {
            'A': 'git push',
            'B': 'Executar tests',
            'C': 'git add .',
            'D': 'git commit -m "Canvis"',
            'E': 'git pull origin main',
            'F': 'Corregir errors si n’hi ha',
            'G': 'Revisar canvis amb git status'
        }
    },
    5: {
        correctOrder: ['A', 'B', 'C', 'E', 'F', 'D', 'G', 'H'],
        steps: {
            'A': 'Desenvolupar a feature',
            'B': 'Merge feature → dev',
            'C': 'Executar tests',
            'D': 'Merge dev → main',
            'E': 'CI executa pipeline',
            'F': 'Validar que tot està en verd',
            'G': 'Desplegar',
            'H': 'Monitorar'
        }
    },
    6: {
        correctOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        steps: {
            'A': 'Crear branca hotfix',
            'B': 'Escriure test que reprodueixi el problema',
            'C': 'Executar test (falla)',
            'D': 'Implementar correcció',
            'E': 'Executar test (passa)',
            'F': 'Commit',
            'G': 'Merge a main',
            'H': 'Desplegar urgentment'
        }
    },
    7: {
        correctOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        steps: {
            'A': 'git clone URL',
            'B': 'Entrar a la carpeta del projecte',
            'C': 'git checkout main',
            'D': 'git pull origin main',
            'E': 'Crear branca feature',
            'F': 'Desenvolupar funcionalitat',
            'G': 'Fer commit'
        }
    },
    8: {
        correctOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        steps: {
            'A': 'Definir requisit',
            'B': 'Escriure test',
            'C': 'Escriure codi',
            'D': 'Executar tests',
            'E': 'Commit',
            'F': 'Push',
            'G': 'CI valida',
            'H': 'Deploy'
        }
    }
};


// ===================================
// Inicialització
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(exercisesData).forEach(id => {
        initExercise(parseInt(id));
    });
    console.log('✅ Exercicis Git (Sortable) carregats');
});

function initExercise(id) {
    const list = document.getElementById(`list-${id}`);
    if (!list) return;

    const data = exercisesData[id];
    const correctOrder = data.correctOrder;
    const totalSteps = correctOrder.length;

    // Índexs que han d'estar fixats
    let fixedIndices = [];
    if (currentDifficulty === 'easy') {
        fixedIndices = [0, totalSteps - 1];
    } else if (currentDifficulty === 'medium') {
        fixedIndices = [0];
    }

    // Obtenir els IDs que no estan fixats per barrejar-los
    const nonFixedIds = correctOrder.filter((id, index) => !fixedIndices.includes(index));
    const shuffledNonFixed = shuffleArray([...nonFixedIds]);

    // Reconstruir la llista barrejada respectant els fixats
    let finalIds = [];
    let shufflePtr = 0;

    for (let i = 0; i < totalSteps; i++) {
        if (fixedIndices.includes(i)) {
            finalIds.push(correctOrder[i]);
        } else {
            finalIds.push(shuffledNonFixed[shufflePtr++]);
        }
    }

    renderList(list, finalIds, id, fixedIndices);
}

function renderList(container, ids, exerciseId, fixedIndices = []) {
    container.innerHTML = '';
    const steps = exercisesData[exerciseId].steps;

    ids.forEach((id, index) => {
        const item = document.createElement('div');
        const isFixed = fixedIndices.includes(index);

        item.className = `sortable-item ${isFixed ? 'fixed' : ''}`;
        item.draggable = !isFixed;
        item.dataset.id = id;

        item.innerHTML = `
            <div class="item-index">${index + 1}</div>
            <div class="item-content">${steps[id]}</div>
            ${!isFixed ? `
            <div class="drag-handle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="5" r="1"></circle>
                    <circle cx="9" cy="12" r="1"></circle>
                    <circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle>
                    <circle cx="15" cy="12" r="1"></circle>
                    <circle cx="15" cy="19" r="1"></circle>
                </svg>
            </div>` : ''}
        `;

        if (!isFixed) {
            setupDragging(item, container);
        }
        container.appendChild(item);
    });
}

// ===================================
// Lògica de Drag & Drop (Sortable)
// ===================================

function setupDragging(item, list) {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        // Actualitzar els números d'ordre
        updateIndexes(list);
        // Netejar validacions prèvies quan es mouen
        list.querySelectorAll('.sortable-item').forEach(el => {
            el.classList.remove('correct', 'incorrect');
        });
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        const dragging = document.querySelector('.dragging');

        // Només permetre drag dins de la mateixa llista
        if (dragging && dragging.parentElement === list) {
            if (afterElement == null) {
                list.appendChild(dragging);
            } else {
                list.insertBefore(dragging, afterElement);
            }
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateIndexes(list) {
    const items = list.querySelectorAll('.sortable-item');
    items.forEach((item, index) => {
        item.querySelector('.item-index').textContent = index + 1;
    });
}

// ===================================
// Comprovació i Reinici
// ===================================

function checkExercise(id) {
    const list = document.getElementById(`list-${id}`);
    const items = [...list.querySelectorAll('.sortable-item')];
    const userOrder = items.map(item => item.dataset.id);
    const correctOrder = exercisesData[id].correctOrder;

    let allCorrect = true;

    items.forEach((item, index) => {
        if (item.dataset.id === correctOrder[index]) {
            item.classList.add('correct');
            item.classList.remove('incorrect');
        } else {
            item.classList.add('incorrect');
            item.classList.remove('correct');
            allCorrect = false;
        }
    });

    if (allCorrect) {
        showResult(id, true, '🎉 Felicitats! Has ordenat el flux de treball correctament.');
    } else {
        showResult(id, false, '❌ L’ordre no és correcte. Revisa els passos marcats en vermell.');
    }
}

function resetExercise(id) {
    initExercise(id);
    const resultDiv = document.getElementById(`result-${id}`);
    resultDiv.classList.remove('show', 'success', 'error');
}

function showResult(id, success, message) {
    const resultDiv = document.getElementById(`result-${id}`);
    resultDiv.textContent = message;
    resultDiv.className = `result-message show ${success ? 'success' : 'error'}`;

    // Efecte de vibració per a errors
    if (!success) {
        const container = document.getElementById(`list-${id}`);
        container.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => container.style.animation = '', 400);
    }
}

// Utilitats
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
