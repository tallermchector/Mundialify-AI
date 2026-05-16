const formatHeight = (value) => {
    let v = value.replace('.', ',').replace(/[^0-9,]/g, '');
    return v.slice(0, 4);
};

const formatWeight = (value) => {
    return value.replace(/\D/g, '').slice(0, 3);
};

const Edition2026 = {

    id: 'edition-2026',
    name: 'Mundial 2026',
    downloadSuffix: '2026',

    flagsPath: 'https://mundialhub.vercel.app/frontend/assets/flags/',

    theme: {
        '--theme-primary':    '#17277f',
        '--theme-accent':     '#43c4c9',
        '--theme-accent2':    '#e5ff00',
        '--theme-card-top':   '#17277f',
        '--theme-tab-active': '#17277f',
        '--theme-rainbow':    'linear-gradient(to right, #2651ff 0% 16.6%, #ea0001 16.6% 33.2%, #e5ff00 33.2% 49.8%, #6d00fc 49.8% 66.4%, #019afa 66.4% 83%, #00c93b 83% 100%)',
        '--theme-how-to-bg':  'linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0)), linear-gradient(135deg, #e5ff00, #019afa)',
        '--theme-bg-body':    '#ffffff',
        '--theme-header-txt': '#000000',
    },

    groups: {
        A: [
            { code: 'MEX', name: 'México' },
            { code: 'RSA', name: 'Sudáfrica' },
            { code: 'KOR', name: 'Corea del Sur' },
            { code: 'CZE', name: 'Chequia' },
        ],
        B: [
            { code: 'CAN', name: 'Canadá' },
            { code: 'BIH', name: 'Bosnia y Herzegovina' },
            { code: 'QAT', name: 'Qatar' },
            { code: 'SUI', name: 'Suiza' },
        ],
        C: [
            { code: 'BRA', name: 'Brasil' },
            { code: 'MAR', name: 'Marruecos' },
            { code: 'HAI', name: 'Haití' },
            { code: 'SCO', name: 'Escocia' },
        ],
        D: [
            { code: 'USA', name: 'Estados Unidos' },
            { code: 'PAR', name: 'Paraguay' },
            { code: 'AUS', name: 'Australia' },
            { code: 'TUR', name: 'Turquía' },
        ],
        E: [
            { code: 'GER', name: 'Alemania' },
            { code: 'CUW', name: 'Curazao' },
            { code: 'CIV', name: 'Costa de Marfil' },
            { code: 'ECU', name: 'Ecuador' },
        ],
        F: [
            { code: 'NED', name: 'Países Bajos' },
            { code: 'JPN', name: 'Japón' },
            { code: 'SWE', name: 'Suecia' },
            { code: 'TUN', name: 'Túnez' },
        ],
        G: [
            { code: 'BEL', name: 'Bélgica' },
            { code: 'EGY', name: 'Egipto' },
            { code: 'IRI', name: 'Irán' },
            { code: 'NZL', name: 'Nueva Zelanda' },
        ],
        H: [
            { code: 'ESP', name: 'España' },
            { code: 'CPV', name: 'Cabo Verde' },
            { code: 'KSA', name: 'Arabia Saudita' },
            { code: 'URU', name: 'Uruguay' },
        ],
        I: [
            { code: 'FRA', name: 'Francia' },
            { code: 'SEN', name: 'Senegal' },
            { code: 'IRQ', name: 'Irak' },
            { code: 'NOR', name: 'Noruega' },
        ],
        J: [
            { code: 'ARG', name: 'Argentina' },
            { code: 'ALG', name: 'Argelia' },
            { code: 'AUT', name: 'Austria' },
            { code: 'JOR', name: 'Jordania' },
        ],
        K: [
            { code: 'POR', name: 'Portugal' },
            { code: 'COD', name: 'DR Congo' },
            { code: 'UZB', name: 'Uzbekistán' },
            { code: 'COL', name: 'Colombia' },
        ],
        L: [
            { code: 'ENG', name: 'Inglaterra' },
            { code: 'CRO', name: 'Croacia' },
            { code: 'GHA', name: 'Ghana' },
            { code: 'PAN', name: 'Panamá' },
        ],
        Extra: [
            { code: 'VEN', name: 'Venezuela' },
            { code: 'IRL', name: 'Irlanda' },
            { code: 'ITA', name: 'Italia' },
            { code: 'POL', name: 'Polonia'},
        ],
    },

    positions: {
        gk: { label: 'Goalkeeper', rectColor: '#894192' },
        def: { label: 'Defender', rectColor: '#f4294b' },
        mid: { label: 'Midfielder', rectColor: '#f76a20' },
        fwd: { label: 'Forward',    rectColor: '#1e8689' },
    },

    defaultState: {
        photoScale: 110,
        photoY:     -80,
        photoX:     null,   // null = centrar automáticamente hasta que ShirtAlign escriba coord absoluta
        cBg:        '#65c8c9',
        useGoldBg:  false,
        c2:         '#74a9db',
        c6:         '#ffffff',
        cCosito:    '#9ab7dd',
        position:   'mid',
        name:       'YOUR NAME',
        day: '1',
        month: '1',
        year: '2000',
        height:     '1.75',
        weight:     '70',
        club:       'MY CLUB',
        code:       'ARG',
        bgVariant:  null,
        showShirt:  true,
        shirtY:     0,
    },

    layerFiles: [
        { id: 'gold', src: 'https://mundialhub.vercel.app/frontend/assets/fondogold.png' },
        { id: 'marcogold', src: 'https://mundialhub.vercel.app/frontend/assets/marcogold.png'},
        { id: 'num2',   src: 'https://mundialhub.vercel.app/frontend/assets/2.png'                    },
        { id: 'num6',   src: 'https://mundialhub.vercel.app/frontend/assets/6.png'                    },
        { id: 'marco',  src: 'https://mundialhub.vercel.app/frontend/assets/marco.png'                },
        { id: 'marco6', src: 'https://mundialhub.vercel.app/frontend/assets/marco6.png'               },
        { id: 'cosito', src: 'https://mundialhub.vercel.app/frontend/assets/cosito.png'               },
        { id: 'rectA',  src: 'https://mundialhub.vercel.app/frontend/assets/svg/rectanguloarriba.svg' },
        { id: 'rectB',  src: 'https://mundialhub.vercel.app/frontend/assets/svg/rectanguloabajo.svg'  },
        { id: 'fifa',   src: 'https://mundialhub.vercel.app/frontend/assets/svg/logofifa.svg'         },
        { id: 'panini', src: 'https://mundialhub.vercel.app/frontend/assets/svg/panini.svg'           },
    ],

    buildTints(imgs, state) {
        const tint = (src, hex) => {
            if (!src) return null;
            const oc = document.createElement('canvas');
            oc.width = 1650; oc.height = 2310;
            const ox = oc.getContext('2d');
            ox.fillStyle = hex;
            ox.fillRect(0, 0, 1650, 2310);
            ox.globalCompositeOperation = 'destination-in';
            ox.drawImage(src, 0, 0, 1650, 2310);
            return oc;
        };
        const posColor = (this.positions[state.position] || this.positions.mid).rectColor;
        return {
            num2:   tint(imgs.num2,   state.c2),
            num6:   tint(imgs.num6,   state.c6),
            cosito: tint(imgs.cosito, state.cCosito),
            marco:  tint(imgs.marco,  state.cBg),
            marco6: tint(imgs.marco6, state.c6),
            rectA:  tint(imgs.rectA,  posColor),
            rectB:  tint(imgs.rectB,  posColor),
        };
    },

    draw(ctx, state, imgs, tints, photo, flagImg) {
        const W = 1650, H = 2310;
        const FONT_RESTO = '"FuentePersonalizadaAA", "Barlow Condensed", sans-serif';
        const FONT_PAIS  = '"FuentePersonalizada",   "Barlow Condensed", sans-serif';

        ctx.clearRect(0, 0, W, H);
        ctx.save();

        ctx.fillStyle = state.cBg;
        ctx.fillRect(0, 0, W, H);

        if (state.useGoldBg && imgs['gold']) {
            ctx.drawImage(imgs['gold'], 0, 0, W, H);
        }

        if (tints.num2)   ctx.drawImage(tints.num2,   0, 0, W, H);
        if (tints.num6)   ctx.drawImage(tints.num6,   0, 0, W, H);
        if (tints.cosito) ctx.drawImage(tints.cosito, 0, 0, W, H);

        if (photo) {
            const sc = state.photoScale / 40;
            const pw = photo.width  * sc;
            const ph = photo.height * sc;
            // photoX null = centrado automático (antes de que ShirtAlign escriba coord absoluta)
            const px = state.photoX !== null ? state.photoX : (W - pw) / 2;
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(0, 0, W, H, 14);
            ctx.clip();
            ctx.drawImage(photo, px, state.photoY, pw, ph);
            ctx.restore();
        }

        if (state.showShirt && imgs['shirt']) ctx.drawImage(imgs['shirt'], 0, state.shirtY || 0, W, H);

        if (tints.marco) ctx.drawImage(tints.marco, 0, 0, W, H);

        if (state.useGoldBg && imgs['marcogold']) {
            ctx.drawImage(imgs['marcogold'], 0, 0, W, H);
        }
        if (tints.marco6) ctx.drawImage(tints.marco6, 0, 0, W, H);

        if (flagImg) ctx.drawImage(flagImg, 0, 0, W, H);
        ctx.save();
        state.code.toUpperCase().slice(0, 3).split('').forEach((l, i) => {
            ctx.font         = `900 220px ${FONT_PAIS}`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle    = 'transparent';
            ctx.strokeStyle  = 'rgba(255,255,255,1)';
            ctx.lineWidth    = 8.00;
            ctx.strokeText(l, W - 207, 1729 + i * 175);
            ctx.fillText(l, W - 207, 1729 + i * 175);
        });
        ctx.restore();

        if (tints.rectA) ctx.drawImage(tints.rectA, 81, 1900, 1183, 207);
        else if (imgs.rectA) ctx.drawImage(imgs.rectA, 81, 1900, 1183, 207);

        if (tints.rectB) ctx.drawImage(tints.rectB, 81, 2130, 1022, 98);
        else if (imgs.rectB) ctx.drawImage(imgs.rectB, 81, 2130, 1022, 98);

        if (imgs.fifa)   ctx.drawImage(imgs.fifa,   1251,  121,  285, 436);
        if (imgs.panini) ctx.drawImage(imgs.panini, 1124, 2130,  414,  98);

        const cleanDate = `${state.day}-${state.month}-${state.year}`;
        const cleanHeight = formatHeight(state.height);
        const cleanWeight = formatWeight(state.weight);

        ctx.save();
        ctx.textAlign = 'center';
        const cx = 88 + 1166 / 2;
        ctx.font = `700 88px ${FONT_RESTO}`;
        ctx.fillStyle = '#fff';
        ctx.fillText(state.name.toUpperCase(), cx, H - 316.8, 1166);
        ctx.font = `400 66px ${FONT_RESTO}`;
        ctx.fillText(`${cleanDate}  |  ${cleanHeight} m  |  ${cleanWeight} kg`, cx, H - 233.4, 1166);
        ctx.font = `100 66px ${FONT_RESTO}`;
        ctx.fillText(state.club.toUpperCase(), 88 + 1012 / 2, H - 110, 1012);
        ctx.restore();

        ctx.restore();
    },

    renderControls(state) {
        const posOpts = Object.entries(this.positions).map(([key, v]) => `
            <button class="q-pos-btn${state.position === key ? ' active' : ''}"
                    data-pos="${key}"
                    style="--pos-color:${v.rectColor}">
                ${v.label}
            </button>`).join('');

        return `
        <div class="card card--blue edition-controls" data-card-num="02">
            <h3>Colors</h3>
            <div class="crow">
                <label for="cBg">Background</label>
                <input type="color" id="cBg" value="${state.cBg}" ${state.useGoldBg ? 'disabled' : ''}>
                <span>Background color</span>
            </div>
            <div class="crow">
                <label for="useGoldBg">Gold</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="useGoldBg" ${state.useGoldBg ? 'checked' : ''}>
                    <span class="toggle-slider"></span>
                </label>
                <span>Gold background</span>
            </div>
            <div class="crow">
                <label for="c2">Number 2</label>
                <input type="color" id="c2" value="${state.c2}">
                <span>Color of the 2</span>
            </div>
            <div class="crow">
                <label for="c6">Number 6</label>
                <input type="color" id="c6" value="${state.c6}">
                <span>Color of the 6</span>
            </div>
            <div class="crow">
                <label for="cCosito">Middle</label>
                <input type="color" id="cCosito" value="${state.cCosito}">
                <span>Middle color</span>
            </div>
            <div class="crow">
                <label for="showShirt">Shirt</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="showShirt" ${state.showShirt ? 'checked' : ''}>
                    <span class="toggle-slider"></span>
                </label>
                <span>Show country shirt</span>
            </div>
            <div class="crow" id="shirtYRow" style="${state.showShirt ? '' : 'display:none'}">
                <label for="sShirtY">Shirt Y</label>
                <input type="range" id="sShirtY" min="-500" max="500" step="1" value="${state.shirtY || 0}">
                <span id="vShirtY">${state.shirtY || 0}</span>
            </div>
        </div>
        <div class="card card--red edition-controls" data-card-num="03">
            <h3>Position</h3>
            <div class="q-btn-row q-pos-row">${posOpts}</div>
        </div>`;
    },

    bindControls(state, onUpdate) {
        const cp = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', e => { state[key] = e.target.value; onUpdate('tints'); });
        };
        cp('cBg', 'cBg'); cp('c2', 'c2'); cp('c6', 'c6'); cp('cCosito', 'cCosito');

        const goldEl = document.getElementById('useGoldBg');
        if (goldEl) {
            goldEl.addEventListener('change', e => {
                state.useGoldBg = e.target.checked;
                const cBgInput = document.getElementById('cBg');
                if (cBgInput) cBgInput.disabled = e.target.checked;
                onUpdate('draw');
            });
        }

        ['inDay', 'inMonth', 'inYear'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', e => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (id === 'inDay') state.day = val.slice(0, 2);
                    if (id === 'inMonth') state.month = val.slice(0, 2);
                    if (id === 'inYear') state.year = val.slice(0, 4);

                    e.target.value = (id === 'inYear') ? state.year : (id === 'inDay' ? state.day : state.month);
                    onUpdate('draw');
                });
            }
        });

        const shirtEl = document.getElementById('showShirt');
        if (shirtEl) {
            shirtEl.addEventListener('change', e => {
                state.showShirt = e.target.checked;
                const row = document.getElementById('shirtYRow');
                if (row) row.style.display = e.target.checked ? '' : 'none';
                onUpdate('draw');
            });
        }

        const shirtYEl = document.getElementById('sShirtY');
        if (shirtYEl) {
            shirtYEl.addEventListener('input', e => {
                state.shirtY = parseInt(e.target.value);
                const vEl = document.getElementById('vShirtY');
                if (vEl) vEl.textContent = e.target.value;
                onUpdate('draw');
            });
        }

        document.querySelectorAll('.q-pos-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.position = btn.dataset.pos;
                document.querySelectorAll('.q-pos-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                onUpdate('tints');
            });
        });
    },
};
