'use client';
import React from 'react'
import { Button } from "@nextui-org/button";
import { PressEvent } from '@react-types/shared';

interface SubmitButtonProps {
    onPress: (event: PressEvent) => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button onPress={props.onPress}/>
  )
}

export default SubmitButton;