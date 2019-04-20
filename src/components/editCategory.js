import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

class EditCategory extends Component
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
		console.log("Current Item: " + this.props.currentCategory.name);
		
		this.setState({ open: true });
	};
	
	handleClose = () =>
	{
		this.setState({ open: false});
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
			id: this.props.currentCategory.id,
			name: this.state.catName || this.props.currentCategory.name,
			quantity: this.state.catQuantity || this.props.currentCategory.quantity,
			description: this.state.catDetails || this.props.currentCategory.description
		};
		
		API.graphql(graphqlOperation(mutations.updateCategory,{input: submission}));
		
		window.location.reload();
	}
	
	render()
	{
		return (
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
				<Button size='small' color="inherit" aria-label="Edit" onClick={this.handleClickOpen}>
					<EditIcon />
				</Button>
				
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Edit Category: {this.props.currentCategory.name}
					</DialogTitle>
					
					<DialogContent>
						<TextField
							style={{marginRight: 10}}
							id="catName"
							defaultValue={this.props.currentCategory.name}
							label="Category Name"
							type="string"
							onChange={this.handleChange('catName')}
						/>
						
						<TextField
							style={{marginRight: 10}}
							id="catQuantity"
							defaultValue={this.props.currentCategory.quantity}
							label="Quantity"
							type="number"
							onChange={this.handleChange('catQuantity')}
						/>
						
						<TextField
							style={{marginTop: 10}}
							multiline
							id="catDetails"
							defaultValue={this.props.currentCategory.description}
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
							Edit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default EditCategory;