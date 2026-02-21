
(function(){
  const nav=document.querySelector('.site-nav'), menu=document.querySelector('.menu-btn');
  const year=document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();
  if(menu && nav){ menu.addEventListener('click',()=> nav.classList.toggle('open')); }
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.addEventListener('click', ()=>{
    const panel = btn.closest('.plan-card')?.querySelector('.toggle-content');
    if(panel) panel.classList.toggle('open');
  }));
})();
