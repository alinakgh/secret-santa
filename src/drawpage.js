import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

export default class DrawPage extends React.Component {
	static navigationOptions = {
		title: 'Draw'
	}

	componentDidMount() {
	}

	sendTexts() {
		console.log('Here I should send texts');
		Alert.alert(
			'Texts sent',
			'Your letter to the evles are on their way!',
			[
				{text: 'Ok', onPress: () => {console.log('ok, will dismiss alert')}}
			]
		);
	}

	render() {
		return (
			<View>
				<Text> All the little elfs have been assigned a target! </Text>

				<Button 
					onPress={() => this.sendTexts()}
					title='Send texts'
				/>

				<Button
					// does this cause memory leak? also, is it bad animation?
					onPress={() => this.props.navigation.dispatch(
							NavigationActions.reset({
								index: 0,
								actions: [NavigationActions.navigate({routeName: 'HomePage'})]
							}))}
					title='Start a new Secret Santa draw'
				/>
			</View>
		);
	}
}


