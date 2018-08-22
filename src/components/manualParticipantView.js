import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button, List, ListItem } from "react-native-elements";
import { getParticipantObject } from "./helperFunctions";

import uuid from "react-native-uuid";

export default class ManualParticipantView extends React.PureComponent {
  state = {
    name: "",
    phoneNumber: "",
    addedParticipants: []
  };

  _onChangeName = name => {
    this.setState({ name: name });
  };

  _onChangePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber: phoneNumber });
  };

  _resetState = newParticipant => {
    this.setState({ name: "" });
    this.setState({ phoneNumber: "" });
    var addedParticipants = [...this.state.addedParticipants, newParticipant];
    this.setState({ addedParticipants: addedParticipants });
  };

  async _onAdd() {
    let id = uuid.v4();
    let phoneNumberId = uuid.v4();

    let newParticipant = getParticipantObject(
      id,
      this.state.name,
      "",
      this.state.phoneNumber,
      phoneNumberId,
      "",
      true
    );

    this.props.onAdd(newParticipant);
    this._resetState(newParticipant);

    Keyboard.dismiss();
  }

  _isDisabled = () => {
    return this.state.name === "" || this.state.phoneNumber === "";
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.name}
          placeholder={"Name"}
          value={this.state.name}
          onChangeText={name => this._onChangeName(name)}
        />

        <TextInput
          style={styles.phoneNumber}
          placeholder={"Phone number"}
          value={this.state.phoneNumber}
          keyboardType={"numeric"}
          onChangeText={phoneNumber => this._onChangePhoneNumber(phoneNumber)}
        />

        <Text> Don't forget to press save! </Text>
        <List>
          {this.state.addedParticipants.map((addedParticipant, i) => (
            <ListItem
              key={i}
              title={addedParticipant.name + " " + addedParticipant.phoneNumber}
              hideChevron
            />
          ))}
        </List>

        <Button
          title="Add"
          onPress={() => this._onAdd()}
          disabled={this._isDisabled()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    padding: 10
  },

  phoneNumber: {
    padding: 10
  }
});
