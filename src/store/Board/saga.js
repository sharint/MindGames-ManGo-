import { all, takeLatest, call, put } from "redux-saga/effects";

import { getToken } from "../../helpers/session";
import {getRes} from "../../../src/pages/GameBoard/components/Board/Board"


import {
  SINGLE_HELP,
  GET_HINT_BEST_MOVES,
  GET_HINT_SHOW_BEST,
  GET_HINT_HEATMAP_FULL,
  MAP_HELP,
  GET_HINT_HEATMAP_ZONE,
  SCORES_WINNER,
  GET_SCORES_WINNER,
  GET_SOMETHING,
  GET_FUTURE
} from "./types";
import {
  helpBestMoves,
  helpShowBest,
  helpHeatmapFull,
  helpHeatmapZone,
  superiority,
  EnemyBestMove,
  FutureMoves,
  helpEnemyBestMoves
} from "../../api/board";
import { token } from "../../Socket";




function* fetchGetHintBestMoves_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpBestMoves, getToken(), payload.game_id, payload.count);
    if (res.hint) {
      let newObj = {};
      res.hint.forEach((key, i) => {
        newObj[key.move] = i+1
      })
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
}

function findMax(mas){
  var max = -1;
  var index1 = 0;
  var index2 = 0;

  for (let i = 0; i < mas.length; i++) { // выведет 0, затем 1, затем 2
    for (let k = 0; k < mas[i].length; k++) { // выведет 0, затем 1, затем 2
      if (max < mas[i][k]){
        max = mas[i][k];
        index1 = i;
        index2 = k;
      }
    }
  }
  var res = []
  res[0] = max
  res[1] = index1
  res[2] = index2
  return res
}

function convetToIndexes(mas){
  var res = []
  res[0] = []
  res[1] = []
  res[2] = []
  const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  var counter = 0;
  for(let k = 0; k < 3; k++){
    for(let i = 0; i < alpha.length; i++){
      if (alpha[i] == mas[k][0]){
        if (mas[k].length == 3){
          res[k][0] = i;
          res[k][1] = mas[k][1]+mas[k][2];
          break;
        }
        else{
          res[k][0] = i;
          res[k][1] = mas[k][1]-1;
          break;
        }
      }
    }
  }
  return res
}

let m1 = 'Отличный ход, ты получаешь возможный ход оппонента';
let m2 = 'Хороший ход, ты получаешь тепловую карту зоны оппонента';
let m3 = 'Нормальный ход, ты получаешь победителя на текущий момент';
let m4 = 'К сожалению этот ход невыгоден';


if(localStorage.getItem('lang') == 'ru'){
  m1 = 'Отличный ход, ты получаешь возможный ход оппонента';
  m2 = 'Хороший ход, ты получаешь тепловую карту зоны оппонента';
  m3 = 'Нормальный ход, ты получаешь победителя на текущий момент';
  m4 = 'К сожалению этот ход невыгоден';
} 

if(localStorage.getItem('lang') == 'eng'){
  m1 = `Great move, you get the opponent's possible move.`;
  m2 = `Nice move, you get a heat map of your opponent's zone.`;
  m3 = `Normal move, you get the current winner.`;
  m4 = 'Unfortunately, this move is not profitable.';} 

