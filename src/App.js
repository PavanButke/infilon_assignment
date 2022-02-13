import './App.css';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import { Avatar } from '@material-ui/core';
import {useState , useEffect} from 'react';
import axios from 'axios';



const api = axios.create({
    baseURL: `https://reqres.in/api/users?page=1`
})

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


  return (
    <div className="App">
       <Grid item xs={3} ></Grid>
       <Grid item xs={8} >  
        <MaterialTable 
            title="Infilon Assignment"
            columns={columns}
            data={data}
            

        
        ></MaterialTable>

       </Grid>
       <Grid item xs={3}></Grid>
    </div>
  );
}

export default App;
