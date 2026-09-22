// JavaScript para interactividad de LumenAgro

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on click link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // 2. Tab switching for Looker Studio Showcase (Casos de Éxito)
    const tabButtons = document.querySelectorAll('#dashboard-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Reset buttons styling
            tabButtons.forEach(b => {
                b.classList.remove('bg-brand-600', 'text-white', 'active');
                b.classList.add('bg-white', 'text-slate-600');
            });

            // Activate current button
            btn.classList.remove('bg-white', 'text-slate-600');
            btn.classList.add('bg-brand-600', 'text-white', 'active');

            // Hide all tab contents and show target
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            const activeContent = document.getElementById(`tab-${targetTab}`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
        });
    });

    // 3. Plan buttons pre-filling form
    const planButtons = document.querySelectorAll('.plan-btn');
    const servicioSelect = document.getElementById('servicio');

    planButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.getAttribute('data-plan');
            if (servicioSelect) {
                servicioSelect.value = "Consultoría de Datos";
                const mensajeArea = document.getElementById('mensaje');
                if (mensajeArea) {
                    mensajeArea.value = `Hola, me interesa solicitar más información sobre el Plan ${planName} de Consultoría en Datos.`;
                }
            }
        });
    });

    // 4. Partner CTA Button & AGDP Tech Button pre-filling form
    const techBtn = document.querySelector('.tech-btn');
    const partnerBtn = document.querySelector('.partner-btn');

    if (techBtn) {
        techBtn.addEventListener('click', () => {
            if (servicioSelect) {
                servicioSelect.value = "Solución AGDP Corvus";
                const mensajeArea = document.getElementById('mensaje');
                if (mensajeArea) {
                    mensajeArea.value = "Hola, quisiera solicitar una demostración del sistema AGDP por Corvus® para mi establecimiento.";
                }
            }
        });
    }

    if (partnerBtn) {
        partnerBtn.addEventListener('click', () => {
            if (servicioSelect) {
                servicioSelect.value = "Alianza Comercial";
                const mensajeArea = document.getElementById('mensaje');
                if (mensajeArea) {
                    mensajeArea.value = "Hola, soy proveedor/desarrollador de tecnología AgTech y quisiera conversar sobre una alianza comercial de distribución con LumenAgro.";
                }
            }
        });
    }

    // 5. Contact Form Submission (WhatsApp Integration)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            let text = `*Consulta Web LumenAgro*\n\n`;
            text += `*Nombre:* ${nombre}\n`;
            if (empresa) text += `*Empresa/Campo:* ${empresa}\n`;
            text += `*Área de Interés:* ${servicio}\n`;
            if (mensaje) text += `*Mensaje:* ${mensaje}\n`;

            // Formatted WhatsApp URL
            const phone = "5491167909300";
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});

// ═══════════════════════════════════════════════
//  CARRUSEL — Consultoría en Datos (3 slides)
//  Estrategia: show/hide — cada slide se muestra
//  completo, sin overflow ni transform issues.
// ═══════════════════════════════════════════════
let carouselIndex = 0;
const CAROUSEL_TOTAL = 3;
const SLIDE_LABELS = ['1 de 3', '2 de 3', '3 de 3'];

function carouselUpdate() {
    const dots    = document.querySelectorAll('.carousel-dot');
    const prev    = document.getElementById('carousel-prev');
    const next    = document.getElementById('carousel-next');
    const counter = document.getElementById('carousel-counter');

    // Show/hide slides + animación
    for (let i = 0; i < CAROUSEL_TOTAL; i++) {
        const slide = document.getElementById('slide-' + i);
        if (!slide) continue;
        if (i === carouselIndex) {
            slide.classList.remove('hidden');
            // Re-trigger animation: remove class, force reflow, add again
            slide.classList.remove('carousel-slide-enter');
            void slide.offsetWidth; // reflow trick
            slide.classList.add('carousel-slide-enter');
        } else {
            slide.classList.add('hidden');
            slide.classList.remove('carousel-slide-enter');
        }
    }

    // Update dots
    dots.forEach((d, i) => {
        if (i === carouselIndex) {
            d.classList.remove('bg-slate-300', 'w-2');
            d.classList.add('bg-brand-600', 'w-6');
        } else {
            d.classList.remove('bg-brand-600', 'w-6');
            d.classList.add('bg-slate-300', 'w-2');
        }
    });

    // Counter
    if (counter) counter.textContent = SLIDE_LABELS[carouselIndex];

    // Arrows
    if (prev) prev.disabled = carouselIndex === 0;
    if (next) next.disabled = carouselIndex === CAROUSEL_TOTAL - 1;

    // Re-render Lucide icons (slides start hidden, icons may not have rendered)
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function carouselMove(dir) {
    carouselIndex = Math.max(0, Math.min(CAROUSEL_TOTAL - 1, carouselIndex + dir));
    carouselUpdate();
}

function carouselGoTo(idx) {
    carouselIndex = idx;
    carouselUpdate();
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    carouselUpdate();
});


