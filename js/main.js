let currentBookingStep = 1;
let selectedAppliance = '';
let diagnosticIssue = '';

const backgroundPresets = {
    'workshop': 'images/hero.webp',
    'digital-glow': 'images/hero.webp'
};

window.onload = function () {
    setTimeout(function () {
        var bubble = document.getElementById('whatsapp-bubble');
        if (bubble) bubble.classList.remove('hidden');
    }, 2500);
};

function setActiveNavLink(link) {
    var nav = link.closest('nav');
    if (!nav) return;
    var links = nav.querySelectorAll('a');
    var inactiveLinkClass = 'flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-zinc-300 hover:text-white font-medium text-base hover:bg-white/5 transition-all';
    var activeLinkClass = 'flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-white font-semibold text-base bg-[#5896F6]/10 border border-[#5896F6]/20 hover:bg-[#5896F6]/20 transition-all';
    var inactiveSpanClass = 'w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center';
    var activeSpanClass = 'w-9 h-9 rounded-lg bg-[#5896F6]/20 flex items-center justify-center';
    for (var i = 0; i < links.length; i++) {
        var a = links[i];
        var span = a.querySelector('span');
        var icon = a.querySelector('i');
        if (a === link) {
            a.className = activeLinkClass;
            if (span) span.className = activeSpanClass;
            if (icon) icon.className = icon.className.replace('text-zinc-500', 'text-[#5896F6]');
        } else {
            a.className = inactiveLinkClass;
            if (span) span.className = inactiveSpanClass;
            if (icon) icon.className = icon.className.replace('text-[#5896F6]', 'text-zinc-500');
        }
    }
}

function smoothScrollToServices(e) {
    e.preventDefault();
    var target = document.getElementById('services-overview');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}

function triggerToast(message) {
    var toast = document.getElementById('toast-message');
    var textSpan = document.getElementById('toast-text');
    textSpan.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(function () {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}

function toggleSideMenu() {
    var drawer = document.getElementById('side-menu-drawer');
    var isOpen = !drawer.classList.contains('-translate-x-full');
    if (isOpen) {
        drawer.classList.add('-translate-x-full');
    } else {
        drawer.classList.remove('-translate-x-full');
    }
}

function openBookingModal() {
    var modal = document.getElementById('booking-modal');
    var card = document.getElementById('booking-modal-card');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    goToBookingStep(1);
}

function closeBookingModal() {
    var modal = document.getElementById('booking-modal');
    var card = document.getElementById('booking-modal-card');
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.add('scale-95');
    card.classList.remove('scale-100');
}

function goToBookingStep(stepNum) {
    currentBookingStep = stepNum;
    document.getElementById('booking-step-1').classList.add('hidden');
    document.getElementById('booking-step-2').classList.add('hidden');
    document.getElementById('booking-step-3').classList.add('hidden');
    document.getElementById('booking-success-state').classList.add('hidden');
    var stepEl = document.getElementById('booking-step-' + stepNum);
    if (stepEl) stepEl.classList.remove('hidden');
    var progress = document.getElementById('booking-progress');
    var stepTitle = document.getElementById('booking-step-title');
    var stepPercent = document.getElementById('booking-step-percent');
    if (stepNum === 1) {
        progress.style.width = '33%';
        stepTitle.textContent = 'Step 1 of 3: Select Appliance';
        stepPercent.textContent = '33%';
    } else if (stepNum === 2) {
        progress.style.width = '66%';
        stepTitle.textContent = 'Step 2 of 3: Diagnostics';
        stepPercent.textContent = '66%';
    } else if (stepNum === 3) {
        progress.style.width = '100%';
        stepTitle.textContent = 'Step 3 of 3: Dispatch Details';
        stepPercent.textContent = '100%';
    }
}

function selectBookingAppliance(appliance, iconClass) {
    selectedAppliance = appliance;
    triggerToast('Selected: ' + appliance);
    goToBookingStep(2);
}

function setDiagnosticIssue(issueText) {
    diagnosticIssue = issueText;
    document.getElementById('booking-extra-desc').value = issueText;
    triggerToast('Diagnostic set: ' + issueText);
}

function submitBookingOrder() {
    var name = document.getElementById('booking-client-name').value.trim();
    var phone = document.getElementById('booking-client-phone').value.trim();
    var address = document.getElementById('booking-client-address').value.trim();
    if (!name || !phone || !address) {
        triggerToast('\u26A0\uFE0F Please complete all contact fields before dispatch.');
        return;
    }
    document.getElementById('summary-appliance').textContent = selectedAppliance || 'Cooling Unit';
    document.getElementById('summary-concern').textContent = diagnosticIssue || 'General Maintenance';
    document.getElementById('summary-phone').textContent = phone;
    document.getElementById('booking-step-3').classList.add('hidden');
    document.getElementById('booking-success-state').classList.remove('hidden');
    document.getElementById('booking-progress').style.width = '100%';
    document.getElementById('booking-step-title').textContent = 'Order Placed';
    document.getElementById('booking-step-percent').textContent = '100%';
}

function navigateToWhatsApp(message) {
    var customPhoneNumber = document.getElementById('nav-phone-number').innerText.replace(/\D/g, '');
    var encoded = encodeURIComponent(message);
    window.open('https://wa.me/' + customPhoneNumber + '?text=' + encoded, '_blank');
}

var whatsappOpen = false;

function toggleWhatsAppChatWindow() {
    var chatWindow = document.getElementById('whatsapp-chat-window');
    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        document.getElementById('whatsapp-bubble').classList.add('hidden');
        whatsappOpen = true;
    } else {
        chatWindow.classList.add('hidden');
        whatsappOpen = false;
    }
}

function sendPredefinedMsg(msg) {
    document.getElementById('wa-chat-input').value = msg;
    submitCustomWhatsAppMsg();
}

function submitCustomWhatsAppMsg() {
    var textInput = document.getElementById('wa-chat-input');
    var val = textInput.value.trim();
    if (!val) return;
    triggerToast('Formulating message draft to WhatsApp...');
    setTimeout(function () {
        var message = encodeURIComponent('Falak Cool Breeze support. Inquiry details: ' + val);
        window.open('https://wa.me/923455137257?text=' + message, '_blank');
        textInput.value = '';
    }, 500);
}

function toggleCustomizer() {
    var panel = document.getElementById('customizer-panel');
    var isClosed = panel.classList.contains('translate-x-[calc(100%+20px)]');
    if (isClosed) {
        panel.classList.remove('translate-x-[calc(100%+20px)]');
    } else {
        panel.classList.add('translate-x-[calc(100%+20px)]');
    }
}

function handleBgUpload(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var backgroundLayer = document.getElementById('hero-bg-image-layer');
            backgroundLayer.style.backgroundImage = "url('" + e.target.result + "')";
            triggerToast('Success! Loaded custom background visual.');
        };
        reader.readAsDataURL(file);
    }
}

