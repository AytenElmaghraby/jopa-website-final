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
            const excludedIds = ['jp-due-camo', 'jp-tre-teeth']; 

        // التحقق: إذا كان الـ ID الخاص بالكارت موجوداً في القائمة، لا تغير العنوان أو الصورة
        if (!excludedIds.includes(card.id)) {
            // كود تغيير الصورة والعنوان يعمل فقط للكروت الأخرى
            card.querySelector('.shop-title').textContent = this.getAttribute('data-title');
                   card.querySelector('.main-prod-img').src = this.getAttribute('data-image');
 }
            
            
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
    /* Home Night Guard */

const nightCard = document.getElementById("night-guard");

if (nightCard) {

    const img = document.getElementById("night-img");
    const type = document.getElementById("night-type");

    nightCard.querySelectorAll(".color-dot").forEach(dot => {

        dot.addEventListener("click", function () {

            nightCard.querySelector(".active")
                ?.classList.remove("active");

            this.classList.add("active");

            img.style.opacity = "0";

            setTimeout(() => {

                img.src = this.dataset.img;
                type.textContent = this.dataset.type;

                img.style.opacity = "1";

            }, 150);

        });

    });

}


/* Shop Night Guard */

const shopNight = document.getElementById("night-guard");

if (shopNight) {

    const img = document.getElementById("shop-night-img");
    const type = document.getElementById("shop-night-type");

    shopNight.querySelectorAll(".color-ball").forEach(ball => {

        ball.addEventListener("click", function () {

            shopNight.querySelector(".active")
                ?.classList.remove("active");

            this.classList.add("active");

            img.style.opacity = "0";

            setTimeout(() => {

                img.src = this.dataset.img;
                type.textContent = this.dataset.type;

                img.style.opacity = "1";

            }, 150);

        });

    });

}
});

function sendToWhatsApp(productName, customerName, phoneNumber) {
    const message = `Hello JOPA, I would like to order a ${productName}. 
    My name is: ${customerName} 
    My phone number: ${phoneNumber}`;
    
    const whatsappLink = `https://wa.me/201557785842?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
}