export default function renderFriends(dogCard, friend) {
  dogCard.innerHTML = '';
  if (!friend) dogCard.textContent = "Couldn't load friends.";

  const img = document.createElement('img');
  img.id = 'dog-img';
  img.src = friends.photoUrl;
  img.alt = "A friend";

  const p = document.createElement('p');
  p.id = 'dog-text';
  p.textContent = "A friend";

  const button = document.createElement('button');
  button.textContent = 'See new friend';

  dogCard.appendChild(img, p, button);
};