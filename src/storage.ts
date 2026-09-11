export interface Thing { id: string; text: string; done: boolean; }
export interface DayState { date: string; things: Thing[]; }
const STORAGE_KEY='three-things:v1';
export function todayKey(d=new Date()):string { const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; }
export function loadState():DayState { const today=todayKey(); try { const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return {date:today,things:[]}; const p=JSON.parse(raw) as DayState; if(!p||!Array.isArray(p.things)||p.date!==today)return {date:today,things:[]}; return {date:today,things:p.things.filter(t=>t&&typeof t.id==='string'&&typeof t.text==='string'&&typeof t.done==='boolean').slice(0,3)}; } catch { return {date:today,things:[]}; } }
export function saveState(state:DayState):void { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
export function newId():string { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
