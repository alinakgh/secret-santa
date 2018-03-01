import React from 'react';

import AllCardsView from './components/allCardsView';
const demo = [
{
	uid: 1, //should be unique
	title: 'Hustlers Secret Santa',
	pictureOption: 0,
	image: '../images/raindeer.jpg',
	budget: 10,
	currency: "GBP",
	date: '11 Dec 2018',
	participants: [],
	participantsNo: 0
},
{
	uid: 2,
	title: "Fam",
	pictureOption: 0,
	image: '../images/raindeer.jpg', //get a default picture
	budget: 50,
	currency: "GBP",
	date: '01 Feb 2018',
	participants: [],
	participantsNo: 0
}];

const getNextUid = (current) => {
	return current + 1;
}

export default class MenuPage extends React.Component {
	state = {
		data: demo,
		nextUid: 3,
	}

	_onPressCard = (card) => {
		this.props.navigation.navigate('CardPage', {
				card: card, 
				onEditCard: (editedCard) => this._editCard(editedCard)
		})
	}

	_addNewCard = (card) => {
		card.uid = this.state.nextUid;
		this.setState({nextUid: getNextUid(this.state.nextUid)});

		copy = [...this.state.data, card];

		this.setState({data: copy});
	}

	_editCard = (editedCard) => {
		copy = [...this.state.data];

		for(let i in copy){
			if(copy[i].uid === editedCard.uid){
				copy[i] = editedCard;
				break;
			} 
		}

		this.setState({data: copy});
	}

	render() {
		return (
			<AllCardsView 
				drawCards={this.state.data} 
				navigationFunc={this._onPressCard}
				addNewCard={this._addNewCard}/>
		);
	}
}