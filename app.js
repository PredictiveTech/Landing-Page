const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); }
menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const series = {
 vibration: {title: 'Vibración del motor', unit: 'mm/s · MOT-102', description: 'Datos ilustrativos de vibración con tendencia ascendente', values: [118,112,122,107,114,91,104,92,99,75,85,68,77,55,65,44,50,27,35], labels: ['8.0','6.0','4.0','2.0']},
 temperature: {title: 'Temperatura del motor', unit: '°C · MOT-102', description: 'Datos ilustrativos de temperatura con tendencia ascendente', values: [123,125,118,116,120,111,108,109,96,87,90,79,72,58,51,43,35,29,22], labels: ['90','75','60','45']}
};
document.querySelectorAll('[data-series]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-series]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
 const data = series[button.dataset.series];
 document.querySelector('#chart-title').textContent = data.title;
 document.querySelector('#chart-unit').textContent = data.unit;
 document.querySelector('#chart-desc').textContent = data.description;
 const path = data.values.map((y,i) => `${i ? 'L' : 'M'}${Math.round(32+i*431/18)} ${y}`).join('');
 document.querySelector('#line').setAttribute('d', path);
 document.querySelector('#area').setAttribute('d', `${path}V140H32Z`);
 document.querySelectorAll('.chart g text').forEach((text, i) => { if (i < 4) text.textContent = data.labels[i]; });
}));
const form = document.querySelector('#calculator');
function calculate() {
 const hours = Number(form.hours.value);
 document.querySelector('#hours-value').textContent = `${hours} h`;
 if (!form.checkValidity()) { document.querySelector('#savings').textContent = 'Revisa los valores'; document.querySelector('#saved-hours').textContent = '—'; return; }
 const cost = Number(form.cost.value), reduction = Number(form.reduction.value) / 100;
 document.querySelector('#savings').textContent = new Intl.NumberFormat('es-PE', {style:'currency',currency:'PEN',maximumFractionDigits:0}).format(hours*cost*reduction*12);
 document.querySelector('#saved-hours').textContent = `${new Intl.NumberFormat('es-PE', {maximumFractionDigits:1}).format(hours*reduction)} horas`;
}
form.addEventListener('input', calculate);
form.addEventListener('submit', event => event.preventDefault());
calculate();
