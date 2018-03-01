import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Badge, Button, Icon, List, ListItem} from 'react-native-elements';

import {Contacts, Permissions} from 'expo';

export default class HomePage extends React.Component {

  // stackNavigation options
  static navigationOptions = {
    //title: 'Secret Santa' //sets the title and back arrow with the appropriate text
    //headerLeft: (<Icon name="menu"  type='entypo'
    //                   onPress={() => this.props.navigation.navigate('MenuPage')}/>)
  }

  state = { 
    selectedContacts: new Map(),
  }

  componentDidMount() {

  }

  // for contactsPage callback
  _onSelect = selectedContacts => {
    this.setState({selectedContacts : selectedContacts});
  };

  _onAliasChange = (contact) => {
    // contct has the new info
    if(!this.state.selectedContacts.has(contact.id)){
      console.log("THIS SHOULDNT HAPPEN");
    } else {
      this.state.selectedContacts.set(contact.id, contact);
      this.setState({selectedContacts : selectedContacts});
    }
  };

  render() { 
    return (
      <View style={styles.container}>

        <View style={styles.imageView}>
          <Image
            style={styles.santaImage}
            source={require('../images/logo.png')}
          /> 
        </View>

        <View style={styles.addingButtons}>

           <Button 
            containerViewStyle={{width: '100%', marginLeft: 0}}
            onPress={() => this.props.navigation.navigate('ContactsPage', {
                              selectedContacts: this.state.selectedContacts,
                              onSelect: this._onSelect
                           })} 
            title="Import contacts"
          />

        </View>

        <View style={styles.badge}>         
          <Badge>
            <Text style={{ color: 'orange' }}> 
              {this.state.selectedContacts.size} {(this.state.selectedContacts.size === 1) ? 'elf' : 'elfs'} 
            </Text>
          </Badge>
        </View>

        <View style={styles.drawButton}>

          <Button 
            large
            containerViewStyle={{width: '100%', marginLeft: 0}}
            iconRight = {{name: 'refresh'}}
            onPress={() => this.props.navigation.navigate('ExclusionsPage', {
                            selectedContacts: this.state.selectedContacts,
                            onAliasChange: this._onAliasChange
                           })} 
            title="Next"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexDirection: 'column',
    direction: 'ltr'

  },

  santaImage: {
    height: '85%'
  },

  imageView: {
    width: '100%',
    height: '56%',
    backgroundColor: 'powderblue',
    alignItems: 'center', // keeps the children (ie. the image) centered horizontally
    justifyContent: 'center', // keeps the children (ie. the image) centered vertically
  },

  addingButtons: {
    width: '100%',
    backgroundColor: 'skyblue'
  },

  drawButton: {
    width: '100%',
    backgroundColor: 'steelblue'
  },

  badge: {
    width: '100%',
    backgroundColor: 'beige',
    alignItems: 'center'
  },

  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
