const images = [
  "src/images/personagens/personagem-1.png",
  "src/images/personagens/personagem-2.png",
  "src/images/personagens/personagem-3.png",
  "src/images/personagens/personagem-4.png",
  "src/images/personagens/personagem-5.png"
];

const person1 = document.getElementById("person1");
const person2 = document.getElementById("person2");
const person3 = document.getElementById("person3");

function shuffleImages() {
  const shuffled = images.sort(() => 0.5 - Math.random());
  person1.src = shuffled[0];
  person2.src = shuffled[1];
  person3.src = shuffled[2];
}

document.querySelectorAll(".choices button").forEach(btn => {
  btn.addEventListener("click", shuffleImages);
});
