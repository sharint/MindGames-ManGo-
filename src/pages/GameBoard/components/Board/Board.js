import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Goban } from "react-goban";
import styled from "styled-components";
import { markersClear, setMapStones } from "../../../../store/Board/actions";
import { client } from "../../../../Socket";

let superWho = "у белых";
if(localStorage.getItem('lang') == 'ru'){
  superWho = "у белых";
}  
if(localStorage.getItem('lang') == 'eng'){
  superWho = "white";
} 
let widthWight = 200+'px';
let scoreReal = 7.5;
export const getRes = (packageIN) => {
  let kef = 1;
  let currentWinner =  packageIN.hint.winner;
  if (currentWinner == 'W') {
    kef = 1;
    if(localStorage.getItem('lang') == 'ru'){
      superWho = "у белых";
    }  
    if(localStorage.getItem('lang') == 'eng'){
      superWho = "white";
    } 
  } else{
      kef = -1;
      if(localStorage.getItem('lang') == 'ru'){
        superWho = "у чёрных";
      }  
      if(localStorage.getItem('lang') == 'eng'){
        superWho = "black";  
      }
  scoreReal = packageIN.hint.score;
  let score = packageIN.hint.score;
  let superiorytyKef = kef * score;
  widthWight = (200+(superiorytyKef*15)) + 'px';
  if (widthWight > 380){
    widthWight = 380;
    }
  }
} 

const Wrapper = styled.div`
  width: 50%;
  position: relative;
  & > div {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  & svg {
    width: 100%;
    height: 100%;
  }
  border: 3px solid blue;
  border-radius: 15px;
  background-color: #FFFFFF;
`;


let scoreU ='очков - ';
let adv = ' преимущество ';

if(localStorage.getItem('lang') == 'ru'){
  scoreU ='очков - ';
  adv = ' преимущество ';
} 

if(localStorage.getItem('lang') == 'eng'){
  scoreU ='scores - ';
  adv = ' advantage ';
} 

const Board = ({
  lastMarkers,
  socket,
  setHint,
  currentColor,
  setCurrentColor,
  yourColor,
  helpType,
  setMultipleHint,
  multipleHint,
  coordinates,
  setCoordinates,
  setHelpType,
  setMultipleType,
  setActiveHelpId,
  setMapType,
  setStonePosition,
  classNames,
  mapStones
}) => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.board.markers);
  const classNamesMapStones = useSelector(
    (state) => state.board.classNamesMapStones
  );

  const handleTurn = (stonePosition) => {
    client.send(JSON.stringify([7, "go/game", {command: "move", token: "1cfc52aacaba0507e66d74cd878020f071457220", place: stonePosition.toString().toLowerCase(), game_id: 8}]));
    let valid = true;
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false;
      }
    }
    if (valid && currentColor === yourColor) {
      setStonePosition(stonePosition)
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
      setCurrentColor(currentColor === "white" ? "black" : "white");
      setHint(false);
      dispatch(markersClear());
      setHelpType("");
      setActiveHelpId("");
      setMultipleType(false);
      setMapType(false);
    }
  };

  const handleMultipleTurn = (stonePosition) => {
    let valid = true;
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false;
      }
    }
    if (valid) {
      dispatch(setMapStones({ ...mapStones, [stonePosition]: 'circle' }))
      setMultipleHint(stonePosition);
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
    }
  };

  let className;
  if (currentColor !== yourColor) {
    className = 'disabled';
  } else {
      className = '';
  }

  return (
    <Wrapper className={className}>
        <Goban
          style={{ position: "absolute" }}
          stones={coordinates}
          markers={markers}
          lastMarkers={lastMarkers}
          mapStones={mapStones}
          classNamesMapStones={classNamesMapStones}
          onIntersectionClick={
            helpType !== "multiple" ? handleTurn : handleMultipleTurn
          }
          nextToPlay={yourColor}
        />
                      <style dangerouslySetInnerHTML={{__html: " #rectangleBlack{  top: 650px;  left: 110px;  margin-bottom: 50px; position: relative;     width:400px;    height:50px;    background: black;    border: 5px solid rgb(126, 180, 64);  border-radius:15px;} #rectangleWhite{  left: 115px;  top: 555px;   position: relative;     width:200px;   height:41px;    background: white; border: 0px solid rgb(126, 180, 64);  border-radius: 12px;}  #scoreReal{  position: relative; top: 580px;  left: 140px; color: red;  font-size: 20px;  }" }} />

  <div id='rectangleBlack' style = {{display: 'block'}}></div>
<div id='rectangleWhite' style = {{display: 'block', width: widthWight}}>
  </div>
  <div id='scoreReal'>
  <b>  {scoreReal} {scoreU} {superWho} {adv} </b>
    </div>
    </Wrapper>
  );
};

export default Board;
