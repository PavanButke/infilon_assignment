import './App.css';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import { Avatar } from '@material-ui/core';
import {useState , useEffect} from 'react';
import axios from 'axios';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tabiconsSet={
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}



const api = axios.create({
    baseURL: `https://reqres.in/api/users?page=1`
})


function validateEmail(email){
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function App() {
    var columns = [
    {title: "id", field: "id"},
    {title: "Avatar", field: "avatar",  render: rowData => <Avatar maxInitials={1} size={40} round={true} src={rowData === undefined ? " " : rowData.avatar} />   },
    {title: "First name", field: "first_name"},
    {title: "Last name", field: "last_name"},
    {title: "Mail ID", field: "email"}
  ]

  const [data , setData] = useState([])

  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(()=>{
    api.get("/users")
      .then(res=>{
        setData(res.data.data)
      })
  })

  const addNewRows = (newData , resolve)=>{
    
    let errorList = []
    if(newData.first_name === undefined){
      errorList.push("Please enter first name")
    }
    if(newData.last_name === undefined){
      errorList.push("Please enter last name")
    }
    if(newData.email === undefined || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }

    if(errorList.length < 1){ //no error
      api.post("/users", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

    const deleteUsers = (oldData, resolve) => {
    
      api.delete("/users/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
    }
  
    const editData = (newData, oldData, resolve) => {
     
      let errorList = []
      if(newData.first_name === ""){
        errorList.push("Please enter first name")
      }
      if(newData.last_name === ""){
        errorList.push("Please enter last name")
      }
      if(newData.email === "" || validateEmail(newData.email) === false){
        errorList.push("Please enter a valid email")
      }
  
      if(errorList.length < 1){
        api.patch("/users/"+newData.id, newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()
          
        })
      }else{
        setErrorMessages(errorList)
        setIserror(true)
        resolve()
  
      }
      
    }

  

  return (
    <div className="App">
       <Grid item xs={3} ></Grid>
       <Grid item xs={8} >  
        <MaterialTable 
            title="Infilon Assignment"
            columns={columns}
            data={data}
            icons={tabiconsSet}
            editable={{
              onRowAdd:(newData)=>
                new Promise((resolve)=>{
                  addNewRows(newData , resolve);
                }),
                onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  deleteUsers(oldData, resolve);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    editData(newData, oldData, resolve);
                    
                }),

                
              
}}

        ></MaterialTable>

       </Grid>
       <Grid item xs={3}></Grid>
    </div>
  );
}

export default App;
