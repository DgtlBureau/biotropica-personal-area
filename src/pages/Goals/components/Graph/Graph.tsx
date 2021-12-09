import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

import s from './Graph.module.scss';
import { useSelector } from 'react-redux';
import { selectGoalData } from '../../../../store/ducks/goal/selectors';
import moment from 'moment';

Chart.register(...registerables);

interface Props {
  startDate: Date;
  endDate: Date;
}

export const Graph = ({ startDate, endDate }: Props) => {
  const goal = useSelector(selectGoalData);
  const ctx = useRef<any>(null);
  const myChart = useRef<any>(null);

  const values: Array<string> = [];

  useEffect(() => {
    myChart.current = new Chart(ctx.current, {
      type: 'line',
      data: {
        labels: values,
        datasets: [
          {
            borderColor: '#6f61d0',
            label: 'Вес',
            data: [],
            borderWidth: 2,
            tension: 0.5,
          },
        ],
      },

      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (endDate && startDate) {
      let currentDate = moment(startDate);
      const dayLength = moment(endDate).diff(startDate, 'days');

      if (dayLength <= 7) {
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.format('dddd'));
          currentDate.add(1, 'days');
        }
      } else if (dayLength > 7 && dayLength <= 31) {
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.format('DD'));
          currentDate.add(1, 'days');
        }
      } else if (dayLength > 30 && dayLength <= 366) {
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.format('MMMM'));
          currentDate.add(1, 'months');
        }
      } else if (dayLength > 366) {
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.format('YYYY'));
          currentDate.add(1, 'years');
        }
      }

      myChart.current.data.labels = values;
      myChart.current.update();
    }
  }, [startDate, endDate, myChart, values, goal]);

  useEffect(() => {
    if (goal?.values?.length || goal?.start_result) {
      myChart.current.data.datasets[0]['data'] = filterValues();
      myChart.current.update();
    }
  }, [goal, startDate, endDate]);

  function filterValues() {
    if (!goal) {
      return;
    }

    return (
      goal?.values
        ?.filter(el => moment(el?.createdAt).isBetween(startDate, endDate))
        ?.map(el => el?.value) || []
    );
  }
  return (
    <div className={s.container}>
      <div className={s.graph}>
        <canvas id={'myChart'} ref={ctx} width="840" height="420"></canvas>
      </div>
    </div>
  );
};
