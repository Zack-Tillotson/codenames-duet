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
      {cards.map(card => {
        const visibleType = card.cardType >= 0 ? card.cardType : cardType(map, card);
        const className = classnames('cards__card', {
          'cards__card--spy': visibleType === 0,
          'cards__card--asn': visibleType === 1,
          'cards__card--bys': visibleType === 2,
        });
        return (
          <li key={card.word} onClick={handleClick.bind(this, card.word)} className={className}>
            {card.cardType === -1 ? card.word : ''}
            {card.bystanders.length > 0 && 'X'}
          </li>
        );
      })}
    </ul>
  );
}

export default connect(selector, dispatcher)(Cards);