import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, List, ListItem} from  'react-native-elements';

import IconsView from './iconsView';
import CardModal from './modals/cardModal';

export default class CardView extends React.Component {
	state = {
		isEditModalVisible: false,
		cardSaved: null
	}

	componentDidMount() {
		this.setState({cardSaved: this.props.card});
	}

	_onSaveChanges = (editedCard) => {
		card = {
			uid: this.state.cardSaved.uid,
			title: editedCard.title,
			pictureOption: editedCard.pictureOption,
			image: '../images/raindeer.jpg',
			budget: editedCard.budget,
			currency: editedCard.currency,
			date: editedCard.date,
			participants: this.state.cardSaved.participants,
			participantsNo: this.state.cardSaved.participantsNo
		}

		this.setState({cardSaved: card});
		this.props.onEditCard(card, this.state.cardSaved);
		this._closeModal();
	}

	_closeModal = () => {
		this.setState({isEditModalVisible: false});
	}

	_openModal = () => {
		this.setState({isEditModalVisible: true});
	}

	render() {
		if(this.state.cardSaved === null) {
			return(<View> <Text> Loading... </Text> </View>)
		}

		return (
			<View style={styles.container}>
				<View style={styles.iconsView}>
					<IconsView participantsNo={this.state.cardSaved.participantsNo}
										 date={this.state.cardSaved.date}
										 budget={this.state.cardSaved.budget}
										 currency={this.state.cardSaved.currency} />
				</View>

				<View style={styles.contactsView}> 
					<ScrollView style={styles.contacts} >
						<List style={styles.contactList} containerStyle={{marginTop: 0}}>
							{
	    					this.state.cardSaved.participants.map((participant, i) => (
		      				<ListItem
						        key={i}
						        title={participant}
						        //leftIcon={{name: item.icon}}
		      				/>
	    					))
	  					}
							
						</List>

						<List containerStyle={{marginTop: 3}}>
							<TouchableOpacity activeOpacity={0.5}
																onPress={() => this.props.navigateTo('ContactsPage', {
																	card: this.state.cardSaved
																})}>
								<Icon name='plus' type='entypo' size={41} />
							</TouchableOpacity>
						</List>
					</ScrollView>
				</View>
				


				<View style={styles.buttons}> 
					<Button title="Edit" onPress={this._openModal}/>
					<Button title="add rules" />
					<Button title="Next" />
				</View>

				<View>
					<CardModal 
							currentCard={this.state.cardSaved}
							isVisible={this.state.isEditModalVisible}
							onDismiss={() => this._closeModal}
							onSaveChanges={(editedCard) => this._onSaveChanges(editedCard)}
							buttonText="Save changes"/> 
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	iconsView: {
		height: 70, 
		padding: 20,
		paddingBottom: 0,
		//backgroundColor: 'pink'
	},

	contactsView: {
		flex: 1,
		//paddingBottom: 30,

	},
	contacts: {
		padding: 10,
		
		//flex:1, 
		//backgroundColor: 'pink',
		//height: 100,
	},

	buttons: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',

	},

	contactList: {
		//flex: 1,
		backgroundColor: 'green',

	}
})