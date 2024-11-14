import React from "react";

import { HeadlineType } from "../types";

interface Props {
  headline: HeadlineType;
}
const Headline = ({
  headline: {
    headline,
    lead_paragraph,
    section_name,
    word_count,
    web_url,
  },
}: Props) => {
  return (
    <li className="card flex flex-col m-5 p-2 border-1 bg-base-300 rounded-2xl hover:bg-base-200">
      <div className="flex justify-between">
        <div className="text-sm">{section_name}</div>
        <div className=" text-sm">Word Count: {word_count}</div>
      </div>
      <div>
        <div className="card-body">{headline.main}</div>
        <div className="pl-0">{lead_paragraph}</div>
        <div className="card-actions justify-end">
          <a href={web_url} className="btn btn-primary">
            Visit
          </a>
        </div>
      </div>
    </li>
  );
};

export default Headline;
