import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { NavigationActions } from "react-navigation";

export default class ConfirmationPage extends React.Component {
  static navigationOptions = {
    title: "Congrats!",
    headerLeft: null
  };

  _goToMenuPage = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "MenuPage" })]
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Card title="Messages have been sent!">
          <Button
            large
            onPress={() => this._goToMenuPage()}
            title="Go to Menu"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
