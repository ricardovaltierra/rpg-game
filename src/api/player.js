let player = 'player';

const setPlayer = (inputPlayer) => {
  player = inputPlayer;
  return `Player set to: ${player}`;
};

const getPlayer = () => player;

export { setPlayer, getPlayer };