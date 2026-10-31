'use strict';
// O endpoint Formspree permite ENVIAR inscrições; consultar respostas exige
// acesso autenticado à conta de quem é dono do formulário.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnppgdak';
const drawer = document.getElementById('application-dialog');
const rejection = document.getElementById('rejection-dialog');
const form = document.getElementById('application-form');
const formView = document.getElementById('form-view');
const successView = document.getElementById('success-view');
const formError = document.getElementById('form-error');
const submitButton = document.getElementById('submit-button');
const successMessage = document.getElementById('success-message');
let lastTrigger = null;
const submitText = '<span>CONFIRMAR INSCRIÇÃO</span><span class="button-arrow" aria-hidden="true">↗</span>';

function resetApplication(){
  form.reset();
  formError.hidden = true;
  formError.textContent = '';
  formView.hidden = false;
  successView.hidden = true;
  submitButton.disabled = false;
  submitButton.innerHTML = submitText;
}
function closeDrawer(){drawer.close();}
function openDrawer(e){
  lastTrigger = e.currentTarget;
  resetApplication();
  drawer.showModal();
  document.getElementById('bread').focus();
}
for(const button of document.querySelectorAll('[data-open-drawer]')) button.addEventListener('click',openDrawer);
document.getElementById('close-drawer').addEventListener('click',closeDrawer);
drawer.addEventListener('close',()=>lastTrigger?.focus());
drawer.addEventListener('click', e=>{
  if(e.target===drawer){
    const r=drawer.getBoundingClientRect();
    if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) drawer.close();
  }
});
function reject(){
  if(drawer.open) drawer.close();
  rejection.showModal();
  document.getElementById('close-rejection').focus();
}
for(const radio of form.querySelectorAll('input[name="politica"]')){
  radio.addEventListener('change',()=>{if(radio.checked && radio.value==='sim')reject();});
}
document.getElementById('close-rejection').addEventListener('click',()=>rejection.close());
rejection.addEventListener('close',()=>{resetApplication();lastTrigger?.focus();});
document.getElementById('success-close').addEventListener('click',closeDrawer);
function showError(message){formError.textContent=message;formError.hidden=false;}
form.addEventListener('submit',async e=>{
  e.preventDefault();
  formError.hidden=true;
  if(!form.reportValidity()) return;
  const choice=form.querySelector('input[name="politica"]:checked')?.value;
  if(choice==='sim'){reject();return;}
  if(choice!=='nao'){showError('Responda à pergunta 2 para continuar.');return;}
  const name=form.elements.namedItem('nome').value.trim();
  const bread=form.elements.namedItem('pao_preferido').value;
  const contact=form.elements.namedItem('contato').value.trim();
  const trap=form.elements.namedItem('_gotcha').value;
  if(!name||!bread||!contact){showError('Preencha o pão, o nome e seu contato.');return;}
  submitButton.disabled=true;
  submitButton.textContent='ENVIANDO...';
  try{
    // Nenhum dado pessoal é salvo no navegador ou no repositório.
    // A resposta sobre política NÃO é incluída no envio.
    const response=await fetch(FORMSPREE_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({_subject:'Nova inscrição — Marmita After Hours',nome:name,pao_preferido:bread,contato:contact,_gotcha:trap})
    });
    if(!response.ok){
      let message='O serviço não recebeu sua inscrição. Tente novamente.';
      try{const data=await response.json();const errors=data.errors?.map(item=>item.message).filter(Boolean);if(errors?.length)message=errors.join(' ');}catch(_){/* resposta não JSON */}
      throw new Error(message);
    }
    const firstName=name.split(/\s+/)[0];
    successMessage.textContent=`${firstName}, sua inscrição entrou na nossa lista! 💚 Em breve entraremos em contato. Até lá, segura esse grave e não esquece seu pão favorito.`;
    form.reset();
    formView.hidden=true;
    successView.hidden=false;
    document.getElementById('success-close').focus();
  }catch(error){
    showError(`Falha no envio. ${error.message || 'Verifique a conexão e tente de novo.'}`);
  }finally{
    submitButton.disabled=false;
    submitButton.innerHTML=submitText;
  }
});
