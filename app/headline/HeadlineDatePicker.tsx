'use client';
import React, { useState } from 'react';

import SubmitButton from '../components/SubmitButton';
import { HeadlineType } from '../types';

import HeadlineList from './HeadlineList';
import HeadlineLoading from './HeadlineLoading';
import HeadlineError from './HeadlineError';

const localToday = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

const HeadlineDatePicker = () => {
  const [date, setDate] = useState(localToday());
  const [headlines, setHeadlines] = useState<HeadlineType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchHeadlines = async (selectedDate: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSearched(true);

    // Compare calendar dates as YYYY-MM-DD strings (avoids UTC parsing bugs)
    if (selectedDate > localToday()) {
      setErrorMessage('There are no articles from the future...yet.');
      setHeadlines([]);
      setIsLoading(false);

      return;
    }

    try {
      const response = await fetch('/api/fetch-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      const data = await response.json();
      const docs = data?.response?.docs;

      if (!response.ok || !Array.isArray(docs)) {
        const detail =
          data?.fault?.faultstring ||
          data?.error ||
          data?.message ||
          (Array.isArray(data?.errors) ? data.errors.join(', ') : null) ||
          `Request failed (${response.status})`;

        setHeadlines([]);
        setErrorMessage(String(detail));

        return;
      }

      setHeadlines(docs as HeadlineType[]);

      if (docs.length === 0) {
        setErrorMessage(`No articles found for ${selectedDate}.`);
      }
    } catch {
      setHeadlines([]);
      setErrorMessage('Unable to reach the article search API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full sm:w-full md:w-full lg:w-1/2 self-center'>
      {errorMessage ? (
        <HeadlineError
          message={errorMessage}
          onClick={() => setErrorMessage(null)}
        />
      ) : (
        <div className='flex flex-col items-center'>
          <div className='flex space-x-5 justify-center items-center'>
            <input
              className='rounded-md p-3 text-secondary'
              id='start'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <SubmitButton onPress={() => fetchHeadlines(date)} />
          </div>
          {isLoading ? (
            <HeadlineLoading />
          ) : headlines.length > 0 ? (
            <HeadlineList headlines={headlines} />
          ) : (
            <p className='text-4xl w-4/5 mt-10 text-center'>
              {searched
                ? 'No articles to display.'
                : 'Select a date above to view articles from the New York Times.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HeadlineDatePicker;
