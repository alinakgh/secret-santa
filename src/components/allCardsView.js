import React from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, List} from 'react-native-elements';

import IconsView from './iconsView';
import CardModal from './modals/cardModal';

export default class AllCardsView extends React.Component { 
	state = {
		isVisible: false,
	}

	_onPressAddCard = () => {
		console.log("Add Card - this should go?");
	}

	_openModal = () => {
		this.setState({isVisible: true});
	}

	_closeModal = () => {
		this.setState({isVisible: false});
	}

	_addCard = (newCard) => {
		card = {
			uid: null,
			title: newCard.title,
			pictureOption: newCard.pictureOption,
			image: '../images/raindeer.jpg',
			budget: newCard.budget,
			currency: newCard.currency,
			date: newCard.date,
			participants: [],
			participantsNo: 0
		}

		this.props.addNewCard(card);
		this._closeModal();
	}

	render() {
		if(this.props.drawCards === null) {
			return (<View></View>);
		}

		return (
			<ScrollView style={styles.container}> 	
				{
					this.props.drawCards.map((card, i) => (
						
						<TouchableOpacity activeOpacity={0.5}
															onPress={() => this.props.navigationFunc(card)}
															key={card.uid}>
							<Card title={card.title} 
										image={require('../../images/raindeer.jpg')}
										>

								<IconsView participantsNo={card.participantsNo}
									 date={card.date}
									 budget={card.budget}
									 currency={card.currency} />
								
							</Card>
						</TouchableOpacity>			
					))
				}
				<TouchableOpacity onPress={this._onPressAddCard} activeOpacity={0.5}>
					<Card >
						<Icon name='plus' type='entypo' size={50} onPress={this._openModal} />
						<CardModal 
							currentCard={undefined}
							isVisible={this.state.isVisible}
							onDismiss={() => this._closeModal}
							onSaveChanges={(newCard) => this._addCard(newCard)}
							buttonText="Add"/> 
					</Card>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	summary: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
})