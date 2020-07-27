import { setPlayer, getPlayer } from '../api/player';
import initGame  from '../index';
import { createElement, getElement, appendChilds, appendToBody, setClickListener, setEnterListener } from './elementsHander';

export function domInit() {
  
  const beginButton = createElement('checkbox', 'checkbox', 'c-checkbox', '')
  const inputWrapper = createElement('div', 'input-wrapper', '', '' );
  const label = createElement('div', 'input-text', '', '');
  const player = createElement('input', 'player-input', '', '');
  const enterGame = createElement('button', 'submit-button', '', 'Enter');

  player.placeholder = 'Please enter your name';

  setClickListener(enterGame, checkForm);
  setEnterListener(player, checkForm);
  appendChilds(inputWrapper, [label, player, enterGame]);
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





