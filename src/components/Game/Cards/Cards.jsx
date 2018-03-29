import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';

import './styles';

const Cards = function({children, cards}) {
  return (
    <ul className="cards">
      {cards.map(card => (
        <li key={card}>
          {card}
        </li>
      ))}
    </ul>
  );
}

export default connect(selector, dispatcher)(Cards);