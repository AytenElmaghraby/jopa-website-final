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

description:"Premium dual-layer 4mm mouthguard fully customized with your name. After placing your order, our team will contact you to discuss your preferred design and customization details.",

features:[
"Dual-Layer 4mm Construction",
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

description:"Premium dual-layer 4mm mouthguard featuring the official JOPA logo. Built for athletes seeking performance, protection and comfort.",

features:[
"Dual-Layer 4mm Construction",
"Premium EVA Material",
"Official JOPA Logo",
"Shock Absorption",
"Comfortable Fit",
"Competition Ready"
]

},

"jp-tre-name": {

title: "JP-TRE Name",
price: "1700 EGP",
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
price: "1500 EGP",
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
"Triple-Layer Protection",
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

colors: [
{color:"#111", image:"image/design2.jpeg"},
{color:"#fff", image:"image/design2-white.jpeg"},
{color:"#0138a7", image:"image/design2-blue.jpeg"},
{color:"#008000", image:"image/design2-green.jpeg"},
{color:"#c30061", image:"image/design2-pink.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/design2-clear.jpeg"}
],

description:"Our team will contact you after purchase to create your fully customized design exactly as you want.",

features:[
"Full Custom Design",
"Dual Layer Construction",
"Premium EVA",
"Unlimited Design Options",
"Impact Protection",
"Custom Artwork Support"
]

},

"jp-tre-teeth": {

title: "JP-TRE Full Design",
price: "2000 EGP",
image: "image/design0.jpeg",

colors: [
{color:"#111", image:"image/design0.jpeg"},
{color:"#fff", image:"image/design0-white.jpeg"},
{color:"#0138a7", image:"image/design0-blue.jpeg"},
{color:"#008000", image:"image/design0-green.jpeg"},
{color:"#c30061", image:"image/design0-pink.jpeg"},
{color:"rgba(255,255,255,0.4)", image:"image/design0-clear.jpeg"}
],

description:"Our team will contact you after purchase to discuss your complete custom design requirements and artwork.",

features:[
"Triple Layer Protection",
"Complete Custom Design",
"Premium EVA Material",
"Maximum Impact Resistance",
"Professional Artwork",
"Elite Performance"
]

},

"night-soft": {

title: "Night Guard Soft",
price: "Price Coming Soon",
image: "image/night.jpeg",

colors: [
{color:"#ffffff", image:"image/night.jpeg"}
],

description:"Soft version of the JOPA Night Guard designed for comfort and protection against grinding during sleep.",

features:[
"Soft Material",
"Comfort Fit",
"Bruxism Protection",
"Jaw Relief",
"BPA Free",
"Custom Fit"
]

},

"night-hard": {

title: "Night Guard Hard",
price: "Price Coming Soon",
image: "image/night.jpeg",

colors: [
{color:"#8b0000", image:"image/night.jpeg"}
],

description:"Hard version of the JOPA Night Guard offering enhanced durability and protection during sleep.",

features:[
"Hard Material",
"Enhanced Durability",
"Bruxism Protection",
"Jaw Support",
"BPA Free",
"Custom Fit"
]

},

"swim-guard": {

title: "Swim Guard",
price: "Price Coming Soon",
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

if(product.colors){

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