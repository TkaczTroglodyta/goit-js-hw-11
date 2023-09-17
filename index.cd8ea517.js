const n=document.querySelector("nav");let t=0;let e=!1;window.addEventListener("scroll",(function(n){e=!0})),setInterval((function(){e&&(!function(){let e=window.scrollY;Math.abs(t-e)>10&&(e>t&&e>192?n.classList.add("nav-up"):e<t&&n.classList.remove("nav-up"),t=e)}(),e=!1)}),250);
//# sourceMappingURL=index.cd8ea517.js.map
