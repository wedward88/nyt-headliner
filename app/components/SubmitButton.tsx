"use client";
import React from "react";
import { PressEvent } from "@react-types/shared";

interface SubmitButtonProps {
  onPress: (event: React.MouseEvent) => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={props.onPress}>
      Submit
    </button>
  );
};

export default SubmitButton;
