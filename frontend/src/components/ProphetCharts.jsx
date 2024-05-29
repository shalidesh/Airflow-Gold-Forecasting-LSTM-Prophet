import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProphetPlot from "./ProphetPlot";

function ProphetCharts() {
    const [startDate, setStartDate] = useState(new Date());

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
            <button type="button" class="btn btn-primary">Forecast</button>
            </div>
        
        </div>
        
        <ProphetPlot/>
        
      </div>
    );
}

export default ProphetCharts