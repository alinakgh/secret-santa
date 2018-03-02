import  React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Divider, List, ListItem} from 'react-native-elements';
import {getAddressBook} from './components/helperFunctions';
import Collapsible from 'react-native-collapsible'; 

import ContactItem from './components/contactItem';

export default class ContactsPage extends React.Component {

	state = {
		currentCard: null,
		addressBook: null,
		isManualContactOn: false,
	}

	// flatlist and virtualisedlist faff for better performance

	async componentDidMount() {
		const alreadySelectedIds = this.props.navigation.state.params.card.participants.map((card) => {return card.id});
		let initialAddressBook = [... await getAddressBook()];

		for(let i in initialAddressBook) {
			if(alreadySelectedIds.includes(initialAddressBook[i].id)) {
				initialAddressBook[i] = {
					...initialAddressBook[i],
					isSelected: true
				}
			}
		}

		this.setState({currentCard: this.props.navigation.state.params.card});
		this.setState({addressBook: initialAddressBook});
	}

	_toggleIsManualContactOn = () => {
		const b = !this.state.isManualContactOn;
		this.setState({isManualContactOn: b});
	}

	_toggleCheckBox = (contact) => {
		let copy = this.state.addressBook.slice();
		
		copy[copy.indexOf(contact)] = {
			...contact,
			isSelected: !contact.isSelected
		}

		this.setState({addressBook: copy});
	}

  _updateCard = () => {
  	let participants = this.state.addressBook.filter(contact => contact.isSelected);

		this.setState({currentCard: {
			...this.state.currentCard,
			participants: participants,
			participantsNo: participants.length
		}});
	}

	async _onSaveChanges() {
		await this._updateCard();

		this.props.navigation.state.params.onEditCard(this.state.currentCard);
		this.props.navigation.state.params.goBack();
		this.props.navigation.state.params.updateCard(this.state.currentCard);
	}

	_keyExtractor = (contact, index) => contact.id;

	_renderItem = (contactItem) => {
		const contact = contactItem.item;
		return (
			<ContactItem
				key={contact.id}
				contact={contact}
				onToggleCheckbox={() => this._toggleCheckBox(contact)}
			/>
		);
	}

	render() {
		if(this.state.currentCard === null || this.state.addressBook === null) {
			return(
				<View><Text> Loading... </Text></View>
			);
		}
		return (
			<View style={styles.container}>

				<View style={styles.manualContact} > 
					<Card>
						<TouchableOpacity onPress={() => this._toggleIsManualContactOn()}>
							<Text> Add manually </Text>
						</TouchableOpacity>
						<Collapsible collapsed={!this.state.isManualContactOn}> 
							<View>
								
								<Text> Name </Text>
								<Text> Phone Number </Text>
							</View>
						</Collapsible>
					</Card>
				</View>

				<View style={styles.phoneContacts} > 
					<Card style={{margin: 0, padding: 0}}>
						<TouchableOpacity onPress={() => this._toggleIsManualContactOn()}>
							<Text> Add from contacts </Text>
						</TouchableOpacity>
						<Collapsible collapsed={this.state.isManualContactOn}>

							<FlatList
								renderItem={this._renderItem}
								data={this.state.addressBook}
								keyExtractor={this._keyExtractor}
	  					/>

						</Collapsible>
					</Card>
				</View>
				
				<View style={styles.button}>
					<Button 
							title='Save'
							onPress={() => this._onSaveChanges()}
					/>
				</View> 

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},

	manualContact: {
	},

	phoneContacts: {
		flex:1,
	}
});