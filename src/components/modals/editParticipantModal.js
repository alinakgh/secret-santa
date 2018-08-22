import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Card, List, ListItem } from "react-native-elements";
import Modal from "react-native-modal";
import { getParticipantObject } from "../helperFunctions";

export default class EditParticipantModal extends React.PureComponent {
  state = {
    alias: "",
    phoneNumberIfManuallyAdded: ""
  };

  componentDidMount() {
    if (this.props.participant !== null) {
      this.setState({ alias: this.props.participant.alias });

      if (this.props.participant.isManuallyAdded) {
        this.setState({
          phoneNumberIfManuallyAdded: this.props.participant.phoneNumber
        });
      }
    }
  }

  _saveChanges = newParticipant => {
    var participant = this.props.participant;
    var pn = participant.phoneNumber;
    if (participant.isManuallyAdded) {
      pn = this.state.phoneNumberIfManuallyAdded;
    }

    var newParticipant = getParticipantObject(
      participant.id,
      participant.name,
      this.state.alias,
      pn,
      participant.phoneNumberId,
      participant.phoneNumberLabel,
      participant.isManuallyAdded
    );
    this._onDismiss();
    this.props.onSaveChanges(newParticipant);
  };

  _onDismiss = () => {
    Keyboard.dismiss();
    this.setState({ alias: "" });
    this.setState({ phoneNumberIfManuallyAdded: "" });
    this.props.onDismiss();
  };

  _onChangeAlias = alias => {
    this.setState({ alias: alias });
  };

  _onChangePhoneNumber = phoneNumber => {
    this.setState({ phoneNumberIfManuallyAdded: phoneNumber });
  };

  _getPhoneNumberTextInput = () => {
    if (this.props.participant.isManuallyAdded) {
      return (
        <TextInput
          style={styles.alias}
          placeholder={"Phone Number"}
          value={this.state.phoneNumberIfManuallyAdded}
          keyboardType={"numeric"}
          onChangeText={phoneNumber => this._onChangePhoneNumber(phoneNumber)}
        />
      );
    }
  };

  _renderModalBody = () => {
    if (!this.props.isVisible && this.props.participant === null) {
      return <View />;
    }

    return (
      <View>
        <Card>
          <Text> {this.props.participant.name} </Text>

          <TextInput
            style={styles.alias}
            placeholder={"Nickname"}
            value={this.state.alias}
            onChangeText={alias => this._onChangeAlias(alias)}
          />

          {this._getPhoneNumberTextInput()}
        </Card>
        <View style={styles.buttons}>
          <Button
            style={{ width: 135 }}
            large
            title="Cancel"
            onPress={() => this._onDismiss()}
          />
          <Button
            style={{ width: 135 }}
            large
            title="Save"
            onPress={() => this._saveChanges(this.props.participant)}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal
        style={{ flex: 1 }}
        isVisible={this.props.isVisible}
        onBackdropPress={this._onDismiss}
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

const styles = StyleSheet.create({
  alias: {
    padding: 15
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