function setBgPreset(presetName) {
    var url = backgroundPresets[presetName];
    if (url) {
        document.getElementById('hero-bg-image-layer').style.backgroundImage = "url('" + url + "')";
        triggerToast('Switched back to preset background: ' + presetName);
    }
}

function updateBgBlur(value) {
    document.getElementById('blur-val').textContent = value + 'px';
    document.getElementById('bg-overlay-blur').style.backdropFilter = 'blur(' + value + 'px)';
    document.getElementById('bg-overlay-blur').style.webkitBackdropFilter = 'blur(' + value + 'px)';
}

function updateBgTint(value) {
    document.getElementById('tint-val').textContent = value + '%';
    var opacityDecimal = value / 100;
    document.getElementById('bg-overlay-tint').style.backgroundColor = 'rgba(15, 23, 42, ' + opacityDecimal + ')';
}

function updateBrandName(value) {
    document.getElementById('nav-brand-name-top').textContent = value;
    triggerToast('Brand name updated live!');
}

function updateMainTitle(value) {
    document.getElementById('hero-main-title').textContent = value;
}

function updateSubTitle(value) {
    document.getElementById('hero-sub-title').textContent = value;
}

function updatePhone(value) {
    document.getElementById('nav-phone-number').textContent = value;
}

// Sticky header scroll effect
var headerState = 'hero';

function setHeaderHero() {
    if (headerState === 'hero') return;
    headerState = 'hero';
    var header = document.getElementById('main-header');
    var headerInner = document.getElementById('header-inner');
    var menuBtn = document.getElementById('menu-toggle-btn');
    var menuIcon = document.getElementById('menu-icon');
    var phoneBtn = document.getElementById('header-phone-btn');
    var phoneIcon = document.getElementById('phone-icon');
    var bookBtn = document.getElementById('book-repair-btn');
    var logo = document.getElementById('header-logo');
    var brandText = document.getElementById('header-brand-text');

    header.classList.remove('bg-white/90', 'bg-black/90', 'shadow-sm');
    header.classList.remove('backdrop-blur-md');
    headerInner.classList.remove('py-4');
    headerInner.classList.add('py-6');

    menuBtn.className = 'w-12 h-12 flex items-center justify-center rounded-full glass-button text-slate-300 hover:text-white transition-all active:scale-95';
    menuIcon.className = 'fa-solid fa-bars-staggered text-lg text-slate-300';
    phoneBtn.className = 'hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-button text-sm font-medium text-slate-200 hover:text-cyan-400';
    phoneIcon.className = 'fa-solid fa-phone text-xs text-white';
    bookBtn.className = 'px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full glass-button text-white text-sm tracking-wide active:scale-95 transition-all duration-300';
    logo.src = 'images/transparent-logo1.webp';
    if (brandText) brandText.className = 'text-white font-bold tracking-tight text-sm sm:text-xl leading-none whitespace-nowrap';
}

