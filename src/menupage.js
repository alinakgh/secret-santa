import React from 'react';

import AllCardsView from './components/allCardsView';
const demo = new Map();
demo.set(1, {
	uid: 1, //should be unique
	title: 'Hustlers Secret Santa',
	pictureOption: 0,
	image: '../images/raindeer.jpg',
	budget: 10,
	currency: "GBP",
	date: '11 Dec 2018',
	participants: ['asad', 'adssd','Alina', 'Tom', 'IVan', 'Rooz', 'Dani', 'Alina', 'Tom', 'IVan', 'Rooz', 'Dani'],
	participantsNo: 12
});

demo.set(2, {
	uid: 2,
	title: "Fam",
	pictureOption: 0,
	image: '../images/raindeer.jpg', //get a default picture
	budget: 50,
	currency: "GBP",
	date: '01 Feb 2018',
	participants: [ 'Alina', 'Tom', 'IVan', 'Rooz', 'Dani'],
	participantsNo: 5
});

export default class MenuPage extends React.Component {
	state = {
		data: demo,
		nextUid: 3,
	}

	_getNextUid = () => {
		uid = this.state.nextUid;
		next = this.state.nextUid + 1;
		this.setState({nextUid: next});
		return uid;
	}

	_getAllCardValues = () => {
		var arr = new Array();
		iter = this.state.data.values();

		while((v = iter.next().value) !== undefined) {
			arr.push(v);
		}
		return arr;
	}

	_onPressCard = (card) => {
		this.props.navigation.navigate('CardPage', {
				card: card, 
				onEditCard: (editedCard, existingCard) => this._editCard(editedCard, existingCard)
		})
	}

	_addNewCard = (card) => {
		nextUid =	this._getNextUid();
		card.uid = nextUid;
		this.state.data.set(nextUid, card);
		this.setState({data: this.state.data});
	}

	_editCard = (editedCard, existingCard) => {
		// probably the same uid
		this.state.data.set(existingCard.uid, editedCard);
		this.setState({data: this.state.data});
	}

	render() {
		return (
			<AllCardsView 
				drawCards={this._getAllCardValues()} 
				navigationFunc={this._onPressCard}
				addNewCard={this._addNewCard}/>
		);
	}
}