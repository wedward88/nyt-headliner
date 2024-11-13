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
    <li className="flex flex-col m-5 p-2 border-5 border-base-content rounded-2xl bg-base-100 hover:bg-base-300">
      <div className="flex justify-between">
        <div className="text-transparent/40 text-sm">
          {section_name}
        </div>
        <div className="text-transparent/40 text-sm">
          Word Count: {word_count}
        </div>
      </div>
      <div tabIndex={0} className="collapse">
        <div className="collapse-title font-bold">
          {headline.main}
        </div>
        <div className="collapse-content">
          <div className="pl-0">{lead_paragraph}</div>
          <br />
          <a
            href={web_url}
            className="link-neutral text-medium hover:link-accent text-transparent/50"
          >
            {web_url}
          </a>
        </div>
      </div>
    </li>
  );
};

export default Headline;
