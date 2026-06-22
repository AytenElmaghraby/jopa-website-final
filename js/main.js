document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. الكود المشترك (الترانزيشن والظهور) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // تفعيل الحركة على كل العناصر المحتملة في الموقع
   // العناصر العادية
const elements = document.querySelectorAll('.card, .hero-text, .product-card, .about-hero, .mission-card, .why-card, .about-cta, .contact-header, .contact-info, .contact-form, .contact-map, .fighter-banner-merged');

elements.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.08) + 's';
    observer.observe(el);
});

// سكشن المميزات نفسه
const featuresSection = document.querySelector('.features');
if (featuresSection) {
    observer.observe(featuresSection);
}

    // --- 2. كود تبديل الألوان (للصفحة الرئيسية) ---
    function setupColorCards() {
        const setups = [
            {id: 'custom-card-1', img: 'custom-img-1', title: 'custom-title-1'},
            {id: 'custom-card-2', img: 'custom-img-2', title: 'custom-title-2'},
            {id: 'color-card-1', img: 'color-img-1', title: 'color-title-1'},
            {id: 'color-card-2', img: 'color-img-2', title: 'color-title-2'},
            {id: 'design-card-1', img: 'design-img-1', title: 'design-title-1'},
            {id: 'design-card-2', img: 'design-img-2', title: 'design-title-2'},
            {id: 'night-guard', img: 'night-img-id', title: 'night-title-id'},
            {id: 'swim-guard', img: 'swim-img-id', title: 'swim-title-id'}
        ];
        
        setups.forEach(s => {
            const card = document.getElementById(s.id);
            if (!card) return;
            card.querySelectorAll('.color-dot').forEach(dot => {
                dot.addEventListener('click', function() {
                    card.querySelector('.color-dot.active')?.classList.remove('active');
                    this.classList.add('active');
                    
                    document.getElementById(s.img).src = this.getAttribute('data-img');
                    
                    // تغيير الاسم فقط (الـ h3)
                    document.getElementById(s.title).textContent = this.getAttribute('data-title');
                });
            });
        });
    }
    setupColorCards();

    // --- 3. كود تبديل الألوان لصفحة الـ Shop ---
    document.querySelectorAll('.product-card .colors .color-ball').forEach(ball => {
        ball.addEventListener('click', function() {
            const card = this.closest('.product-card');
            if(!card) return;
            
            card.querySelector('.main-prod-img').src = this.getAttribute('data-image');
            
            // تغيير اسم المنتج فقط (h3)
            card.querySelector('.shop-title').textContent = this.getAttribute('data-title');
            
            card.querySelector('.color-ball.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });

    // --- 4. كود فلترة المنتجات (لصفحة الـ Shop) ---
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        function filterProducts(filterValue) {
            document.querySelectorAll('.sidebar ul li').forEach(li => {
                li.classList.remove('active');
                if(li.getAttribute('data-filter') === filterValue) li.classList.add('active');
            });
            document.querySelectorAll('.product-card').forEach(product => {
                product.style.display = (filterValue === 'all' || product.getAttribute('data-category') === filterValue) ? 'flex' : 'none';
            });
        }
        document.querySelectorAll('.sidebar ul li').forEach(item => {
            item.addEventListener('click', function() { filterProducts(this.getAttribute('data-filter')); });
        });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('filter')) filterProducts(urlParams.get('filter'));
    }
});