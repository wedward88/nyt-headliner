import React from 'react';

import { HeadlineType } from '../types';

import Headline from './Headline';

interface Props {
  headlines: Array<HeadlineType>;
}

const HeadlineList = (props: Props) => {
  const { headlines } = props;

  return (
    <div>
      {headlines.length > 0 ? (
        <ul className='mt-10'>
          {headlines.map((headline: HeadlineType, index) => (
            <Headline key={index} headline={headline} />
          ))}
        </ul>
      ) : (
        <p />
      )}
    </div>
  );
};

export default HeadlineList;
