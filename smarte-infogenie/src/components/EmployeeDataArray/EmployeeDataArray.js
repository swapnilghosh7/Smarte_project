import React from 'react';
import './EmployeeDataArray.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class EmployeeDataArray extends React.Component {
  
  constructor(props){
    super(props);
    // console.log(props);
  }
  revealButtonChild(e_id){
    this.props.revealButton(e_id);
  }
  componentDidMount(){
    // calling infinite scrool function
    this.props.infiniteScroll();
  }
  
  render() {
    return (
      <div id="employeeDetailsArrayWrap" className="employeeDetailsArrayWrap">
      {this.props.employeedata && this.props.employeedata.map((data, i) => {
        return(
            <div key={`employee_banner_${i+1}`} className="employeeDetailsArray">
              <div className="profileImageBox">
                <span className="firstLetter">
                  {data.first_name.charAt(0).toUpperCase()}{data.last_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="employeeDetailsArrayContentWrapper">
                <div className="employeeDetailsArrayIndex">Employee ID: { data.e_id }</div>
                <div className="contentWrapper">
                  <div className="firstName"><span className="employeeListLabel">Name:</span> {data.first_name} {data.last_name} </div>
                  <div className="companyName"><span className="employeeListLabel">Company Name:</span> {data.company} </div>
                  <div className="companyName"><span className="employeeListLabel">Job Role:</span> {data.job_role} </div>
                </div>
                {data.reveal == 0 ?
                  <div className="revealButton"><button className="revealBtn" onClick={() => this.revealButtonChild(data.e_id)}>
                    <FontAwesomeIcon icon={faEye} />
                    </button></div> 
                  : <div className="contactDetailsWrap">
                      <div className="emailWrap">
                        <span className="employeeListLabel">Email:</span> {data.email}
                      </div>
                      <div className="contactWrap">
                        <span className="employeeListLabel">Contact:</span> {data.phone1}
                      </div>
                    </div>
                }
              </div>
            </div>
          );
        
          }
        )}
      </div>
    )
  }
}
export default EmployeeDataArray;
