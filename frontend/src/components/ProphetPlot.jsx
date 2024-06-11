import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";
import ForecastTable from './ForecastTable';

function ProphetPlot(startDate) {

  const [graphdata, setGraphData] = useState([]);
  const [lastdata, setLastData] = useState({});
  const [spin, setSpin] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      console.log(startDate.startDate);
      setSpin(true)

      try {
        const response = await axios.post(`/forecast_prophet`,{
          "date":startDate.startDate
        });

        console.log(graphdata[-1]);

       
        console.log(response.data);
        setGraphData(response.data)
        setLastData(response.data[response.data.length - 1]);
        setSpin(false)

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
        {spin ? (
          <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        ) : (
          <>
            <h1 className='mt-5 mb-3'>Rs <span style={{ fontSize: '70px', fontWeight: 'bold',color: '#224abe' }}>{parseFloat(lastdata.yhat_smooth).toFixed(2)}</span> ({lastdata.ds})</h1>
            <p>Upper Bound - Rs {parseFloat(lastdata.yhat_upper_smooth).toFixed(2)}</p>
            <p>Lower Bound - Rs {parseFloat(lastdata.yhat_lower_smooth).toFixed(2)}</p>

            <Plot
              data={plotData}
              layout={ {width: 1000, height: 600, title: 'Gold Price Forecast'} }
            />
            <ForecastTable data={graphdata.slice(-40)} />
          </>
        )}
      </div>
  )
}

export default ProphetPlot;
