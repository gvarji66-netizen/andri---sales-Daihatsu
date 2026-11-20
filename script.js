  // Edit daftar ini: nama, kategori, deskripsi singkat, dan nama file foto di folder "foto/"
  const cars=[

    {n:"Ayla",c:"city",d:"City car irit & lincah untuk harian di perkotaan.",f:"ayla.jpg"},
    {n:"Sigra",c:"family",d:"MPV kompak terjangkau untuk keluarga kecil.",f:"sigra.jpg"},
    {n:"Xenia",c:"family",d:"MPV keluarga 7 seater yang luas dan nyaman.",f:"xenia.jpg"},
    {n:"Terios",c:"suv",d:"SUV tangguh, ground clearance tinggi untuk segala medan.",f:"terios.jpg"},
    {n:"Rocky",c:"suv",d:"Compact SUV bergaya dengan fitur modern.",f:"rocky.jpg"},
    {n:"Gran Max MPV",c:"family",d:"MPV serbaguna, kabin lapang untuk usaha maupun keluarga.",f:"granmax-mpv.jpg"},
    {n:"Gran Max Pick Up",c:"niaga",d:"Pick up andalan untuk angkut barang usaha.",f:"granmax-pickup.jpg"},
    {n:"Luxio",c:"family",d:"MPV 8 seater untuk keluarga besar atau travel.",f:"luxio.jpg"}
  ];
  const label={city:"City Car",family:"MPV",suv:"SUV",niaga:"Niaga"};
  const grid=document.getElementById("grid");
  function render(f){
    grid.innerHTML=cars.filter(x=>f==="all"||x.c===f).map((x,i)=>`
      <article class="card" style="animation-delay:${i*70}ms">
        <div class="ph zoomable" data-src="foto/${x.f}" data-cap="Daihatsu ${x.n}"><img src="foto/${x.f}" alt="Daihatsu ${x.n}" onerror="this.remove()"><span>Foto ${x.n}<br><code>foto/${x.f}</code></span></div>
        <div class="body">
          <span class="tag">${label[x.c]}</span>
          <h3>Daihatsu ${x.n}</h3>
          <p>${x.d}</p>
          <a class="btn" target="_blank" rel="noopener" href="https://wa.me/6281227355292?text=${encodeURIComponent('Halo Andri, saya tertarik dengan Daihatsu '+x.n+'. Boleh info promo & simulasi kreditnya?')}">Tanya Promo ${x.n}</a>
        </div>
      </article>`).join("");
  }
  document.getElementById("tabs").addEventListener("click",e=>{
    const t=e.target.closest(".tab"); if(!t) return;
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("on"));
    t.classList.add("on"); render(t.dataset.f);
  });
  render("all");

// ===== Lightbox: klik foto untuk lihat full =====
const lb=document.getElementById("lb"),lbimg=document.getElementById("lbimg"),lbcap=document.getElementById("lbcap");
let list=[],idx=0;
function show(i){
  idx=(i+list.length)%list.length;
  lbimg.src=list[idx].dataset.src; lbimg.alt=list[idx].dataset.cap; lbcap.textContent=list[idx].dataset.cap;
}
function openLb(el){
  list=[...document.querySelectorAll(".zoomable")].filter(z=>z.querySelector("img"));
  show(list.indexOf(el)); lb.classList.add("open"); lb.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
function closeLb(){lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); document.body.style.overflow="";}
document.addEventListener("click",e=>{
  const z=e.target.closest(".zoomable"); if(z && z.querySelector("img")) openLb(z);
});
document.getElementById("lbx").onclick=closeLb;
document.getElementById("lbp").onclick=e=>{e.stopPropagation();show(idx-1)};
document.getElementById("lbn").onclick=e=>{e.stopPropagation();show(idx+1)};
lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
document.addEventListener("keydown",e=>{
  if(!lb.classList.contains("open"))return;
  if(e.key==="Escape")closeLb(); if(e.key==="ArrowLeft")show(idx-1); if(e.key==="ArrowRight")show(idx+1);
});
// swipe di HP
let sx=0; lb.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx; if(Math.abs(d)>50)show(d>0?idx-1:idx+1)});

// ===== Muncul pelan saat di-scroll =====
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+"ms";io.observe(el)});
