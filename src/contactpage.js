import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, List, ListItem, SearchBar} from 'react-native-elements';
import MaterialInitials from 'react-native-material-initials/native';
import CheckBox from 'react-native-checkbox-heaven';
import Modal from 'react-native-modal';

import PhoneNumberModal from './components/phoneNumberModal';
	
import getAddressBook from './santaBook';

export default class ProperContactsPage extends React.Component {
	static navigationOptions = {
    title: 'Contacts',
  }

	state = {
		contacts : [],
		availableContacts: [],
		selectedContacts: new Map(),
		isModalVisible: false,
		contactSelectedForModal: null
		
	}

	async componentDidMount() {
		this.setState({
			contacts: await getAddressBook(),
			availableContacts: await getAddressBook(),
			selectedContacts : this.props.navigation.state.params.selectedContacts
		});
	}

	// searchBar
	onChangeText = searchWords => {
		word = searchWords.toLowerCase();

		availableContacts = this.state.contacts.filter(
			contact => contact.name.toLowerCase().includes(word)
		);

		this.setState({availableContacts: availableContacts});
	}

	// searchBar - what do i need this for
	onClearText = word => {
		console.log("Clear", word);
	}

	// initials Icon
	getInitialIcon = name => {
		return (
			<MaterialInitials
			  style={{alignSelf: 'center'}}
			  backgroundColor={'black'}
			  color={'white'}
			  size={30}
			  // this is not quite proper 
			  text={name.replace(/\W/g, ' ')}
			  single={false}
			/>
		);
	}

	// modal
	_openModal = () => {
		this.setState({ isModalVisible: true})
	}

	_closeModal = () => {
		this.setState({isModalVisible: false});
	}


	// item selection
	isSelected = (contact) => {
		return this.state.selectedContacts.has(contact.id); 
	}

	_addToSelected(contact, preferedNumber) {
		item = {
			contact: contact,
			preferedNumber: preferedNumber === null ? 
												contact.phoneNumbers[0] : 
												preferedNumber,
			alias: contact.firstName
		};

		console.log("will add to a list on ", this.state.selectedContacts.size);

		this.state.selectedContacts.set(contact.id, item)
		this.setState({selectedContacts: this.state.selectedContacts});
	}

	// item selection - make this cleaner
	onPressContact = (contact, isSelected) => {		
		if(!isSelected) {
			// open modal
			if(contact.phoneNumbers.length > 1) {
				this.setState({contactSelectedForModal : contact});
				this._openModal();

			} else {
				this._addToSelected(contact, null);
			}

		} else {
		 	this.state.selectedContacts.delete(contact.id);
			this.setState({selectedContacts: this.state.selectedContacts});
		}		
	}

	// item selection (checkbox)
	getCheckedIcon = (contact) => {
		return (
			<CheckBox
				// better name for val
		    onChange={(val) => this.onPressContact(contact, !val)} 
		    checked={this.state.selectedContacts.has(contact.id)}	
			/>
		);
	}

	// callback for modal
	_onSelectPhoneNumber = (contact, selectedPhoneNumber) => {
		this._addToSelected(contact, selectedPhoneNumber);
		this._closeModal();
	}

	render() {
		if(this.state.contacts.length === 0) {
			return(
				<View><Text> Loading... </Text></View>
			);
		}

		return (
			<View style={styles.container}>

				<View style={styles.searchView}> 
					<SearchBar
						round
					  lightTheme
					  onChangeText={this.onChangeText}
					  onClearText={this.onClearText}
					  placeholder='Search...' />
				</View>

				<ScrollView style={styles.listView}>
					<List style={styles.list} containerStyle={{marginTop: 0}}>
						{
							// list too big, makes it slow
							this.state.availableContacts.map((l, i) => (
								<ListItem
									key={i}
									title={'  ' + l.name}
									leftIcon={this.getInitialIcon(l.name)}
									rightIcon={this.getCheckedIcon(l)}
									onPress={() => this.onPressContact(l, this.isSelected(l))}
								/>
							))
						}
					</List>
				</ScrollView>

				<View style={styles.buttonView}>
					<Button
					  large
						onPress={() => {
            			this.props.navigation.goBack();
            			this.props.navigation.state.params.onSelect(this.state.selectedContacts);
            		}
            	} 
						containerViewStyle={{width: '100%', marginLeft: 0}}
						title='Save changes'
					/>
				</View>

				<PhoneNumberModal 
					isModalVisible={this.state.isModalVisible}
					contactSelectedForModal={this.state.contactSelectedForModal}
					onSelectPhoneNumber={this._onSelectPhoneNumber}
					onDismiss={this._closeModal}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	listView: {
		flex: 1,
		backgroundColor: 'pink'
	},

	list: {
		flex: 1,
		backgroundColor: 'brown'
	},

	buttonView: {
		backgroundColor: 'skyblue'
	},

	searchView: {
		backgroundColor: 'green'
	},

});