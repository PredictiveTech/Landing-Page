(() => {
  const track = document.querySelector('#app-capture-track');
  if (!track) return;
  const slides = [...track.querySelectorAll('.app-screenshot-card')];
  const previous = document.querySelector('#capture-prev');
  const next = document.querySelector('#capture-next');
  const counter = document.querySelector('#capture-counter');
  let current = 0;
  const position = index => slides[index].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - track.clientLeft;
  const update = () => {
    current = slides.reduce((best, slide, index) => Math.abs(position(index) - track.scrollLeft) < Math.abs(position(best) - track.scrollLeft) ? index : best, 0);
    counter.textContent = `${current + 1} / ${slides.length}`;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
  };
  const go = index => {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({left:position(target), behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();
})();
