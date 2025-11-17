// Carregar dados
let alimentos = [];
fetch('data/alimentos.json')
    .then(response => response.json())
    .then(data => {
        alimentos = data;
        renderFoods(alimentos);
    })
    .catch(error => console.error('Erro ao carregar dados:', error));

// Renderizar Cards
function renderFoods(foods) {
    const container = document.getElementById('foodsContainer');
    container.innerHTML = '';
    foods.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-card-header" onclick="toggleDropdown(this)">
                <span>${food.nome}</span>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="food-card-content">
                <img src="${food.imagem}" alt="${food.nome}" style="width:100%; height:200px; object-fit:cover; margin-bottom:10px;">
                <h3>Nome: ${food.nome}</h3>
                <p><strong>Região:</strong> ${food.regiao}</p>
                <div class="nutritional-info">
                    <div class="nutritional-item"><strong>Energia:</strong> ${food.nutricionais.energia}</div>
                    <div class="nutritional-item"><strong>Carboidratos:</strong> ${food.nutricionais.carboidratos}</div>
                    <div class="nutritional-item"><strong>Proteínas:</strong> ${food.nutricionais.proteinas}</div>
                    <div class="nutritional-item"><strong>Gorduras:</strong> ${food.nutricionais.gorduras}</div>
                    <div class="nutritional-item"><strong>Sódio:</strong> ${food.nutricionais.sodio}</div>
                </div>
                <div class="history-section">
                    <h3>História:</h3>
                    <p>${food.historia}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Toggle Dropdown 
function toggleDropdown(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.dropdown-icon');
    
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Fechando: Zera altura e padding
        content.style.maxHeight = '0px';
        content.style.padding = '0px';
        icon.classList.remove('rotated');
    } else {
        // Expandindo: Define padding primeiro, força reflow, depois calcula altura
        content.style.padding = '15px';
        content.offsetHeight; // Força reflow para atualizar scrollHeight
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotated');
    }
}

// Busca (filtro por nome ou valor nutricional)
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = alimentos.filter(food => 
        food.nome.toLowerCase().includes(query) ||
        Object.values(food.nutricionais).some(val => val.toLowerCase().includes(query))
    );
    renderFoods(filtered);
});

// Limpar Busca
function clearSearch() {
    document.getElementById('searchInput').value = '';
    renderFoods(alimentos);

}


