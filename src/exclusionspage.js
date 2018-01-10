import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

export default class ExclusionPage extends React.Component {
	render() {
		return (
			<View style={styles.container}> 
				<Button
					onPress={() => this.props.navigation.navigate('DrawPage')}
					title='Next'
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});