function* fetchGetHintShowBest_saga(action) {
  const { payload } = action;
  
  const hitMapFull = yield call(helpHeatmapFull, getToken(), payload.game_id);
  
  try {
    var playerPredicts = payload.moves;
    var firstPredict = playerPredicts[0]
    var secondPredict = playerPredicts[1]
    var thirdPredict = playerPredicts[2]

    var isHit = false
    var isFinded = false
    var thresholds = [150,110,80]
    var currentHint = 0;

    var bestPos = findMax(hitMapFull.hint)
    var indexes = convetToIndexes(playerPredicts)
    
    for(let k = 0; k < thresholds.length;k++){
      if (isFinded){
        break;
      }
      for(let i = 0; i < 3; i++){
        if (hitMapFull.hint[indexes[i][0]][indexes[i][1]] > thresholds[k]){
          
          currentHint = thresholds[k]
          isHit = true
          isFinded = true
          break;
        }
      }
    }
    if (isHit){
      switch(currentHint){
        case 150:
          alert(m1);
          const enemyBestMoves = yield call(helpEnemyBestMoves, getToken(), payload.game_id, 1);
          if (enemyBestMoves.hint) {
            let newObj = {};
            enemyBestMoves.hint.forEach((key, i) => {
              newObj[key.move] = i+1
            })
            yield put({ type: SINGLE_HELP, payload: newObj})
          }
          break;
        case 110:
          alert(m2);
          const enemyHitMapZone = yield call(helpHeatmapZone, getToken(), payload.game_id, payload.isQuarter);
          if (enemyHitMapZone.hint) {
            yield put({ type: MAP_HELP, payload: { zone: enemyHitMapZone.hint, isQuarter: payload.isQuarter}})
          }
          break;
        case 80:
          alert(m3);
          const scoreWinners = yield call(superiority, getToken(), payload.game_id);
          if (scoreWinners.hint) {
            yield put({ type: SCORES_WINNER, payload: scoreWinners.hint})
          }
          break;
        default:
          if (hitMapFull.hint) {
            alert(m4);
            yield put({ type: MAP_HELP, payload: hitMapFull.hint})
          }
      }
    }
    else{
     var masOut=[[0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0]]
      if (hitMapFull.hint) {
        
        yield put({ type: MAP_HELP, payload: masOut})
      }
    }
  }
  catch (e) {
    alert(e);
  }
}

function* fetchGetHintHeatmapFull_saga(action) {
  
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapFull, getToken(), payload.game_id);
    const ris = yield call(helpEnemyBestMoves, getToken(), payload.game_id,5);
    
    if (res) {
      
      let newObj = {};
      let newnewObj = {};
      let arr = [[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]];
      let alpha = 'ABCDEFGHJKLMNOPQRSTUV';
      ris.hint.forEach((key, i) => {
        newObj[i] = key.move
        newnewObj[key.move] = i +1;
        let x;
        let y;
        for (var j = 0; j < alpha.length; j++) {
          if (newObj[i][0] === alpha[j]){
            x = j;
            if (newObj[i][2] === undefined){
              y = parseInt(newObj[i][1]) -1;
            
            }
            else{
              y = parseInt(newObj[i][1]+newObj[i][2])-1;
            }
            
            arr[x][y] = res.hint[x][y];
          }
        }
      })
      yield put({ type: MAP_HELP, payload: arr});
      yield put({ type: SINGLE_HELP, payload: newnewObj});
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapZone_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapZone, getToken(), payload.game_id, payload.isQuarter);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: { zone: res.hint, isQuarter: payload.isQuarter}})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintsuperiority_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(superiority, getToken(), payload.game_id);
    console.log(res.hint);
    if (res.hint) {
      yield put({ type: SCORES_WINNER, payload: res.hint})
      getRes(res);
    }
  } catch (e) {
    console.log(e);
    //throw e;
  }
}

function* fetchGetSomething_saga(action) {
  
  const { payload } = action;
  const res = yield call(EnemyBestMove, getToken(), payload.game_id, payload.isQuarter);
  try {
    let xhr = new XMLHttpRequest();


  const centtoken = 'LO1YcR4JYJy5t4to';
  
  var gameidforreq = action.payload.game_id;
  var playerToken = token;
  if (res.hint) {
      yield put({ type: MAP_HELP, payload:{ zone: res.hint, isQuarter: true}})
    }
  } catch (e) {
    //throw e;
  }
}


function* fetchGetFuture_saga(action) {
  const { payload } = action;
  try {
    
    const res = yield call(FutureMoves, getToken(), payload.game_id, payload.moves);
    const res2 = yield call(helpHeatmapFull, getToken(), payload.game_id)
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: res2.hint})
      let newObj = {};
      res.hint.forEach((key, i) => {
        newObj[key.move] = i+1
      })
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
  
}






export function* boardSaga() {
  yield all([
    takeLatest(GET_HINT_BEST_MOVES, fetchGetHintBestMoves_saga),
    takeLatest(GET_HINT_SHOW_BEST, fetchGetHintShowBest_saga),
    takeLatest(GET_HINT_HEATMAP_FULL, fetchGetHintHeatmapFull_saga),
    takeLatest(GET_HINT_HEATMAP_ZONE, fetchGetHintHeatmapZone_saga),
    takeLatest(GET_SCORES_WINNER, fetchGetHintsuperiority_saga),
    takeLatest(GET_SOMETHING, fetchGetSomething_saga),
    takeLatest(GET_FUTURE, fetchGetFuture_saga)
    
  ]);
}
