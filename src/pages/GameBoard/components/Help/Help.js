import React from "react";
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
} from "./types";

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`; 

const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 10px;
  cursor: pointer;
`;

let hint1 = 'Лучший ход';
let hint2 = '"Точки борьбы"';
let hint3 = 'Проверь свои способности';
let hint4 = 'В какой четверти доски сейчас лучший ход?';
let hint5 = 'В какой четверти сейчас лучший ход оппонента?';
let hint6 = 'Визуализация преимущества';
let hint7 = 'Оценка ближайшего будущего';

if(localStorage.getItem('lang') == 'ru'){
hint1 = 'Лучший ход';
hint2 = '"Точки борьбы"';
hint3 = 'Проверь свои способности';
hint4 = 'В какой четверти доски сейчас лучший ход?';
hint5 = 'В какой четверти сейчас лучший ход оппонента?';
hint6 = 'Визуализация преимущества';
hint7 = 'Оценка ближайшего будущего';
} 

if(localStorage.getItem('lang') == 'eng'){
  hint1 = 'Best move';
  hint2 = '"Points of struggle"';
  hint3 = 'Test your abilities';
  hint4 = 'Which quarter of the board is the best move now?';
  hint5 = `What quarter is your opponent's best move now?`;
  hint6 = 'Visualizing the benefits';
  hint7 = 'Assessment of the near future';
} 

const Help = ({
    enemyPass,
    stepColor,
    yourColor,
    you,
    opponent,
    stepMain,
    stepTwo,
    handleHelp,
    activeHelpId,
    scores,
    times
  }) => {
  return (
    <Wrapper>
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <HelpWrapper>
        <HelpItem
          active={activeHelpId === 1}
          onClick={() =>
            scores && handleHelp({ type: "single", id: 1, count: 1 })
          }
        >
          {hint1}
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_FULL })
          }
        >
          {hint2}
        </HelpItem>
        <HelpItem
          
          active={activeHelpId === 16}
          onClick={() =>
            scores &&
            handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
          }
        >
          {hint3}
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
          }
        >
          {hint4}
        </HelpItem>

        <HelpItem
          active={activeHelpId === 59}
          onClick={() => scores && handleHelp({ type: "score", id: 59 })}
        >
          {hint5}
        </HelpItem>        
        <HelpItem
          active={activeHelpId === 345}
          
          onClick={() => scores && handleHelp({ type: "score", id: 345 })}
        >

          {hint6}
        </HelpItem>   

        <HelpItem
          active={activeHelpId === 66}
          onClick={() => scores && handleHelp({ type: "single",count:5, id: 66 })}
        >
          {hint7}
        </HelpItem>




      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