function setHeaderLight() {
    if (headerState === 'light') return;
    headerState = 'light';
    var header = document.getElementById('main-header');
    var headerInner = document.getElementById('header-inner');
    var menuBtn = document.getElementById('menu-toggle-btn');
    var menuIcon = document.getElementById('menu-icon');
    var phoneBtn = document.getElementById('header-phone-btn');
    var phoneIcon = document.getElementById('phone-icon');
    var bookBtn = document.getElementById('book-repair-btn');
    var logo = document.getElementById('header-logo');
    var brandText = document.getElementById('header-brand-text');

    header.classList.remove('bg-black/90');
    header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
    headerInner.classList.remove('py-6');
    headerInner.classList.add('py-4');

    menuBtn.className = 'w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all active:scale-95';
    menuIcon.className = 'fa-solid fa-bars-staggered text-lg text-slate-700';
    phoneBtn.className = 'hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:text-slate-900';
    phoneIcon.className = 'fa-solid fa-phone text-xs text-black';
    bookBtn.className = 'px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-[#5896F6] hover:bg-[#5896F6] text-white text-sm tracking-wide active:scale-95 transition-all duration-300';
    logo.src = 'images/transparent-logo2.webp';
    if (brandText) brandText.className = 'text-slate-900 font-bold tracking-tight text-sm sm:text-xl leading-none whitespace-nowrap';
}

function setHeaderDark() {
    if (headerState === 'dark') return;
    headerState = 'dark';
    var header = document.getElementById('main-header');
    var headerInner = document.getElementById('header-inner');
    var menuBtn = document.getElementById('menu-toggle-btn');
    var menuIcon = document.getElementById('menu-icon');
    var phoneBtn = document.getElementById('header-phone-btn');
    var phoneIcon = document.getElementById('phone-icon');
    var bookBtn = document.getElementById('book-repair-btn');
    var logo = document.getElementById('header-logo');
    var brandText = document.getElementById('header-brand-text');

    header.classList.remove('bg-white/90', 'shadow-sm');
    header.classList.add('bg-black/90', 'backdrop-blur-md');
    headerInner.classList.remove('py-6');
    headerInner.classList.add('py-4');

    menuBtn.className = 'w-12 h-12 flex items-center justify-center rounded-full border border-zinc-700 bg-transparent text-white hover:bg-zinc-800/50 transition-all active:scale-95';
    menuIcon.className = 'fa-solid fa-bars-staggered text-lg text-white';
    phoneBtn.className = 'hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black border border-zinc-700 text-sm font-medium text-white hover:text-white';
    phoneIcon.className = 'fa-solid fa-phone text-xs text-white';
    bookBtn.className = 'px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-white text-black text-sm tracking-wide active:scale-95 transition-all duration-300';
    logo.src = 'images/transparent-logo1.webp';
    if (brandText) brandText.className = 'text-white font-bold tracking-tight text-sm sm:text-xl leading-none whitespace-nowrap';
}

