// 简单的脚本：为当前页面高亮导航
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(a=>{
    if(a.getAttribute('href') === location.pathname || (location.pathname === '/' && a.getAttribute('href') === '/index.html')){
      a.style.color = 'var(--accent)';
      a.style.fontWeight = '600';
    }
  })
});
