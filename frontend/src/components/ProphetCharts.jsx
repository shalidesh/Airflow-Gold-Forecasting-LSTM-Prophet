import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProphetPlot from "./ProphetPlot";
import axios from "axios";

function ProphetCharts() {


    const [startDate, setStartDate] = useState(new Date());
    const [graphdata, setGraphData] = useState([]);

    const handleSubmit = async () => {
     
      try {
        const res = await axios.post("/forecast_prophet", {
          date: startDate,
        
        });
        console.log(res.data)
        setGraphData(res.data)
        
      } catch (err) {
        
    };
  }


    return (
      <div className='container ml-5'>
        <div className="row">
            <div className="col-4">
            <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                className='form-control'
            />

            </div>
            <div className="col-4">
            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Forecast</button>
            </div>
        
        </div>
        
        <ProphetPlot startDate={graphdata}/>
        
      </div>
    );
}

export default ProphetCharts