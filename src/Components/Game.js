import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

function sketch(p){}

export default function Game() {
    return (<ReactP5Wrapper sketch={sketch} />);
}