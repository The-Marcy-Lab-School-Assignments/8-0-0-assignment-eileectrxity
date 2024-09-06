import { getFriends } from './fetch-funcs';
import { renderFriends } from './render-funcs';

export default async function app(div) {

  function createEl(tag, id) { //personal challenge- helper func to simplify + abstract away the creation of elements
    const el = document.createElement(tag);
    el.id = id;
    return el;
  };

  const appEls = {
    dogCard: createEl('div', 'dog-card'), //invoking the createEl func that uses DOM manipulation to create an el from the appEls obj key values (html el tag type + id name)
    dogImg: createEl('img', 'dog-img'),
    friendForm: createEl('div', 'form'),
  };
  Object.values(appEls).forEach((el) => div.append(el)); //appending the created els sequentially to the div el passed in as an arg to app (will be main div in main.js)

  try {
    const friend = await getFriends();
    renderFriends(appEls.dogCard, friend);
  }
  catch (err) {
    console.error('Failed to fetch and render luna:', err);
  };

  appEls.dogCard.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      try {
        const friend = await getFriends();
        renderFriends(appEls.dogCard, friend);
      }
      catch (err) {
        console.error('Failed to fetch and render friends:', err);
      }
    }
  });
};

// //feature 3- q3.1: create the new user
// appEls.newUserFormEl.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const formData = new FormData(appEls.newUserFormEl);
//   const formObj = Object.fromEntries(formData);
//   formObj.isCool = Boolean(formObj.isCool);

//   try {
//     const newUser = await createNewUser(formObj);
//     renderNewUser(appEls.newUserEl, newUser); //feature 3- q3.4: render the new user
//     appEls.newUserFormEl.reset();
//   } catch (err) {
//     console.error('Failed to create and render new user:', err);
//   }
// });