import './App.css';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import { Avatar } from '@material-ui/core';





function App() {
    var columns = [
    {title: "id", field: "id"},
    {title: "Avatar", field: "avatar",  render: rowData => <Avatar maxInitials={1} size={40} round={true} src={rowData === undefined ? " " : rowData.avatar} />   },
    {title: "First name", field: "first_name"},
    {title: "Last name", field: "last_name"},
    {title: "Mail ID", field: "email"}
  ]

  return (
    <div className="App">
       <Grid item xs={3} ></Grid>
       <Grid item xs={8} >  
        <MaterialTable 
            title="Infilon Assignment"
            columns={columns}
            data={data}
            icons={tableIcons}

        
        ></MaterialTable>

       </Grid>
       <Grid item xs={3}></Grid>
    </div>
  );
}

export default App;
