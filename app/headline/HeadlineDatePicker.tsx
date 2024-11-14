"use client";
import React, { useState } from "react";

import SubmitButton from "../components/SubmitButton";
import HeadlineList from "./HeadlineList";
import HeadlineLoading from "./HeadlineLoading";
import HeadlineError from "./HeadlineError";

const HeadlineDatePicker = () => {
  const [date, setDate] = useState(new Date().toISOString());
  const [headlines, setHeadlines] = useState([]);
  const [shouldError, setShouldError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();

  const fetchHeadlines = async (date: string) => {
    setIsLoading(true);
    if (new Date(date) > today) {
      setShouldError(true);
    }

    try {
      const response = await fetch("/api/fetch-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date }),
      });

      let data = await response.json();
      console.log(data);
      setHeadlines(data.response.docs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="w-full sm:w-full md:w-full lg:w-1/2 self-center">
      {shouldError ? (
        <HeadlineError onClick={() => setShouldError(false)} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex space-x-5 justify-center items-center">
            <input
              className="rounded-md p-3 text-secondary"
              type="date"
              id="start"
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
            <p className="text-4xl w-4/5 mt-10 text-center">
              Select a date above to view articles from the New York
              Times.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HeadlineDatePicker;
