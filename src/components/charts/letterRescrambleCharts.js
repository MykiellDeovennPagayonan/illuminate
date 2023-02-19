import "./chartStyles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { classes, classViewing, studentViewing } from "../backend/data";


export default function LetterRescrambleChart() {
  let datas = []
  for (let i = 0; i < classes[classViewing].studentsList[studentViewing].matchingAndDrawing.letterRescramble.exercises.length; i++){
    datas.push({
      attempt: String("Attempt: " + (i+1)),
      completed: Number(classes[classViewing].studentsList[studentViewing].matchingAndDrawing.letterRescramble.exercises[i].length)
    })
  }

  return (
    <BarChart
      width={470}
      height={250}
      data={datas}
      margin={{
        top: 5,
        right: 10,
        left: 10,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="attempt" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="completed" fill="#8884d8" />
    </BarChart>
  );
}
