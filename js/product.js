const products = {

"jp-due-name": {

title: "JP-DUE Name",
price: "1500 EGP",
image: "image/custom-black.jpeg",

colors: [
{color:"#111", image:"image/custom-black.jpeg"},
{color:"#fff", image:"image/custom-white.jpeg"},
{color:"#0138a7", image:"image/custom-blue.jpeg"},
{color:"#008000", image:"image/custom-green.jpeg"},
{color:"#c30061", image:"image/custom-pink.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/custom-clear.jpeg"}
],

description:"Premium dual-layer 4-5mm mouthguard fully customized with your name. After placing your order, our team will contact you to discuss your preferred design and customization details.",

features:[
"Dual-Layer 4-5mm Construction",
"Premium EVA Material",
"Custom Name Design",
"Impact Absorption Protection",
"Comfortable Fit",
"Easy Breathing During Training"
]

},

"jp-due-logo": {

title: "JP-DUE Logo",
price: "1300 EGP",
image: "image/black-guard.jpeg",

colors: [
{color:"#111", image:"image/black-guard.jpeg"},
{color:"#fff", image:"image/white-guard.jpeg"},
{color:"#0138a7", image:"image/blue-guard.jpeg"},
{color:"#008000", image:"image/green-guard.jpeg"},
{color:"#c30061", image:"image/pink-guard.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/clear.jpeg"}
],

description:"Premium dual-layer 4-5mm mouthguard featuring the official JOPA logo. Built for athletes seeking performance, protection and comfort.",

features:[
"Dual-Layer 4-5mm Construction",
"Premium EVA Material",
"Official JOPA Logo",
"Shock Absorption",
"Comfortable Fit",
"Competition Ready"
]

},

"jp-tre-name": {

title: "JP-TRE Name",
price: "1900 EGP",
image: "image/custom-black.jpeg",

colors: [
{color:"#111", image:"image/custom-black.jpeg"},
{color:"#fff", image:"image/custom-white.jpeg"},
{color:"#0138a7", image:"image/custom-blue.jpeg"},
{color:"#008000", image:"image/custom-green.jpeg"},
{color:"#c30061", image:"image/custom-pink.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/custom-clear.jpeg"}
],

description:"Advanced triple-layer mouthguard customized with your name. Designed for fighters requiring maximum protection and durability.",

features:[
"Triple-Layer 5-6mm Construction",
"Premium EVA Material",
"Custom Name Design",
"Maximum Protection",
"Elite Level Shock Absorption",
"Professional Performance"
]

},

"jp-tre-logo": {

title: "JP-TRE Logo",
price: "1600 EGP",
image: "image/black-guard.jpeg",

colors: [
{color:"#111", image:"image/black-guard.jpeg"},
{color:"#fff", image:"image/white-guard.jpeg"},
{color:"#0138a7", image:"image/blue-guard.jpeg"},
{color:"#008000", image:"image/green-guard.jpeg"},
{color:"#c30061", image:"image/pink-guard.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/clear.jpeg"}
],

description:"Triple-layer professional mouthguard with official JOPA branding for maximum protection and confidence.",

features:[
"Triple-Layer 5-6mm Construction",
"Premium EVA Material",
"Official JOPA Logo",
"Elite Impact Resistance",
"Secure Fit",
"Built For Fighters"
]

},

"jp-due-camo": {

title: "JP-DUE Full Design",
price: "1800 EGP",
image: "image/design2.jpeg",

description:"Our team will contact you after purchase to create your fully customized design exactly as you want.",

features:[
"Premium dual-layer 4-5mm mouthguard ",
"Full Custom Design",
"Premium EVA",
"Unlimited Design Options",
"Impact Protection",
"Custom Artwork Support"
]

},

"jp-tre-teeth": {

title: "JP-TRE Full Design",
price: "2200 EGP",
image: "image/design0.jpeg",

description:"Our team will contact you after purchase to discuss your complete custom design requirements and artwork.",

features:[
"Premium Triple-layer 5-6mm mouthguard",
"Complete Custom Design",
"Premium EVA Material",
"Maximum Impact Resistance",
"Professional Artwork",
"Elite Performance"
]

},

"night-soft": {

title: "Night Guard Soft",
price: "1500",
image: "image/night.jpeg",

types: [

{
name: "Soft",
image: "image/night.jpeg",

description:
"Soft version of the JOPA Night Guard designed for comfort and protection against grinding during sleep.",

features:[
"Soft Material",
"Comfort Fit",
"Bruxism Protection",
"Jaw Relief",
"BPA Free",
"Custom Fit"
]
},

{
    title: "Night Guard Hard",
name: "Hard",
image: "image/night.jpeg",

description:
"Hard version of the JOPA Night Guard offering enhanced durability and protection during sleep.",

features:[
"Hard Material",
"Enhanced Durability",
"Bruxism Protection",
"Jaw Support",
"BPA Free",
"Custom Fit"
]
}

],

description:
"Soft version of the JOPA Night Guard designed for comfort and protection against grinding during sleep.",

features:[
"Soft Material",
"Comfort Fit",
"Bruxism Protection",
"Jaw Relief",
"BPA Free",
"Custom Fit"
]

},
"swim-guard": {

title: "Swim Guard",
price: "1500",
image: "image/swim.jpeg",

colors: [
{color:"rgba(255,255,255,0.4)", image:"image/swim.jpeg"}
],

description:"Custom Swim Guard designed specifically for swimmers seeking comfort and dental protection during training and competition.",

features:[
"Crystal Clear Design",
"Custom Fit",
"Comfortable Breathing",
"Chlorine Protection",
"Premium Craftsmanship",
"Competition Ready"
]

}

};

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const product = products[productId];

