import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import Initials from "./initials";

export default class ContactItem extends React.PureComponent {
  _getInitial = fullName => {
    return <Initials value={fullName} />;
  };

  _getCheckBox = contact => {
    return (
      <View style={styles.container}>
        <CheckBox
          title={contact.name}
          checked={this.props.isChecked}
          containerStyle={{ padding: 0, margin: 0 }}
          iconRight={true}
          onPress={this.props.onToggleCheckbox}
        />
      </View>
    );
  };

  render() {
    const contact = this.props.contact;

    return (
      <ListItem
        title={this._getCheckBox(contact)}
        leftIcon={this._getInitial(contact.name)}
        hideChevron
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