function handleHeaderScroll() {
    var snapSections = document.querySelectorAll('.section-snap');
    if (!snapSections.length) return;

    var scrollPos = window.pageYOffset;
    var closest = 0;
    var minDist = Infinity;
    for (var i = 0; i < snapSections.length; i++) {
        var dist = Math.abs(snapSections[i].offsetTop - scrollPos);
        if (dist < minDist) {
            minDist = dist;
            closest = i;
        }
    }

    if (closest === 0 || closest === 7) { setHeaderHero(); return; }
    if (closest === 4 || closest === 6 || closest === 8) { setHeaderDark(); return; }
    setHeaderLight();
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('load', function () {
    setTimeout(handleHeaderScroll, 100);
    setTimeout(initScrollReveal, 200);
    setTimeout(initServiceReveal, 300);
    setTimeout(initCommercialReveal, 400);
    setTimeout(initReviewReveal, 350);
    setTimeout(renderGallery, 100);
});

function initScrollReveal() {
    var section = document.getElementById('services-overview');
    var cards = document.querySelectorAll('.stat-card');
    if (!section || !cards.length) return;

    registerSectionSteps(1, cards.length, function(data) {
        var card = cards[data.current];
        if (!card) return;
        card.classList.add('visible');
        card.style.zIndex = data.current + 1;
        card.style.marginTop = data.current > 0 ? '-' + Math.round(card.offsetHeight * 0.55) + 'px' : '0';
    });
}

function initReviewReveal() {
    var section = document.getElementById('reviews-section');
    var cards = section.querySelectorAll('.process-card');
    if (!section || !cards.length) return;

    registerSectionSteps(2, cards.length, function(data) {
        activateReview(data.current + 1);
    });
}

function activateReview(activeId) {
    for (var i = 1; i <= 5; i++) {
        var card = document.getElementById('review-card-' + i);
        if (!card) continue;
        var stepNum = card.querySelector('.step-num');
        var title = card.querySelector('h3');
        var description = card.querySelector('p');
        var illustration = card.querySelector('.illustration-container');
        var treeOverlay = card.querySelector('.tree-silhouette');
        var bottomIcon = card.querySelector('.bottom-icon-container');
        var textBlock = card.querySelector('.text-block');
        var stars = card.querySelector('.text-block .flex.gap-1');
        var readLink = card.querySelector('.text-block a');

        if (i === activeId) {
            card.classList.remove('bg-[#F5F5F7]', 'text-[#3A3A3C]', 'hover:bg-slate-200', 'hover:shadow-lg', 'hover:-translate-y-1');
            card.classList.add('bg-[#5197E9]', 'text-white', 'shadow-lg', 'shadow-blue-500/10');
            stepNum.classList.remove('text-[#8E8E93]');
            stepNum.classList.add('text-blue-50/90');
            title.classList.remove('text-slate-800', 'text-lg', 'md:text-xl');
            title.classList.add('text-white', 'text-2xl');
            if (description) description.classList.remove('hidden');
            if (stars) stars.classList.remove('hidden');
            if (readLink) readLink.classList.remove('hidden');
            textBlock.classList.remove('md:translate-y-4');
            textBlock.classList.add('translate-y-0');
            illustration.classList.remove('h-0', 'opacity-0', 'scale-75');
            illustration.classList.add('h-24', 'opacity-100', 'scale-100');
            if (treeOverlay) treeOverlay.classList.remove('opacity-0');
            if (treeOverlay) treeOverlay.classList.add('opacity-20');
            if (bottomIcon) {
                bottomIcon.classList.add('opacity-0', 'scale-75', 'h-0');
            }
        } else {
            card.classList.remove('bg-[#5197E9]', 'text-white', 'shadow-lg', 'shadow-blue-500/10');
            card.classList.add('bg-[#F5F5F7]', 'text-[#3A3A3C]', 'hover:bg-slate-200', 'hover:shadow-lg', 'hover:-translate-y-1');
            stepNum.classList.remove('text-blue-50/90');
            stepNum.classList.add('text-[#8E8E93]');
            title.classList.remove('text-white', 'text-2xl');
            title.classList.add('text-slate-800', 'text-lg', 'md:text-xl');
            if (description) description.classList.add('hidden');
            if (stars) stars.classList.add('hidden');
            if (readLink) readLink.classList.add('hidden');
            textBlock.classList.remove('translate-y-0');
            textBlock.classList.add('md:translate-y-4');
            illustration.classList.remove('h-24', 'opacity-100', 'scale-100');
            illustration.classList.add('h-0', 'opacity-0', 'scale-75');
            if (treeOverlay) treeOverlay.classList.remove('opacity-20');
            if (treeOverlay) treeOverlay.classList.add('opacity-0');
            if (bottomIcon) {
                bottomIcon.classList.remove('opacity-0', 'scale-75', 'h-0');
            }
        }
    }
}

function initServiceReveal() {
    var section = document.getElementById('home-appliances-section');
    var cards = section.querySelectorAll('[data-card-index]');
    var images = document.querySelectorAll('.srv-img');
    if (!section || !cards.length || !images.length) return;

    var currentActive = 0;

    registerSectionSteps(3, cards.length, function(data) {
        currentActive = data.current;
        cards.forEach(function(c) { c.classList.remove('expanded'); });
        var card = cards[currentActive];
        if (card) card.classList.add('expanded');
        images.forEach(function(img) {
            var cardIdx = parseInt(img.getAttribute('data-card'));
            img.classList.toggle('active', cardIdx === currentActive);
        });
    });

    cards.forEach(function (card) {
        var idx = parseInt(card.getAttribute('data-card-index'));
        card.addEventListener('mouseenter', function () {
            images.forEach(function (img) {
                var cardIdx = parseInt(img.getAttribute('data-card'));
                img.classList.toggle('active', cardIdx === idx);
            });
        });
        card.addEventListener('mouseleave', function () {
            images.forEach(function (img) {
                var cardIdx = parseInt(img.getAttribute('data-card'));
                img.classList.toggle('active', cardIdx === currentActive);
            });
        });
    });
}

function initCommercialReveal() {
    var section = document.getElementById('commercial-appliances-section');
    var cards = section.querySelectorAll('[data-card-index]');
    var images = document.querySelectorAll('.com-srv-img');
    if (!section || !cards.length || !images.length) return;

    var currentActive = 0;

    registerSectionSteps(5, cards.length, function(data) {
        currentActive = data.current;
        cards.forEach(function(c) { c.classList.remove('expanded'); });
        var card = cards[currentActive];
        if (card) card.classList.add('expanded');
        images.forEach(function(img) {
            var cardIdx = parseInt(img.getAttribute('data-card'));
            img.classList.toggle('active', cardIdx === currentActive);
        });
    });

    cards.forEach(function (card) {
        var idx = parseInt(card.getAttribute('data-card-index'));
        card.addEventListener('mouseenter', function () {
            images.forEach(function (img) {
                var cardIdx = parseInt(img.getAttribute('data-card'));
                img.classList.toggle('active', cardIdx === idx);
            });
        });
        card.addEventListener('mouseleave', function () {
            images.forEach(function (img) {
                var cardIdx = parseInt(img.getAttribute('data-card'));
                img.classList.toggle('active', cardIdx === currentActive);
            });
        });
    });
}

/* ===== NEW HERO SECTION (CoolFix) FUNCTIONS ===== */

function setAirflowSpeed2(speed) {
    var container = document.getElementById('breeze-container');
    var stateText = document.getElementById('breeze-state');
    var ctrlFanIcon = document.getElementById('ctrl-fan-icon');
    var louverGlow = document.getElementById('ac-louver-glow');

    ['off', 'low', 'med', 'turbo'].forEach(function(s) {
        var btn = document.getElementById('btn-speed2-' + s);
        if (btn) btn.className = "py-1 rounded bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-center";
    });

    var activeBtn = document.getElementById('btn-speed2-' + speed);
    if (activeBtn) activeBtn.className = "py-1 rounded bg-blue-500 text-white text-center";

    if (speed === 'off') {
        container.style.display = 'none';
        stateText.textContent = 'Standby';
        stateText.className = 'text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono';
        ctrlFanIcon.classList.remove('animate-spin');
        louverGlow.style.opacity = '0';
        showToast2('AC Turned Off / Standby Mode');
    } else {
        container.style.display = 'block';
        stateText.textContent = speed.toUpperCase();
        stateText.className = 'text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono';
        ctrlFanIcon.classList.add('animate-spin');
        louverGlow.style.opacity = '1';

        var duration = '4s';
        var spinSpeed = '4s';
        if (speed === 'low') { duration = '6s'; spinSpeed = '7s'; }
        if (speed === 'med') { duration = '4s'; spinSpeed = '4s'; }
        if (speed === 'turbo') { duration = '2s'; spinSpeed = '1.5s'; }

        container.style.setProperty('--breeze-duration', duration);
        ctrlFanIcon.style.animationDuration = spinSpeed;

        var streams = container.querySelectorAll('.cool-breeze-stream');
        streams.forEach(function(st, idx) {
            st.style.animationDuration = (parseFloat(duration) + (idx * 0.5)) + 's';
        });

        showToast2('Airflow speed set to ' + speed.toUpperCase());
    }
}

function updateTemperature2(val) {
    document.getElementById('ctrl-temp-display').textContent = val;
    document.getElementById('ac-temp-val').textContent = val;
}

function toggleMenuDrawer2(shouldOpen) {
    var backdrop = document.getElementById('drawer-backdrop2');
    var contentBox = document.getElementById('drawer-box2');
    var drawerWrapper = document.getElementById('side-drawer2');

    if (shouldOpen) {
        drawerWrapper.classList.remove('pointer-events-none');
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        contentBox.classList.remove('-translate-x-full');
        contentBox.classList.add('translate-x-0');
    } else {
        drawerWrapper.classList.add('pointer-events-none');
        backdrop.classList.add('opacity-0');
        backdrop.classList.remove('opacity-100');
        contentBox.classList.add('-translate-x-full');
        contentBox.classList.remove('translate-x-0');
    }
}

function triggerEstimateModal2() {
    var overlay = document.getElementById('estimate-modal2');
    var card = document.getElementById('estimate-card2');
    calculateEstimate2();
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-95', 'opacity-0');
    card.classList.add('scale-100', 'opacity-100');
}

function closeEstimateModal2() {
    var overlay = document.getElementById('estimate-modal2');
    var card = document.getElementById('estimate-card2');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
}

function calculateEstimate2() {
    var serviceBase = parseFloat(document.getElementById('est-service2').value);
    var tonnageVal = parseFloat(document.getElementById('est-tonnage2').value);

    var multiplier = 1.0;
    if (tonnageVal === 1.5) multiplier = 1.2;
    if (tonnageVal === 2.0) multiplier = 1.4;
    if (tonnageVal === 3.0) multiplier = 1.8;

    var total = serviceBase * multiplier;

    document.getElementById('calc-base2').textContent = '$' + serviceBase.toFixed(2);
    document.getElementById('calc-mult2').textContent = 'x ' + multiplier;
    document.getElementById('calc-total2').textContent = '$' + total.toFixed(2);
}

function acceptEstimate2() {
    var totalVal = document.getElementById('calc-total2').textContent;
    closeEstimateModal2();
    openBookingModal();
    showToast2('Applied estimate ' + totalVal + ' to your booking profile!');
}

function showToast2(message) {
    var toast = document.getElementById('toast-message2');
    var toastText = document.getElementById('toast-text2');
    toastText.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(function() {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
}

/* ===== NEW HERO SECTION (CoolFix) FUNCTIONS ===== */

function setAirflowSpeed2(speed) {
    var container = document.getElementById('breeze-container');
    var stateText = document.getElementById('breeze-state');
    var ctrlFanIcon = document.getElementById('ctrl-fan-icon');
    var louverGlow = document.getElementById('ac-louver-glow');

    ['off', 'low', 'med', 'turbo'].forEach(function(s) {
        var btn = document.getElementById('btn-speed2-' + s);
        if (btn) btn.className = "py-1 rounded bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-center";
    });

    var activeBtn = document.getElementById('btn-speed2-' + speed);
    if (activeBtn) activeBtn.className = "py-1 rounded bg-blue-500 text-white text-center";

    if (speed === 'off') {
        container.style.display = 'none';
        stateText.textContent = 'Standby';
        stateText.className = 'text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono';
        ctrlFanIcon.classList.remove('animate-spin');
        louverGlow.style.opacity = '0';
        showToast2('AC Turned Off / Standby Mode');
    } else {
        container.style.display = 'block';
        stateText.textContent = speed.toUpperCase();
        stateText.className = 'text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono';
        ctrlFanIcon.classList.add('animate-spin');
        louverGlow.style.opacity = '1';

        var duration = '4s';
        var spinSpeed = '4s';
        if (speed === 'low') { duration = '6s'; spinSpeed = '7s'; }
        if (speed === 'med') { duration = '4s'; spinSpeed = '4s'; }
        if (speed === 'turbo') { duration = '2s'; spinSpeed = '1.5s'; }

        container.style.setProperty('--breeze-duration', duration);
        ctrlFanIcon.style.animationDuration = spinSpeed;

        var streams = container.querySelectorAll('.cool-breeze-stream');
        streams.forEach(function(st, idx) {
            st.style.animationDuration = (parseFloat(duration) + (idx * 0.5)) + 's';
        });

        showToast2('Airflow speed set to ' + speed.toUpperCase());
    }
}

function updateTemperature2(val) {
    document.getElementById('ctrl-temp-display').textContent = val;
    document.getElementById('ac-temp-val').textContent = val;
}

function toggleMenuDrawer2(shouldOpen) {
    var backdrop = document.getElementById('drawer-backdrop2');
    var contentBox = document.getElementById('drawer-box2');
    var drawerWrapper = document.getElementById('side-drawer2');

    if (shouldOpen) {
        drawerWrapper.classList.remove('pointer-events-none');
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        contentBox.classList.remove('-translate-x-full');
        contentBox.classList.add('translate-x-0');
    } else {
        drawerWrapper.classList.add('pointer-events-none');
        backdrop.classList.add('opacity-0');
        backdrop.classList.remove('opacity-100');
        contentBox.classList.add('-translate-x-full');
        contentBox.classList.remove('translate-x-0');
    }
}

function triggerEstimateModal2() {
    var overlay = document.getElementById('estimate-modal2');
    var card = document.getElementById('estimate-card2');
    calculateEstimate2();
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-95', 'opacity-0');
    card.classList.add('scale-100', 'opacity-100');
}

function closeEstimateModal2() {
    var overlay = document.getElementById('estimate-modal2');
    var card = document.getElementById('estimate-card2');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
}

function calculateEstimate2() {
    var serviceBase = parseFloat(document.getElementById('est-service2').value);
    var tonnageVal = parseFloat(document.getElementById('est-tonnage2').value);

    var multiplier = 1.0;
    if (tonnageVal === 1.5) multiplier = 1.2;
    if (tonnageVal === 2.0) multiplier = 1.4;
    if (tonnageVal === 3.0) multiplier = 1.8;

    var total = serviceBase * multiplier;

    document.getElementById('calc-base2').textContent = '$' + serviceBase.toFixed(2);
    document.getElementById('calc-mult2').textContent = 'x ' + multiplier;
    document.getElementById('calc-total2').textContent = '$' + total.toFixed(2);
}

function acceptEstimate2() {
    var totalVal = document.getElementById('calc-total2').textContent;
    closeEstimateModal2();
    openBookingModal();
    showToast2('Applied estimate ' + totalVal + ' to your booking profile!');
}

function showToast2(message) {
    var toast = document.getElementById('toast-message2');
    var toastText = document.getElementById('toast-text2');
    toastText.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(function() {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
}

function focusAppliance(applianceId) {
    var appliances = ['appliance-ac', 'appliance-fridge', 'appliance-heater', 'appliance-washer', 'appliance-microwave'];
    appliances.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('appliance-glow');
    });
    var activeEl = document.getElementById('appliance-' + applianceId);
    if (activeEl) activeEl.classList.add('appliance-glow');
}

function resetApplianceGlow() {
    var appliances = ['appliance-ac', 'appliance-fridge', 'appliance-heater', 'appliance-washer', 'appliance-microwave'];
    appliances.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('appliance-glow');
    });
}

function scrollTestimonials(direction) {
    var scroller = document.getElementById('testimonial-scroller');
    if (!scroller) return;
    var offset = 434;
    if (direction === 'left') {
        scroller.scrollLeft -= offset;
    } else {
        scroller.scrollLeft += offset;
    }
}

/* ===== GALLERY DATA & RENDERER ===== */

var categoryStyles = {
    ac:         { icon: 'fa-solid fa-wind',         gradient: 'from-cyan-100 to-blue-200',    label: 'AC' },
    fridge:     { icon: 'fa-regular fa-snowflake',   gradient: 'from-sky-100 to-indigo-200',   label: 'Fridge' },
    washer:     { icon: 'fa-solid fa-soap',          gradient: 'from-purple-100 to-pink-200',  label: 'Washer' },
    geyser:     { icon: 'fa-solid fa-water',         gradient: 'from-amber-100 to-orange-200', label: 'Geyser' },
    coldroom:   { icon: 'fa-regular fa-building',    gradient: 'from-blue-100 to-teal-200',    label: 'Cold Room' }
};

var galleryData = [
    { category: 'ac',       title: 'AC Repair',             img: 'images/gallery-1.webp' },
    { category: 'ac',       title: 'AC Installation',       img: 'images/gallery-2.webp' },
    { category: 'fridge',   title: 'Non Frost Refrigerator', tall: true },
    { category: 'washer',   title: 'Washing Machine Service' },
    { category: 'geyser',   title: 'Geyser Repair' },
    { category: 'ac',       title: 'AC Maintenance' },
    { category: 'coldroom', title: 'Cold Storage Room' },
    { category: 'fridge',   title: 'Fridge Repair' },
    { category: 'washer',   title: 'Washer Installation',    tall: true },
    { category: 'geyser',   title: 'Geyser Installation' },
    { category: 'ac',       title: 'AC Gas Refill' },
    { category: 'coldroom', title: 'Cold Room Setup' },
    { category: 'fridge',   title: 'Deep Freezer Service' },
    { category: 'washer',   title: 'Washer Repair' },
    { category: 'geyser',   title: 'Geyser Maintenance',     tall: true },
    { category: 'ac',       title: 'AC Deep Cleaning' },
    { category: 'coldroom', title: 'Cold Storage Repair' },
    { category: 'fridge',   title: 'Fridge Gas Filling' },
    { category: 'washer',   title: 'Commercial Washer' },
    { category: 'geyser',   title: 'Geyser Service' }
];

var lightboxImages = [];

function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    lightboxImages = [];
    var html = '';
    for (var i = 0; i < galleryData.length; i++) {
        var item = galleryData[i];
        var cs = categoryStyles[item.category] || categoryStyles.ac;
        var tallClass = item.tall ? ' xl:row-span-2' : '';
        var tallAspect = item.tall ? ' xl:aspect-[4/7]' : '';
        var imgPath = item.img || '';
        var placeholderGradient = cs.gradient;
        var imgTag = '';
        if (imgPath) {
            imgTag = '<img src="' + imgPath + '" alt="' + item.title + '" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">';
        }
        html += '<div class="gallery-item group relative rounded-xl overflow-hidden cursor-pointer' + tallClass + '" data-category="' + item.category + '" onclick="openLightbox(' + i + ')">' +
            '<div class="aspect-[4/3]' + tallAspect + ' relative overflow-hidden bg-slate-100">' +
                imgTag +
                '<div class="' + (imgPath ? 'hidden ' : 'flex ') + 'absolute inset-0 bg-gradient-to-br ' + placeholderGradient + ' items-center justify-center transition-all duration-500 group-hover:scale-105">' +
                    '<div class="text-center">' +
                        '<i class="' + cs.icon + ' text-4xl sm:text-5xl text-white/40 mb-2"></i>' +
                        '<p class="text-white/30 text-xs font-bold tracking-wider">' + cs.label + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">' +
                '<div class="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 group-hover:translate-y-0 transition-all duration-500">' +
                    '<div class="flex items-center justify-between gap-2">' +
                        '<h3 class="text-white font-bold text-sm md:text-base truncate">' + item.title + '</h3>' +
                        '<span class="shrink-0 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-white/80 text-[10px] font-bold uppercase tracking-wider">' + cs.label + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">' +
                '<div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-all duration-500">' +
                    '<i class="fa-solid fa-expand text-white text-xs"></i>' +
                '</div>' +
            '</div>' +
        '</div>';
        lightboxImages.push({ src: imgPath || '', title: item.title, category: cs.label });
    }
    grid.innerHTML = html;
}

