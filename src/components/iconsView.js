import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {getBudgetText} from './helperFunctions'

export default class IconsView extends React.Component {

	render () {
		return (
			<View style={styles.summary}>
				<View>
					<Icon name='users' type='entypo' />
					<Text> {this.props.participantsNo} </Text>
				</View>

				<View>
					<Icon name='calendar' type='entypo' />
					<Text format="dd MMM yyyy"> {this.props.date} </Text>

				</View>

				<View>
					<Icon name='price-tag' type='entypo' />
					<Text> {getBudgetText(this.props.budget, this.props.currency)} </Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
})