/**
 * APS Perjuangan - Menu Rendering, Filtering, Search & Modal Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-grid');
  const categoryFiltersContainer = document.getElementById('category-filters');
  const searchInput = document.getElementById('menu-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const searchResultsCounter = document.getElementById('search-counter');
  const menuEmptyState = document.getElementById('menu-empty-state');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  // Modal elements
  const itemModal = document.getElementById('item-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImage = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalWaCs1 = document.getElementById('modal-wa-cs1');
  const modalWaCs2 = document.getElementById('modal-wa-cs2');

  let activeCategory = 'all';
  let searchQuery = '';
  let searchDebounceTimer = null;

  // Initialize Category Filter Tabs
  function initCategoryFilters() {
    if (!categoryFiltersContainer) return;
    categoryFiltersContainer.innerHTML = '';

    MENU_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-btn ${cat.id === activeCategory ? 'active' : ''}`;
      btn.setAttribute('data-category', cat.id);
      
      // Calculate item count per category
      const count = cat.id === 'all' 
        ? MENU_ITEMS.length 
        : MENU_ITEMS.filter(item => item.category === cat.id).length;

      btn.innerHTML = `<span>${cat.name}</span> <span class="badge-count">${count}</span>`;

      btn.addEventListener('click', () => {
        if (activeCategory === cat.id) return;
        activeCategory = cat.id;
        
        // Update active class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Track GA4 event
        if (window.APSTracking) {
          window.APSTracking.trackFilterMenu(cat.name);
        }

        renderMenu();
      });

      categoryFiltersContainer.appendChild(btn);
    });
  }

  // Filter items based on activeCategory and searchQuery
  function getFilteredItems() {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.categoryName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  // Render Menu Grid
  function renderMenu() {
    if (!menuContainer) return;

    const items = getFilteredItems();

    // Update Counter
    if (searchResultsCounter) {
      if (searchQuery.trim() || activeCategory !== 'all') {
        searchResultsCounter.textContent = `Menampilkan ${items.length} dari ${MENU_ITEMS.length} menu`;
        searchResultsCounter.style.display = 'block';
      } else {
        searchResultsCounter.textContent = `Total ${MENU_ITEMS.length} pilihan menu tersedia`;
        searchResultsCounter.style.display = 'block';
      }
    }

    // Toggle Empty State
    if (items.length === 0) {
      menuContainer.innerHTML = '';
      if (menuEmptyState) menuEmptyState.classList.remove('hidden');
      return;
    } else {
      if (menuEmptyState) menuEmptyState.classList.add('hidden');
    }

    // Render cards
    menuContainer.innerHTML = items.map(item => `
      <article class="menu-card" data-id="${item.id}" tabindex="0" role="button" aria-label="Lihat rincian ${item.name}">
        <div class="menu-card-image-wrap">
          <img 
            src="${item.image}" 
            alt="Foto hidangan ${item.name} APS Perjuangan" 
            loading="lazy" 
            class="menu-card-img"
            onerror="handleImageError(this, '${item.fallbackImage}')"
          />
          <span class="menu-card-category-badge">${item.categoryName}</span>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">${item.formattedPrice}</span>
          </div>
          <p class="menu-card-desc">${item.description || '-'}</p>
          <div class="menu-card-footer">
            <span class="menu-card-subtext">Ayam Penyet Surabaya</span>
            <button type="button" class="btn-card-action" aria-label="Lihat rincian menu ${item.name}">
              <span>Detail & Pesan</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards
    document.querySelectorAll('.menu-card').forEach(card => {
      const id = parseInt(card.getAttribute('data-id'), 10);
      const item = MENU_ITEMS.find(m => m.id === id);

      const openDetails = () => {
        if (item) openItemModal(item);
      };

      card.addEventListener('click', openDetails);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetails();
        }
      });
    });
  }

  // Open Item Detail Modal
  function openItemModal(item) {
    if (!item || !itemModal) return;

    modalTitle.textContent = item.name;
    modalCategory.textContent = item.categoryName;
    modalDescription.textContent = item.description || 'Pilihan menu nikmat dan halal dari Ayam Penyet Surabaya Cabang Perjuangan.';
    modalPrice.textContent = item.formattedPrice;

    modalImage.src = item.image;
    modalImage.alt = item.name;
    modalImage.onerror = () => {
      modalImage.src = item.fallbackImage || SVG_FALLBACK_PLACEHOLDER;
    };

    // Construct prefilled WhatsApp links with current item
    const encodedItem = encodeURIComponent(item.name);
    const waText = encodeURIComponent(`Halo, saya ingin menanyakan menu "${item.name}" di APS Perjuangan.`);

    modalWaCs1.href = `https://wa.me/628116180528?text=${waText}`;
    modalWaCs2.href = `https://wa.me/628116816442?text=${waText}`;

    // Track WhatsApp clicks from modal
    modalWaCs1.onclick = () => {
      if (window.APSTracking) {
        window.APSTracking.trackClickWhatsapp('CS 1 (08116180528)', item.name);
      }
    };
    modalWaCs2.onclick = () => {
      if (window.APSTracking) {
        window.APSTracking.trackClickWhatsapp('CS 2 (08116816442)', item.name);
      }
    };

    // Show modal
    itemModal.classList.add('active');
    itemModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Track GA4 view_item event
    if (window.APSTracking) {
      window.APSTracking.trackViewItem(item);
    }
  }

  // Close Item Detail Modal
  function closeItemModal() {
    if (!itemModal) return;
    itemModal.classList.remove('active');
    itemModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeItemModal);
  }

  if (itemModal) {
    itemModal.addEventListener('click', (e) => {
      if (e.target === itemModal) {
        closeItemModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && itemModal && itemModal.classList.contains('active')) {
      closeItemModal();
    }
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;

      // Toggle clear button
      if (clearSearchBtn) {
        if (searchQuery.trim().length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }

      renderMenu();

      // Debounced GA4 Search Event (500ms delay to avoid per-character spam)
      clearTimeout(searchDebounceTimer);
      if (searchQuery.trim().length >= 2) {
        searchDebounceTimer = setTimeout(() => {
          const matchedCount = getFilteredItems().length;
          if (window.APSTracking) {
            window.APSTracking.trackSearchMenu(searchQuery.trim(), matchedCount);
          }
        }, 500);
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const matchedCount = getFilteredItems().length;
        if (window.APSTracking && searchQuery.trim().length > 0) {
          window.APSTracking.trackSearchMenu(searchQuery.trim(), matchedCount);
        }
      }
    });
  }

  // Clear Search Handler
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      searchInput.focus();
      renderMenu();
    });
  }

  // Reset Search Button in Empty State
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      
      // Reset filter button UI
      document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.getAttribute('data-category') === 'all') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      renderMenu();
    });
  }

  // Intersection Observer for view_menu GA4 event
  const menuSection = document.getElementById('menu');
  if (menuSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (window.APSTracking) {
            window.APSTracking.trackViewMenu('scroll');
          }
          observer.unobserve(menuSection);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(menuSection);
  }

  // Initial render
  initCategoryFilters();
  renderMenu();
});

// Image error fallback function
window.handleImageError = function(imgElement, fallbackUrl) {
  if (imgElement.dataset.fallbackTried === 'true') {
    imgElement.src = SVG_FALLBACK_PLACEHOLDER;
  } else {
    imgElement.dataset.fallbackTried = 'true';
    imgElement.src = fallbackUrl || SVG_FALLBACK_PLACEHOLDER;
  }
};
