import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, List, ListItem, SearchBar} from 'react-native-elements';
import MaterialInitials from 'react-native-material-initials/native';

import CheckBox from 'react-native-checkbox-heaven';
	
import getAddressBook from './santaBook';

export default class ProperContactsPage extends React.Component {
	static navigationOptions = {
    title: 'Contacts'
  }

	state = {
		contacts : [],
		availableContacts: [],
		selectedContacts: []
	}

	async componentDidMount() {
		this.setState({
			contacts: await getAddressBook(),
			availableContacts: await getAddressBook(),
			selectedContacts : this.props.navigation.state.params.selectedContacts
		});
	}

	onChangeText = searchWords => {
		word = searchWords.toLowerCase();

		availableContacts = this.state.contacts.filter(
			contact => contact.name.toLowerCase().includes(word)
		);

		this.setState({availableContacts: availableContacts});
	}

	onClearText = word => {
		console.log("Clear", word);
	}

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

	isSelected = (contact) => {
		return this.state.selectedContacts.includes(contact);
	}

	onPressContact = (contact) => {		
		if(!this.isSelected(contact)) {
			this.setState({selectedContacts: [...this.state.selectedContacts, contact]});

		} else {
  		index = this.state.selectedContacts.indexOf(contact);
			copy = this.state.selectedContacts.slice();
		  copy.splice(index, 1);
			this.setState({selectedContacts: copy});

		}
		
	}

	getCheckedIcon = (contact) => {
		return (
			<CheckBox
		    onChange={(val) => {
		    	if(val) {
						this.setState({selectedContacts: [...this.state.selectedContacts, contact]});
		    	} else {
		    		index = this.state.selectedContacts.indexOf(contact);
		    		copy = this.state.selectedContacts.slice();
		    		copy.splice(index, 1);
						this.setState({selectedContacts: copy});
		    	}
		    }} 
		    checked={this.state.selectedContacts.includes(contact)}	
			/>
		);
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
									//hideChevron
									leftIcon={this.getInitialIcon(l.name)}
									rightIcon={this.getCheckedIcon(l)}
									onPress={() => this.onPressContact(l)}
								/>
							))
						}
					</List>
				</ScrollView>

				<View style={styles.buttonView}>
					<Button
					  // large
						onPress={() => {
            			this.props.navigation.goBack();
            			this.props.navigation.state.params.onSelect(this.state.selectedContacts);
            		}
            	} 
						containerViewStyle={{width: '100%', marginLeft: 0}}
						title='Save changes'
					/>
				</View>
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
		backgroundColor: 'red'
	},

	buttonView: {
		backgroundColor: 'skyblue'
	},

	searchView: {
		backgroundColor: 'green'
	}
});