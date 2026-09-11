import './style.css';
import { registerSW } from 'virtual:pwa-register';
import { loadState, saveState, newId, todayKey, type Thing, type DayState } from './storage';
registerSW({ immediate: true });
const app=document.querySelector<HTMLDivElement>('#app')!; let state:DayState=loadState();
function render(){const a=[...state.things];while(a.length<3)a.push(null as never);app.innerHTML=`<main class="shell"><header><p class="eyebrow">Today</p><h1>${new Date().toLocaleDateString('en',{weekday:'long',month:'short',day:'numeric'})}</h1></header><p class="prompt">${a.length?'Three things. That’s enough.':'What’s one thing that would make today a win?'}</p><ol class="slots">${a.map((t:Thing|null,i)=>t?`<li class="slot${t.done?' slot--done':''}"><button data-t="${t.id}">${t.done?'✓':'○'}</button><span>${t.text}</span><button data-d="${t.id}">×</button></li>`:`<li class="slot slot--empty">${i+1}</li>`).join('')}</ol>${state.things.length<3?'<form id="add-form"><input id="add-input" placeholder="Add a thing…"><button>+</button></form>':''}<footer>Three Things</footer></main>`}
app.addEventListener('submit',e=>{e.preventDefault();const i=app.querySelector<HTMLInputElement>('#add-input'),text=i?.value.trim();if(text&&state.things.length<3){state.things.push({id:newId(),text,done:false});saveState(state);render()}});
app.addEventListener('click',e=>{const x=(e.target as HTMLElement).closest<HTMLElement>('[data-t],[data-d]');if(!x)return;if(x.dataset.t){const t=state.things.find(v=>v.id===x.dataset.t);if(t)t.done=!t.done}else state.things=state.things.filter(v=>v.id!==x.dataset.d);saveState(state);render()});
if(state.date!==todayKey()){state={date:todayKey(),things:[]};saveState(state)}render();
