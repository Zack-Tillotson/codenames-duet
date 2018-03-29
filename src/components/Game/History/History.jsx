import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';

import './styles';

function renderGuess(guess, index) {
  let src;
  switch(guess) {
    case 0:
      src = '/assets/images/spy.png';
      break;
    case 1:
      src = '/assets/images/assassin.png';
      break;
    case 2:
      src = '/assets/images/bystander.png';
      break;
  }
  return (
    <img key={index} src={src} />
  );
}

const History = function({children, history: {visibles, turns}}) {
  return (
    <div className="history">
      <ul className="card-totals">
        <li className="card-total__count--spy">Spy: {visibles[0]}</li>
        <li className="card-total__count--asn">Asn: {visibles[1]}</li>
        <li className="card-total__count--bys">Bys: {visibles[2]}</li>
      </ul>
      <ol className="turns">
        {turns.map((turn, index) => (
          <li key={index}>
            <span className="active-indicator">{turn.isActive && "*"}</span>
            <span>{index+1}.</span>
            {!!turn.clueWord && (
              <span className="clues">
                {turn.clueWord} - {turn.clueNum}
              </span>
            )}
            {turn.guesses && (
              <ol className="guesses">
                {turn.guesses.map(renderGuess)}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default connect(selector, dispatcher)(History);