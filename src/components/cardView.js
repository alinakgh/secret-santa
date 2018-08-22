import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Icon, List, ListItem } from "react-native-elements";

import IconsView from "./iconsView";
import CardModal from "./modals/cardModal";
import RulesModal from "./modals/rulesModal";
import Swipeout from "react-native-swipeout";
import EditParticipantModal from "./modals/editParticipantModal";

export default class CardView extends React.Component {
  state = {
    isEditModalVisible: false,
    isParticipantModalVisible: false,
    isRulesModalVisible: false,
    participantForModal: null,
    cardSaved: null,
    autoClose: false
  };

  componentDidMount() {
    this.setState({ cardSaved: this.props.card });
  }

  _onSaveChanges = editedCard => {
    newCard = {
      ...this.state.cardSaved,
      title: editedCard.title,
      pictureOption: editedCard.pictureOption,
      budget: editedCard.budget,
      image: "../images/raindeer.jpg",
      currency: editedCard.currency,
      date: editedCard.date
    };

    this.setState({ cardSaved: newCard });
    this.props.onEditCard(newCard);
    this._closeModal();
  };

  _updateCardWithContacts = participants => {
    var newCard = {
      ...this.state.cardSaved,
      participants: participants,
      participantsNo: participants.length
    };

    this.setState({ cardSaved: newCard });
  };

  async _removeParticipant(participant) {
    let participantsCopy = [];

    const index = this.state.cardSaved.participants.indexOf(participant);

    if (index >= 0) {
      for (let i in this.state.cardSaved.participants) {
        if (i != index) {
          participantsCopy.push({ ...this.state.cardSaved.participants[i] });
        }
      }
    } else {
      console.log("the participant doesnt exist in the list ", participant);
    }

    await this._updateCardWithContacts(participantsCopy);

    this.props.onEditCard(this.state.cardSaved);
  }

  _closeModal = () => {
    this.setState({ isEditModalVisible: false });
  };

  _openModal = () => {
    this.setState({ isEditModalVisible: true });
  };

  _closeParticipantModal = () => {
    this.setState({ isParticipantModalVisible: false });
    this.setState({ autoClose: true });
  };

  _openParticipantModal = () => {
    this.setState({ isParticipantModalVisible: true });
  };

  _closeRulesModal = () => {
    this.setState({ isRulesModalVisible: false });
  };

  _openRulesModal = () => {
    this.setState({ isRulesModalVisible: true });
  };

  _updateCard = newCard => {
    console.log("save from the contacts", newCard);
    this.setState({ cardSaved: newCard });
  };

  swipeoutBtns = participant => {
    return [
      {
        text: "Edit",
        onPress: () => this._onPressParticipant(participant),
        backgroundColor: "green"
      },
      {
        text: "Delete",
        onPress: () => this._removeParticipant(participant),
        backgroundColor: "red"
      }
    ];
  };

  _onSaveRules = rules => {
    this.setState({
      cardSaved: {
        ...this.state.cardSaved,
        rules: rules
      }
    });

    // propageate info with onEditCard()
  };

  // FIX: some contacts don't have first name etc
  _getParticipantDescription = participant => {
    var displayName = participant.name;

    if (participant.alias !== "") {
      return displayName.concat(" as ", participant.alias);
    }
    return displayName;
  };

  _getParticipantPhoneNumber = participant => {
    var displayPhoneNumber = participant.phoneNumber;

    if (participant.phoneNumberLabel !== "") {
      return displayPhoneNumber.concat(
        " (",
        participant.phoneNumberLabel,
        ") "
      );
    }

    return displayPhoneNumber;
  };

  _onPressParticipant = participant => {
    this.setState({ participantForModal: participant });
    this.setState({ isParticipantModalVisible: true });
  };

