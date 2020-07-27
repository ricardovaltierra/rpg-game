import 'phaser';
import './assets/css/style.css';
import config from './config/config';
import Model from './objects/Model';
import { setPlayer } from './api/player';
import { createElement, getElement, appendChilds, appendToBody, setClickListener } from '../src/dom/elementsHander';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import InstructionsScene from './scenes/IstructionsScene';
import LeaderboardScene from './scenes/LeaderboardScene';
import GameOverScene from './scenes/GameOverScene';
import WinnerScene from './scenes/WinnerScene';
import WorldScene from './scenes/WorldScene';
import { BattleScene, UIScene }from './scenes/Battle';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Instructions', InstructionsScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Winner', WinnerScene);
    this.scene.add('World', WorldScene);
    this.scene.start('Boot');
  }
}

const inputWrapper = createElement('div', 'input-wrapper', '', '' );
const label = createElement('div', 'input-text', '', '');
const player = createElement('input', 'player-input', '', '');
const enterGame = createElement('button', 'submit-button', '', 'Enter');

player.placeholder = 'Please enter your name';

setClickListener(enterGame, checkForm);
appendChilds(inputWrapper, [label, player, enterGame]);
appendToBody(inputWrapper);


function checkForm() {
  let playerName = getElement('player-input');
  if (playerName.value) {
     let inputWrapper = getElement('input-wrapper');
     document.body.removeChild(inputWrapper);
     setPlayer(playerName.value);
     window.game = new Game();
    } else {
     console.log('empty');
     playerName.classList.add('error');
     setTimeout(() => playerName.classList.remove('error'), 4000);
    }
}