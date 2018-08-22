import React from "react";
import { Text, View } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import Modal from "react-native-modal";

export default class RulesModal extends React.Component {
  state = {
    card: null
  };

  componentDidMount() {
    this.setState({ card: this.props.card });
    console.log("card on receive ", this.props.card);
  }

  _onToggleCheckbox = () => {
    var newCard = {
      ...this.state.card,
      rules: {
        ...this.state.card.rules,
        arePairsAllowed: !this.state.card.rules.arePairsAllowed
      }
    };
    this.setState({ card: newCard });

    console.log("newCard ", newCard);
  };

  _onSaveChanges = () => {
    this.props.onSaveChanges(this.state.card);
  };

  render() {
    if (
      this.state.card === null ||
      !this.props.isVisible ||
      this.props.card === null
    ) {
      return <View />;
    }
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onDismiss()}
        supportedOrientations={["portrait", "landscape"]}
        animationInTiming={200}
        animationOutTiming={200}
      >
        <Card title="Rules of the draw">
          <CheckBox
            title="Allow Pairs"
            checked={this.state.card.rules.arePairsAllowed}
            containerStyle={{ padding: 0, margin: 0 }}
            onPress={() => this._onToggleCheckbox()}
          />
        </Card>
        <Button title="Save" onPress={() => this._onSaveChanges()} />
      </Modal>
    );
  }
}
