/* eslint-disable import/no-cycle */

import { setPlayer } from '../api/player';
import initGame from '../index';
import {
  createElement, getElement,
  appendChild, appendChilds,
  appendToBody, setClickListener,
  setEnterListener, addToClass,
} from './elementsHander';

export function checkForm() {
  const playerName = getElement('player-input');
  if (playerName.value) {
    const inputWrapper = getElement('input-wrapper');
    document.body.removeChild(inputWrapper);
    setPlayer(playerName.value);
    initGame();
  } else {
    playerName.classList.add('error');
    setTimeout(() => playerName.classList.remove('error'), 4000);
  }
}

function gameInit() {
  const inputWrapper = createElement('div', 'input-wrapper', '', '');
  const checkBegin = createElement('input', 'checkbox', 'c-checkbox', '');
  const formWrapper = createElement('div', '', 'c-formContainer', '');
  const formPlayer = createElement('form', '', 'c-form', '');
  const player = createElement('input', 'player-input', 'c-form__input', '');
  const labelButton = createElement('label', '', 'c-form__buttonLabel', '');
  const enterGame = createElement('button', 'submit-button', 'c-form__button', 'Enter');
  const labelBegin = createElement('label', '', 'c-form__toggle');

  checkBegin.type = 'checkbox';
  formPlayer.setAttribute('action', '');
  player.type = 'text';
  player.placeholder = 'My name';
  labelButton.htmlFor = 'checkbox';
  enterGame.type = 'button';
  labelBegin.htmlFor = 'checkbox';
  labelBegin.setAttribute('data-title', 'Begin');

  setClickListener(enterGame, checkForm);
  setEnterListener(player, checkForm);
  appendChild(labelButton, enterGame);
  appendChild(formPlayer, player);
  appendChild(formPlayer, labelButton);
  appendChild(formPlayer, labelBegin);
  appendChild(formWrapper, formPlayer);
  appendChilds(inputWrapper, [checkBegin, formWrapper]);
  appendToBody(inputWrapper);
}

function battleInit() {
  const enemyPanel = createElement('div', 'enemy-panel', 'hidden', '');
    const heroPanel = createElement('div', 'hero-panel', 'hidden', '');
    const enemy1D = createElement('div', 'enemy1-wrapper', 'enemy-wrapper', '');
    const enemy2D = createElement('div', 'enemy2-wrapper', 'enemy-wrapper', '');
    const hero1D = createElement('div', '', 'hero-wrapper', '');
    const hero2D = createElement('div', '', 'hero-wrapper', '');
    const enemy1N = createElement('p', 'enemy1-name', 'eh-name', 'Vampire');
    const enemy2N = createElement('p', 'enemy2-name', 'eh-name', 'Werewolf');
    const enemy1L = createElement('p', 'enemy1-life', 'eh-life', '200');
    const enemy2L = createElement('p', 'enemy2-life', 'eh-life', '200');
    const hero1N = createElement('p', 'hero1-name', 'eh-name', 'Knight 1');
    const hero2N = createElement('p', 'hero2-name', 'eh-name', 'Knight 2');
    const hero1L = createElement('p', 'hero1-life', 'eh-life', '1000');
    const hero2L = createElement('p', 'hero2-life', 'eh-life', '1000');

    appendChilds(enemyPanel, [enemy1D, enemy2D]);
    appendChilds(heroPanel, [hero1D, hero2D]);
    appendChilds(enemy1D, [enemy1N, enemy1L]);
    appendChilds(enemy2D, [enemy2N, enemy2L]);
    appendChilds(hero1D, [hero1N, hero1L]);
    appendChilds(hero2D, [hero2N, hero2L]);

    appendToBody(enemyPanel);
    appendToBody(heroPanel);
}

function setIcon() {
  const head = document.querySelector('head');
  const linkIcon = createElement('link', 'favicon', '', '');
  linkIcon.rel = 'icon';
  linkIcon.type = 'image/png';
  linkIcon.href = 'https://opengameart.org/sites/default/files/jabolko%28red%29.png';

  const ogImage = createElement('meta', '', '', '');
  const liImage = createElement('meta', '', '', '');
  const ogURL   = createElement('meta', '', '', '');
  const liCard  = createElement('meta', '', '', '');
  const ogDesc  = createElement('meta', '', '', '');
  const ogTitle = createElement('meta', '', '', '');
  const author  = createElement('meta', '', '', '');
  const date    = createElement('abbr', '', 'published', 'Aug. 11, 2020');
  var dateSet = new Date(2020, 8, 11);

  ogImage.setAttribute('property', 'og:image');
  ogImage.name = 'image';
  liImage.name = 'linkedin:image';
  ogURL.setAttribute('property', 'og:url');
  ogURL.name = 'url';
  liCard.name = 'linkedin:card';
  ogDesc.setAttribute('property', 'og:description');
  ogDesc.name = 'description';
  ogTitle.setAttribute('property', 'og:title');
  author.name = 'author';

  ogImage.content = 'https://opengameart.org/sites/default/files/jabolko%28red%29.png';
  liImage.content = 'https://opengameart.org/sites/default/files/jabolko%28red%29.png';
  ogURL.content = 'little-red-ridding-hood.netlify.app/';
  liCard.content = 'summary';
  ogDesc.content = 'Little red Riding Hood Turn-Based RPG Video Game';
  ogTitle.content = 'Weather App';
  author.content = 'Ricardo Valtierra';
  date.title = dateSet;



  appendChilds(head, [linkIcon, ogImage, liImage, ogURL, liCard, ogDesc, ogTitle, author, date]);
}

export function domInit() {
  setIcon();
  gameInit();
  battleInit();
}