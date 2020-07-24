import 'phaser';
import './assets/css/style.css';
import config from './config/config';
import Model from './objects/Model';
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
    // this.scene.add('BattleScene', BattleScene);
    // this.scene.add('UIScene', UIScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();