'use strict';

const TRANSLATIONS = {
    es: {
        'skip-link':          'Ir al contenido',
        'header-h1':          'Creá tu Figurita del Mundial',
        'header-sub':         'Generador CROMO/FIGURITA con Inteligencia Artificial · Gratis · Alta Resolución',
        'howto-h2':           '¿Cómo crear tu cromo del Mundial?',
        'howto-1':            '<strong>Elegi el mundial</strong> - Hay varios diseños para elegir',
        'howto-2':            '<strong>Subí tu foto</strong> — Usá <a href="https://www.iloveimg.com/remove-background" target="_blank" rel="noopener noreferrer">IloveBGRemove</a> gratis para quitar el fondo y después subila acá',
        'howto-3':            '<strong>Personalizá tu figurita</strong> — Elegí tu país, colores y escribí tu nombre y datos',
        'howto-4':            '<strong>Descargá gratis</strong> — PNG en alta resolución listo para imprimir o compartir en redes',
        'card-photo-h3':      'Foto del jugador',
        'removebg-tip':       '💡 Te recomendamos quitar el fondo gratis en <a href="https://www.iloveimg.com/remove-background" target="_blank" rel="noopener noreferrer">IloveBGRemove</a> antes de subir tu foto.',
        'upload-btn-span':    '📁 Subir foto',
        'label-scale':        'Tamaño',
        'label-vertical':     'Vertical',
        'label-horizontal':   'Horizontal',
        'card-datos-h3':      'Datos del jugador',
        'label-name':         'Nombre',
        'label-date':         'Fecha',
        'label-height':       'Altura',
        'label-weight':       'Peso',
        'label-club':         'Club',
        'card-country-h3':    'País',
        'country-search-ph':  'Buscar país...',
        'dl-btn':             'Descargar PNG',
        'hint':               'Vista previa en tiempo real',
        'dl-btn-mobile':      'Descargar PNG',
        // FAQ
        'faq-h2':             'Preguntas frecuentes',
        'faq-1-q':            '¿Es gratis el generador de figuritas del Mundial 2026?',
        'faq-1-a':            'Sí, el generador es completamente gratuito. Podés crear y descargar tu figurita sin pagar nada.',
        'faq-2-q':            '¿Cómo funciona la IA para quitar el fondo?',
        'faq-2-a':            'Usamos <strong>rembg</strong>, una tecnología de Inteligencia Artificial que detecta automáticamente la figura humana en tu foto y elimina el fondo en segundos, sin necesidad de editar manualmente.',
        'faq-3-q':            '¿Qué países puedo elegir para mi figurita?',
        'faq-3-a':            'Están disponibles todos los seleccionados clasificados al Mundial 2026, incluyendo Argentina, Brasil, México, España, Francia, Alemania y muchos más.',
        'faq-4-q':            '¿En qué resolución se descarga la figurita?',
        'faq-4-a':            'La figurita se descarga en alta resolución (1650×2310 px), perfecta para imprimir o compartir en redes sociales.',
        // Footer
        'footer-support-p1':  '¿Te gustó tu figurita?',
        'footer-support-p2':  'Podés ayudarme con unos pesitos',
        'footer-privacy':     'Privacidad',
        'footer-terms':       'Términos',
        'footer-contact':     'Contacto',
        'footer-credits':     'Desarrollado con amor por <strong>Baltasar</strong>',
        // Modal compartir
        'modal-title':        '¡Tu figurita está lista!',
        'modal-sub':          'Compartila en tus redes o volvé a descargarla',
        'modal-ig-tip':       '📲 La imagen se descargó. Abrí Instagram, creá una historia o post y subila desde tu galería.',
        'modal-download':     '⬇ Descargar de nuevo',
        // JS dinámico (editor.js)
        'loading-edition':    'Cargando edición...',
        'group-label':        'Grupo',
        'no-results':         'Sin resultados',
        'group-code':         'Grupo',   // "ARG · Grupo K"
        'error-image':        'Error al generar la imagen. Intentá de nuevo.',
        'share-twitter':      '¡Mirá mi figurita del {edition}! 🌍⚽ Creá la tuya gratis en mundialhub.vercel.app #Mundial2026 #Figurita',
        'share-whatsapp':     '¡Mirá mi figurita del {edition}! 🌍⚽ https://mundialhub.vercel.app',
        'tab-coming-soon':    'Próximamente',
        'tab-locked':         'BLOQUEADO',
        // Edición Qatar 2022
        'q-bg-orange':        'Naranja',
        'q-bg-blue':          'Azul',
        'q-pos-gk':           'Arquero',
        'q-pos-def':          'Defensa',
        'q-pos-mid':          'Mediocampo',
        'q-pos-fwd':          'Delantero',
        'q-card-bg-h3':       'Fondo',
        'q-card-pos-h3':      'Posición',
        'q-card-debut-h3':    'Debut',
        'q-label-debut':      'Año debut',
        // Edición 2026
        'e26-card-colors-h3': 'Colores',
        'e26-label-bg':       'Fondo',
        'e26-span-bg':        'Color de fondo',
        'e26-label-c2':       'Número 2',
        'e26-span-c2':        'Color del 2',
        'e26-label-c6':       'Número 6',
        'e26-span-c6':        'Color del 6',
        'e26-label-cosito':   'Intermedio',
        'e26-span-cosito':    'Color intermedio',
        'e26-card-pos-h3':    'Posición',
        'e26-pos-gk':         'Arquero',
        'e26-pos-def':        'Defensa',
        'e26-pos-mid':        'Mediocampo',
        'e26-pos-fwd':        'Delantero',
        // Edición Extra Card
        'ec-card-rarity-h3':  'Rareza',
        'ec-rar-com':         'Común',
        'ec-rar-bro':         'Bronce',
        'ec-rar-pla':         'Plata',
        'ec-rar-oro':         'Oro',
        // Placeholders / aria-labels
        'ph-name':            'NOMBRE',
        'ph-date':            'dd-mm-aaaa',
        'ph-height':          '1,75m',
        'ph-club':            'NOMBRE DEL CLUB',
    },

    en: {
        'skip-link':          'Skip to content',
        'header-h1':          'Create Your World Cup Sticker',
        'header-sub':         'AI-Powered Sticker/Card Generator · Free · High Resolution',
        'howto-h2':           'How to create your World Cup card?',
        'howto-1':            '<strong>Choose the World Cup</strong> - Several designs to pick from',
        'howto-2':            '<strong>Upload your photo</strong> — Use <a href="https://www.iloveimg.com/remove-background" target="_blank" rel="noopener noreferrer">IloveBGRemovw</a> for free to remove the background and then upload it here',
        'howto-3':            '<strong>Customize your sticker</strong> — Choose your country, colors and write your name and stats',
        'howto-4':            '<strong>Download for free</strong> — High-resolution PNG ready to print or share on social media',
        'card-photo-h3':      'Player photo',
        'removebg-tip':       '💡 We recommend removing the background for free at <a href="https://www.iloveimg.com/remove-background" target="_blank" rel="noopener noreferrer">IloveBGRemove</a> before uploading your photo.',
        'upload-btn-span':    '📁 Upload photo',
        'label-scale':        'Size',
        'label-vertical':     'Vertical',
        'label-horizontal':   'Horizontal',
        'card-datos-h3':      'Player stats',
        'label-name':         'Name',
        'label-date':         'Date',
        'label-height':       'Height',
        'label-weight':       'Weight',
        'label-club':         'Club',
        'card-country-h3':    'Country',
        'country-search-ph':  'Search country...',
        'dl-btn':             'Download PNG',
        'hint':               'Live preview',
        'dl-btn-mobile':      'Download PNG',
        'faq-h2':             'Frequently asked questions',
        'faq-1-q':            'Is the World Cup 2026 sticker generator free?',
        'faq-1-a':            'Yes, the generator is completely free. You can create and download your sticker without paying anything.',
        'faq-2-q':            'How does the AI background remover work?',
        'faq-2-a':            'We use <strong>rembg</strong>, an AI technology that automatically detects the person in your photo and removes the background in seconds, with no manual editing needed.',
        'faq-3-q':            'Which countries can I choose for my sticker?',
        'faq-3-a':            'All teams qualified for the 2026 World Cup are available, including Argentina, Brazil, Mexico, Spain, France, Germany and many more.',
        'faq-4-q':            'What resolution does the sticker download in?',
        'faq-4-a':            'The sticker downloads in high resolution (1650×2310 px), perfect for printing or sharing on social media.',
        'footer-support-p1':  'Did you like your sticker?',
        'footer-support-p2':  'You can support me with a small donation',
        'footer-privacy':     'Privacy',
        'footer-terms':       'Terms',
        'footer-contact':     'Contact',
        'footer-credits':     'Developed with love by <strong>Baltasar</strong>',
        'modal-title':        'Your sticker is ready!',
        'modal-sub':          'Share it on social media or download it again',
        'modal-ig-tip':       '📲 The image has been downloaded. Open Instagram, create a story or post and upload it from your gallery.',
        'modal-download':     '⬇ Download again',
        'loading-edition':    'Loading edition...',
        'group-label':        'Group',
        'no-results':         'No results',
        'group-code':         'Group',
        'error-image':        'Error generating the image. Please try again.',
        'share-twitter':      'Check out my {edition} sticker! 🌍⚽ Create yours for free at mundialhub.vercel.app #WorldCup2026 #Sticker',
        'share-whatsapp':     'Check out my {edition} sticker! 🌍⚽ https://mundialhub.vercel.app',
        'tab-coming-soon':    'Coming soon',
        'tab-locked':         'LOCKED',
        'q-bg-orange':        'Orange',
        'q-bg-blue':          'Blue',
        'q-pos-gk':           'Goalkeeper',
        'q-pos-def':          'Defender',
        'q-pos-mid':          'Midfielder',
        'q-pos-fwd':          'Forward',
        'q-card-bg-h3':       'Background',
        'q-card-pos-h3':      'Position',
        'q-card-debut-h3':    'Debut',
        'q-label-debut':      'Debut year',
        'e26-card-colors-h3': 'Colors',
        'e26-label-bg':       'Background',
        'e26-span-bg':        'Background color',
        'e26-label-c2':       'Number 2',
        'e26-span-c2':        'Color of the 2',
        'e26-label-c6':       'Number 6',
        'e26-span-c6':        'Color of the 6',
        'e26-label-cosito':   'Middle',
        'e26-span-cosito':    'Middle color',
        'e26-card-pos-h3':    'Position',
        'e26-pos-gk':         'Goalkeeper',
        'e26-pos-def':        'Defender',
        'e26-pos-mid':        'Midfielder',
        'e26-pos-fwd':        'Forward',
        'ec-card-rarity-h3':  'Rarity',
        'ec-rar-com':         'Common',
        'ec-rar-bro':         'Bronze',
        'ec-rar-pla':         'Silver',
        'ec-rar-oro':         'Gold',
        'ph-name':            'YOUR NAME',
        'ph-date':            'dd-mm-yyyy',
        'ph-height':          '1.75m',
        'ph-club':            'CLUB NAME',
    },
};

