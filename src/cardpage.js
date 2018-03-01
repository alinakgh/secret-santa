import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

import CardView from './components/cardView';

const HeaderRight = ({onPress}) => {
		return (
			<TouchableOpacity style={styles.editIcon}>
				<Icon name='edit' type='entypo' onPress={onPress}/>
			</TouchableOpacity>
		);
	}

export default class CardPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.card.title || ` `,
    headerRight: <HeaderRight onPress={() => console.log('glg')}/>
  });


	render() {
		return (
			<CardView card={this.props.navigation.state.params.card} 
								onEditCard={this.props.navigation.state.params.onEditCard} 
								navigateTo={(pageName, props) => 
															this.props.navigation.navigate(pageName, props)}
								goBack={() => this.props.navigation.dispatch(NavigationActions.back())}/>
		);
	}
}

const styles = StyleSheet.create({
	editIcon: {
		paddingRight: 5,
	}
})