function filterGallery(category) {
    var pills = document.querySelectorAll('#gallery-filters .filter-pill');
    for (var i = 0; i < pills.length; i++) {
        var pill = pills[i];
        if (pill.getAttribute('onclick').indexOf("'" + category + "'") !== -1 || pill.getAttribute('onclick').indexOf('"' + category + '"') !== -1) {
            pill.className = 'filter-pill active px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all bg-[#5896F6] text-white shadow-sm shadow-[#5896F6]/20';
        } else {
            pill.className = 'filter-pill px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700';
        }
    }
    var items = document.querySelectorAll('.gallery-item');
    if (category === 'all') {
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('hidden');
            items[i].style.opacity = '1';
        }
        return;
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute('data-category') === category) {
            items[i].classList.remove('hidden');
            items[i].style.opacity = '1';
        } else {
            items[i].classList.add('hidden');
        }
    }
}

var currentLightboxIdx = -1;

function openLightbox(index) {
    if (!lightboxImages.length || !lightboxImages[index]) return;
    currentLightboxIdx = index;
    var data = lightboxImages[index];
    var modal = document.getElementById('lightbox-modal');
    var img = document.getElementById('lightbox-image');
    var title = document.getElementById('lightbox-title');
    var counter = document.getElementById('lightbox-counter');
    if (data.src) {
        img.src = data.src;
        img.alt = data.title;
        img.classList.remove('hidden');
    } else {
        img.classList.add('hidden');
    }
    title.textContent = data.title + ' \u2014 ' + data.category;
    counter.textContent = (index + 1) + ' / ' + lightboxImages.length;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
    updateLightboxNav();
}

