/**
 * USAII® CAIE™ Ads Landing Page - Clean Institutional Architecture & Interaction Engine
 * Features: UTM Tracking, Sticky CTA, Salary & ROI Calculator, Dual-Pathway Eligibility Checker,
 * Dynamic Urgency Countdown, Candidate Profile Switcher, Curriculum Category Filters,
 * Quick Brochure Modal, and Interactive Syllabus Accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Capture UTM & Ad Query Parameters
    captureUtmParameters();

    // 2. Initialize Sticky CTA Bar on Scroll
    initStickyCtaBar();

    // 3. Initialize Salary & ROI Calculator
    updateSalaryCalculator();

    // 4. Initialize Eligibility Checker
    calculateEligibility();

    // 5. Initialize Urgency Countdown Timer
    initCountdownTimer();

    // 6. Initialize Live Candidate Counter
    initLiveCounter();

    // 7. Initialize Sleek Scroll & Reveal Animations
    initSleekScrollAnimations();
});

// Capture UTM & Ad Query Parameters (Google Ads, Meta, LinkedIn, Bing, TikTok)
let adTrackingData = {};
function captureUtmParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'li_fat_id', 'msclkid', 'ad_id', 'campaign_id'];
    
    trackingKeys.forEach(key => {
        if (urlParams.has(key)) {
            adTrackingData[key] = urlParams.get(key);
        }
    });

    if (Object.keys(adTrackingData).length > 0) {
        console.log('[Ad Tracking Parameters Captured]:', adTrackingData);
    }
}

// Sticky CTA Bar Scroll Listener (Triggers sooner ~25% scroll with attention hint)
function initStickyCtaBar() {
    const stickyBar = document.getElementById('stickyCtaBar');
    const applyHint = document.getElementById('applyBtnHint');
    if (!stickyBar) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
        
        // Show sticky bar sooner (once scrolled past hero / ~25% of the site)
        if (scrollPercent >= 25 || scrollY > 550) {
            stickyBar.classList.remove('translate-y-full', 'opacity-0');
            stickyBar.classList.add('translate-y-0', 'opacity-100');
            
            if (applyHint) {
                applyHint.classList.remove('opacity-0', 'scale-90');
                applyHint.classList.add('opacity-100', 'scale-100');
            }
        } else {
            stickyBar.classList.add('translate-y-full', 'opacity-0');
            stickyBar.classList.remove('translate-y-0', 'opacity-100');
            
            if (applyHint) {
                applyHint.classList.add('opacity-0', 'scale-90');
                applyHint.classList.remove('opacity-100', 'scale-100');
            }
        }
    }, { passive: true });
}

// Dynamic Urgency Countdown (Days, Hours, Minutes, Seconds)
function initCountdownTimer() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const now = new Date();
    let targetDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000));

    function updateTimer() {
        const current = new Date();
        const diff = targetDate - current;

        if (diff <= 0) {
            targetDate = new Date(current.getTime() + (3 * 24 * 60 * 60 * 1000));
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = d < 10 ? '0' + d : d;
        hoursEl.textContent = h < 10 ? '0' + h : h;
        minsEl.textContent = m < 10 ? '0' + m : m;
        secsEl.textContent = s < 10 ? '0' + s : s;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Live Enrollment Counter Simulation (Increases retention & social proof)
function initLiveCounter() {
    const liveCountEl = document.getElementById('liveEnrolledCount');
    if (!liveCountEl) return;

    let baseCount = 248;
    liveCountEl.textContent = baseCount;

    setInterval(() => {
        baseCount += 1;
        liveCountEl.textContent = baseCount;
    }, 60000);
}

// Interactive Candidate Profile Switcher Tabs in Hero
const profileData = {
    graduates: {
        badge: "Pathway 02 • Fast-Track Eligibility",
        headline: "Launch Your AI Career Direct from College or Graduate School",
        desc: "Bachelor's, Master's, or PhD candidates qualify with 0 prior work experience. Build production-grade Python, PyTorch, GenAI & RAG skills to stand out in top tech campus hiring.",
        outcome: "Top Roles: Associate AI Engineer, Junior ML Developer ($118k+ Avg. Base)"
    },
    engineers: {
        badge: "Pathway 01 / 02 • Career Pivot Track",
        headline: "Upskill from Software Engineering to High-Paying AI Development",
        desc: "Leverage your coding background (Python, Java, C++, JS) to master Deep Learning architectures, LLM fine-tuning, vector search, and production MLOps pipelines.",
        outcome: "Top Roles: Senior AI Engineer, GenAI Software Developer ($156k+ Avg. Base)"
    },
    practitioners: {
        badge: "Advanced Specialization • Executive Recognition",
        headline: "Validate Production GenAI, LLMs, and Enterprise RAG Mastery",
        desc: "Gain authoritative validation on modern AI system architectures, multi-agent frameworks (LangGraph), model governance, and scalable enterprise deployments.",
        outcome: "Top Roles: Lead AI Architect, Principal ML Scientist ($182k+ Avg. Base)"
    }
};

function selectProfileTab(key) {
    const data = profileData[key];
    if (!data) return;

    // Update active tab buttons
    document.querySelectorAll('.profile-tab-btn').forEach(btn => {
        btn.classList.remove('bg-brand-blue', 'text-white', 'border-brand-blue');
        btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
    });

    const activeBtn = document.getElementById(`tab-btn-${key}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
        activeBtn.classList.add('bg-brand-blue', 'text-white', 'border-brand-blue');
    }

    // Update content elements
    const badgeEl = document.getElementById('profileBadge');
    const headlineEl = document.getElementById('profileHeadline');
    const descEl = document.getElementById('profileDesc');
    const outcomeEl = document.getElementById('profileOutcome');

    if (badgeEl) badgeEl.textContent = data.badge;
    if (headlineEl) headlineEl.textContent = data.headline;
    if (descEl) descEl.textContent = data.desc;
    if (outcomeEl) outcomeEl.textContent = data.outcome;
}

// Interactive Salary & ROI Calculator
const salaryTiers = [
    { label: "0–1 Years (Entry)", salary: "$118,500", role: "Associate AI / ML Engineer", bonus: "+$32,000 avg. jump", roi: "42.7x First-Year ROI" },
    { label: "1–2 Years (Junior)", salary: "$134,200", role: "AI Software Engineer", bonus: "+$44,500 avg. jump", roi: "59.4x First-Year ROI" },
    { label: "3–5 Years (Mid-Level)", salary: "$156,800", role: "Senior AI / GenAI Engineer", bonus: "+$58,000 avg. jump", roi: "77.4x First-Year ROI" },
    { label: "5–8 Years (Senior)", salary: "$182,000", role: "Lead AI / MLOps Architect", bonus: "+$75,000 avg. jump", roi: "100.1x First-Year ROI" },
    { label: "8+ Years (Principal)", salary: "$215,000+", role: "Principal AI Engineer / Director", bonus: "+$95,000+ avg. jump", roi: "126.8x First-Year ROI" }
];

function updateSalaryCalculator() {
    const slider = document.getElementById('expSlider');
    const expLabel = document.getElementById('expLabel');
    const salaryDisplay = document.getElementById('calcSalaryDisplay');
    const roleTitle = document.getElementById('calcRoleTitle');
    const bonusDisplay = document.getElementById('calcBonusDisplay');
    const roiDisplay = document.getElementById('calcRoiDisplay');

    if (!slider || !expLabel || !salaryDisplay || !roleTitle) return;

    const index = parseInt(slider.value, 10);
    const tier = salaryTiers[index] || salaryTiers[0];

    expLabel.textContent = tier.label;
    salaryDisplay.textContent = tier.salary;
    roleTitle.textContent = tier.role;
    if (bonusDisplay && tier.bonus) bonusDisplay.textContent = tier.bonus;
    if (roiDisplay && tier.roi) roiDisplay.textContent = tier.roi;
}

// Interactive Dual-Pathway Eligibility Checker
function calculateEligibility() {
    const education = document.getElementById('calc_education')?.value;
    const experience = parseInt(document.getElementById('calc_experience')?.value || '0', 10);
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');
    const resultBox = document.getElementById('eligibilityResult');
    const resultIcon = document.getElementById('resultIcon');
    const card1 = document.getElementById('pathway-card-1');
    const card2 = document.getElementById('pathway-card-2');

    if (!resultTitle || !resultDesc || !resultBox) return;

    // Reset card highlight rings
    if (card1) card1.classList.remove('ring-2', 'ring-blue-600', 'border-blue-600');
    if (card2) card2.classList.remove('ring-2', 'ring-blue-600');

    // Pathway 2: Bachelor's Pursuing or Completed -> No Work Exp needed
    if (education === 'bachelor_pursuing' || education === 'bachelor_grad' || education === 'master_phd') {
        resultBox.className = "mt-5 p-4 sm:p-5 rounded-2xl bg-blue-50/90 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all";
        resultTitle.textContent = "You Qualify Under Pathway 02!";
        resultTitle.className = "text-sm sm:text-base font-bold text-blue-950 font-heading";
        resultDesc.innerHTML = `<span class="text-slate-600">No prior work experience is required for Bachelor's degree candidates.</span>`;
        if (resultIcon) {
            resultIcon.className = "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0";
            resultIcon.innerHTML = `<i class="fa-solid fa-check text-sm"></i>`;
        }
        if (card2) card2.classList.add('ring-2', 'ring-blue-600');
    } 
    // Pathway 1: Associate / Diploma -> Needs 2+ years exp
    else if (education === 'diploma') {
        if (experience >= 2) {
            resultBox.className = "mt-5 p-4 sm:p-5 rounded-2xl bg-blue-50/90 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all";
            resultTitle.textContent = "You Qualify Under Pathway 01!";
            resultTitle.className = "text-sm sm:text-base font-bold text-blue-950 font-heading";
            resultDesc.innerHTML = `<span class="text-slate-600">You qualify under <strong>Pathway 01</strong> (Associate Degree / Diploma + 2+ years programming experience).</span>`;
            if (resultIcon) {
                resultIcon.className = "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0";
                resultIcon.innerHTML = `<i class="fa-solid fa-check text-sm"></i>`;
            }
            if (card1) card1.classList.add('ring-2', 'ring-blue-600', 'border-blue-600');
        } else {
            resultBox.className = "mt-5 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all";
            resultTitle.textContent = "Conditional Review Recommended";
            resultTitle.className = "text-sm sm:text-base font-bold text-amber-950 font-heading";
            resultDesc.innerHTML = `<span class="text-slate-600">Pathway 01 typically requires 2 years of coding experience. Submit your profile for advisor evaluation.</span>`;
            if (resultIcon) {
                resultIcon.className = "w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0";
                resultIcon.innerHTML = `<i class="fa-solid fa-info text-sm"></i>`;
            }
        }
    } else {
        resultBox.className = "mt-5 p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all";
        resultTitle.textContent = "Advisor Evaluation Recommended";
        resultTitle.className = "text-sm sm:text-base font-bold text-slate-900 font-heading";
        resultDesc.innerHTML = `<span class="text-slate-600">Our academic committee can evaluate your programming background & foundational coursework.</span>`;
        if (resultIcon) {
            resultIcon.className = "w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center shrink-0";
            resultIcon.innerHTML = `<i class="fa-solid fa-user-gear text-sm"></i>`;
        }
    }
}

// Curriculum Module Switcher (9 switchable modules, Image 2 style)
function switchCurriculumModule(modIndex) {
    for (let i = 1; i <= 9; i++) {
        const tabBtn = document.getElementById(`mod-tab-${i}`);
        const panel = document.getElementById(`mod-panel-${i}`);
        
        if (tabBtn && panel) {
            const kicker = tabBtn.querySelector('.mod-kicker');
            const weight = tabBtn.querySelector('.mod-weight');
            const title = tabBtn.querySelector('.mod-title');
            if (i === modIndex) {
                tabBtn.className = "module-tab-btn w-full text-left py-3.5 px-4 transition-all border-r-4 border-blue-800 bg-slate-100 text-slate-900 font-bold block";
                if (kicker) kicker.className = "text-[11px] font-mono uppercase tracking-wider text-blue-800 font-bold mod-kicker";
                if (weight) weight.className = "text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 mod-weight";
                if (title) title.className = "text-sm font-bold text-slate-900 mt-0.5 leading-snug mod-title";
                panel.classList.remove('hidden');
            } else {
                tabBtn.className = "module-tab-btn w-full text-left py-3.5 px-4 transition-all border-r-4 border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 block";
                if (kicker) kicker.className = "text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium mod-kicker";
                if (weight) weight.className = "text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 mod-weight";
                if (title) title.className = "text-sm font-medium text-slate-700 mt-0.5 leading-snug mod-title";
                panel.classList.add('hidden');
            }
        }
    }
}

// Backward Compatibility Helpers (if needed)
function switchCurriculumTrack(trackNumber) { switchCurriculumModule(trackNumber); }
function filterCurriculum(category) { switchCurriculumModule(1); }
function toggleCurriculum(index) { switchCurriculumModule(index); }
function toggleAllCurriculum() {}

// FAQ Accordion Toggle
function toggleFaq(index) {
    const ans = document.getElementById(`faq-ans-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);

    if (!ans) return;

    const isHidden = ans.classList.contains('hidden');

    // Close other FAQs
    document.querySelectorAll('[id^="faq-ans-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="faq-icon-"]').forEach(el => {
        el.classList.remove('fa-minus', 'rotate-45');
        el.classList.add('fa-plus');
    });

    if (isHidden) {
        ans.classList.remove('hidden');
        if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    }
}

// Brochure / Syllabus Modal Handlers
function openBrochureModal() {
    const modal = document.getElementById('brochureModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeBrochureModal() {
    const modal = document.getElementById('brochureModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Close Modals on click outside or ESC
window.addEventListener('click', (e) => {
    const brochureModal = document.getElementById('brochureModal');
    if (e.target === brochureModal) closeBrochureModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBrochureModal();
});

// Lead Submission Handler (Hero Form, Modals)
function handleLeadSubmit(event, source) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Processing...</span>`;
    }

    const formData = new FormData(form);
    const leadData = Object.fromEntries(formData.entries());
    leadData.sourceForm = source;
    leadData.submissionTime = new Date().toISOString();
    leadData.tracking = adTrackingData;

    console.log(`[High-Intent Lead Captured - ${source}]:`, leadData);

    // Smooth feedback response
    setTimeout(() => {
        if (source === 'Hero Form') {
            form.classList.add('hidden');
            const successState = document.getElementById('heroSuccessState');
            if (successState) successState.classList.remove('hidden');
        } else {
            alert(`Thank you! Your official CAIE™ Syllabus & Free Prep Kit details have been sent to your email.`);
            closeBrochureModal();
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    }, 700);
}

// Reset Hero Form
function resetHeroForm() {
    const form = document.getElementById('heroLeadForm');
    const successState = document.getElementById('heroSuccessState');
    const submitBtn = document.getElementById('heroSubmitBtn');

    if (form && successState) {
        form.reset();
        form.classList.remove('hidden');
        successState.classList.add('hidden');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>REGISTER FOR CAIE™</span> <i class="fa-solid fa-arrow-right"></i>`;
        }
    }
}

// 7. Sleek Scroll & Reveal Animations Engine
function initSleekScrollAnimations() {
    // Select elements to reveal smoothly on scroll
    const selectors = [
        'section > div > .text-center',
        '#about .grid > div',
        '#why-caie .grid > div',
        '#curriculum .divide-y > div',
        '#prep-kit .grid > div',
        '#salary-calculator > div > div',
        '#eligibility .grid > div',
        '#program-comparison table',
        '#faqs .grid > div'
    ];

    const targets = document.querySelectorAll(selectors.join(', '));
    if (!targets.length) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    // Assign base reveal class
    targets.forEach((el, index) => {
        el.classList.add('sleek-reveal');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

