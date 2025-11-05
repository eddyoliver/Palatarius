/*
 * Scripts principais para o site Palatarius.
 * Aqui incluímos funcionalidades simples como o menu responsivo e um
 * carrossel de imagens na página inicial. Caso deseje adicionar
 * comportamentos mais avançados (como carrinho de compras ou chamadas
 * AJAX), este arquivo é um ponto de partida.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Exemplo de carrossel básico: alterna classes 'active' em imagens
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  if (slides.length > 0) {
    // Inicializa primeira imagem
    slides[currentIndex].classList.add('active');
    setInterval(() => {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }, 5000); // muda a cada 5 segundos
  }
});