if(product){

document.getElementById("product-title").textContent =
product.title;

document.getElementById("product-price").textContent =
product.price;

document.getElementById("product-img").src =
product.image;

document.getElementById("product-description").textContent =
product.description;

const featureList =
document.getElementById("product-features");

featureList.innerHTML = "";

product.features.forEach(feature=>{

const li = document.createElement("li");

li.textContent = feature;

featureList.appendChild(li);

});
const colorsContainer =
document.getElementById("product-colors");

if(product.colors && !product.types){

product.colors.forEach((color,index)=>{

const span =
document.createElement("span");

span.classList.add("color-ball");

if(index===0){
span.classList.add("active");
}

span.style.backgroundColor =
color.color;

span.addEventListener("click",()=>{

document
.querySelectorAll(".color-ball")
.forEach(c=>c.classList.remove("active"));

span.classList.add("active");

const img =
document.getElementById("product-img");

img.style.opacity="0";

setTimeout(()=>{

img.src = color.image;

img.style.opacity="1";

},200);

});

colorsContainer.appendChild(span);

});

}
if(product.types){

const optionsContainer =
document.getElementById("night-options");

optionsContainer.innerHTML = "";

product.types.forEach((type,index)=>{

const btn =
document.createElement("button");

btn.classList.add("night-btn");

if(index===0){
btn.classList.add("active");
}

btn.textContent = type.name;

btn.addEventListener("click",()=>{

document
.querySelectorAll(".night-btn")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const img =
document.getElementById("product-img");

img.style.opacity = "0";

setTimeout(()=>{

img.src = type.image;

img.style.opacity = "1";

},200);

document.getElementById(
"product-description"
).textContent = type.description;

const featureList =
document.getElementById("product-features");

featureList.innerHTML = "";

type.features.forEach(feature=>{

const li =
document.createElement("li");

li.textContent = feature;

featureList.appendChild(li);

});

});

optionsContainer.appendChild(btn);

});

}
}
const reveals = document.querySelectorAll('.reveal');

function revealElements(){

    reveals.forEach(element=>{

        const windowHeight = window.innerHeight;

        const elementTop =
        element.getBoundingClientRect().top;

        const revealPoint = 100;

        if(elementTop < windowHeight - revealPoint){

            element.classList.add('active');

        }

    });

}

window.addEventListener('scroll', revealElements);

revealElements();

const optionsContainer =
document.getElementById("night-options");

if(productId === "night-soft" || productId === "night-hard"){

document.getElementById("product-colors").style.display = "none";
const optionsContainer =
document.getElementById("night-options");

optionsContainer.innerHTML = `

<button class="night-btn ${productId==="night-soft"?"active":""}"
data-id="night-soft">
Soft
</button>

<button class="night-btn ${productId==="night-hard"?"active":""}"
data-id="night-hard">
Hard
</button>

`;

document.querySelectorAll(".night-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

window.location.href =
`product.html?id=${btn.dataset.id}`;

});

});

}
window.addEventListener("DOMContentLoaded", () => {

    const modal =
    document.getElementById("orderModal");

    const openBtn =
    document.getElementById("openOrder");

    const closeBtn =
    document.querySelector(".close-modal");

    const selectedProduct =
    document.getElementById("selectedProduct");

    if(selectedProduct && product){

        selectedProduct.textContent =
        "Product: " + product.title;

    }

    if(openBtn){

        openBtn.addEventListener("click", () => {

            modal.style.display = "block";

        });

    }

    if(closeBtn){

        closeBtn.addEventListener("click", () => {

            modal.style.display = "none";

        });

    }
    document.getElementById("sendOrder")
.addEventListener("click", async () => {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!name || !phone) {
        alert("Please enter your name and phone number");
        return;
    }

    const orderDescription = product ? product.title : "Unknown product";

    try {
      const response = await fetch('https://jopa-website-final-production.up.railway.app/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                order: orderDescription
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(". تم إرسال طلبك بنجاح! سيتواصل معك فريقنا قريبًا لتأكيد الطلب");
            document.getElementById("orderModal").style.display = "none";
            document.getElementById("customerName").value = "";
            document.getElementById("customerPhone").value = "";
        } else {
            alert("حصل خطأ: " + data.message);
        }

    } catch (err) {
        console.error(err);
        alert("تعذر الاتصال بالسيرفر، تأكد إن السيرفر شغال.");
    }

});
});
  