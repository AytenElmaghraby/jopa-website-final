const products = {

"jp-due-name": {
title: "JP-DUE",
subtitle: "2-Layer With Your Name",
price: "1500 EGP",
images: [
"image/custom-black.jpeg",
"image/custom-white.jpeg",
"image/custom-blue.jpeg"
],
colors: ["black","white","blue"],
type: "name"
},

"jp-due-logo": {
title: "JP-DUE",
subtitle: "2-Layer With Logo",
price: "1300 EGP",
images: [
"image/black-guard.jpeg",
"image/white-guard.jpeg"
],
colors: ["black","white"],
type: "logo"
},

"jp-tre-full": {
title: "JP-TRE",
subtitle: "3-Layer Full Design (We contact you for details)",
price: "1800 EGP",
images: [
"image/design0.jpeg",
"image/design1.jpeg"
],
colors: ["black","white"],
type: "full"
},

"night-guard": {
title: "Night Guard",
subtitle: "Soft / Hard Options",
price: "Contact Us",
images: [
"image/night.jpeg",
"image/night-soft.jpeg"
],
colors: ["white","red"],
type: "night"
},

"swim-guard": {
title: "Swim Guard",
subtitle: "Custom Swimming Protection",
price: "Contact Us",
images: [
"image/swim.jpeg"
],
colors: ["transparent"],
type: "swim"
}

};

const id = new URLSearchParams(window.location.search).get("id");
const p = products[id];

// LOAD DATA
document.getElementById("title").innerText = p.title;
document.getElementById("subtitle").innerText = p.subtitle;
document.getElementById("price").innerText = p.price;

const main = document.getElementById("mainImage");
main.src = p.images[0];

// THUMBS
const thumbs = document.getElementById("thumbs");

p.images.forEach((img,i)=>{

let t = document.createElement("img");
t.src = img;

if(i===0) t.classList.add("active");

t.onclick = ()=> {
main.src = img;
document.querySelectorAll(".thumbs img").forEach(x=>x.classList.remove("active"));
t.classList.add("active");
}

thumbs.appendChild(t);

});

// COLORS
const colors = document.getElementById("colors");

p.colors.forEach((c,i)=>{

let d = document.createElement("div");
d.className = "color";
d.style.background = c;

if(i===0) d.classList.add("active");

d.onclick = ()=> {
document.querySelectorAll(".color").forEach(x=>x.classList.remove("active"));
d.classList.add("active");
main.src = p.images[i] || p.images[0];
}

colors.appendChild(d);

});

// POPUP ORDER
const popup = document.getElementById("popup");

document.getElementById("orderBtn").onclick = ()=>{
popup.classList.remove("hidden");
};

document.getElementById("submitOrder").onclick = ()=>{

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;

let msg =
`New Order:
Product: ${p.title}
Type: ${p.type}
Name: ${name}
Phone: ${phone}`;

window.open(`https://wa.me/201000000000?text=${encodeURIComponent(msg)}`);

};