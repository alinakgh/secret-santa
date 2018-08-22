import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, List, ListItem } from "react-native-elements";
import IconsView from "./components/iconsView";
import { getBudgetText, getRandomInt } from "./components/helperFunctions";

export default class ReviewPage extends React.Component {
  state = {
    card: null
  };

  componentDidMount() {
    this.setState({ card: this.props.navigation.state.params.card });
  }

  _getParticipantName = participant => {
    if (participant.alias === "") {
      return participant.name;
    }

    return participant.alias;
  };

  _getAllowedPairsRuleText = arePairsAllowed => {
    if (arePairsAllowed) return <Text> Pairs are allowed. </Text>;

    return <Text> No pairs are allowed. </Text>;
  };

  _getUnwantedPairsText = unwantedPairs => {
    if (unwantedPairs.length > 0) {
      return <Text> I have {unwantedPairs.length} pairs. </Text>;
    }
  };

  _getMessageContent = card => {
    const exampleParticipant =
      card.participants[getRandomInt(card.participants.length)];
    const name = this._getParticipantName(exampleParticipant);
    const victim = "some_victim_name";

    return (
      <View>
        <Text>
          Sending to {exampleParticipant.phoneNumber}: {"\n"}
        </Text>
        <Text>
          My dear <Text style={{ fontWeight: "bold" }}>{name}</Text>, {"\n"}
        </Text>
        <Text>
          You have been invited to participate in the {card.title} draw!{"\n"}
        </Text>
        <Text>Your assigned victim is *** drum roll *** {"\n"}</Text>
        <Text style={{ fontStyle: "italic" }}>
          {victim}! {"\n"}
        </Text>
        <Text>
          Get your super secret surprise present ready for the {card.date} and
          don't forget to stick to the{" "}
          {getBudgetText(card.budget, card.currency)} budget. {"\n"}
        </Text>
        <Text>Happy Secret Santa!!!</Text>
      </View>
    );
  };

  _onPressSendMessages = () => {
    this.props.navigation.state.params.navigateTo("ConfirmationPage", {
      card: this.props.navigation.state.params.card
    });

    this._onEditCard();
  };

  _onEditCard = () => {
    var newCard = {
      ...this.state.card,
      messagesSent: true
    };
    this.setState({ card: newCard });
    this.props.navigation.state.params.onEditCard(newCard);
  };

  render() {
    if (this.state.card === null) {
      return <View />;
    }

    const card = this.state.card;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.iconsView}>
          <IconsView
            participantsNo={card.participantsNo}
            date={card.date}
            budget={card.budget}
            currency={card.currency}
          />
        </View>

        <Card title="Message content example">
          {this._getMessageContent(card)}
        </Card>

        <Card containerStyle={styles.rulesCard} title="Rules for the draw">
          <View>
            {this._getAllowedPairsRuleText(card.rules.arePairsAllowed)}
            {this._getUnwantedPairsText(card.rules.unwantedPairs)}
          </View>
        </Card>

        <Card containerStyle={{ marginBottom: 20 }} title="Participants">
          <View style={styles.contacts}>
            <List style={styles.contactList} containerStyle={{ marginTop: 0 }}>
              {card.participants.map((participant, i) => (
                <ListItem
                  key={participant.id}
                  title={this._getParticipantName(participant)}
                  subtitle={participant.phoneNumber}
                  hideChevron
                />
              ))}
            </List>
          </View>
        </Card>

        <View containerStyle={styles.button}>
          <Button
            large
            onPress={() => this._onPressSendMessages()}
            title="Send the messages"
            disabled={card.messagesSent}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconsView: {
    height: 70,
    padding: 20,
    paddingBottom: 0
  },
  contacts: {
    //maxHeight: 200
  },
  rulesCard: {},
  button: {
    paddingBottom: 20,
    marginBottom: 20
  }
});
