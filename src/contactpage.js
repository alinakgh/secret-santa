import React from 'react';
import {Image, Item, List, StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { NavigationActions } from 'react-navigation';

import getAddressBook from './santaBook';

export default class ContactsPage extends React.Component {

	state = { 
						contacts : [],
						selectedContacts : []
					}

	async componentDidMount() {
		this.setState({
			contacts : await getAddressBook(),
			selectedContacts : this.props.navigation.state.params.selectedContacts.map(sc => sc.id)
		});
	}

  onSelectedItemsChange = selectedContacts => {
    this.setState({ selectedContacts: selectedContacts });
  };

  filterSelected = (contacts, selectedContacts) => {
  	return contacts.filter(contact => selectedContacts.includes(contact.id));
  };

	render () {
		if (this.state.contacts.length === 0) {
			return <View><Text>Loading...</Text></View>;
		}

		return (
		<View style={styles.container}>

			<View style={styles.multiselect}>

				<MultiSelect
	          
	          items={this.state.contacts}
	          uniqueKey="id"
	          ref={(component) => { this.multiSelect = component }}
	          onSelectedItemsChange={this.onSelectedItemsChange}
	          selectedItems={this.state.selectedContacts}
	          selectText="Select contacts"
	          searchInputPlaceholderText="Search..."
	          onChangeInput={ (text)=> console.log(text)}
	          //altFontFamily="ProximaNova-Light"
	          tagRemoveIconColor="#CCC"
	          tagBorderColor="#CCC"
	          tagTextColor="#CCC"
	          selectedItemTextColor="#CCC"
	          selectedItemIconColor="#CCC"
	          itemTextColor="#000"
	          displayKey="name"
	          searchInputStyle={{ color: '#CCC' }}
	          submitButtonColor="#CCC"
	          submitButtonText="Done"
	        />

			 </View>


			 <View>

          <Button 
            large
            containerViewStyle={{width: '100%', marginLeft: 0}}
            onPress={() => {
            			this.props.navigation.goBack();
            			this.props.navigation.state.params.onSelect(
            					this.filterSelected(this.state.contacts, this.state.selectedContacts));
            		}
            	} 
            title="Add"
          />
        </View>
    </View>
	);
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  pictureAndButton: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  multiselect: {
  	height: '50%'
  },

  elfImage: {
  	height: '20%'
  },

});



/*

*/