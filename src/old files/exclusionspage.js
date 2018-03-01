import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';

import EditContactModal from './components/editContactModal';

export default class ExclusionPage extends React.Component {
	state = {
		isModalVisible: false,
		selectedContact: null
	}

	componentDidMount(){
	}

	_getMapAsList() {
		asList = new Array();
		this.props.navigation.state.params.selectedContacts.forEach((value, key, map) => {
			asList.push(value);
		});
		return asList;
	}

	_openModal = () => {
		this.setState({isModalVisible: true});
	}

	_closeModal = () => {
		this.setState({isModalVisible: false});
	}

	_onPress = (contact) => {
		this.setState({selectedContact: contact});
		this._openModal();
	}

	_onEdit = (newAlias) => {
		console.log("newAlias", newAlias);

		if(newAlias.length > 0) { 
			this.state.selectedContact.alias = newAlias;
			console.log("contact", this.state.selectedContact);

			this.setState({selectedContact: this.state.selectedContact});
		}

		this._closeModal();
	}

	_getSelectedContactsView() {
		if(this.props.navigation.state.params.selectedContacts.size === 0) {
			return (
				<View>
					<Text> No contacts selected </Text>
				</View>
			);
		}

		return (
			<ScrollView style={styles.selectedContacts}>
					<List style={styles.list} containerStyle={{marginTop: 0}}>
						{
							this._getMapAsList().map((contact, i) => (
								<ListItem
									key={i}
									title={contact.alias + '  (' + contact.preferedNumber.number + ')'}
									hideChevron
									onPress={() => this._onPress(contact)}
								/>
							))
						}
					</List>
				</ScrollView>
		);
	}

	render() {
		return (
			<View style={styles.container}> 

				{this._getSelectedContactsView()}

				<EditContactModal
					isVisible={this.state.isModalVisible}
					contactDetails={this.state.selectedContact}
					onEdit={this._onEdit}
					onDismiss={() => this._closeModal}
				/>

				<View> 
					<Button
						onPress={() => this.props.navigation.navigate('DrawPage')}
						title='Next'
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

	selectedContacts: {
		flex: 1,
		backgroundColor: 'red'
	},

	list: {
		backgroundColor: 'blue',
		flex: 1
	}
});