let currentLang = localStorage.getItem('lang') || 'es';

function t(key) {
    return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS['es'][key] ?? key;
}

function applyStaticTranslations() {
    const lang = currentLang;

    // skip-link
    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = t('skip-link');

    // Header
    const h1 = document.querySelector('header h1');
    if (h1) h1.textContent = t('header-h1');
    const headerSub = document.querySelector('.header-sub');
    if (headerSub) headerSub.textContent = t('header-sub');

    // How-to
    const howtoH2 = document.querySelector('.how-to h2');
    if (howtoH2) howtoH2.textContent = t('howto-h2');
    const howtoItems = document.querySelectorAll('.how-to ol li');
    ['howto-1','howto-2','howto-3','howto-4'].forEach((key, i) => {
        if (howtoItems[i]) howtoItems[i].innerHTML = t(key);
    });

    // Card foto
    const cardPhotoH3 = document.querySelector('.card--purple h3');
    if (cardPhotoH3) cardPhotoH3.textContent = t('card-photo-h3');
    const removebgTip = document.querySelector('.removebg-tip');
    if (removebgTip) removebgTip.innerHTML = t('removebg-tip');
    const uploadSpan = document.querySelector('.upload-btn span');
    if (uploadSpan) uploadSpan.textContent = t('upload-btn-span');

    // Sliders labels
    const sScaleLabel = document.querySelector('label[for="sScale"]');
    if (sScaleLabel) sScaleLabel.textContent = t('label-scale');
    const sYLabel = document.querySelector('label[for="sY"]');
    if (sYLabel) sYLabel.textContent = t('label-vertical');
    const sXLabel = document.querySelector('label[for="sX"]');
    if (sXLabel) sXLabel.textContent = t('label-horizontal');

    // Card datos
    const cardDatosH3 = document.querySelector('#cardDatos h3');
    if (cardDatosH3) cardDatosH3.textContent = t('card-datos-h3');
    const nameLabel = document.querySelector('label[for="tName"]');
    if (nameLabel) nameLabel.textContent = t('label-name');
    const dateLabel = document.querySelector('label[for="tDate"]');
    if (dateLabel) dateLabel.textContent = t('label-date');
    const heightLabel = document.querySelector('label[for="tHeight"]');
    if (heightLabel) heightLabel.textContent = t('label-height');
    const weightLabel = document.querySelector('label[for="tWeight"]');
    if (weightLabel) weightLabel.textContent = t('label-weight');
    const clubLabel = document.querySelector('label[for="tClub"]');
    if (clubLabel) clubLabel.textContent = t('label-club');

    // Placeholders inputs
    const tName = document.getElementById('tName');
    if (tName) tName.placeholder = t('ph-name');
    const tDate = document.getElementById('tDate');
    if (tDate) tDate.placeholder = t('ph-date');
    const tHeight = document.getElementById('tHeight');
    if (tHeight) tHeight.placeholder = t('ph-height');
    const tClub = document.getElementById('tClub');
    if (tClub) tClub.placeholder = t('ph-club');

    // Card país
    const cardCountryH3 = document.querySelector('.card--green h3');
    if (cardCountryH3) cardCountryH3.textContent = t('card-country-h3');
    const countrySearch = document.getElementById('countrySearch');
    if (countrySearch) countrySearch.placeholder = t('country-search-ph');

    // Botones descarga
    const dlBtn = document.getElementById('dlBtn');
    if (dlBtn) dlBtn.textContent = t('dl-btn');
    const dlBtnMobile = document.getElementById('dlBtnMobile');
    if (dlBtnMobile) dlBtnMobile.textContent = t('dl-btn-mobile');

    // Hint
    const hint = document.querySelector('.hint');
    if (hint) hint.textContent = t('hint');

    // FAQ
    const faqH2 = document.querySelector('.faq-section h2');
    if (faqH2) faqH2.textContent = t('faq-h2');
    const faqDetails = document.querySelectorAll('.faq-section details');
    [
        ['faq-1-q','faq-1-a'],
        ['faq-2-q','faq-2-a'],
        ['faq-3-q','faq-3-a'],
        ['faq-4-q','faq-4-a'],
    ].forEach(([qKey, aKey], i) => {
        if (!faqDetails[i]) return;
        const summary = faqDetails[i].querySelector('summary');
        const p = faqDetails[i].querySelector('p');
        if (summary) summary.textContent = t(qKey);
        if (p) p.innerHTML = t(aKey);
    });

    // Footer
    const footerPs = document.querySelectorAll('.footer-section.support p');
    if (footerPs[0]) footerPs[0].textContent = t('footer-support-p1');
    if (footerPs[1]) footerPs[1].textContent = t('footer-support-p2');
    const footerLinks = document.querySelectorAll('.footer-section.links nav a');
    const footerLinkKeys = ['footer-privacy','footer-terms','footer-contact'];
    footerLinkKeys.forEach((key, i) => {
        if (footerLinks[i]) footerLinks[i].textContent = t(key);
    });
    const creditsP = document.querySelector('.footer-section.credits p');
    if (creditsP) creditsP.innerHTML = t('footer-credits');

    // Modal compartir
    const modalTitle = document.querySelector('.share-modal__title');
    if (modalTitle) modalTitle.textContent = t('modal-title');
    const modalSub = document.querySelector('.share-modal__sub');
    if (modalSub) modalSub.textContent = t('modal-sub');
    const igTip = document.getElementById('igTip');
    if (igTip) igTip.textContent = t('modal-ig-tip');
    const modalDownload = document.getElementById('modalDownload');
    if (modalDownload) modalDownload.textContent = t('modal-download');

    // lang attribute en <html>
    document.documentElement.lang = lang;
}

