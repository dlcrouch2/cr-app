import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

class AddItem extends Component
{
	state = {open: false,};
	
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
		this.setState({[name]: event.target.value,});
	};
	
	render()
	{
		return (
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
			
				<Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
					<AddIcon />
				</Button>
				
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
							onChange={this.handleChange('catQuantity')}
						/>
						
						<TextField
							style={{marginRight: 10}}
							multiline
							id="catDetails"
							label="Details"
							type="string"
							rows="4"
							fullWidth
							onChange={this.handleChange('catDetails')}
						/>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						
						<Button onClick={this.handleSubmit} color="primary">
							Add Category
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AddItem;