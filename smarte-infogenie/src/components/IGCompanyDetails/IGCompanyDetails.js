import React from 'react';
import './IGCompanyDetails.css';
import EmployeeDetailsMainSection from '../EmployeeDetailsMainSection/EmployeeDetailsMainSection.js';
import axios from 'axios';
class IGCompanyDetails extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      company_details: '',
      companyview : true
    };
  }
  componentDidMount(){
    this.getCompanyDetails();
  }
  companydetails(){
    this.setState({'companyview':false})
  }
  getCompanyDetails(){
    axios.post('http://localhost:8081/getCompanyDetails').then((res)=>{
      console.log(res.data);
      this.setState({'company_details':res.data[0]})
    });
  }
  render() {
    return (
      <div className="companyDetailsSectionWrap">
        <div className="container">
          {this.state.companyview && 
            <div className="companyDetailsWrap">
              
              <div className="companyDetails">
                <div className="companyLogoWrap companydetailsbox">
                  {/* <span className="companyLabel font-weight-bolder">Logo:</span> */}
                  <span className="companyNameLogo">
                    {this.state.company_details.company_name} Software Pvt. Ltd.<br/>
                    <span className="employeeDetails" onClick={() => this.companydetails()}>Click Here to See Employee details</span>
                  </span>
                  <span className="companyLogo">
                    <img className="w-100 mw-100" src="https://via.placeholder.com/150/1b1c4a/ffffff?text=XYZ" alt=""/>
                  </span>
                  
                </div>
                <div className="companyNameWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Name:</span>
                  <span className="companyName">{this.state.company_details.company_name}</span> 
                </div>
                <div className="companyAddressWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Address:</span>
                  <span className="companyAddress">{this.state.company_details.address}</span>
                </div>

                <div className="companyCityWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company City:</span>
                  <span className="companyCity">{this.state.company_details.city}</span>
                </div>

                <div className="companyCountyWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company County:</span>
                  <span className="companyCounty">{this.state.company_details.county}</span>
                </div>

                <div className="companyStateWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company State:</span>
                  <span className="companyState">{this.state.company_details.state}</span>
                </div>

                <div className="companyZipWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Zip:</span>
                  <span className="companyZip">{this.state.company_details.zip}</span>
                </div>

                <div className="companyPhone1Wrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Phone:</span>
                  <span className="companyPhone1">{this.state.company_details.phone1}</span>
                </div>

                <div className="companyPhone2Wrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Phone:</span>
                  <span className="companyPhone1">{this.state.company_details.phone2}</span>
                </div>

                <div className="companyEmailWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Email:</span>
                  <span className="companyEmail">{this.state.company_details.email}</span>
                </div>

                <div className="companyWebWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Website:</span>
                  <span className="companyWeb"><a target="_blank" href={this.state.company_details.web}>{this.state.company_details.web}</a></span>
                </div>

                <div className="companyDirectorWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Director:</span>
                  <span className="companyDirector">{this.state.company_details.director}</span>
                </div>

                <div className="companyRevenueWrap companydetailsbox">
                  <span className="companyLabel font-weight-bolder">Company Revenue:</span>
                  <span className="companyRevenue">{this.state.company_details.revenue}</span>
                </div>
              </div>
              
            </div>
            }
            {!this.state.companyview &&

            <EmployeeDetailsMainSection companyname={this.state.company_details.company_name}></EmployeeDetailsMainSection>

            }
        </div>
      </div>
    );
  }
}

export default IGCompanyDetails;