function applyEditionTranslations() {
    // --- Qatar 2022 ---
    document.querySelectorAll('.q-bg-btn').forEach(btn => {
        const key = 'q-bg-' + btn.dataset.bg;
        if (TRANSLATIONS[currentLang][key]) btn.textContent = t(key);
    });
    document.querySelectorAll('.q-pos-btn').forEach(btn => {
        const key = 'q-pos-' + btn.dataset.pos;
        if (TRANSLATIONS[currentLang][key]) btn.textContent = t(key);
    });
    const qBgH3 = document.querySelector('.card--qatar-bg h3');
    if (qBgH3) qBgH3.textContent = t('q-card-bg-h3');
    const qPosH3 = document.querySelector('.card--qatar-pos h3');
    if (qPosH3) qPosH3.textContent = t('q-card-pos-h3');
    const debutLabel = document.querySelector('label[for="tDebut"]');
    if (debutLabel) debutLabel.textContent = t('q-label-debut');
    // heading "Debut" card
    document.querySelectorAll('.edition-controls h3').forEach(h3 => {
        if (h3.textContent.trim() === 'Debut') h3.textContent = t('q-card-debut-h3');
    });

    // --- Edición 2026 ---
    const colorsH3 = document.querySelector('.card--blue.edition-controls h3');
    if (colorsH3) colorsH3.textContent = t('e26-card-colors-h3');
    const posH3 = document.querySelector('.card--red.edition-controls h3');
    if (posH3) posH3.textContent = t('e26-card-pos-h3');

    const labelMap26 = {
        cBg: ['e26-label-bg', 'e26-span-bg'],
        c2:  ['e26-label-c2', 'e26-span-c2'],
        c6:  ['e26-label-c6', 'e26-span-c6'],
        cCosito: ['e26-label-cosito', 'e26-span-cosito'],
    };
    Object.entries(labelMap26).forEach(([id, [labelKey, spanKey]]) => {
        const lbl = document.querySelector(`label[for="${id}"]`);
        if (lbl) lbl.textContent = t(labelKey);
        const inp = document.getElementById(id);
        if (inp) {
            const span = inp.nextElementSibling;
            if (span && span.tagName === 'SPAN') span.textContent = t(spanKey);
        }
    });

    document.querySelectorAll('.q-pos-btn').forEach(btn => {
        const key = 'e26-pos-' + btn.dataset.pos;
        if (TRANSLATIONS[currentLang][key]) btn.textContent = t(key);
    });

    // --- Extra Card ---
    const rarityH3 = document.querySelector('.card--blue.edition-controls h3');
    if (rarityH3 && rarityH3.textContent.match(/Rareza|Rarity/)) {
        rarityH3.textContent = t('ec-card-rarity-h3');
    }
    document.querySelectorAll('.q-ext-btn').forEach(btn => {
        const key = 'ec-rar-' + btn.dataset.rareza;
        if (TRANSLATIONS[currentLang][key]) btn.textContent = t(key);
    });
}

