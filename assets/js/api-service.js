/**
 * ApiService - Centralized API Layer
 * Interacts with the backend proxy /api/fpt/*
 */
const ApiService = {
  baseUrl: '/api/fpt',
  timeout: 10000,

  async fetchWithTimeout(endpoint, options = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(id);
      console.error(`[ApiService] Request to ${endpoint} failed:`, error);
      throw error;
    }
  },

  async getBanners() {
    return this.fetchWithTimeout('/banners');
  },

  async getPackages() {
    return this.fetchWithTimeout('/packages');
  },

  async getPromotions() {
    return this.fetchWithTimeout('/promotions');
  },

  async getMenus() {
    return this.fetchWithTimeout('/menus');
  },

  async getSettings() {
    return this.fetchWithTimeout('/footer/settings');
  },

  async getFooterLinks() {
    return this.fetchWithTimeout('/footer/links');
  },

  async getFaqs() {
    return this.fetchWithTimeout('/faqs');
  },

  async submitRegistration(data) {
    return this.fetchWithTimeout('/registrations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};

// Export to global scope
window.ApiService = ApiService;
