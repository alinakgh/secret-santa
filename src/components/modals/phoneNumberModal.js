import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card, List, ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';

export default class PhoneNumberModal extends React.Component {

	render() {
		if(!this.props.isVisible) {
			return (
				<View></View>
			);
		}

		return (
			<View style={{flex:1}}>
	      <Modal 
	      	//style={styles.bottomModal}
	      	isVisible={this.props.isVisible}
	      	onBackdropPress={this.props.onDismiss()}
	      	supportedOrientations={['portrait', 'landscape']}
	      	//backdropColor='red'
	      	animationInTiming={200}
	      	animationOutTiming={200}> 

	      	<Card>
		      	<Text> lsfjanskjnds </Text>

		      	<ScrollView style={{paddingBottom: 200}}> 
							<List> 
								{
									/*
		    					this.props.contact.phoneNumbers.map((phoneNumber, i) => (
				      				<ListItem
								        key={phoneNumber.id}
								        title={phoneNumber.number}
								        //leftIcon={this._getInitial(contact.name)}
								        //hideChevron
				      				/>
		    					))
		    					*/
				  			}
							</List>
						</ScrollView>
	      	</Card>

	      </Modal>

	     </View>
		);
	}
}