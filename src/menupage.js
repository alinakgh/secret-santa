import React from "react";
import { getParticipantObject } from "./components/helperFunctions";

import AllCardsView from "./components/allCardsView";
import uuid from "react-native-uuid";

export default class MenuPage extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    fetch("http://192.168.0.22:3000/users/3", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  _onPressCard = card => {
    this.props.navigation.navigate("CardPage", {
      card: card,
      onEditCard: editedCard => this._editCard(editedCard)
    });
  };

  _sendData = data => {
    fetch("http://192.168.0.22:3000/updateData/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  async _addNewCard(card) {
    var newCard = {
      ...card,
      uid: uuid.v4()
    };
    copy = [...this.state.data, newCard];

    console.log("card ", copy);

    this._sendData(copy);
    this.setState({ data: copy });
  }

  _editCard = editedCard => {
    copy = [...this.state.data];

    for (let i in copy) {
      if (copy[i].uid === editedCard.uid) {
        copy[i] = editedCard;
        break;
      }
    }

    this._sendData(copy);
    this.setState({ data: copy });
  };

  render() {
    return (
      <AllCardsView
        drawCards={this.state.data}
        navigationFunc={this._onPressCard}
        addNewCard={card => this._addNewCard(card)}
      />
    );
  }
}
