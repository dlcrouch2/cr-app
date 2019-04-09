import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

class DeleteCategory extends Component
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
	
	
	handleDelete = () =>
	{
		this.setState({ open: false });
		
		var submission = { id: this.props.currentCategory.id };
		
		API.graphql(graphqlOperation(mutations.deleteCategory, {input: submission}))
		
		window.location.reload();
	};
	
	render()
	{
		return (
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
				<Button style={{marginLeft: '125px'}} size='small' color='inherit' aria-label='Delete' onClick={this.handleClickOpen}>
					<DeleteIcon />
				</Button>
				
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						CAUTION! You are about to delete the {this.props.currentCategory.name} category. Are you sure you want to do this?
					</DialogTitle>
					
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						
						<Button onClick={this.handleDelete} color="primary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default DeleteCategory;