import React, { Component } from 'react';
import './Calendar.css';

 
class Calendar extends Component {
  render() {
       
    state = {
      date: new Date(),
      cpi : '',
    }

    getCpi()
    {
       const details = {
         date : this.state.date,
       }
       
       var formData = new FormData();
       var result;
       formData.append('date',details.date);

       fetch('url to fetch data',{
         method : 'POST',
         body : formData
       })
       .then(response => response.json())
       .then((jsonResponse)=>{
          result =jsonResponse.result;

       })

       this.setState({
         cpi : result,
       });

       
    }

    return (
      <div>
        <form>
          <h3 align="center">enter the date for which you want to calculate CPI</h3>
          <input type="date" onChange={this.getCpi} value={this.state.date}></input>
          <h3 align = "center">the calculated CPI is {this.state.cpi}</h3>
        </form>
      </div>
    );
  }
}
export default Calendar
