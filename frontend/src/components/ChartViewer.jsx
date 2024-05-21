import React, { useState, useEffect, useCallback } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import schema from "./schema";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "80%",
    height: "600",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      caption: { text: "Gold Prce Movement 2014-2024" },
      data: null,
      yAxis: [
        {
          plot: [
            {
              value: "Price ($)"
            }
          ]
        }
      ]
    }
  }
};
const API_URL =
  "https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/master/assets/datasources/fusiontime/examples/online-sales-single-series/data.json";

  
function ChartViewer() {
  const [ds, setds] = useState(chart_props);
  const loadData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const options = { ...ds };
      options.timeseriesDs.dataSource.data = fusionTable;
      setds(options);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log("render");
    loadData();
  }, [loadData]);

  return (
    <div>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
}

export default ChartViewer;
