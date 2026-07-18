/* jopa-archive-product.js
   يتحمّل فقط في صفحة الشوب (archive-product.php)
   منطق: تبديل صورة الكارت حسب اللون أو Night Guard (Soft/Hard) + Reveal Animation
   لا يوجد هنا أي منطق Add To Cart أو AJAX - فقط VIEW PRODUCT بيروح بالـ <a> العادي
*/

document.addEventListener('DOMContentLoaded', function () {

    var cards = document.querySelectorAll('.product-card');

    if (!cards.length) return;

    cards.forEach(function (card) {

        var img = card.querySelector('.main-prod-img');

        // ---- دوائر الألوان ----
        var balls = card.querySelectorAll('.colors .color-ball');

        balls.forEach(function (ball) {

            ball.addEventListener('click', function (e) {

                e.preventDefault();

                balls.forEach(function (b) {
                    b.classList.remove('active');
                });

                ball.classList.add('active');

                if (img && ball.dataset.image) {

                    img.style.opacity = '0';

                    setTimeout(function () {
                        img.src = ball.dataset.image;
                        img.style.opacity = '1';
                    }, 180);

                }

            });

        });

        // ---- أزرار Night Guard (Soft / Hard) ----
        var nightBtns = card.querySelectorAll('.night-options .night-btn');

        nightBtns.forEach(function (btn) {

            btn.addEventListener('click', function (e) {

                e.preventDefault();

                nightBtns.forEach(function (b) {
                    b.classList.remove('active');
                });

                btn.classList.add('active');

                if (img && btn.dataset.image) {

                    img.style.opacity = '0';

                    setTimeout(function () {
                        img.src = btn.dataset.image;
                        img.style.opacity = '1';
                    }, 180);

                }

            });

        });

    });

    // ---- Reveal Animation عند ظهور الكارت في الشاشة ----
    if ('IntersectionObserver' in window) {

        var observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('active');
                }

            });

        }, { threshold: 0.15 });

        cards.forEach(function (card) {
            observer.observe(card);
        });

    } else {

        // fallback لو المتصفح قديم
        cards.forEach(function (card) {
            card.classList.add('visible');
            card.classList.add('active');
        });

    }

});