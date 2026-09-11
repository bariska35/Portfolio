const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const backToTop = document.getElementById('back-to-top');
const updateBackToTop = () => backToTop?.classList.toggle('visible', window.scrollY > 520);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        const menuLanguage = document.documentElement.lang === 'en';
        hamburger.setAttribute('aria-label', isOpen
            ? (menuLanguage ? 'Close menu' : 'Menüyü kapat')
            : (menuLanguage ? 'Open menu' : 'Menüyü aç'));
        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : 'Menüyü aç');
        document.body.classList.remove('menu-open');
    }));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('active'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(anchor => anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`));
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
}

const langToggle = document.getElementById('lang-toggle');
const indexTranslations = {
    tr: {
        nav: ['Hakkımda', 'Projeler', 'Alanlarım', 'İletişim'],
        eyebrow: '<span class="status-dot"></span> Yeni iş fırsatlarına açığım <span class="eyebrow-line"></span> İzmir, TR',
        overline: 'YAZILIM GELİŞTİRİCİ <span>·</span> İZMİR, TR',
        heroTitle: '<span class="hero-name">Barış <span class="gradient-text">Kaya</span></span><small class="hero-role">Yazılım geliştirici</small>',
        heroSub: 'Öğrendiklerimi uygulamaya dönüştüren, araştırmayı ve farklı çözümler üretmeyi seven bir yazılım geliştiriciyim.',
        primaryCta: 'Seçili projeler <span>↗</span>',
        cvCta: "CV'yi incele <span>↓</span>",
        stats: ['<b>05</b> proje', '<b>08+</b> teknoloji', '<b>03</b> deneyim'],
        noteTop: '<span>✦</span> learning by building',
        noteBottom: '<span>↗</span> open to collaborate',
        discover: 'Keşfet',
        labels: ['01 / Hakkımda', '02 / Seçili işler', '/ Deneyim', '03 / Çalışma alanları', '/ Birlikte üretelim'],
        aboutTitle: 'Sağlam mantık.<br><span class="gradient-text">Temiz kod.</span>',
        aboutLead: 'Bir problemi anlamadan çözmeye çalışmıyorum. Araştırıyor, deniyor ve öğrendiğimi çalışan bir ürüne dönüştürüyorum.',
        aboutBody: 'İzmir Ekonomi Üniversitesi Bilgisayar Programcılığı mezunuyum. Eğitimim ve staj deneyimlerim boyunca JavaScript, PHP, Python, Java, C# ve veri tabanı teknolojileriyle üretim yaptım. Şimdi bu temeli daha iyi web ve yazılım projeleri geliştirerek büyütüyorum.',
        facts: ['İzmir', '2024—26', 'B1'],
        factLabels: ['Konum', 'Mezuniyet', 'İngilizce'],
        projectsTitle: 'Fikirden <span class="gradient-text">çalışan ürüne.</span>',
        projectsDesc: 'Farklı diller ve platformlarla geliştirdiğim, öğrenme sürecimi görünür kılan çalışmalar.',
        projectTitles: ['OfficeDaysManagement', 'Zaman Cüzdanı', 'Sky Pass', 'EKOFIT Spor Sistemi', 'Kişisel Portföy'],
        projectDescriptions: [
            'NISO Yazılım Teknolojileri stajımda ofis, uzaktan çalışma ve izin planlaması için geliştirilen uygulamada iş kuralları, gün atama mantığı, veri akışları ve hata düzeltmeleri üzerinde çalıştım.',
            'Saat kredisiyle hizmet takası yapılabilen; kayıt, şifre sıfırlama, hizmet ve takas akışlarına sahip web uygulaması.',
            'Masaüstü arayüzü, MySQL bağlantısı ve temel veri yönetimi işlemleri içeren havalimanı uygulaması.',
            'Üye kayıt/giriş, kalori hesaplama, spor önerileri ve haftalık egzersiz planı özelliklerine sahip Java uygulaması.',
            'Deneyim, teknik beceriler ve projeleri tek bir sade dijital yüzeyde buluşturan kişisel web sitesi.'
        ],
        projectLinks: ['Detayları konuşalım <span>↗</span>', "GitHub'da gör <span>↗</span>", "GitHub'da gör <span>↗</span>", "GitHub'da gör <span>↗</span>", 'Şu an buradasın <span>↗</span>'],
        journeyTitle: 'Öğrenmeye<br><span class="gradient-text">devam.</span>',
        journeyDesc: 'Eğitim, staj ve projelerden öğrendiklerimi gerçek üretim deneyimiyle birleştiriyorum.',
        timelineTitles: ['Yazılım Stajyeri', 'Bilgisayar Programcılığı · Mezun', 'Stajyer Teknisyen'],
        timelineDescriptions: ['NISO Yazılım Teknolojileri · JavaScript, JSON veri akışları, iş kuralları, Git/GitHub', 'İzmir Ekonomi Üniversitesi · Veri tabanı, OOP ve web geliştirme', 'BDH Bilişim Destek Hizmetleri · HP yetkili servis ve teknik destek süreçleri'],
        worksTitle: 'Merak ettiğim<br><span class="gradient-text">her şey.</span>',
        worksDesc: 'Ders çalışmaları, ödevler ve küçük deneyler. Her başlık, üzerine koyduğum bir sonraki adım.',
        workLabels: ['Backend & JSON API', 'OOP & masaüstü', 'Veri tabanı sistemleri', 'Modern frontend', 'GUI & veri işleme', '.NET uygulamaları', 'Versiyon kontrolü', 'Veri dönüştürme & akış'],
        contactLabel: '/ Birlikte üretelim',
        contactTitle: 'Bir fikrin mi var?<br><span class="gradient-text">Konuşalım.</span>',
        contactDesc: 'Bir proje, staj fırsatı veya sadece teknoloji üzerine sohbet… Gelen kutum açık.',
        contactButtons: ['Email gönder <span>↗</span>', 'LinkedIn <span>↗</span>'],
        githubLink: "GitHub profilini gör <span>↗</span>",
        footer: '© 2026 Barış Kaya · Merakla, özenle, sürekli.'
    },
    en: {
        nav: ['About', 'Projects', 'Areas', 'Contact'],
        eyebrow: '<span class="status-dot"></span> Open to new opportunities <span class="eyebrow-line"></span> Izmir, TR',
        overline: 'SOFTWARE DEVELOPER <span>·</span> IZMIR, TR',
        heroTitle: '<span class="hero-name">Barış <span class="gradient-text">Kaya</span></span><small class="hero-role">Software developer</small>',
        heroSub: 'A software developer who turns what he learns into practice and enjoys researching, experimenting, and creating different solutions.',
        primaryCta: 'Selected projects <span>↗</span>',
        cvCta: 'View my CV <span>↓</span>',
        stats: ['<b>05</b> projects', '<b>08+</b> technologies', '<b>03</b> experiences'],
        noteTop: '<span>✦</span> learning by building',
        noteBottom: '<span>↗</span> open to collaborate',
        discover: 'Explore',
        labels: ['01 / About', '02 / Selected work', '/ Experience', '03 / Areas of work', '/ Let’s build together'],
        aboutTitle: 'Solid logic.<br><span class="gradient-text">Clean code.</span>',
        aboutLead: 'I do not try to solve a problem before understanding it. I research, experiment, and turn what I learn into a working product.',
        aboutBody: 'I am a graduate of the Computer Programming program at Izmir University of Economics. Through my education and internships, I have built with JavaScript, PHP, Python, Java, C#, and database technologies. I am now building on that foundation with better web and software projects.',
        facts: ['Izmir', '2024—26', 'B1'],
        factLabels: ['Location', 'Graduated', 'English'],
        projectsTitle: 'From idea to <span class="gradient-text">working product.</span>',
        projectsDesc: 'Projects built across different languages and platforms that make my learning process visible.',
        projectTitles: ['OfficeDaysManagement', 'Time Wallet', 'Sky Pass', 'EKOFIT Gym System', 'Personal Portfolio'],
        projectDescriptions: [
            'During my internship at NISO Software Technologies, I worked on business rules, day-assignment logic, data flows, and bug fixes for an office, remote-work, and leave-planning application.',
            'A web application for service exchange with time credits, including registration, password reset, service management, and exchange workflows.',
            'An airport application with a desktop interface, MySQL connection, and basic data management operations.',
            'A Java application with member registration/login, calorie calculation, workout recommendations, and weekly exercise planning.',
            'A personal website bringing experience, technical skills, and projects together on one clear digital surface.'
        ],
        projectLinks: ['Let’s discuss the details <span>↗</span>', 'View on GitHub <span>↗</span>', 'View on GitHub <span>↗</span>', 'View on GitHub <span>↗</span>', 'You are here <span>↗</span>'],
        journeyTitle: 'Keep<br><span class="gradient-text">learning.</span>',
        journeyDesc: 'I combine what I learn through education, internships, and projects with real production experience.',
        timelineTitles: ['Software Development Intern', 'Computer Programming · Graduate', 'Technical Service Intern'],
        timelineDescriptions: ['NISO Software Technologies · JavaScript, JSON data flows, business rules, Git/GitHub', 'Izmir University of Economics · Databases, OOP, and web development', 'BDH IT Support Services · HP authorized service and technical support'],
        worksTitle: 'Everything<br><span class="gradient-text">I explore.</span>',
        worksDesc: 'Coursework, assignments, and small experiments. Every area is another step forward.',
        workLabels: ['Backend & JSON API', 'OOP & desktop', 'Database systems', 'Modern frontend', 'GUI & data processing', '.NET applications', 'Version control', 'Data transformation & flow'],
        contactLabel: '/ Let’s build together',
        contactTitle: 'Have an idea?<br><span class="gradient-text">Let’s talk.</span>',
        contactDesc: 'A project, an internship opportunity, or simply a conversation about technology… My inbox is open.',
        contactButtons: ['Send an email <span>↗</span>', 'LinkedIn <span>↗</span>'],
        githubLink: 'View GitHub profile <span>↗</span>',
        footer: '© 2026 Barış Kaya · Curious, thoughtful, always improving.'
    }
};

const applyIndexLanguage = (lang) => {
    if (!langToggle || !indexTranslations[lang]) return;
    localStorage.setItem('siteLang', lang);
    const copy = indexTranslations[lang];
    const set = (selector, value, index = null) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, elementIndex) => {
            const nextValue = Array.isArray(value) ? value[index ?? elementIndex] : value;
            if (nextValue !== undefined) element.innerHTML = nextValue;
        });
    };
    set('.nav-links a[href="#about"], .nav-links a[href="#projects"], .nav-links a[href="#works"], .nav-links a[href="#contact"]', copy.nav);
    set('.eyebrow', copy.eyebrow); set('.hero-overline', copy.overline); set('.hero h1', copy.heroTitle); set('.hero-sub', copy.heroSub);
    set('.hero-cta .btn-primary', copy.primaryCta); set('.hero-cta .btn-ghost', copy.cvCta); set('.hero-meta > span:not(.meta-separator)', copy.stats);
    set('.note-top', copy.noteTop); set('.note-bottom', copy.noteBottom); set('.hero-scroll span', copy.discover);
    ['#about', '#projects', '.journey', '#works', '#contact'].forEach((selector, index) => set(`${selector} .section-label`, copy.labels[index]));
    set('.about-intro h2', copy.aboutTitle); set('.about-intro p', copy.aboutLead); set('.about-detail > p', copy.aboutBody); set('.fact-card strong', copy.facts); set('.fact-card small', copy.factLabels);
    set('#projects .section-title-row h2', copy.projectsTitle); set('#projects .section-title-row p', copy.projectsDesc); set('#projects .project-card h3', copy.projectTitles); set('#projects .project-card p', copy.projectDescriptions); set('#projects .project-link', copy.projectLinks);
    set('#projects .text-link', copy.githubLink);
    set('.journey h2', copy.journeyTitle); set('.journey .section-desc', copy.journeyDesc); set('.timeline h3', copy.timelineTitles); set('.timeline p', copy.timelineDescriptions);
    set('#works .section-title-row h2', copy.worksTitle); set('#works .section-title-row p', copy.worksDesc); set('#works .work-card small', copy.workLabels);
    set('#contact .contact-panel .section-label', copy.contactLabel); set('#contact .contact-panel h2', copy.contactTitle); set('#contact .contact-panel p', copy.contactDesc); set('#contact .contact-actions .btn-primary', copy.contactButtons[0]); set('#contact .contact-actions .btn-ghost', copy.contactButtons[1]); set('.footer p', copy.footer);
    langToggle.textContent = lang === 'tr' ? 'EN' : 'TR'; langToggle.classList.toggle('is-en', lang === 'en'); langToggle.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçeye geç'); document.documentElement.lang = lang;
    document.title = lang === 'tr' ? 'Barış Kaya — Yazılım Geliştirici' : 'Barış Kaya — Software Developer';

    const metaDescription = document.getElementById('meta-description');
    if (metaDescription) {
        metaDescription.content = lang === 'tr'
            ? 'Barış Kaya — yazılım geliştirici, web ve uygulama geliştirme portföyü.'
            : 'Barış Kaya — software developer portfolio focused on web and application development.';
    }

    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.textContent = lang === 'tr' ? 'İçeriğe geç' : 'Skip to content';

    const topButton = document.getElementById('back-to-top');
    if (topButton) {
        topButton.setAttribute('aria-label', lang === 'tr' ? 'Başa dön' : 'Back to top');
        const topLabel = topButton.querySelector('span');
        if (topLabel) topLabel.textContent = lang === 'tr' ? 'Başa dön' : 'Back to top';
    }

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.setAttribute('aria-label', lang === 'tr' ? 'Ana navigasyon' : 'Main navigation');
    const logo = document.querySelector('.logo');
    if (logo) logo.setAttribute('aria-label', lang === 'tr' ? 'Barış Kaya ana sayfa' : 'Barış Kaya home page');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) heroVisual.setAttribute('aria-label', lang === 'tr' ? 'Barış Kaya geliştirici kartı' : 'Barış Kaya developer card');
    const menuButton = document.getElementById('hamburger');
    if (menuButton) {
        const menuIsOpen = menuButton.classList.contains('open');
        menuButton.setAttribute('aria-label', menuIsOpen
            ? (lang === 'en' ? 'Close menu' : 'Menüyü kapat')
            : (lang === 'en' ? 'Open menu' : 'Menüyü aç'));
    }
};

if (langToggle) {
    langToggle.addEventListener('click', () => applyIndexLanguage(document.documentElement.lang === 'tr' ? 'en' : 'tr'));
    applyIndexLanguage(localStorage.getItem('siteLang') || 'tr');
}

const workPageTranslations = {
    php: {
        pageTitle: 'PHP Projects | Barış Kaya',
        title: 'PHP <span class="gradient-text">Projects</span>',
        description: 'PHP assignments focused on backend development, form handling, and PHP-based applications.',
        cards: [
            ['Café Page', 'A café showcase page featuring coffee products, visuals, and a structured menu layout. Built with HTML, CSS, and PHP.', ['PHP', 'HTML', 'CSS']],
            ['Registration & Login Control System', 'A form-based PHP application for user registration, login, and validation. Includes session management and registration checks.', ['PHP', 'Form Handling', 'CSS']],
            ['Shopping Cart Total Calculator', 'A PHP application that calculates cart totals by adding and removing products. Includes dynamic price updates and product management.', ['PHP', 'Cart Logic', 'CSS']],
            ['Template-based Web Page', 'A PHP-based corporate website customized from a professional web template. Includes dynamic content and a multi-page structure.', ['PHP', 'Template', 'JavaScript']]
        ]
    },
    java: {
        pageTitle: 'Java Projects | Barış Kaya',
        title: 'Java <span class="gradient-text">Projects</span>',
        description: 'Coursework focused on OOP principles, console applications, and MySQL integration.',
        cards: [
            ['Gym Management System', 'A gym membership and tracking system built with Java and MySQL. Developed with an object-oriented, layered architecture and a dedicated SQL schema.', ['Java', 'MySQL', 'OOP']]
        ]
    },
    javascript: {
        pageTitle: 'JavaScript Projects | Barış Kaya',
        title: 'JavaScript <span class="gradient-text">Projects</span>',
        description: 'Frontend assignments focused on DOM manipulation, dynamic interfaces, and browser-based applications.',
        cards: [
            ['ATM Application', 'A browser-based ATM simulator built with JavaScript. Implements core functions such as deposits, withdrawals, and balance checks in a single HTML file.', ['JavaScript', 'HTML', 'DOM']],
            ['Netflix Interface Clone', 'A JavaScript and CSS project recreating the Netflix home interface with movie and series cards, dynamic listing, and horizontally scrollable categories.', ['JavaScript', 'CSS', 'HTML']]
        ]
    },
    python: {
        pageTitle: 'Python Projects | Barış Kaya',
        title: 'Python <span class="gradient-text">Projects</span>',
        description: 'Python coursework covering Tkinter GUI applications, data processing, and MySQL-connected desktop projects.',
        cards: [
            ['Sky Pass — Airport Ticket System', 'A desktop airport ticket management application built with Python and MySQL. Includes login, flight listing, ticket lookup, and reservation flows.', ['Python', 'MySQL', 'Tkinter']],
            ['F1 Statistics Application', 'A Python application for viewing Formula 1 race and driver statistics, prepared with data analysis and listing features.', ['Python', 'Data Processing']],
            ['Menu Application', 'A console-based menu management application built with Python. An interactive program driven by user options and branching-loop logic.', ['Python', 'Console']]
        ]
    },
    sql: {
        pageTitle: 'Database Projects | Barış Kaya',
        title: 'Database <span class="gradient-text">Projects</span>',
        description: 'Coursework focused on database design, relational models, and SQL querying.',
        cards: [
            ['General Database Assignment', 'A database design assignment covering table relationships, foreign keys, and core SQL queries. Includes normalization and an ER diagram study.', ['MySQL', 'SQL', 'ER Diagram']],
            ['Airport Database', 'A comprehensive SQL schema designed for an airport management system, covering related tables for flights, passengers, tickets, and staff.', ['MySQL', 'JOIN', 'Relational DB']],
            ['Java Project SQL Schema', 'A MySQL database schema prepared for the gym management Java project. Includes member records, workout plans, and payment tables.', ['MySQL', 'Java Integration']],
            ['SQL Project Assignment', 'A final-term SQL project covering advanced query techniques, subqueries, VIEWs, and PROCEDUREs in a comprehensive database application.', ['SQL Server', 'Stored Procedure', 'VIEW']]
        ]
    },
    csharp: {
        pageTitle: 'C# Projects | Barış Kaya',
        title: 'C# <span class="gradient-text">Projects</span>',
        description: 'Coursework focused on desktop application development with Windows Forms and the .NET platform.',
        cards: [
            ['C# Forms Application — Project', 'A Windows Forms desktop application developed in Visual Studio with .NET 8. Includes interface design, event-driven programming, and component management.', ['C#', '.NET 8', 'Windows Forms']]
        ]
    }
};

const workPage = document.querySelector('.works-page');
const applyWorkPageLanguage = (lang) => {
    if (!workPage) return;

    const pageKey = window.location.pathname.split(/[\\/]/).pop().replace(/\.html?$/i, '').toLowerCase();
    const copy = workPageTranslations[pageKey];
    if (!copy) return;

    const navLabels = lang === 'en' ? ['About', 'Projects', 'Areas', 'Contact'] : ['Hakkımda', 'Projeler', 'Alanlarım', 'İletişim'];
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        if (index < navLabels.length) link.textContent = navLabels[index];
    });

    const backLink = document.querySelector('.back-link');
    const backText = [...(backLink?.childNodes || [])].find(node => node.nodeType === 3 && node.textContent.trim());
    if (backText) backText.textContent = `\n                ${lang === 'en' ? 'Back to areas' : 'Geri Dön'}\n            `;

    document.querySelector('.works-badge').textContent = lang === 'en' ? 'WORK AREA' : 'Çalışma Alanı';
    document.querySelector('.works-title').innerHTML = lang === 'en'
        ? copy.title
        : document.querySelector('.works-title').dataset.tr;
    document.querySelector('.works-desc').textContent = lang === 'en'
        ? copy.description
        : document.querySelector('.works-desc').dataset.tr;

    document.querySelectorAll('.assignment-card').forEach((card, index) => {
        const cardCopy = copy.cards[index];
        if (!cardCopy) return;
        card.querySelector('h3').textContent = lang === 'en' ? cardCopy[0] : card.querySelector('h3').dataset.tr;
        card.querySelector('p').textContent = lang === 'en' ? cardCopy[1] : card.querySelector('p').dataset.tr;
        card.querySelectorAll('.assignment-tags span').forEach((tag, tagIndex) => {
            if (lang === 'en') tag.textContent = cardCopy[2][tagIndex];
            else tag.textContent = tag.dataset.tr;
        });
        const link = card.querySelector('.assignment-link');
        const linkText = [...link.childNodes].find(node => node.nodeType === 3 && node.textContent.trim());
        if (linkText) linkText.textContent = `\n                        ${lang === 'en' ? 'View on GitHub' : "GitHub'da Gör"}\n                        `;
    });

    document.documentElement.lang = lang;
    if (lang === 'en') document.title = copy.pageTitle;

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Ana navigasyon');
    const logo = document.querySelector('.logo');
    if (logo) logo.setAttribute('aria-label', lang === 'en' ? 'Barış Kaya home page' : 'Barış Kaya ana sayfa');
    const menuButton = document.getElementById('hamburger');
    if (menuButton) menuButton.setAttribute('aria-label', lang === 'en' ? 'Open menu' : 'Menüyü aç');
};

if (workPage) {
    document.querySelector('.works-title').dataset.tr = document.querySelector('.works-title').innerHTML;
    document.querySelector('.works-desc').dataset.tr = document.querySelector('.works-desc').textContent;
    document.querySelectorAll('.assignment-card').forEach(card => {
        card.querySelector('h3').dataset.tr = card.querySelector('h3').textContent;
        card.querySelector('p').dataset.tr = card.querySelector('p').textContent;
        card.querySelectorAll('.assignment-tags span').forEach(tag => tag.dataset.tr = tag.textContent);
    });
    applyWorkPageLanguage(localStorage.getItem('siteLang') || 'tr');
}
