import React from 'react';
import MinerElement from './minerElement';
import List from '../common/list';

const MinersList = (props) => {
  const { minerStatus } = props;
  console.log(props);
  
  return(
    <List
      items={minerStatus}
      elementType={MinerElement}
    />
  )
}

export default MinersList