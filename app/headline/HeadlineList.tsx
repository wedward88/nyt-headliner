import React from "react";
import Headline from "./Headline";
import { HeadlineType } from "../types";

interface Props {
  headlines: Array<HeadlineType>;
}

const HeadlineList = (props: Props) => {
  const { headlines } = props;
  return (
    <div>
      {headlines.length > 0 ? (
        <ul>
          {headlines.map((headline: HeadlineType, index) => (
            <Headline key={index} headline={headline} />
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default HeadlineList;