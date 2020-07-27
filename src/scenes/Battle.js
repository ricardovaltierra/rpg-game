/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

import 'phaser';
import { setPunctuation } from '../api/punctuation';

const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
    },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },
  // when the associated enemy or player unit is killed
  unitKilled() {
    this.active = false;
    this.visible = false;
  },

});

const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

    function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.x = x;
      this.y = y;
      this.selected = false;
    },
  addMenuItem(unit) {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  },
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex -= 1;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },
  // select the menu as a whole and an element with index from it
  select(index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
      if (this.menuItemIndex == index) return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  },
  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  },
  confirm() {
    // wen the player confirms his slection, do the action
  },
  clear() {
    for (let i = 0; i < this.menuItems.length; i += 1) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      unit.setMenuItem(this.addMenuItem(unit.type));
    }
    this.menuItemIndex = 0;
  },
});

const HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
    },
  confirm() {
    this.scene.events.emit('SelectedAction');
  },

});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  },
});

const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
      this.type = type;
      this.hp = hp;
      this.maxHp = this.hp;
      this.damage = damage; // default damage
      this.living = true;
      this.menuItem = null;
    },
  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  },
  attack(target) {
    if (target.living) {
      // Uncomment for an even smoother game on console
      // console.log(`${target.type} living before attack: ${target.hp}`);
      target.takeDamage(this.damage);
      // console.log(`${target.type} get new living: ${target.hp} after attack`);
      // console.log('--------------------------------');
      this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  },
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      // flip the image so I don't have to edit it manually
      this.flipX = true;

      this.setScale(2);
    },
});

const Message = new Phaser.Class({

  Extends: Phaser.GameObjects.Container,

  initialize:
    function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 160, 20);
      const graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(100, 50, 300, 150);
      graphics.fillRect(100, 50, 300, 150);
      this.text = new Phaser.GameObjects.Text(scene, 250, 120, '', {
        color: '#ffffff', align: 'center', fontSize: 23, wordWrap: { width: 260, useAdvancedWrap: true },
      });
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on('Message', this.showMessage, this);
      this.visible = false;
    },
  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
  },
  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  },
});

const BattleScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function BattleScene() {
      Phaser.Scene.call(this, { key: 'BattleScene' });
    },

  init(data) {
    this.dataEnemy = data.enemy;
    this.playerY = data.y;
  },

  create() {
    this.add.image(400, 300, 'forest-landscape');
    this.startBattle(this.dataEnemy);

    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  },
  startBattle(data) {
    // player character - warrior
    const knight1 = new PlayerCharacter(this, 650, 125, 'knight1', 1, 'Knight 1', 100, 20);
    knight1.scale = 0.45;
    knight1.flipX = false;
    this.add.existing(knight1);

    // player character - mage
    const knight2 = new PlayerCharacter(this, 650, 275, 'knight2', 4, 'Knight 2', 100, 15);
    knight2.scale = 0.16;
    this.add.existing(knight2);

    let creature1 = '';
    let creature2 = '';

    switch (data) {
      case 'group1':

        creature1 = new Enemy(this, 160, 110, 'werewolf1', null, 'Werewolf', 50, 15);
        creature1.scale = 0.7;

        creature2 = new Enemy(this, 120, 280, 'vampire1', null, 'Vampire', 50, 15);
        creature2.scale = 0.9;

        break;
      case 'group2':

        creature1 = new Enemy(this, 240, 135, 'ghost1', null, 'Ghost', 70, 25);
        creature1.scale = 0.19;

        creature2 = new Enemy(this, 120, 310, 'monster1', null, 'Monster', 80, 25);
        creature2.scale = 0.8;

        break;
      case 'group3':

        creature1 = new Enemy(this, 200, 110, 'werewolf2', null, 'Werewolf', 70, 20);
        creature1.scale = 0.18;

        creature2 = new Enemy(this, 120, 280, 'vampire2', null, 'Vampire', 70, 30);
        creature2.scale = 0.35;

        break;
      case 'group4':

        creature1 = new Enemy(this, 200, 130, 'wizard1', null, 'Wizard', 90, 20);
        creature1.scale = 0.35;

        creature2 = new Enemy(this, 120, 300, 'ghost2', null, 'Ghost', 70, 30);
        creature2.flipX = true;
        creature2.scale = 0.5;

        break;
      case 'group5':

        creature1 = new Enemy(this, 200, 120, 'monster2', null, 'Monster', 70, 25);
        creature1.flipX = true;
        creature1.scale = 0.25;

        creature2 = new Enemy(this, 120, 300, 'zombie1', null, 'Zombie', 80, 30);
        creature2.flipX = true;
        creature2.scale = 0.3;

        break;
      case 'group6':

        creature1 = new Enemy(this, 100, 160, 'wizard2', null, 'Wizard', 90, 30);
        creature1.scale = 0.5;

        creature2 = new Enemy(this, 200, 300, 'werewolf1', null, 'Werewolf', 70, 25);
        creature2.scale = 0.7;

        break;
      case 'group7':

        creature1 = new Enemy(this, 200, 140, 'zombie2', null, 'Zombie', 80, 25);
        creature1.flipX = true;
        creature1.scale = 0.4;

        creature2 = new Enemy(this, 120, 300, 'werewolf2', null, 'Werewolf', 70, 35);
        creature2.scale = 0.21;

        break;
      case 'group8':

        creature1 = new Enemy(this, 260, 180, 'witch1', null, 'Witch', 100, 30);
        creature1.flipX = true;
        creature1.scale = 0.25;

        creature2 = new Enemy(this, 100, 320, 'vampire2', null, 'Vampire', 100, 15);
        creature2.scale = 0.35;

        break;
      case 'group9':

        creature1 = new Enemy(this, 230, 110, 'monster2', null, 'Monster', 60, 35);
        creature1.flipX = true;
        creature1.scale = 0.25;

        creature2 = new Enemy(this, 120, 280, 'ghost1', null, 'Ghost', 50, 35);
        creature2.scale = 0.19;

        break;
      case 'group10':

        creature1 = new Enemy(this, 80, 200, 'ghost2', null, 'Ghost', 60, 40);
        creature1.flipX = true;
        creature1.scale = 0.38;

        creature2 = new Enemy(this, 300, 200, 'vampire1', null, 'Vampire', 70, 30);
        creature2.scale = 0.9;

        break;
      case 'group11':

        creature1 = new Enemy(this, 200, 200, 'witch2', null, 'Witch', 192, 45);
        creature1.scale = 0.7;

        break;
      default:

        creature1 = new Enemy(this, 160, 110, 'werewolf1', null, 'Werewolf', 50, 3);
        creature1.scale = 0.7;

        creature2 = new Enemy(this, 120, 280, 'vampire1', null, 'Vampire', 50, 3);
        creature2.scale = 0.9;

        break;
    }

    this.heroes = [knight1, knight2];

    this.add.existing(creature1);

    if (!creature2) {
      this.enemies = [creature1];
    } else {
      this.add.existing(creature2);
      this.enemies = [creature1, creature2];
    }

    this.units = this.heroes.concat(this.enemies);

    this.index = -1;

    // Run UI Scene at the same time
    this.scene.launch('UIScene');
  },
  nextTurn() {
    const battleStatus = this.checkEndBattle();
    if (battleStatus.result === 'victory') {
      this.endBattle('victory');
      return;
    }
    if (battleStatus.result === 'gameOver') {
      this.endBattle('gameOver');
      return;
    }
    do {
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random hero
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  },
  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }

    if (victory) return { result: 'victory' };
    if (gameOver) return { result: 'gameOver' };

    return victory || gameOver;
  },
  receivePlayerSelection(action, target) {
    if (action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  },
  endBattle(result) {
    // clear state, remove sprites
    this.heroes = [];
    this.enemies = [];
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    this.index = -1;
    // sleep the UI
    this.scene.stop('UIScene');
    this.scene.stop('BattleScene');
    this.scene.remove('UIScene');
    this.scene.remove('BattleScene');

    if (result === 'gameOver') {
      this.scene.stop('World');
      this.scene.start('GameOver');
    } else if (result === 'victory') {
      setPunctuation(this.getPunctuation());
      // Uncomment for an even smoother game on console
      // console.log(`battle finished with punctuation ${this.getPunctuation()}`);
      this.scene.wake('World');
    }
  },
  getPunctuation() {
    let result = 0;

    switch (this.dataEnemy) {
      case 'group1':
        result = 10;
        break;
      case 'group2':
        result = 200;
        break;
      case 'group3':
        result = 300;
        break;
      case 'group4':
        result = 400;
        break;
      case 'group5':
        result = 500;
        break;
      case 'group6':
        result = 600;
        break;
      case 'group7':
        result = 700;
        break;
      case 'group8':
        result = 1200;
        break;
      case 'group9':
        result = 800;
        break;
      case 'group10':
        result = 900;
        break;
      case 'group11':
        result = 2000;
        break;
      default:
        result = 10;
        break;
    }
    return result;
  },
});

const UIScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function UIScene() {
      Phaser.Scene.call(this, { key: 'UIScene' });
    },

  create() {
    // draw some background for the menu
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 398, 290, 200);
    this.graphics.fillRect(2, 398, 290, 200);
    this.graphics.strokeRect(300, 398, 200, 200);
    this.graphics.fillRect(300, 398, 200, 200);
    this.graphics.strokeRect(508, 398, 290, 200);
    this.graphics.fillRect(508, 398, 290, 200);

    // basic container to hold all menus
    this.menus = this.add.container();
    this.menus.scale = 2;

    this.heroesMenu = new HeroesMenu(275, 210, this);
    this.actionsMenu = new ActionsMenu(170, 210, this);
    this.enemiesMenu = new EnemiesMenu(8, 210, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get('BattleScene');

    // listen for keyboard events
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    // when its player unit turn to move
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    this.events.on('SelectedAction', this.onSelectedAction, this);

    // an enemy is selected
    this.events.on('Enemy', this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  },
  createMenu() {
    // map hero menu items to heroes
    this.remapHeroes();
    // map enemies menu items to enemies
    this.remapEnemies();
    // first move
    this.battleScene.nextTurn();
  },
  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  },
  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  },
  onSelectedAction() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  },
  remapHeroes() {
    const { heroes } = this.battleScene;
    this.heroesMenu.remap(heroes);
  },
  remapEnemies() {
    const { enemies } = this.battleScene;
    this.enemiesMenu.remap(enemies);
  },
  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {

      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  },
});

export { BattleScene, UIScene };
