import React from 'react';

import { HeadlineType } from '../types';

interface Props {
  headline: HeadlineType;
}

const BASE_URL = 'https://nytimes.com/';

const Headline = ({
  headline: {
    headline,
    lead_paragraph,
    multimedia,
    pub_date,
    section_name,
    word_count,
    web_url,
  },
}: Props) => {
  let imageUrl = multimedia.length > 0 ? multimedia[0].url : '';

  return (
    <li className='card flex flex-col m-5 p-2 border-1 bg-secondary rounded-2xl shadow-xl'>
      <div className='flex justify-between p-2'>
        <div className='text-sm opacity-50'>{section_name}</div>
        <div className='text-sm opacity-50'>
          {new Date(pub_date).toDateString()}
        </div>
        <div className=' text-sm opacity-50'>Word Count: {word_count}</div>
      </div>
      <div className='text-secondary-content font-bold text-xl m-5 text-center'>
        {headline.main}
      </div>
      {imageUrl ? (
        <figure className='mx-10'>
          <img
            alt='headline-image'
            className='rounded-lg'
            src={BASE_URL + imageUrl}
          />
        </figure>
      ) : (
        <></>
      )}
      <div>
        <div className='pl-0 my-5 mx-10 text-secondary-content'>
          {lead_paragraph}
        </div>
        <div className='card-actions justify-end'>
          <a
            className='link-hover opacity-50 p-2'
            href={web_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            View Article
          </a>
        </div>
      </div>
    </li>
  );
};

export default Headline;
