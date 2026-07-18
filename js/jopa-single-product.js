/* jopa-single-product.js
   يتحط في js/ ويتحمل بس في صفحة المنتج
   منطق: تبديل الصور حسب الألوان/Night options، فتح المودال، إرسال واتساب، Sticky Bar */

document.addEventListener('DOMContentLoaded', function () {

    if (!document.getElementById('product-title')) return;

    var mainImg = document.getElementById('product-img');

    // ---- Color Balls (Variations عادية) ----
    document.querySelectorAll('#product-colors .color-ball').forEach(function (ball) {
        ball.addEventListener('click', function () {
            document.querySelectorAll('#product-colors .color-ball').forEach(function (b) {
                b.classList.remove('active');
            });
            ball.classList.add('active');
            if (mainImg) {
                mainImg.style.opacity = '0';
                setTimeout(function () {
                    mainImg.src = ball.dataset.image;
                    mainImg.style.opacity = '1';
                }, 200);
            }
        });
    });

    // ---- Night Guard Options (Soft/Hard) ----
    document.querySelectorAll('#night-options .night-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('#night-options .night-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            if (mainImg) {
                mainImg.style.opacity = '0';
                setTimeout(function () {
                    mainImg.src = btn.dataset.image;
                    mainImg.style.opacity = '1';
                }, 200);
            }
            var priceEl = document.getElementById('product-price');
            if (priceEl && btn.dataset.price) {
                priceEl.innerHTML = btn.dataset.price + ' EGP';
            }
        });
    });

    // ---- Modal Open/Close ----
    var modal = document.getElementById('orderModal');
    var closeBtn = document.querySelector('.close-modal');

    function openModal() {
        if (modal) modal.style.display = 'block';
    }

    var openBtn = document.getElementById('openOrder');
    var openBtnBottom = document.getElementById('openOrderBottom');
    var stickyBtn = document.getElementById('sticky-add-cart');

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (openBtnBottom) openBtnBottom.addEventListener('click', openModal);
    if (stickyBtn) stickyBtn.addEventListener('click', openModal);

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (modal) modal.style.display = 'none';
        });
    }

    // ---- Send Order to WhatsApp ----
    var sendBtn = document.getElementById('sendOrder');
    if (sendBtn) {
        sendBtn.addEventListener('click', function () {
            var name = document.getElementById('customerName').value.trim();
            var phone = document.getElementById('customerPhone').value.trim();

            if (!name || !phone) {
                alert('Please enter your name and phone number');
                return;
            }

            var productName = (typeof jopaProduct !== 'undefined') ? jopaProduct.name : 'Unknown product';
            var whatsappNumber = (typeof jopaProduct !== 'undefined') ? jopaProduct.whatsapp : '201557785842';

            var message = 'New Order\n\nProduct: ' + productName + '\n\nName: ' + name + '\n\nPhone: ' + phone;

            window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank');

            if (modal) modal.style.display = 'none';
        });
    }

    // ---- Sticky Buy Bar ----
    var stickyBar = document.getElementById('sticky-buy-bar');
    var stickyTrigger = document.getElementById('sticky-trigger');

    if (stickyBar && stickyTrigger && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    stickyBar.classList.add('sticky-buy-bar--visible');
                } else {
                    stickyBar.classList.remove('sticky-buy-bar--visible');
                }
            });
        }, { threshold: 0 });
        observer.observe(stickyTrigger);
    }

    // ---- Reveal Animation (fade-in scroll) ----
    var reveals = document.querySelectorAll('.reveal');
    function revealElements() {
        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealElements);
    revealElements();

});