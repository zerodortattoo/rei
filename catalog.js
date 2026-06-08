// =============================================
// CATALOG PAGE JS — Filters & Sort
// =============================================

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('products-count');

  function updateCount() {
    const visible = document.querySelectorAll('.product-card:not(.hidden)').length;
    if (countEl) countEl.textContent = `Mostrando ${visible} produto${visible !== 1 ? 's' : ''}`;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      products.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const cat = card.getAttribute('data-category');
          card.classList.toggle('hidden', cat !== filter);
        }
      });

      updateCount();
    });
  });

  updateCount();
}

function initSort() {
  const sortSelect = document.getElementById('sort-select');
  const grid = document.getElementById('products-grid');
  if (!sortSelect || !grid) return;

  sortSelect.addEventListener('change', () => {
    const cards = [...grid.querySelectorAll('.product-card')];
    const val = sortSelect.value;

    cards.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price')) || 0;
      const priceB = parseFloat(b.getAttribute('data-price')) || 0;
      if (val === 'price-asc') return priceA - priceB;
      if (val === 'price-desc') return priceB - priceA;
      return 0;
    });

    cards.forEach(c => grid.appendChild(c));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSort();
});
