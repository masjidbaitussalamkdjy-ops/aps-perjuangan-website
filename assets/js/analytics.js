/**
 * APS Perjuangan - Google Analytics 4 (GA4) Tracking Module
 * Measurement ID: G-MKHGKC67B9
 *
 * Requirements:
 * - Privacy safe: NO personally identifiable information (PII) is captured or sent.
 * - Single initialization via gtag.js.
 * - Idempotent interaction tracking for core user behaviors.
 */

const GA4_MEASUREMENT_ID = 'G-MKHGKC67B9';

// Safe wrapper around gtag
function sendGAEvent(eventName, eventParams = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
      // Helpful debug log in browser console for verification
      console.log(`[GA4 Event] ${eventName}:`, eventParams);
    } else {
      console.warn(`[GA4 Warning] gtag not loaded. Event ${eventName} was not sent.`, eventParams);
    }
  } catch (err) {
    console.error('[GA4 Error] Failed to dispatch event:', err);
  }
}

// Track state to prevent duplicate rapid events
const AnalyticsState = {
  hasTrackedViewMenu: false,
  lastSearchTerm: ''
};

/**
 * 1. view_menu: Visitor reaches or opens the menu section
 * @param {string} trigger - 'scroll' | 'nav_click' | 'hero_cta'
 */
function trackViewMenu(trigger = 'scroll') {
  if (AnalyticsState.hasTrackedViewMenu) return; // Trigger once per visit
  AnalyticsState.hasTrackedViewMenu = true;

  sendGAEvent('view_menu', {
    trigger_source: trigger,
    menu_categories_count: 4,
    total_items_available: 90
  });
}

/**
 * 2. search_menu: Visitor searches the menu catalogue
 * @param {string} searchTerm - Query string searched
 * @param {number} resultsCount - Number of matched items
 */
function trackSearchMenu(searchTerm, resultsCount = 0) {
  const cleanTerm = (searchTerm || '').trim();
  if (!cleanTerm || cleanTerm === AnalyticsState.lastSearchTerm) return;
  AnalyticsState.lastSearchTerm = cleanTerm;

  sendGAEvent('search_menu', {
    search_term: cleanTerm,
    results_count: resultsCount
  });
}

/**
 * 3. filter_menu: Visitor selects a menu category
 * @param {string} categoryName - Category label selected
 */
function trackFilterMenu(categoryName) {
  sendGAEvent('filter_menu', {
    menu_category: categoryName
  });
}

/**
 * 4. view_item: Visitor views detail of a specific menu dish
 * @param {object} item - Menu item object { name, categoryName, price }
 */
function trackViewItem(item) {
  if (!item) return;
  sendGAEvent('view_item', {
    item_name: item.name,
    menu_category: item.categoryName,
    price: item.price
  });
}

/**
 * 5. click_whatsapp: Visitor clicks a WhatsApp button
 * @param {string} contactOption - 'CS 1 (08116180528)' | 'CS 2 (08116816442)' | 'Header / Hero'
 * @param {string} [itemName] - Optional dish name if ordered directly from dish modal
 */
function trackClickWhatsapp(contactOption, itemName = null) {
  const params = {
    contact_option: contactOption,
    action: 'redirect_whatsapp'
  };
  if (itemName) {
    params.item_name = itemName;
  }
  sendGAEvent('click_whatsapp', params);
}

/**
 * 6. click_maps: Visitor clicks Google Maps location link
 * @param {string} linkType - 'location_card' | 'directions_button' | 'footer'
 */
function trackClickMaps(linkType = 'directions_button') {
  sendGAEvent('click_maps', {
    link_type: linkType,
    destination: 'APS Perjuangan Cirebon'
  });
}

// Export for global access in frontend scripts
window.APSTracking = {
  trackViewMenu,
  trackSearchMenu,
  trackFilterMenu,
  trackViewItem,
  trackClickWhatsapp,
  trackClickMaps
};
