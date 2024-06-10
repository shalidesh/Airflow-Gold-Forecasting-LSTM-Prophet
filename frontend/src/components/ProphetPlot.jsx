import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";
import ForecastTable from './ForecastTable';

function ProphetPlot(startDate) {

  const [graphdata, setGraphData] = useState([]);
  const [lastdata, setLastData] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      console.log(startDate.startDate);

      try {
        const response = await axios.post(`/forecast_prophet`,{
          "date":startDate.startDate
        });

        console.log(graphdata[-1]);

       
        console.log(response.data);
        setGraphData(response.data)
        setLastData(response.data[response.data.length - 1]);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    
  }, [startDate]);

  const plotData = [
    {
      x: graphdata.map(data => data.ds),
      y: graphdata.map(data => data.yhat_smooth),
      type: 'scatter',
      mode: 'lines',
      name: 'Forecast',
      line: {color: 'blue'},
    },
    {
      x: graphdata.map(data => data.ds),
      y: graphdata.map(data => data.yhat_lower_smooth),
      type: 'scatter',
      mode: 'lines',
      name: 'Lower Bound',
      line: {color: 'red',dash: 'dot'},
    },
    {
      x: graphdata.map(data => data.ds),
      y: graphdata.map(data => data.yhat_upper_smooth),
      type: 'scatter',
      mode: 'lines',
      name: 'Upper Bound',
      line: {color: 'green',dash: 'dot'},
    },
  ];

  return (

      <div>
         <h1 className='mt-5 mb-3'>Rs {lastdata.yhat_smooth} ({lastdata.ds})</h1>
        <p>Upper Bound - Rs {lastdata.yhat_upper_smooth}</p>
        <p>Lower Bound - Rs {lastdata.yhat_lower_smooth}</p>
        <Plot
          data={plotData}
          layout={ {width: 1000, height: 600, title: 'Gold Price Forecast'} }
        />
        <ForecastTable data={graphdata.slice(-40)} />
      </div>
   
  )
}

export default ProphetPlot;
