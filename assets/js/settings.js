(function () {
  const defaults = {
    brand_name: 'Palatarius',
    tagline: 'Geek Burgers & Games',
    address: 'Rodovia BR-465 (Antiga Rio-Sao Paulo), Km 39 - Seropedica, RJ',
    phone: '(21) 99759-9132',
    whatsapp_digits: '5521997599132',
    hours: 'Terca a domingo, das 18h as 23h',
    delivery_area: '',
    instagram: '',
    facebook: '',
  };

  const state = {
    settings: null,
  };

  function sanitizeDigits(value) {
    return String(value || '').replace(/\D+/g, '');
  }

  async function loadSettings() {
    if (state.settings) {
      return state.settings;
    }

    let merged = { ...defaults };
    try {
      const response = await fetch('settings.json', { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        if (payload && typeof payload === 'object') {
          merged = { ...merged, ...payload };
        }
      }
    } catch (error) {
      console.warn('Nao foi possivel carregar settings.json', error);
    }

    const digits = sanitizeDigits(merged.whatsapp_digits) || sanitizeDigits(merged.phone) || defaults.whatsapp_digits;
    merged.whatsapp_digits = digits;

    state.settings = merged;
    window.PALATARIUS_SETTINGS = merged;
    return merged;
  }

  function toggleDisplay(elements, visible) {
    elements.forEach((el) => {
      el.style.display = visible ? '' : 'none';
    });
  }

  function applySettings(settings) {
    const brand = settings.brand_name || defaults.brand_name;
    const tagline = settings.tagline || defaults.tagline;
    const address = settings.address || defaults.address;
    const phone = settings.phone || defaults.phone;
    const hours = settings.hours || defaults.hours;
    const delivery = settings.delivery_area || '';
    const whatsappDigits = settings.whatsapp_digits || defaults.whatsapp_digits;
    const whatsappLink = `https://wa.me/${whatsappDigits}`;

    document.querySelectorAll('.js-brand-name').forEach((el) => {
      el.textContent = brand;
    });

    document.querySelectorAll('.js-tagline').forEach((el) => {
      el.textContent = tagline;
    });

    document.querySelectorAll('.js-address').forEach((el) => {
      el.textContent = address;
    });

    document.querySelectorAll('.js-phone').forEach((el) => {
      el.textContent = phone;
    });

    document.querySelectorAll('.js-hours').forEach((el) => {
      el.textContent = hours;
    });

    document.querySelectorAll('.js-delivery-area').forEach((el) => {
      el.textContent = delivery;
    });
    document.querySelectorAll('.js-delivery-wrapper').forEach((el) => {
      el.style.display = delivery ? '' : 'none';
    });

    document.querySelectorAll('.js-whatsapp-link').forEach((el) => {
      el.setAttribute('href', whatsappLink);
      if (!el.dataset.keepText && !el.textContent.trim()) {
        el.textContent = phone;
      }
    });

    const instagram = settings.instagram || '';
    const facebook = settings.facebook || '';

    const instagramLinks = Array.from(document.querySelectorAll('.js-instagram-link'));
    instagramLinks.forEach((el) => {
      if (instagram) {
        el.href = instagram;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    const facebookLinks = Array.from(document.querySelectorAll('.js-facebook-link'));
    facebookLinks.forEach((el) => {
      if (facebook) {
        el.href = facebook;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    const showSeparator = instagram && facebook;
    toggleDisplay(Array.from(document.querySelectorAll('.social-sep')), showSeparator);

    document.querySelectorAll('.social-links').forEach((container) => {
      container.style.display = (instagram || facebook) ? '' : 'none';
    });

    const titleEl = document.querySelector('title[data-title-template]');
    if (titleEl) {
      const template = titleEl.dataset.titleTemplate || titleEl.textContent || '%brand%';
      titleEl.textContent = template
        .replace(/%brand%/g, brand)
        .replace(/%tagline%/g, tagline);
    }
  }

  function highlightNav(settings) {
    const page = document.body ? document.body.getAttribute('data-page') : '';
    if (!page) return;
    const selectors = ['.nav-links a', '.pal-site-nav a'];
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const isActive =
          (page === 'index' && href.includes('index')) ||
          (page === 'curiosidades' && href.includes('curiosidades')) ||
          (page === 'contact' && href.includes('contact')) ||
          (page === 'cardapio' && (href.includes('cardapio') || href.includes('menu'))) ||
          (page === 'admin' && href.includes('admin')) ||
          (page === 'login' && href.includes('login')) ||
          (page === 'register' && href.includes('register'));
        if (isActive) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
  }

  loadSettings()
    .then((settings) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          applySettings(settings);
          highlightNav(settings);
          document.dispatchEvent(new CustomEvent('pal-settings-ready', { detail: settings }));
        });
      } else {
        applySettings(settings);
        highlightNav(settings);
        document.dispatchEvent(new CustomEvent('pal-settings-ready', { detail: settings }));
      }
    })
    .catch((error) => {
      console.error('Erro ao preparar configuracoes do site', error);
    });

  window.PALATARIUS = window.PALATARIUS || {};
  window.PALATARIUS.loadSettings = loadSettings;
  window.PALATARIUS.applySettings = applySettings;
})();
