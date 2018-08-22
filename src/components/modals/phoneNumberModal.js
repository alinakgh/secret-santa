import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, Card, List, ListItem } from "react-native-elements";
import Modal from "react-native-modal";
import { getParticipantObject } from "../helperFunctions";

export default class PhoneNumberModal extends React.PureComponent {
  _saveChanges = phoneNumber => {
    const contact = this.props.contact;
    var newContact = getParticipantObject(
      contact.id,
      contact.name,
      "",
      phoneNumber.number,
      phoneNumber.id,
      phoneNumber.label
    );

    this.props.onSave(this.props.contact, newContact);
    this.props.onDismiss();
  };

  _getDescription = phoneNumber => {
    const label = phoneNumber.label;

    if (label !== null && label !== "") {
      return phoneNumber.number + " (" + label + ")";
    }

    return phoneNumber.number;
  };

  _renderModalBody = () => {
    if (this.props.contact === null) {
      return <View />;
    }

    return (
      <View>
        <Card>
          <Text> {this.props.contact.name} </Text>
          <List>
            {this.props.contact.phoneNumbers.map(phoneNumber => (
              <TouchableOpacity
                key={phoneNumber.id}
                onPress={() => this._saveChanges(phoneNumber)}
              >
                <ListItem
                  title={this._getDescription(phoneNumber)}
                  hideChevron
                />
              </TouchableOpacity>
            ))}
          </List>
        </Card>
        <View>
          <Button title="Cancel" onPress={this.props.onDismiss()} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal
        //style={styles.bottomModal}
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onDismiss()}
        supportedOrientations={["portrait", "landscape"]}
        animationInTiming={400}
        animationOutTiming={1000}
        backdropTransitionOutTiming={400}
      >
        {this._renderModalBody()}
      </Modal>
    );
  }
}
