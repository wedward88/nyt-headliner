"use client";
import { DatePicker } from "@nextui-org/date-picker";
import React, { useState } from "react";
import {
  parseAbsoluteToLocal,
  now,
  ZonedDateTime,
} from "@internationalized/date";

import SubmitButton from "../components/SubmitButton";
import HeadlineList from "./HeadlineList";

const HeadlineDatePicker = () => {
  const localTimezone = new Intl.DateTimeFormat().resolvedOptions()
    .timeZone;
  const today = now(localTimezone).toAbsoluteString();
  const [date, setDate] = useState(parseAbsoluteToLocal(today));
  const [headlines, setHeadlines] = useState([]);

  const fetchHeadlines = async (date: ZonedDateTime) => {
    let formattedDate = date.toAbsoluteString().split("T")[0];
    try {
      const response = await fetch("/api/fetch-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate }),
      });

      let data = await response.json();
      console.log(data);
      setHeadlines(data.response.docs);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className="flex space-x-5 justify-center items-center">
        <DatePicker
          className="max-w-md"
          label="Date"
          granularity="day"
          showMonthAndYearPickers
          value={date}
          onChange={setDate}
        />
        <SubmitButton onPress={() => fetchHeadlines(date)} />
      </div>
      <HeadlineList headlines={headlines} />
    </div>
  );
};

export default HeadlineDatePicker;
