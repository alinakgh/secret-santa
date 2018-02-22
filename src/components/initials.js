import React from 'react';
import {Text, View} from 'react-native';

export default class Initials extends React.Component {

	_getInitials = (value) => {
		words = value.split(' ');

		initials = words.map((word) => word[0]);

		return initials.join('').concat(' - ');
	}

	render() {
		return(
			<View>
				<Text> {this._getInitials(this.props.value)} </Text>
			</View>
		);
	}
}