import  React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, List, ListItem} from 'react-native-elements';
import {getAddressBook} from './components/helperFunctions';
import Initials from './components/initials';
import Collapsible from 'react-native-collapsible'; 

export default class ContactsPage extends React.Component {

	state = {
		currentCard: null,
		addressBook: null,
		isManualContactOn: false
	}

	async componentDidMount() {
		this.setState({currentCard: this.props.navigation.state.params.card});
		this.setState({addressBook: await getAddressBook(),});
	}

	_getInitial = (fullName) => {
		return(
			<Initials value={fullName} />
		);
	}

	_toggleIsManualContactOn= () => {
		console.log("is", this.state.isManualContactOn);
		b = !this.state.isManualContactOn;
		this.setState({isManualContactOn: b});
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
								<Text> Alias </Text>
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

				      				<ListItem
								        key={i}
								        title={contact.name}
								        leftIcon={this._getInitial(contact.name)}
								        hideChevron
				      				/>
			    					))
			  					}
								</List>
							</ScrollView>
						</Collapsible>
					</Card>
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
		//minHeight: 50,
		//minHeight: 100,
	},

	phoneContacts: {
		flex:1,
		//marginBottom: 30,
		//paddingBottom: 30,
	}
});