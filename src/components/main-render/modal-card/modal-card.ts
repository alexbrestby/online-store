import './modal-card.css';

export const modalCard = () => {
  const promoCodeButton = document.querySelector('.promo-code-button');
  const modal = document.querySelector('.modal');
  promoCodeButton?.addEventListener('click', () => {
    modal?.classList.add('translateX-0');
  });
  modal?.addEventListener('click', (e) => {
    const wrap = (e.target as Element).classList.contains('modal');
    if (!wrap) return;
    modal?.classList.remove('translateX-0');
  });
};
