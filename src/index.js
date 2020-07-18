import 'phaser';
import config from './Config/config';
import Model from './Model';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import InstructionsScene from './Scenes/IstructionsScene';
import LeaderboardScene from './Scenes/LeaderboardScene';
import GameOverScene from './Scenes/GameOverScene';
import WinnerScene from './Scenes/WinnerScene';
import WorldScene from './Scenes/WorldScene';

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
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.add('WinnerScene', WinnerScene);
    this.scene.add('WorldScene', WorldScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();