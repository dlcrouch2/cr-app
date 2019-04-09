import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../graphql/queries';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';

const styles = 
{
	card: {minWidth: 275},
	bullet: {display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)'},
	title: {fontSize: 14},
	pos: {marginBottom: 12},
	root: {display: 'flex', flexWrap: 'wrap', justifyContent: 'inherit', padding: '10px'}
};

class ListCategories extends Component
{
	state = { items: [] };
	
	componentDidMount = () =>
	{
		this.getItems()
	};
	
	getItems = () =>
	{
		API.graphql(graphqlOperation(queries.listCategorys)).then(data => this.setState({items: data.data.listCategorys.items}))
	};
	
	render()
	{
		const { classes } = this.props;
		const { items } = this.state;
		
		return (
			<div className = {classes.root}>
				<Grid container className={classes.root} spacing={16}>
					{
						items.map(item =>
						(
							<Grid key={item.id} item>
								<Card className={classes.card}>
									<CardContent>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											{item.name}
										</Typography>
										
										<Typography>
											Quantity: {item.quantity}
										</Typography>
										
										<Typography>
											Details: {item.description}
										</Typography>
									</CardContent>
									
									<CardActions>
										<EditCategory currentCategory={item} />
										<DeleteCategory currentCategory={item} />
									</CardActions>
								</Card>
							</Grid>
						))
					}
				</Grid>
			</div>
		);
	}
}

ListCategories.propTypes = { classes: PropTypes.object.isRequired};

export default withStyles(styles)(ListCategories);