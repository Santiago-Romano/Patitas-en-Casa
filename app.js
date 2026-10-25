(function(){
var $=function(i){return document.getElementById(i)};
var ST=window.STATE;
var filt='Todos',cur=null,last=null,dirty=false,tab='p',ap=ST.pets[0]?ST.pets[0].id:null;
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function mix(h,t,a){var n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,T=t=='w'?255:0;return 'rgb('+Math.round(r+(T-r)*a)+','+Math.round(g+(T-g)*a)+','+Math.round(b+(T-b)*a)+')'}
function art(p,i){
  var c=p.c||['#F6C35B','#C98B4B'],bg=c[0],f=c[1],dog=p.k=='perro',q=[{x:0,y:0,s:1,r:0},{x:-18,y:10,s:1.05,r:-7},{x:10,y:-20,s:1.35,r:5},{x:0,y:20,s:.92,r:0}][i%4],
  col=['#B08D57','#2E8B6A','#C0485A','#3F6BB5'][p.n.length%4],soft=mix(f,'w',.55),dk=mix(f,'k',.28),spot=p.n.length%2;
  var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><radialGradient id="b" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="'+mix(bg,'w',.5)+'"/><stop offset=".6" stop-color="'+bg+'"/><stop offset="1" stop-color="'+mix(bg,'k',.2)+'"/></radialGradient><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+mix(f,'w',.12)+'"/><stop offset="1" stop-color="'+mix(f,'k',.12)+'"/></linearGradient></defs>'
  +'<rect width="400" height="500" fill="url(#b)"/><g fill="#fff" opacity=".22"><circle cx="'+(70+i*60)+'" cy="90" r="'+(30+i*7)+'"/><circle cx="'+(330-i*40)+'" cy="170" r="'+(18+i*5)+'"/><circle cx="90" cy="'+(260+i*20)+'" r="14"/></g><ellipse cx="200" cy="490" rx="270" ry="70" fill="'+mix(bg,'k',.25)+'" opacity=".5"/>'
  +'<g transform="translate(200 300) translate('+q.x+' '+q.y+') rotate('+q.r+') scale('+q.s+') translate(-200 -300)">'
  +'<ellipse cx="200" cy="475" rx="128" ry="112" fill="url(#f)"/><ellipse cx="200" cy="448" rx="54" ry="70" fill="'+soft+'"/>'
  +(dog?'<ellipse cx="112" cy="270" rx="34" ry="70" fill="'+dk+'" transform="rotate(14 112 270)"/><ellipse cx="288" cy="270" rx="34" ry="70" fill="'+dk+'" transform="rotate(-14 288 270)"/>'
   :'<polygon points="112,265 128,150 205,215" fill="url(#f)"/><polygon points="288,265 272,150 195,215" fill="url(#f)"/><polygon points="130,232 138,176 176,214" fill="#F2A9B6" opacity=".8"/><polygon points="270,232 262,176 224,214" fill="#F2A9B6" opacity=".8"/>')
  +'<ellipse cx="200" cy="385" rx="78" ry="15" fill="'+col+'"/><circle cx="200" cy="406" r="10" fill="#E6CF9F"/><ellipse cx="200" cy="290" rx="102" ry="94" fill="url(#f)"/>'
  +(dog?(spot?'<circle cx="163" cy="268" r="34" fill="'+dk+'" opacity=".55"/>':'<path d="M200 205q-10 30 0 50q10-20 0-50" fill="'+soft+'"/>'):'<path d="M200 202v34M178 208l6 26M222 208l-6 26" stroke="'+dk+'" stroke-width="7" stroke-linecap="round" opacity=".6"/>')
  +'<ellipse cx="200" cy="326" rx="'+(dog?54:42)+'" ry="'+(dog?40:29)+'" fill="'+soft+'"/><circle cx="150" cy="312" r="16" fill="#F28CA0" opacity=".25"/><circle cx="250" cy="312" r="16" fill="#F28CA0" opacity=".25"/>'
  +(dog?'<circle cx="165" cy="278" r="12" fill="#1b1b1b"/><circle cx="235" cy="278" r="12" fill="#1b1b1b"/><circle cx="169" cy="273" r="4.5" fill="#fff"/><circle cx="239" cy="273" r="4.5" fill="#fff"/><ellipse cx="200" cy="309" rx="19" ry="13" fill="#222"/><ellipse cx="194" cy="305" rx="6" ry="3" fill="#fff" opacity=".5"/><path d="M200 322v10M200 332q-16 14-30 3M200 332q16 14 30 3" stroke="#222" stroke-width="3.5" fill="none" stroke-linecap="round"/>'+(i%2?'<path d="M187 338q13 28 26 0z" fill="#F2758B"/>':'')
   :'<ellipse cx="163" cy="278" rx="15" ry="16" fill="#E3B341"/><ellipse cx="237" cy="278" rx="15" ry="16" fill="#E3B341"/><ellipse cx="163" cy="278" rx="4" ry="12" fill="#111"/><ellipse cx="237" cy="278" rx="4" ry="12" fill="#111"/><circle cx="168" cy="272" r="3.5" fill="#fff"/><circle cx="242" cy="272" r="3.5" fill="#fff"/><polygon points="190,309 210,309 200,321" fill="#E27C8B"/><path d="M200 321q-9 12-20 5M200 321q9 12 20 5" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/><g stroke="#fff" stroke-width="2" opacity=".85"><path d="M150 318l-62-8M150 328l-64 8M250 318l62-8M250 328l64 8"/></g>')
  +'</g></svg>';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
}
function media(p){return p.media&&p.media.length?p.media:[0,1,2,3].map(function(i){return {t:'i',u:art(p,i)}})}
function cover(p){var m=(p.media||[]).filter(function(x){return x.t=='i'})[0];return m?m.u:art(p,0)}
function byId(id){return ST.pets.filter(function(p){return p.id==id})[0]}
function anyOpen(){return document.querySelector('.overlay.open')}
function openOv(id){$(id).classList.add('open');$(id).setAttribute('aria-hidden','false');$(id).scrollTop=0;document.body.style.overflow='hidden'}
function closeOv(id){$(id).classList.remove('open');$(id).setAttribute('aria-hidden','true');if(!anyOpen())document.body.style.overflow=''}
function render(){
  if(filt!='Todos'&&ST.sections.indexOf(filt)<0)filt='Todos';
  $('filters').innerHTML=['Todos'].concat(ST.sections).map(function(s){return '<button data-f="'+esc(s)+'" aria-pressed="'+(s==filt)+'">'+esc(s)+'</button>'}).join('');
  var l=ST.pets.filter(function(p){return filt=='Todos'||p.sec==filt});
  $('count').textContent=l.length+(l.length==1?' mascota':' mascotas');
  var fp=ST.pets.filter(function(p){return p.st!='Adoptado'})[0]||ST.pets[0],fe=$('feat');
  if(fp){fe.hidden=false;fe.dataset.id=fp.id;fe.setAttribute('aria-label','Conocer a '+fp.n);fe.innerHTML='<img src="'+esc(cover(fp))+'" alt=""><span class="cap">'+esc(fp.n)+'<small>'+esc(fp.age)+'</small></span>'}else fe.hidden=true;
  $('grid').innerHTML=l.length?l.map(function(p){
    return '<button class="card" data-id="'+esc(p.id)+'"><span class="ph"><img src="'+esc(cover(p))+'" alt="Foto de '+esc(p.n)+'"><em>'+esc(p.st=='Adoptado'?'Adoptado':(p.sec||(p.k=='perro'?'Perro':'Gato')))+'</em></span><div class="body"><h3>'+esc(p.n)+'<span class="age">'+esc(p.age)+'</span></h3><p>'+esc(p.short)+'</p></div></button>';
  }).join(''):'<p class="empty">No hay animales en esta sección por ahora.</p>';
}
function openPet(id){
  var p=byId(id);if(!p)return;cur=p;
  $('dn').textContent=p.n;$('da').textContent=p.age||'';
  $('dl').textContent=[p.sec,p.sex,p.size&&('tamaño '+p.size.toLowerCase())].filter(Boolean).join(' · ');
  $('dd').textContent=p.long||p.short||'';
  var rows=[['Estado',p.st],['Vacunado',p.vac],['Castrado',p.cas],['Con chicos',p.kids],['Con otros animales',p.oth],['Energía',p.en]].filter(function(r){return r[1]});
  $('dt').innerHTML=rows.map(function(r){return '<div class="trait"><small>'+r[0]+'</small><b>'+esc(r[1])+'</b></div>'}).join('');
  var ad=p.st=='Adoptado';$('dc').hidden=ad;$('dc').textContent='Quiero adoptar a '+p.n;$('dnote').textContent=ad?p.n+' ya encontró familia. ¡Mirá a los demás!':'';
  var ms=media(p),th=$('th');
  th.innerHTML=ms.map(function(m,i){return '<button data-i="'+i+'" aria-label="Ver archivo '+(i+1)+'">'+(m.t=='v'?'<span class="vt">▶</span>':'<img src="'+esc(m.u)+'" alt="">')+'</button>'}).join('');
  th.onclick=function(e){var b=e.target.closest('button');if(b)show(+b.dataset.i)};
  function show(i){var m=ms[i];$('mm').innerHTML=m.t=='v'?'<video src="'+esc(m.u)+'" controls playsinline></video>':'<img src="'+esc(m.u)+'" alt="Foto '+(i+1)+' de '+esc(p.n)+'">';Array.prototype.forEach.call(th.children,function(b,j){b.setAttribute('aria-current',j==i)})}
  show(0);openOv('ov');
}
function closePet(){closeOv('ov');cur=null;if(location.hash)try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}if(last)last.focus()}
function msgText(){
  var f=$('af').elements,g=function(n){return (f[n].value||'-').trim()};
  return 'Solicitud de adopción: '+cur.n+'\nNombre: '+g('nombre')+'\nTeléfono: '+g('tel')+'\nEmail: '+g('email')+'\nZona: '+g('zona')+'\nVivienda: '+g('viv')+' ('+g('prop')+')\nChicos en casa: '+g('chicos')+'\nOtros animales: '+g('otros')+'\nExperiencia: '+g('exp')+'\nMotivo: '+g('motivo')+'\nAcepto entrevista y seguimiento: sí';
}
function go(url){var a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}
function send(kind){
  var fm=$('af');if(!fm.reportValidity())return;var t=msgText(),n=$('fn');
  if(kind=='wa'){go('https://wa.me/'+(ST.settings.wa||'').replace(/\D/g,'')+'?text='+encodeURIComponent(t));n.textContent='Se abrió WhatsApp con tu solicitud lista para enviar. Falta que toques Enviar.'}
  else if(kind=='mail'){go('mailto:'+encodeURIComponent(ST.settings.email||'')+'?subject='+encodeURIComponent('Adopción de '+cur.n)+'&body='+encodeURIComponent(t));n.textContent='Se abrió tu correo con la solicitud lista para enviar.'}
  else{try{navigator.clipboard.writeText(t).then(function(){n.textContent='Solicitud copiada.'},function(){n.textContent='No se pudo copiar.'})}catch(e){n.textContent='No se pudo copiar.'}}
}
/* admin */
function setDirty(){dirty=true;var s=$('sv');if(s)s.textContent='Hay cambios sin publicar.'}
function fi(l,k,p,ty){return '<label class="fld"><span>'+l+'</span><input data-k="'+k+'" type="'+(ty||'text')+'" value="'+esc(p[k])+'"></label>'}
function sel(l,k,p,o){return '<label class="fld"><span>'+l+'</span><select data-k="'+k+'">'+o.map(function(x){return '<option'+(x==p[k]?' selected':'')+'>'+esc(x)+'</option>'}).join('')+'</select></label>'}
function admHTML(){
  var h='<div class="adm-in"><h2>Panel de administración</h2><div class="tabs">'+[['p','Mascotas'],['s','Secciones'],['a','Ajustes']].map(function(t){return '<button data-act="tab" data-t="'+t[0]+'" aria-pressed="'+(tab==t[0])+'">'+t[1]+'</button>'}).join('')+'</div>';
  if(tab=='p'){
    var p=byId(ap)||ST.pets[0];
    h+='<div class="adm-cols"><div class="adm-list"><button class="new" data-act="newpet">+ Nueva mascota</button>'+ST.pets.map(function(x){return '<button data-act="pick" data-id="'+esc(x.id)+'" aria-current="'+(p&&x.id==p.id)+'">'+esc(x.n)+'</button>'}).join('')+'</div><div>';
    if(p){
      h+='<div class="two">'+fi('Nombre','n',p)+fi('Edad','age',p)+'</div><div class="two">'+sel('Sección','sec',p,[''].concat(ST.sections))+sel('Estado','st',p,['Disponible','En proceso','Adoptado'])+'</div><div class="two">'+fi('Sexo','sex',p)+fi('Tamaño','size',p)+'</div>'
      +'<label class="fld"><span>Descripción corta (tarjeta)</span><textarea data-k="short" style="min-height:60px">'+esc(p.short)+'</textarea></label><label class="fld"><span>Descripción completa</span><textarea data-k="long" style="min-height:130px">'+esc(p.long)+'</textarea></label>'
      +'<div class="two">'+fi('Vacunado','vac',p)+fi('Castrado','cas',p)+fi('Con chicos','kids',p)+fi('Con otros animales','oth',p)+fi('Energía','en',p)+sel('Ilustración de ejemplo','k',p,['perro','gato'])+'</div>'
      +'<div class="fld"><span>Fotos y videos</span><div class="ams">'+((p.media||[]).length?p.media.map(function(m,i){return '<div class="am">'+(m.t=='v'?'<span class="vt">▶</span>':'<img src="'+esc(m.u)+'" alt="">')+'<button data-act="dm" data-i="'+i+'" aria-label="Quitar archivo">×</button></div>'}).join(''):'<span class="note">Sin archivos propios: se muestran fotos generadas de ejemplo.</span>')+'</div><input type="file" id="up" accept="image/*,video/*" multiple><p class="note" id="um" role="status"></p></div>'
      +'<button class="danger" data-act="delpet">Eliminar a '+esc(p.n)+'</button>';
    }
    h+='</div></div>';
  }else if(tab=='s'){
    h+='<p class="note">Las secciones son los filtros que ven las personas arriba de la lista. Asignás cada mascota a una sección desde su ficha.</p>'+ST.sections.map(function(s,i){return '<div class="sec-row"><span>'+esc(s)+' <small class="note">('+ST.pets.filter(function(p){return p.sec==s}).length+')</small></span><button class="danger" data-act="delsec" data-i="'+i+'">Quitar</button></div>'}).join('')
    +'<div class="two" style="margin-top:18px"><label class="fld"><span>Nueva sección</span><input id="ns" placeholder="Ej: Conejos, Urgentes, Adoptados"></label><div style="align-self:end;margin-bottom:12px"><button class="cta" data-act="addsec">Agregar sección</button></div></div>';
  }else{
    h+='<label class="fld"><span>WhatsApp que recibe las solicitudes (con código de país, ej: 5491112345678)</span><input data-s="wa" value="'+esc(ST.settings.wa)+'" inputmode="numeric"></label><label class="fld"><span>Email que recibe las solicitudes</span><input data-s="email" type="email" value="'+esc(ST.settings.email)+'"></label>';
  }
  return h+'<div class="savebar"><span id="sv">'+(dirty?'Hay cambios sin publicar.':'Todo publicado.')+'</span><button class="cta" data-act="save">Guardar y publicar</button></div></div>';
}
function admRender(){$('adc').innerHTML=admHTML()}
function save(){var s=$('sv');if(s)s.textContent='La publicación solo funciona dentro del hosting de Claude.'}
async function upload(files){
  var m=$('um'),p=byId(ap),a=null;
  try{a=await claude.use('assets')}catch(e){}
  if(!a){m.textContent='No tenés permiso para subir archivos.';return}
  for(var i=0;i<files.length;i++){var f=files[i];m.textContent='Subiendo '+f.name+'…';
    try{var r=await a.upload(f);p.media=p.media||[];p.media.push({t:f.type.indexOf('video')==0?'v':'i',u:r.url});dirty=true}
    catch(e){m.textContent='No se pudo subir '+f.name+' (máximo 20 MB).';return}}
  admRender();
}
document.addEventListener('click',function(e){
  var c=e.target.closest('.card,.arch');if(c){last=c;try{location.hash=c.dataset.id}catch(x){}openPet(c.dataset.id);return}
  var f=e.target.closest('[data-f]');if(f){filt=f.dataset.f;render();return}
  var b=e.target.closest('[data-act]');
  if(e.target===$('ov'))return closePet();if(e.target===$('fo'))return closeOv('fo');
  if(!b)return;var a=b.dataset.act,p=byId(ap);
  if(a=='close-ov')closePet();
  else if(a=='close-fo')closeOv('fo');
  else if(a=='close-ad')closeOv('ad');
  else if(a=='adopt'&&cur){$('ft').textContent='Adoptar a '+cur.n;$('fs').textContent='Completá tus datos. Al enviarla, quienes cuidan a '+cur.n+' se ponen en contacto con vos.';$('af').reset();$('fn').textContent='';$('mailBtn').hidden=!ST.settings.email;openOv('fo')}
  else if(a=='send-wa')send('wa');else if(a=='send-mail')send('mail');else if(a=='copy')send('copy');
  else if(a=='tab'){tab=b.dataset.t;admRender()}
  else if(a=='pick'){ap=b.dataset.id;admRender()}
  else if(a=='newpet'){var n={id:'p'+Date.now().toString(36),n:'Nueva mascota',k:'perro',sec:ST.sections[0]||'',st:'Disponible',age:'',sex:'',size:'',short:'',long:'',vac:'',cas:'',kids:'',oth:'',en:'',c:['#F6C35B','#C98B4B'],media:[]};ST.pets.push(n);ap=n.id;setDirty();render();admRender()}
  else if(a=='delpet'&&p&&confirm('¿Eliminar a '+p.n+'? Se quita al publicar.')){ST.pets=ST.pets.filter(function(x){return x!==p});ap=ST.pets[0]?ST.pets[0].id:null;setDirty();render();admRender()}
  else if(a=='dm'&&p){p.media.splice(+b.dataset.i,1);setDirty();render();admRender()}
  else if(a=='addsec'){var v=$('ns').value.trim();if(v&&ST.sections.indexOf(v)<0){ST.sections.push(v);setDirty();render();admRender()}}
  else if(a=='delsec'){var s=ST.sections[+b.dataset.i];if(confirm('¿Quitar la sección '+s+'? Sus mascotas quedan sin sección.')){ST.sections.splice(+b.dataset.i,1);ST.pets.forEach(function(x){if(x.sec==s)x.sec=''});setDirty();render();admRender()}}
  else if(a=='save')save();
});
document.addEventListener('input',function(e){
  var t=e.target,p=byId(ap);
  if(t.dataset&&t.dataset.k&&p){p[t.dataset.k]=t.value;setDirty();render()}
  else if(t.dataset&&t.dataset.s){ST.settings[t.dataset.s]=t.value.trim();setDirty()}
});
document.addEventListener('change',function(e){
  if(e.target.id=='up'&&e.target.files.length)upload(Array.prototype.slice.call(e.target.files));
  if(e.target.dataset&&e.target.dataset.k=='n')admRender();
});
document.addEventListener('keydown',function(e){if(e.key=='Escape'){if($('fo').classList.contains('open'))closeOv('fo');else if($('ad').classList.contains('open'))closeOv('ad');else if($('ov').classList.contains('open'))closePet()}});
$('adminBtn').onclick=function(){admRender();openOv('ad')};
window.addEventListener('hashchange',function(){var h=location.hash.slice(1);if(h&&byId(h))openPet(h);else if(!h&&$('ov').classList.contains('open'))closePet()});
render();
if(location.hash.length>1)openPet(location.hash.slice(1));
try{claude.use('user').then(function(u){if(u&&u.canEdit&&u.canEdit())$('adminBtn').hidden=false}).catch(function(){})}catch(e){}
})();
