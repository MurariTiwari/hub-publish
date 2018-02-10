import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  height: 70,
  width: "100%",
  textAlign: 'left',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
<MuiThemeProvider>
  <div>
    <Paper style={style} zDepth={1} >
	<h3 style={{fontFamily: "Berkshire Swash",marginLeft:60}}>PayPal - Charge card </h3>
	</Paper>
    </div>
	</MuiThemeProvider>
);

export default PaperExampleSimple;