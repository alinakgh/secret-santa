import  React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, CheckBox, Divider, List, ListItem} from 'react-native-elements';
import {getAddressBook} from './components/helperFunctions';
import Initials from './components/initials';
import Collapsible from 'react-native-collapsible'; 

import PhoneNumberModal from './components/modals/phoneNumberModal';

export default class ContactsPage extends React.Component {

	state = {
		currentCard: null,
		addressBook: null,
		isManualContactOn: false,
		selectedContacts: [],
		modalIsVisible: false,
		clickedContact: {}
	}

	async componentDidMount() {
		this.setState({currentCard: this.props.navigation.state.params.card});
		this.setState({addressBook: await getAddressBook(),});
		this.setState({selectedContacts: this.props.navigation.state.params.card.participants})
	}

	_closeModal = () => {
 		this.setState({modalIsVisible: false});
	}

	_openModal = (contact) => {
		/*
		if(contact !==null && contact.phoneNumbers.length > 1) { 

	 		this.setState({modalIsVisible: true});
	 		this.setState({clickedContact: contact});
 		}
 		*/
 		console.log("should open modal here");
	}

	_onModalChanges = (newContact) => {
		console.log("onmodalchanges", newContact);
	}

	_getInitial = (fullName) => {
		return(
			<Initials value={fullName} />
		);
	}

	_toggleIsManualContactOn = () => {
		b = !this.state.isManualContactOn;
		this.setState({isManualContactOn: b});
	}

	_toggleCheckBox = (contact) => {

		isSelected = this._isSelected(contact);
		copy = [];
		// isSelected then we need to remove else we need to add
		if(isSelected) {
			for(let i in this.state.selectedContacts) {
				if(this.state.selectedContacts[i].id !== contact.id) {
					copy.push(this.state.selectedContacts[i]);
			}
		}
		} else {

			if(contact.phoneNumbers.length > 1) {
				console.log("more contacts", contact.name, contact.phoneNumbers.length);

				copy = [...this.state.selectedContacts];
			} else {
				copy = [...this.state.selectedContacts, contact];
			}
		}
		
		this.setState({selectedContacts: copy});
	}

	_isSelected = (contact) => {
		for(let i in this.state.selectedContacts) {
			if(this.state.selectedContacts[i].id === contact.id){
				return true;
			}
		}
		return false;
	}

	_getCheckBox = (contact) => {
		return (
			<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
				
				<CheckBox 
					title={contact.name}
					checked={this._isSelected(contact)}
					containerStyle={{padding: 0, margin: 0}}
					iconRight={true}
					onPress={() => this._toggleCheckBox(contact)}
				/>
			</View>
		);
	}

  _updateCard = (contacts) => {
		this.setState({currentCard: {
			...this.state.currentCard,
			participants: contacts,
			participantsNo: contacts.length
		}});
	}

	async _onSaveChanges() {
		await this._updateCard(this.state.selectedContacts);

		this.props.navigation.state.params.onEditCard(this.state.currentCard);
		this.props.navigation.state.params.goBack();
		this.props.navigation.state.params.updateCard(this.state.currentCard);
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

							<ScrollView style={{paddingBottom: 200}}> 
								<List> 
									{
			    					this.state.addressBook.map((contact, i) => (

			    						<TouchableOpacity key={contact.id} 
			    									 						onPress={() => this._openModal(contact)}>
					      				<ListItem
									        key={i}
									        title={this._getCheckBox(contact)}
									        leftIcon={this._getInitial(contact.name)}
									        hideChevron
					      				/>

					      			</TouchableOpacity>
			    					))
			  					}
								</List>
							</ScrollView>

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