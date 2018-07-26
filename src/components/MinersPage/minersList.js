import React from 'react';
import MinerElement from './minerElement';
import List from '../common/list';

const MinersList = (props) => {
  const { miners } = props;
  return(
    <List
      items={miners}
      elementType={MinerElement}
    />
  )
}

export default MinersList
