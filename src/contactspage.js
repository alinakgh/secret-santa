import React from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  SearchBar
} from "react-native-elements";
import { getAddressBook } from "./components/helperFunctions";
import Collapsible from "react-native-collapsible";

import PhoneNumberModal from "./components/modals/phoneNumberModal";
import ContactItem from "./components/contactItem";
import ManualParticipantView from "./components/manualParticipantView";
import { getParticipantObject } from "./components/helperFunctions";

export default class ContactsPage extends React.Component {
  state = {
    currentCard: null,
    addressBook: null,
    displayedAddressBook: null,
    participants: null,

    isManualContactOn: false,
    isModalVisible: false,
    modalContact: null
  };

  async componentDidMount() {
    /*
		const alreadySelectedIds = this.props.navigation.state.params.card.participants.map(
			card => {
				return card.id;
			}
		);
		let initialAddressBook = [...(await getAddressBook())];
		const alreadySelected = this.props.navigation.state.params.card
			.participants;

		for (let i in initialAddressBook) {
			initialContact = initialAddressBook[i];

			for (j in alreadySelected) {
				selectedContact = alreadySelected[j];

				if (initialContact.id === selectedContact.id) {
					initialAddressBook[i] = {
						...initialContact,
						phoneNumberSelected: selectedContact.phoneNumberSelected
					};
				}
			}
		}
		*/
    const card = this.props.navigation.state.params.card;
    let initialAddressBook = [...(await getAddressBook())];

    this.setState({ currentCard: card });
    this.setState({ addressBook: initialAddressBook });
    this.setState({ displayedAddressBook: initialAddressBook });
    this.setState({ participants: card.participants });
  }

  _openModal = contact => {
    this.setState({ modalContact: contact });
    this.setState({ isModalVisible: true });
  };

  _closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  _updateDisplayedAddressBook = (indexOf, displayedIndexOf, newContact) => {
    let copy = this.state.addressBook.slice();
    copy[indexOf] = newContact;

    if (displayedIndexOf >= 0) {
      let displayedCopy = this.state.displayedAddressBook.slice();
      displayedCopy[displayedIndexOf] = newContact;

      this.setState({ displayedAddressBook: displayedCopy });
    }
  };

  _onSaveModal = (oldContact, newContact) => {
    var copy = [...this.state.participants, newContact];
    this.setState({ participants: copy });
    this._forcingUpdate();
    this._closeModal();
  };

  _toggleIsManualContactOn = () => {
    const isManualContactOn = !this.state.isManualContactOn;
    this.setState({ isManualContactOn: isManualContactOn });
  };

  _isInParticipants = contact => {
    for (let i in this.state.participants) {
      if (this.state.participants[i].id === contact.id) {
        return true;
      }
    }

    return false;
  };

  _removeFromParticipants = contact => {
    var copy = [];
    for (let i in this.state.participants) {
      if (this.state.participants[i].id !== contact.id) {
        copy.push(this.state.participants[i]);
      }
    }

    this.setState({ participants: copy });
  };

  _alertNoPhoneNumber = contact => {
    Alert.alert(
      "Cannot add " + contact.name,
      "Contact has no assigned phone number.",
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  // assuming only one phoneNumber
  _addToParticipants = contact => {
    if (contact.phoneNumbers.length == 0) {
      this._alertNoPhoneNumber(contact);
      return;
    }

    const phoneNumber = contact.phoneNumbers[0];
    var newContact = getParticipantObject(
      contact.id,
      contact.name,
      "",
      phoneNumber.number,
      phoneNumber.id,
      phoneNumber.label,
      false
    );

    var copy = [...this.state.participants, newContact];
    this.setState({ participants: copy });
  };

  _toggleCheckBox = contact => {
    if (this._isInParticipants(contact)) {
      this._removeFromParticipants(contact);
    } else {
      if (contact.phoneNumbers.length > 1) {
        this._openModal(contact);
      } else {
        this._addToParticipants(contact);
      }
    }

    this._forcingUpdate();
  };

  _forcingUpdate = () => {
    var copy = this.state.displayedAddressBook.slice();

    this.setState({ displayedAddressBook: copy });
  };

  _updateCurrentCard = participants => {
    this.setState({
      currentCard: {
        ...this.state.currentCard,
        participants: participants,
        participantsNo: participants.length
      }
    });
  };

  async _onSaveChanges() {
    await this._updateCurrentCard(this.state.participants);

    this.props.navigation.state.params.onEditCard(this.state.currentCard);
    this.props.navigation.state.params.updateCard(this.state.currentCard);
    this.props.navigation.state.params.goBack();
  }

  // searchBar
  _onChangeText = searchWords => {
    word = searchWords.toLowerCase();

    const displayedAddressBook = this.state.addressBook
      .slice()
      .filter(contact => contact.name.toLowerCase().includes(word));

    this.setState({ displayedAddressBook: displayedAddressBook });
  };

  // searchBar - what do i need this for
  _onClearText = word => {
    console.log("Clear", word);
  };

  _keyExtractor = (contact, index) => contact.id;

  _renderItem = contactItem => {
    const contact = contactItem.item;
    return (
      <ContactItem
        key={contact.id}
        contact={contact}
        isChecked={this.state.participants.some(p => p.id === contact.id)}
        onToggleCheckbox={() => this._toggleCheckBox(contact)}
      />
    );
  };

  _addManualContact = newContact => {
    let participants = [...this.state.currentCard.participants, newContact];

    this.setState({ participants: participants });
    this._updateCurrentCard(participants);
  };

  render() {
    if (
      this.state.currentCard === null ||
      this.state.participants === null ||
      this.state.addressBook === null
    ) {
      return (
        <View>
          <Text> Loading... </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.manualContact}>
          <Card>
            <TouchableOpacity onPress={() => this._toggleIsManualContactOn()}>
              <Text> Add manually </Text>
            </TouchableOpacity>
            <Collapsible collapsed={!this.state.isManualContactOn}>
              <ManualParticipantView
                onAdd={newContact => this._addManualContact(newContact)}
              />
            </Collapsible>
          </Card>
        </View>

        <View style={styles.phoneContacts}>
          <Card style={{ margin: 0, padding: 0 }}>
            <TouchableOpacity onPress={() => this._toggleIsManualContactOn()}>
              <Text> Add from contacts </Text>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.isManualContactOn}>
              <SearchBar
                lightTheme
                onChangeText={this._onChangeText}
                onClearText={this._onClearText}
                placeholder="Search from contacts..."
              />

              <FlatList
                renderItem={this._renderItem}
                data={this.state.displayedAddressBook}
                keyExtractor={this._keyExtractor}
              />
            </Collapsible>
          </Card>
        </View>

        <View style={styles.button}>
          <Button title="Save" onPress={() => this._onSaveChanges()} />
        </View>

        <PhoneNumberModal
          isVisible={this.state.isModalVisible}
          contact={this.state.modalContact}
          onDismiss={() => this._closeModal}
          onSave={(oldContact, newContact) =>
            this._onSaveModal(oldContact, newContact)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  manualContact: {},

  phoneContacts: {
    flex: 1
  }
});
