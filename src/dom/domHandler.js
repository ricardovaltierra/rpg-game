import { setPlayer, getPlayer } from '../api/player';
import initGame  from '../index';
import { createElement, getElement, appendChild, appendChilds, appendToBody, setClickListener, setEnterListener } from './elementsHander';

export function domInit() {
  
  const inputWrapper = createElement('div', 'input-wrapper', '', '' );
  // const label = createElement('div', 'input-text', '', '');
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

export function checkForm() {
  let playerName = getElement('player-input');
  if (playerName.value) {
     let inputWrapper = getElement('input-wrapper');
     document.body.removeChild(inputWrapper);
     setPlayer(playerName.value);
     initGame();
    } else {
     console.log('not value');
     playerName.classList.add('error');
     setTimeout(() => playerName.classList.remove('error'), 4000);
    }
}