function patchEditorI18n() {
    const origShowLoader = window.showEditionLoader;
    if (origShowLoader) {
        window.showEditionLoader = function() {
            origShowLoader();
            const loaderText = document.querySelector('.edition-loader__text');
            if (loaderText) loaderText.textContent = t('loading-edition');
        };
    }

    const dropdown = document.getElementById('countryDropdown');
    if (dropdown) {
        let _ddBusy = false;
        new MutationObserver(() => {
            if (_ddBusy) return;
            _ddBusy = true;
            dropdown.querySelectorAll('.dd-group-label').forEach(el => {
                el.textContent = el.textContent.replace(/^Grupo\s|^Group\s/, t('group-label') + ' ');
            });
            const empty = dropdown.querySelector('.dd-empty');
            if (empty) empty.textContent = t('no-results');
            _ddBusy = false;
        }).observe(dropdown, { childList: true, subtree: false });
    }
    function patchSelectCountry() {
        const _origSelectCountry = window.selectCountry;
        if (typeof _origSelectCountry === 'function') {
            window.selectCountry = function(country) {
                _origSelectCountry(country);
                const selectedDiv = document.getElementById('selectedCountry');
                if (!selectedDiv) return;
                const codeSpan = selectedDiv.querySelector('.sc-code');
                if (codeSpan) {
                    codeSpan.textContent = codeSpan.textContent
                        .replace(/· Grupo\s/, '· ' + t('group-code') + ' ')
                        .replace(/· Group\s/, '· ' + t('group-code') + ' ');
                }
            };
        } else {
            // editor.js todavía no terminó de cargar, reintentar en el próximo tick
            setTimeout(patchSelectCountry, 50);
        }
    }
    patchSelectCountry();

    // 4. Parche: tabs — "LOCKED" y "Coming soon"
    //    subtree:true + modificar texto/atributos dentro = loop infinito.
    //    Usamos subtree:false (renderTabs reemplaza todo el innerHTML) + guard.
    const tabsContainer = document.getElementById('wcTabsContainer');
    if (tabsContainer) {
        let _tabsBusy = false;
        new MutationObserver(() => {
            if (_tabsBusy) return;
            _tabsBusy = true;
            tabsContainer.querySelectorAll('.lock-icon').forEach(el => {
                el.textContent = t('tab-locked');
            });
            tabsContainer.querySelectorAll('.wc-tab[aria-disabled="true"]').forEach(btn => {
                btn.title = t('tab-coming-soon');
            });
            _tabsBusy = false;
        }).observe(tabsContainer, { childList: true, subtree: false });
    }

    // 5. Parche: editionControlsSlot — re-traducir cuando se inyectan controles nuevos.
    //    Guard para no re-entrar si applyEditionTranslations modifica el DOM observado.
    const controlsSlot = document.getElementById('editionControlsSlot');
    if (controlsSlot) {
        let _slotBusy = false;
        new MutationObserver(() => {
            if (_slotBusy) return;
            _slotBusy = true;
            applyEditionTranslations();
            _slotBusy = false;
        }).observe(controlsSlot, { childList: true, subtree: false });
    }

    // 6. Parche: dlBtn alert
    const dlBtn = document.getElementById('dlBtn');
    if (dlBtn) {
        dlBtn.addEventListener('click', function handler(e) {
            // Interceptamos solo si window.alert se llama — lo hacemos con proxy
        }, { capture: true });
    }
    // Sobrescribir window.alert para traducirlo
    const origAlert = window.alert.bind(window);
    window.alert = function(msg) {
        const esErr = 'Error al generar la imagen. Intentá de nuevo.';
        if (msg === esErr) return origAlert(t('error-image'));
        return origAlert(msg);
    };

    // 7. Parche: textos de Twitter y WhatsApp share
    const shareTwitter = document.getElementById('shareTwitter');
    const shareWhatsapp = document.getElementById('shareWhatsapp');

    if (shareTwitter) {
        // Clonar para quitar el listener original y poner uno nuevo
        const clone = shareTwitter.cloneNode(true);
        shareTwitter.parentNode.replaceChild(clone, shareTwitter);
        clone.addEventListener('click', () => {
            const editionName = (window.activeEdition || {}).name || '';
            const txt = encodeURIComponent(t('share-twitter').replace('{edition}', editionName));
            window.open('https://twitter.com/intent/tweet?text=' + txt, '_blank');
        });
    }

    if (shareWhatsapp) {
        const clone = shareWhatsapp.cloneNode(true);
        shareWhatsapp.parentNode.replaceChild(clone, shareWhatsapp);
        clone.addEventListener('click', () => {
            const editionName = (window.activeEdition || {}).name || '';
            const txt = encodeURIComponent(t('share-whatsapp').replace('{edition}', editionName));
            window.open('https://wa.me/?text=' + txt, '_blank');
        });
    }
}

