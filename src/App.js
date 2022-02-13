import './App.css';
import Grid from '@material-ui/core';
import MaterialTable from 'material-table'





function App() {
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
