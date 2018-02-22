import React from 'react';
import {Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

import MenuPage from './menupage';
import CardPage from './cardpage';


import HomePage from './homepage';
import ContactsPage from './contactspage';
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
	MenuPage : {
		screen: MenuPage
	},

	CardPage : {
		screen: CardPage
	},

	ContactsPage : {
		screen: ContactsPage
	},

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
		screen: DrawPage
	}
});
