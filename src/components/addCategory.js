import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

class AddCategory extends Component
{
	state =
	{
		open: false,
		catName: '',
		catQuantity: '',
		catDetails: ''
	};
	
	handleClickOpen = () =>
	{
		this.setState({ open: true });
	};
	
	handleClose = () =>
	{
		this.setState({ open: false });
	};
	
	handleChange = name => event =>
	{
		this.setState({[name]: event.target.value});
	};
	
	handleSubmit = (e) =>
	{
		this.setState({ open: false });
		
		var submission = 
		{
			name: this.state.catName,
			quantity: this.state.catQuantity,
			details: this.state.catDetails
		};
		
		console.log("Submitting: " + JSON.stringify(submission));
		
		API.graphql(graphqlOperation(mutations.createCategory, {input: submission}));
		
		window.location.reload();
	}
	
	render()
	{
		return (
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
			
				<Fab size="small" color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
					<AddIcon />
				</Fab>
				
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Add a New Category
					</DialogTitle>
					
					<DialogContent>
						<DialogContentText></DialogContentText>
						<TextField
							style={{marginRight: 10}}
							id="catName"
							label="Category Name"
							type="string"
							onChange={this.handleChange('catName')}
						/>
						
						<TextField
							style={{marginRight: 10}}
							id="catQuantity"
							label="Quantity"
							type="number"
							InputProps={{inputProps: {min: 0}}}
							onChange={this.handleChange('catQuantity')}
						/>
						
						<TextField
							style={{marginTop: 10}}
							multiline
							id="catDetails"
							label="Details"
							type="string"
							rowsMax="10"
							fullWidth
							onChange={this.handleChange('catDetails')}
						/>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						
						<Button onClick={this.handleSubmit} color="primary">
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AddCategory;