function closeLightbox() {
    var modal = document.getElementById('lightbox-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    var next = currentLightboxIdx + direction;
    if (next < 0) next = lightboxImages.length - 1;
    if (next >= lightboxImages.length) next = 0;
    openLightbox(next);
}

function updateLightboxNav() {
    var prevBtn = document.getElementById('lb-prev-btn');
    var nextBtn = document.getElementById('lb-next-btn');
    if (!prevBtn || !nextBtn) return;
    prevBtn.style.display = lightboxImages.length > 1 ? '' : 'none';
    nextBtn.style.display = lightboxImages.length > 1 ? '' : 'none';
}

document.addEventListener('keydown', function (e) {
    if (currentLightboxIdx === -1) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

function toggleAccordion(index) {
    var items = document.querySelectorAll('.accordion-item');
    items.forEach(function(item, idx) {
        var plusIcon = item.querySelector('button i');
        if (idx === index) {
            var isActive = item.classList.contains('active');
            if (isActive) {
                item.classList.remove('active');
                if (plusIcon) plusIcon.classList.remove('rotate-45');
            } else {
                item.classList.add('active');
                if (plusIcon) plusIcon.classList.add('rotate-45');
            }
        } else {
            item.classList.remove('active');
            if (plusIcon) plusIcon.classList.remove('rotate-45');
        }
    });
}

// Section step progress tracking for multi-scroll sections
var sectionStepData = {};

function registerSectionSteps(index, totalSteps, advanceFn) {
    if (!advanceFn || totalSteps < 1) return;
    sectionStepData[index] = {
        total: totalSteps,
        current: 0,
        advance: function() {
            if (this.current >= this.total) return;
            advanceFn(this);
            this.current++;
        },
        retreat: function() {
            if (this.current <= 0) return;
            this.current--;
            advanceFn(this);
        }
    };
}

// Smooth section scroller
(function initSectionScroller() {
    var snapSections = document.querySelectorAll('.section-snap');
    if (!snapSections.length) return;
    document.documentElement.style.scrollBehavior = 'auto';

    var currentIdx = 0;
    var scrolling = false;
    var duration = 1500;
    var scrollTimeout = null;
    var stepCooldown = false;

    function getCurrentIndex() {
        var scrollPos = window.pageYOffset;
        var closest = 0;
        var minDist = Infinity;
        snapSections.forEach(function(el, i) {
            var dist = Math.abs(el.offsetTop - scrollPos);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        return closest;
    }

    function setHeaderForSection(index) {
        if (index === 0 || index === 7) { setHeaderHero(); if (index === 7) { var mi = document.getElementById('menu-icon'); if (mi) mi.className = 'fa-solid fa-bars-staggered text-lg text-white'; } return; }
        if (index === 4 || index === 6 || index === 8) { setHeaderDark(); return; }
        setHeaderLight();
    }

    function scrollToSection(index) {
        if (index < 0 || index >= snapSections.length || scrolling) return;
        if (index === getCurrentIndex()) return;
        scrolling = true;
        currentIdx = index;

        var target = snapSections[index];
        var targetPos = target.offsetTop;
        var startPos = window.pageYOffset;
        var distance = targetPos - startPos;
        var startTime = null;

        function step(timestamp) {
            if (startTime === null) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, startPos + distance * ease);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                scrolling = false;
                // Set header state based on section
                setHeaderForSection(index);
                // Advance first step only when scrolling forward into a section
                var stepData = sectionStepData[index];
                if (distance > 0 && stepData && stepData.current < stepData.total) {
                    stepData.advance();
                }
            }
        }

        requestAnimationFrame(step);
    }

    snapSections[0].classList.add('current-snap');

    window.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        if (scrolling) return;

        var dir = e.deltaY > 0 ? 1 : -1;
        var cur = getCurrentIndex();

        // Advance/retreat section steps (card reveals) with 700ms cooldown
        var stepData = sectionStepData[cur];
        if (stepData) {
            if (dir > 0 && stepData.current < stepData.total) {
                if (stepCooldown) return;
                stepCooldown = true;
                setTimeout(function() { stepCooldown = false; }, 900);
                stepData.advance();
                return;
            }
            if (dir < 0 && stepData.current > 0) {
                if (stepCooldown) return;
                stepCooldown = true;
                setTimeout(function() { stepCooldown = false; }, 900);
                stepData.retreat();
                return;
            }
        }

        if (dir > 0 && cur < snapSections.length - 1) {
            scrollToSection(cur + 1);
        } else if (dir < 0 && cur > 0) {
            scrollToSection(cur - 1);
        }
    }, { passive: false });

    window.scrollToSection = scrollToSection;
})();

