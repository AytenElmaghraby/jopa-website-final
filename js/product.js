/**
 * product.js - JOPA Dental
 * Shop + Product page interactions
 */
(function () {
    'use strict';

    // ============================================================
    //  PRODUCT PAGE (single-product.php)
    // ============================================================
    if (document.getElementById('product-title')) {

        var mainImg  = document.getElementById('main-product-image');
        var thumbBtns = document.querySelectorAll('.thumb-btn');

        thumbBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                thumbBtns.forEach(function (b) { b.classList.remove('thumb-btn--active'); });
                btn.classList.add('thumb-btn--active');
                if (mainImg) mainImg.src = btn.dataset.img;
            });
        });

        var qtyInput = document.getElementById('qty-input');
        var qtyMinus = document.getElementById('qty-minus');
        var qtyPlus  = document.getElementById('qty-plus');

        if (qtyMinus) qtyMinus.addEventListener('click', function () {
            var v = parseInt(qtyInput.value) || 1;
            if (v > 1) qtyInput.value = v - 1;
        });
        if (qtyPlus) qtyPlus.addEventListener('click', function () {
            var v = parseInt(qtyInput.value) || 1;
            var max = parseInt(qtyInput.getAttribute('max')) || 99;
            if (v < max) qtyInput.value = v + 1;
        });

        var selectedAttrs  = {};
        var variationInput = document.getElementById('variation-id');

        function handleOptionSelect(btn, attr) {
            document.querySelectorAll('[data-attr="' + attr + '"]').forEach(function (s) {
                s.classList.remove('option-btn--active', 'color-swatch--active');
            });
            btn.classList.add(btn.classList.contains('color-swatch') ? 'color-swatch--active' : 'option-btn--active');
            selectedAttrs[attr] = btn.dataset.value;
            var lbl = document.getElementById('selected-' + attr);
            if (lbl) lbl.textContent = btn.dataset.value;
            var inp = document.getElementById('attr-' + attr);
            if (inp) inp.value = btn.dataset.value;
            matchVariation();
        }

        document.querySelectorAll('.option-btn').forEach(function (b) {
            b.addEventListener('click', function () { handleOptionSelect(b, b.dataset.attr); });
        });
        document.querySelectorAll('.color-swatch').forEach(function (b) {
            b.addEventListener('click', function () { handleOptionSelect(b, b.dataset.attr); });
        });

        function matchVariation() {
            if (typeof jopaVariations === 'undefined' || !jopaVariations.length) return;
            var matched = null;
            jopaVariations.forEach(function (v) {
                var ok = true;
                for (var a in v.attributes) {
                    var key = a.replace('attribute_', '');
                    if (v.attributes[a] && v.attributes[a] !== selectedAttrs[key]) { ok = false; break; }
                }
                if (ok) matched = v;
            });
            if (matched) {
                if (variationInput) variationInput.value = matched.variation_id;
                var pe = document.getElementById('product-price');
                if (pe && matched.price_html) pe.innerHTML = matched.price_html;
                var sp = document.getElementById('sticky-price');
                if (sp && matched.price_html) sp.innerHTML = matched.price_html;
                if (matched.image && matched.image.src && mainImg) mainImg.src = matched.image.src;
                var ab = document.getElementById('btn-add-cart');
                if (ab) ab.removeAttribute('disabled');
            } else {
                if (variationInput) variationInput.value = '';
            }
        }

        function showToast(msg, ok) {
            var t = document.getElementById('cart-toast');
            var m = document.getElementById('toast-msg');
            if (!t || !m) return;
            m.textContent = msg || 'Added to cart!';
            t.style.background = ok ? '#8b0000' : '#333';
            t.style.opacity = '1';
            t.style.transform = 'translateX(-50%) translateY(0)';
            t.style.pointerEvents = 'auto';
            setTimeout(function () {
                t.style.opacity = '0';
                t.style.transform = 'translateX(-50%) translateY(100px)';
                t.style.pointerEvents = 'none';
            }, 3000);
        }

        function doAddToCart(productId, productType, qty, varId) {
            var body = 'action=jopa_add_to_cart&product_id=' + productId + '&quantity=' + qty;
            if (varId) body += '&variation_id=' + varId;
            if (typeof jopaAjax !== 'undefined' && jopaAjax.nonce) body += '&nonce=' + jopaAjax.nonce;
            var url = (typeof jopaAjax !== 'undefined') ? jopaAjax.ajax_url : '/wp-admin/admin-ajax.php';
            return fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body,
            }).then(function (r) { return r.json(); });
        }

        function handleAddToCart(btn) {
            if (!btn) return;
            var pid  = btn.dataset.productId;
            var ptype = btn.dataset.productType;
            var qty  = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
            var vid  = variationInput ? variationInput.value : '';

            if (ptype === 'variable' && !vid) {
                showToast('Please select all options first.', false);
                var opts = document.getElementById('product-options');
                if (opts) opts.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            btn.classList.add('loading');
            btn.disabled = true;

            doAddToCart(pid, ptype, qty, vid)
                .then(function (res) {
                    btn.classList.remove('loading');
                    btn.disabled = false;
                    if (res && res.success) {
                        showToast('Added to cart!', true);
                        var cc = document.querySelector('.cart-count');
                        if (cc && res.data && res.data.cart_quantity !== undefined) {
                            cc.textContent = res.data.cart_quantity;
                        }
                    } else {
                        showToast((res && res.data && res.data.message) || 'Could not add.', false);
                    }
                })
                .catch(function () {
                    btn.classList.remove('loading');
                    btn.disabled = false;
                    window.location.href = '?add-to-cart=' + pid + '&quantity=' + qty;
                });
        }

        var addBtn    = document.getElementById('btn-add-cart');
        var stickyBtn = document.getElementById('sticky-add-cart');
        if (addBtn)    addBtn.addEventListener('click', function () { handleAddToCart(addBtn); });
        if (stickyBtn) stickyBtn.addEventListener('click', function () { handleAddToCart(addBtn || stickyBtn); });

        // Sticky bar
        var stickyBar  = document.getElementById('sticky-buy-bar');
        var stickyTrig = document.getElementById('sticky-trigger');
        if (stickyBar && stickyTrig && 'IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    stickyBar.classList.toggle('sticky-buy-bar--visible', !e.isIntersecting);
                });
            }).observe(stickyTrig);
        }

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.tab-btn').forEach(function (b) {
                    b.classList.remove('tab-btn--active');
                    b.setAttribute('aria-selected', 'false');
                });
                document.querySelectorAll('.tab-panel').forEach(function (p) {
                    p.classList.remove('tab-panel--active');
                    p.hidden = true;
                });
                btn.classList.add('tab-btn--active');
                btn.setAttribute('aria-selected', 'true');
                var panel = document.getElementById('tab-' + btn.dataset.tab);
                if (panel) { panel.classList.add('tab-panel--active'); panel.hidden = false; }
            });
        });

    } // end product page


    // ============================================================
    //  SHOP PAGE (archive-product.php)
    // ============================================================
    if (document.getElementById('shop-page')) {

        function showShopToast(msg, ok) {
            var t = document.getElementById('cart-toast');
            var m = document.getElementById('toast-msg');
            if (!t || !m) return;
            m.textContent = msg;
            t.style.opacity = '1';
            t.style.transform = 'translateX(-50%) translateY(0)';
            t.style.pointerEvents = 'auto';
            setTimeout(function () {
                t.style.opacity = '0';
                t.style.transform = 'translateX(-50%) translateY(100px)';
                t.style.pointerEvents = 'none';
            }, 3000);
        }

        // Quick Add
        document.querySelectorAll('.btn-quick-add').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var pid = btn.dataset.productId;
                var orig = btn.textContent;
                btn.textContent = '...';
                btn.disabled = true;

                fetch('/wp-admin/admin-ajax.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'action=woocommerce_add_to_cart&product_id=' + pid + '&quantity=1',
                })
                .then(function (r) { return r.json(); })
                .then(function () {
                    btn.textContent = orig;
                    btn.disabled = false;
                    showShopToast('Added to cart!', true);
                })
                .catch(function () {
                    btn.textContent = orig;
                    btn.disabled = false;
                    window.location.href = '?add-to-cart=' + pid;
                });
            });
        });

        // Price filter
        var pfBtn = document.getElementById('btn-filter-price');
        if (pfBtn) {
            pfBtn.addEventListener('click', function () {
                var min = document.getElementById('price-min');
                var max = document.getElementById('price-max');
                var url = new URL(window.location.href);
                if (min && min.value) url.searchParams.set('min_price', min.value);
                else url.searchParams.delete('min_price');
                if (max && max.value) url.searchParams.set('max_price', max.value);
                else url.searchParams.delete('max_price');
                window.location.href = url.toString();
            });
        }

        // Color swatches on shop cards (تغيير الصورة عند اختيار اللون)
        document.querySelectorAll('.color-ball').forEach(function (ball) {
            ball.addEventListener('click', function () {
                var pid = ball.dataset.product;
                var siblings = document.querySelectorAll('[data-product="' + pid + '"]');
                siblings.forEach(function (s) { s.classList.remove('active'); });
                ball.classList.add('active');
            });
        });

    } // end shop page

})();