/* ─── Toggle de idioma ──────────────────────────────────────── */
function createLangToggle() {
    const btn = document.createElement('button');
    btn.id        = 'langToggle';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.innerHTML = currentLang === 'es' ? '🇬🇧 EN' : '🇦🇷 ES';

    btn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('lang', currentLang);
        btn.innerHTML = currentLang === 'es' ? '🇬🇧 EN' : '🇦🇷 ES';
        applyStaticTranslations();
        applyEditionTranslations();
    });

    // Insertar en el header
    const header = document.querySelector('header');
    if (header) header.appendChild(btn);
}

/* ─── CSS del botón ─────────────────────────────────────────── */
function injectLangToggleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .lang-toggle {
            position: absolute;
            top: 0;
            right: 0;
            background: #000;
            color: #fff;
            border: 2px solid #000;
            border-radius: 8px;
            padding: 6px 14px;
            font-family: 'Barlow', sans-serif;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            letter-spacing: .04em;
            transition: background .15s, color .15s;
            z-index: 10;
        }
        .lang-toggle:hover {
            background: var(--theme-primary, #17277f);
            border-color: var(--theme-primary, #17277f);
            color: #fff;
        }
        header { position: relative; }
    `;
    document.head.appendChild(style);
}

/* ─── Init ──────────────────────────────────────────────────── */
// Esperar a que el DOM y editor.js estén listos
document.addEventListener('DOMContentLoaded', () => {
    injectLangToggleCSS();
    createLangToggle();
    applyStaticTranslations();

    // Parchear editor.js una vez que haya cargado (está al final del body, así que ya está)
    patchEditorI18n();

    // Aplicar idioma inicial a controles de edición si ya se renderizaron
    applyEditionTranslations();
});
