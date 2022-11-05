import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import MilSecStringToTimeString from "../Helpers/MilSecStringToTmeString";

interface IChartProps{
  dataToShow: IResults[],
  metricType: string
}
interface IResults {
  id: number,
  athleteeId?: number,
  exerciseId?: number,
  date: string,
  name?: string,
  value: string,
  metricType?: string
}

const ChartLine = (props: IChartProps) => {

  const [label, setLabel] = useState("Select exercise to see results")

  let values: string[] = [];
  let labels: string[] = [];
  props.metricType != "" ?  values = props.dataToShow.sort((a, b) => +new Date(a.date) - +new Date(b.date)).map(x => x.value) : values = []
  props.metricType != ""? labels = props.dataToShow.sort((a, b) => +new Date(a.date) - +new Date(b.date)).map(x => x.date as string) : labels = []

  console.log(values)
  console.log(new Date())
  console.log(props.metricType)
  
  const canvasEl: any = useRef(null);

  const colors = {
    blue: {
      default: "rgba(100, 141, 229, 1)",
      half: "rgba(100, 141, 229, 0.5)",
      quarter: "rgba(100, 141, 229, 0.25)",
      zero: "rgba(100, 141, 229, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.blue.half);
    gradient.addColorStop(0.65, colors.blue.quarter);
    gradient.addColorStop(1, colors.blue.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: label,
          data: values,
          fill: true,
          borderWidth: 2,
          borderColor: colors.blue.default,
          lineTension: 0.5,
          pointBackgroundColor: colors.blue.default,
          pointRadius: 3
        }
      ]
    };
    const config = {
      type: "line",
      data: data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: { dataset: { label: string; }; parsed: { y: number | bigint | null; }; }) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }

                if (props.metricType == "Time"){
                  return props.metricType + ": " + MilSecStringToTimeString(context.parsed.y?.toString() as string);
                } else if (props.metricType == "Number"){
                  return props.metricType + ": " + context.parsed.y
                }
              }
            }
          }
        },
        scales:{
          x:{
            grid: {
              display: false,
              
            },
            ticks: {
              fontColor: "#FFFFFF", // this here
            },
          },
          y:{
            grid: {
              display: false,
            },
            ticks: {
              callback: function(value: any, index: any, ticks: any){
                if (props.metricType == "Time"){
                  setLabel("Time")
                return MilSecStringToTimeString(value)
              } else if (props.metricType == "Number") {
                setLabel("Number")
                return value
              } else {
                setLabel("Select exercise to see results")
              }

              }
            }
          }
        }

      }
    };
    const myLineChart = new Chart(ctx, config as any);
    myLineChart.options.responsive = false;
    myLineChart.options.maintainAspectRatio = false;
    Chart.defaults.font.size = 10;
    Chart.defaults.color = "#FFFFFF"

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
      <canvas id="myChart" ref={canvasEl}/>

  );
}
export default ChartLine;