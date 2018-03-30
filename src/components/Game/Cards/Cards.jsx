import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';
import classnames from 'classnames';

import './styles';

function cardType(map, card) {
  return map[card.word];
}

const Cards = function({children, cards, map, guessWord}) {
  const handleClick = card => guessWord(card);
  return (
    <ul className="cards">
      {cards.map(card => (
        <li key={card.word} onClick={handleClick.bind(this, card.word)} className={classnames('cards__card', {'cards__card--spy': cardType(map, card) === 0, 'cards__card--asn': cardType(map, card) === 1, 'cards__card--bys': cardType(map, card) === 2})}>
          {card.word}
        </li>
      ))}
    </ul>
  );
}

export default connect(selector, dispatcher)(Cards);