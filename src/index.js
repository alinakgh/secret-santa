import React from 'react';
import {Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomePage from './homepage';
import ContactsPage from './contactpage';
import ExclusionsPage from './exclusionspage';
import DrawPage from './drawpage';

export default class AppRoot extends React.Component {
	render() {
		return(
			<RoutingStack/>
		);
	}
}

const RoutingStack = StackNavigator({
	HomePage : {
		screen: HomePage,
		title: 'Welcome to Secret Santa!',
	},
	ContactsPage : {
		screen: ContactsPage
	},
	ExclusionsPage: {
		screen: ExclusionsPage
	},
	DrawPage : {
		screen: DrawPage,
		title: 'Here'
	}
});
