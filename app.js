
const projects={scc:{tag:'SISTEMA DE CAPACITACIONES',title:'SCC — Sistema de Capacitaciones',desc:'Gestión de alumnos, cursos, matrículas, cuotas y pagos.',features:['Registro y búsqueda de alumnos','Cursos y matrículas','Cuotas, pagos y vencimientos','Exportación a Excel y listados','Usuarios y copias de respaldo']},comida:{tag:'PEDIDOS ONLINE',title:'Sistema para Local de Comida',desc:'Carta digital y recepción de pedidos para restaurantes.',features:['Carta y carrito','Retiro o delivery','Promociones','Recepción y estados de pedidos','Panel administrativo']},caja:{tag:'VENTAS Y CAJA',title:'Local de Comida con Caja',desc:'Operación de pedidos y ventas de mesón en una misma solución.',features:['Pedidos online y presenciales','Apertura y cierre de caja','Control de pagos y vuelto','Comandas para impresión','Estadísticas y exportación']},inventario:{tag:'EJEMPLO CONCEPTUAL — A COTIZAR',title:'Sistema de Inventario y Caja',desc:'Ejemplo de solución personalizable, todavía no presentado como producto finalizado.',features:['Registro y búsqueda de productos','Control de entradas y salidas de stock','Ventas y movimientos de caja','Alertas de existencias bajas','Reportes a definir según requerimientos']},medico:{tag:'SALUD',title:'Sistema Médico',desc:'Gestión de información clínica y consultas.',features:['Gestión de fichas clínicas','Registro de consultas','Documentación y certificados','Acceso de usuarios','Protección de datos y respaldos']}};
const dialog=document.getElementById('project-dialog');document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[button.dataset.project];if(!p)return;document.getElementById('dialog-tag').textContent=p.tag;document.getElementById('dialog-title').textContent=p.title;document.getElementById('dialog-desc').textContent=p.desc;document.getElementById('dialog-list').replaceChildren(...p.features.map(f=>{const li=document.createElement('li');li.textContent=f;return li}));dialog.querySelector('.js-whatsapp').href='https://wa.me/56953877804?text='+encodeURIComponent('Hola, me interesa saber más sobre '+p.title+'.');dialog.showModal()}));
document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.getElementById('year').textContent=new Date().getFullYear();const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('nav');toggle.addEventListener('click',()=>{const state=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(state))});nav.querySelectorAll('a').forEach(x=>x.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

// Cada precio orientativo abre una conversación contextualizada.
document.querySelectorAll('.js-quote').forEach(link=>{const name=link.dataset.service;link.href='https://wa.me/56953877804?text='+encodeURIComponent('Hola, vi tu portafolio y quisiera cotizar: '+name+'. ¿Me puedes dar más información?');link.target='_blank';link.rel='noopener noreferrer'});

// Galería automática, accesible y controlable. Pausa al interactuar o al salir de pantalla.
(()=>{
 const frame=document.querySelector('.gallery-frame');if(!frame)return;
 const slides=[...frame.querySelectorAll('.gallery-slide')],dots=[...frame.querySelectorAll('.gallery-dot')];
 const pauseButton=document.getElementById('gallery-toggle');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active=0,paused=reduced,hover=false,focus=false,visible=true,timer;
 function show(n){active=(n+slides.length)%slides.length;slides.forEach((slide,i)=>{const on=i===active;slide.classList.toggle('is-active',on);slide.setAttribute('aria-hidden',String(!on));slide.querySelectorAll('button').forEach(el=>el.tabIndex=on?0:-1)});dots.forEach((dot,i)=>{const on=i===active;dot.classList.toggle('is-active',on);if(on)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')})}
 function stop(){clearInterval(timer)}
 function restart(){stop();if(!paused&&!hover&&!focus&&visible&&!document.hidden)timer=setInterval(()=>show(active+1),5500)}
 frame.querySelector('#gallery-prev').addEventListener('click',()=>{show(active-1);restart()});
 frame.querySelector('#gallery-next').addEventListener('click',()=>{show(active+1);restart()});
 dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
 pauseButton.addEventListener('click',()=>{paused=!paused;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.textContent=paused?'Reproducir ▶':'Pausar ▌▌';pauseButton.setAttribute('aria-label',paused?'Reanudar cambio automático':'Pausar cambio automático');restart()});
 frame.addEventListener('mouseenter',()=>{hover=true;restart()});frame.addEventListener('mouseleave',()=>{hover=false;restart()});
 frame.addEventListener('focusin',()=>{focus=true;restart()});frame.addEventListener('focusout',()=>{setTimeout(()=>{focus=frame.contains(document.activeElement);restart()},0)});
 document.addEventListener('visibilitychange',restart);
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart()},{threshold:.1}).observe(frame)}
 if(reduced){pauseButton.textContent='Reproducir ▶';pauseButton.setAttribute('aria-pressed','true');pauseButton.setAttribute('aria-label','Reanudar cambio automático')}
 show(0);restart();
})();