  async _onSaveParticipantChanges(newParticipant) {
    let participantsCopy = [];

    for (let i in this.state.cardSaved.participants) {
      const participant = this.state.cardSaved.participants[i];
      if (newParticipant.id != participant.id) {
        participantsCopy.push(participant);
      } else {
        participantsCopy.push(newParticipant);
      }
    }

    await this._updateCardWithContacts(participantsCopy);

    console.log("after saving participnts ", this.state.cardSaved);

    this.props.onEditCard(this.state.cardSaved);
    this._closeParticipantModal();
  }

  async _onSaveRulesChanges(newCard) {
    console.log("on _onSaveRulesChanges", newCard);

    await this._updateCard(newCard);

    this.props.onEditCard(this.state.cardSaved);
    this._closeRulesModal();
  }

  _onEditingCard = newCard => {
    this._updateCard(newCard);
    this.props.onEditCard(newCard);
  };

  render() {
    if (this.state.cardSaved === null) {
      return (
        <View>
          {" "}
          <Text> Loading... </Text>{" "}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconsView}>
          <IconsView
            participantsNo={this.state.cardSaved.participantsNo}
            date={this.state.cardSaved.date}
            budget={this.state.cardSaved.budget}
            currency={this.state.cardSaved.currency}
          />
        </View>

        <View style={styles.contactsView}>
          <ScrollView style={styles.contacts}>
            <List style={styles.contactList} containerStyle={{ marginTop: 0 }}>
              {this.state.cardSaved.participants.map((participant, i) => (
                <Swipeout
                  key={participant.id}
                  autoClose
                  right={this.swipeoutBtns(participant)}
                >
                  <ListItem
                    key={participant.id}
                    title={this._getParticipantDescription(participant)}
                    subtitle={this._getParticipantPhoneNumber(participant)}
                    hideChevron
                  />
                </Swipeout>
              ))}
            </List>

            <List containerStyle={{ marginTop: 3 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  this.props.navigateTo("ContactsPage", {
                    card: this.state.cardSaved,
                    onEditCard: newCard => this.props.onEditCard(newCard),
                    goBack: this.props.goBack,
                    updateCard: this._updateCard
                  })
                }
              >
                <Icon name="plus" type="entypo" size={41} />
              </TouchableOpacity>
            </List>
          </ScrollView>
        </View>

        <View style={styles.buttons}>
          <Button title="Edit" onPress={this._openModal} />
          <Button title="Add rules" onPress={this._openRulesModal} />
          <Button
            title="Review"
            onPress={() =>
              this.props.navigateTo("ReviewPage", {
                card: this.state.cardSaved,
                onEditCard: newCard => this._onEditingCard(newCard),
                navigateTo: this.props.navigateTo,
                goBack: this.props.goBack
              })
            }
            disabled={this.state.cardSaved.participants.length < 3}
          />
        </View>

        <View>
          <CardModal
            currentCard={this.state.cardSaved}
            isVisible={this.state.isEditModalVisible}
            onDismiss={() => this._closeModal}
            onSaveChanges={editedCard => this._onSaveChanges(editedCard)}
            buttonText="Save changes"
          />
        </View>

        <View>
          <RulesModal
            isVisible={this.state.isRulesModalVisible}
            card={this.state.cardSaved}
            onDismiss={() => this._closeRulesModal}
            onSaveChanges={newCard => this._onSaveRulesChanges(newCard)}
          />
        </View>

        <View>
          <EditParticipantModal
            isVisible={this.state.isParticipantModalVisible}
            participant={this.state.participantForModal}
            onDismiss={this._closeParticipantModal}
            onSaveChanges={newParticipant =>
              this._onSaveParticipantChanges(newParticipant)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  iconsView: {
    height: 70,
    padding: 20,
    paddingBottom: 0
    //backgroundColor: 'pink'
  },

  contactsView: {
    flex: 1
    //paddingBottom: 30,
  },
  contacts: {
    padding: 10

    //flex:1,
    //backgroundColor: 'pink',
    //height: 100,
  },

  buttons: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  contactList: {
    //flex: 1,
    backgroundColor: "green"
  }
});
