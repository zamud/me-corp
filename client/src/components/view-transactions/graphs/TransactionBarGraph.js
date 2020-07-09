import React from 'react';
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend,
} from 'react-vis';

const colors = ['#68217a', '#fff100', '#e81123', '#00188f', '#00b294', '#ff8c00'];

const buildSeriesData = (expenseData) => {
  let barGraphData = [];
  expenseData.forEach((expenseGroup, i) => {
    barGraphData.push([
      { x: 'Jan', y: expenseGroup.jan },
      { x: 'Feb', y: expenseGroup.feb },
      { x: 'Mar', y: expenseGroup.mar },
      { x: 'Apr', y: expenseGroup.apr },
      { x: 'May', y: expenseGroup.may },
      { x: 'Jun', y: expenseGroup.jun },
      { x: 'Jul', y: expenseGroup.jul },
      { x: 'Aug', y: expenseGroup.aug },
      { x: 'Sep', y: expenseGroup.sep },
      { x: 'Oct', y: expenseGroup.oct },
      { x: 'Nov', y: expenseGroup.nov },
      { x: 'Dec', y: expenseGroup.dec },
    ]);
  });
  return barGraphData;
};

const buildLegendData = (incomeData, expenseData) => {
  let legendData = [];
  incomeData.forEach((incomeGroup, i) => {
    legendData.push({
      title: incomeGroup.group,
      color: colors[i],
      strokeStyle: 'dashed',
    });
  });
  expenseData.forEach((expenseGroup, i) => {
    legendData.push({
      title: expenseGroup.group,
      color: colors[i + 1],
      style: () => {
        if (expenseGroup.group === 'Income') return 'dashed';
        else return null;
      },
    });
  });
  return legendData;
};

const TransactionBarGraph = ({ groupData }) => {
  const expenseData = groupData.filter((group) => {
    return group.group !== 'Income';
  });
  let incomeData = groupData.filter((group) => {
    return group.group === 'Income';
  });
  const linePlotData = buildSeriesData(incomeData);
  const barGraphData = buildSeriesData(expenseData);
  const legendData = buildLegendData(incomeData, expenseData);
  console.log(linePlotData);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h5>Monthly Expenses by Group (Income Overlayed)</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <DiscreteColorLegend orientation="vertical" items={legendData} />
        </div>
        <div className="col-md-10">
          <XYPlot width={700} height={500} xType="ordinal" stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {barGraphData.map((groupData, i) => (
              <VerticalBarSeries data={groupData} key={`groupData_${i}`} color={colors[i + 1]} />
            ))}
            <LineSeries
              curve={'curveMonotoneX'}
              style={{
                strokeDasharray: '2 2',
              }}
              data={linePlotData[0]}
              color={colors[0]}
            />
          </XYPlot>
        </div>
      </div>
    </>
  );
};

export default TransactionBarGraph;
