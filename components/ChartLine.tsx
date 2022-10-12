import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import MilSecStringToTimeString from "../Helpers/MilSecStringToTmeString";
import moment from "moment";
interface IChartProps{
  dataToShow: IResults[]
}
interface IResults {
  id: number,
  athleteeId?: number,
  exerciseId?: number,
  date?: string,
  name?: string,
  value: string,
  metricType?: string
}

const ChartLine = (props: IChartProps) => {

  const values = props.dataToShow.map(x => parseInt(x.value))
  console.log(values)
  console.log(new Date())
  const labels = props.dataToShow.map(x => x.date)
  const canvasEl: any = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
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
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "My First Dataset",
          data: values,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
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
                      return label+MilSecStringToTimeString(context.parsed.y?.toString());
                  }
              }
          }
        },
        scales:{
          y:{
            ticks: {
              callback: function(value: any, index: any, ticks: any){
                return MilSecStringToTimeString(value.toString())
              }
            }
          }
        }

      }
    };
    const myLineChart = new Chart(ctx, config as any);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div>
      <canvas id="myChart" ref={canvasEl} height="200" />
    </div>
  );
}
export default ChartLine;