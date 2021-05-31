import { GET } from "./base";
const CENTAUR_TOKEN = 'test1'

export const helpBestMoves = (token, game_id, count) => {
  return GET(`hints/best-moves?token=${token}&game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&count=${count}`, {}, token);
};

export const helpShowBest = (token, game_id, moves) => {
  return GET(`hints/show-best?game_id=${game_id}&moves=${moves}&centaur_token=test1&token=${token}`, {}, token);
};

export const helpHeatmapFull = (token, game_id) => {
  var for_info = GET(`hints/heatmap-full?game_id=${game_id}&centaur_token=test1&token=${token}`, {}, token);
  var a = for_info.then(a => console.log(a.hint[0]));

  return for_info;
};

export const helpHeatmapZone = (token, game_id, is_quarter) => {
  return GET(`hints/heatmap-best-enemy-move-zone?game_id=${game_id}&centaur_token=test1&token=${token}&is_quarter=${is_quarter ? 1 : 0}`, {}, token);
};

export const superiority = (token, game_id) => {
  let GetWinner = GET(`hints/superiority?game_id=${game_id}&centaur_token=LO1YcR4JYJy5t4to&token=${token}`, {}, token);
  console.log(GetWinner);
  console.log('!!!');
  return GetWinner;
};

export const EnemyBestMove = (token, game_id,is_quarter) => {
  return GET(`hints/heatmap-best-enemy-move-zone?game_id=${game_id}&centaur_token=test1&token=${token}&is_quarter=${is_quarter ? 1 : 0}`, {}, token);
}

export const FutureMoves = (token, game_id) => {
  return GET(`hints/future-moves?game_id=${game_id}&centaur_token=test1&token=${token}&count=5`);
}

export const helpEnemyBestMoves = (token, game_id, count) => {
  return GET(`hints/best-moves-enemy?token=${token}&game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&count=${count}`, {}, token);
};