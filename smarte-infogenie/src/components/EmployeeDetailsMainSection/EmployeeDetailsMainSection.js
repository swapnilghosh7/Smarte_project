import React from 'react';
import './EmployeeDetailsMainSection.css';
import axios from 'axios';
import EmployeeDataArray from '../EmployeeDataArray/EmployeeDataArray.js'
class EmployeeDetailsMainSection extends React.Component {
  
  constructor(props){
    super(props);
    // 
    this.state = {
      employee_details: '',
      current_page: 0,
      total_page: 0
    };
    
  }
  componentDidMount(){
    this.getEmployeeDetails();
  }
  componentWillMount(){
    this.eventScrollHandling();
  }
  // -------Infinite Scrolling ------
  infiniteScroll(){
    let activePage = Number(this.state.current_page);
    console.log('Total Page: ' + this.state.total_page);
    console.log('Active Page: ' + activePage);
    if(activePage < this.state.total_page){
      let companyName = this.props.companyname;
      let infiniteScrollArray = [];
      infiniteScrollArray.push(this.state.employee_details);

      console.log(document.querySelector('.searchBoxInput').value);
      if(document.querySelector('.searchBoxInput').value != '')
      {
        console.log(document.querySelector('.searchBoxInput').value);
        let searchQuery = {
          'key' : document.querySelector('.searchBoxInput').value.toLowerCase(),
          'page_no':  activePage + 1,
          'length': true
        }
        axios.post('http://localhost:8081/getSearchDetails',searchQuery).then((res)=>{

          infiniteScrollArray.push(res.data['employee_data']);
          let finalInfiniteScrollArray = infiniteScrollArray[0].concat(infiniteScrollArray[1]);
          console.log(finalInfiniteScrollArray);
          this.setState({'employee_details':finalInfiniteScrollArray});
          this.setState({'current_page':res.data['page_no']});
          this.setState({'total_page':res.data['total_pages']});
          this.setState({'total_length':res.data['length']});
        });

      }
      else{
        let query = {
          "company_name": companyName,
          "page_no": activePage + 1,
          'jsonLen': true
        }
        axios.post('http://localhost:8081/getEmployeeDetails',query).then((res)=>{
          // 
          infiniteScrollArray.push(res.data['employee_data']);
          let finalInfiniteScrollArray = infiniteScrollArray[0].concat(infiniteScrollArray[1]);
          console.log(finalInfiniteScrollArray);
          this.setState({'employee_details':finalInfiniteScrollArray});
          this.setState({'current_page':res.data['page_no']});
          this.setState({'total_page':res.data['total_pages']});
          this.setState({'total_length':res.data['length']});
        });
      }
      
    }
    
  }
  
eventScrollHandling(){
  window.addEventListener('scroll', (e) => this.handleScroll(e));
}
handleScroll(event){
  let pageOffset = window.pageYOffset + window.innerHeight;
  let lastChild = document.querySelector('.employeeDetailsArray:last-child');
  
  let lastChildOffset = lastChild.offsetTop + lastChild.clientHeight;
  let bottomOffset = 20;
  
  
  if(pageOffset > (lastChildOffset - bottomOffset) )
  {
    // 
    this.infiniteScroll();
  }
  
}

revealButton(e_id){
  let query = {
    'e_id' : e_id
  };
  let employee_data = this.state.employee_details;
  axios.post('http://localhost:8081/updatereveal',query).then((res)=>{
      if(res.data === 'done'){
        let updatedEmployeeData = employee_data.map((data,i) => {
          if(data.e_id == e_id){
            data.reveal = 1;
          }
          return data;
        })
        console.log(updatedEmployeeData);
        this.setState({'employee_details':updatedEmployeeData});
      }
    });
}


// ----Infinite Scrolling end -----
  searchBox(event){
    
    let searchQuery = {
      'key' : event.target.value.toLowerCase(),
      'page_no': 1,
      'length': true
    }
    axios.post('http://localhost:8081/getSearchDetails',searchQuery).then((res)=>{
      
      this.setState({'employee_details':res.data['employee_data']});
      this.setState({'current_page':res.data['page_no']});
      this.setState({'total_page':res.data['total_pages']});
      this.setState({'total_length':res.data['length']});
    });
  }
  
  companydetails(){
    this.setState({'companyview':false})
  }
  getEmployeeDetails(){
    let companyName = this.props.companyname;
    // 
    let query = {
      "company_name": companyName,
      "page_no": 1,
      'jsonLen': true
    }
    axios.post('http://localhost:8081/getEmployeeDetails',query).then((res)=>{
      
      this.setState({'employee_details':res.data['employee_data']});
      this.setState({'current_page':res.data['page_no']});
      this.setState({'total_page':res.data['total_pages']});
      this.setState({'total_length':res.data['length']});
    });
  }
  render() {
    return (
      <div className="employeeDetailsSectionWrap">
            <div className="allContactSearchWrap">
              <div className="allContacts">All Contacts({this.state.total_length})</div>
              <div className="searchBox">
                <input type="text" className="searchBoxInput" onChange={(e) => this.searchBox(e)} placeholder="Search Name/Job Title"/>
              </div>
            </div>
            
            <div className="employeeDetailsWrap">
              {this.state.employee_details &&
                <EmployeeDataArray revealButton={(e_id) => this.revealButton(e_id)}  employeedata={this.state.employee_details} />
              }
            </div>
      </div>
    );
  }
}

export default EmployeeDetailsMainSection;
