import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';

import CheckBox from 'react-native-checkbox-heaven';
import Modal from 'react-native-modal';


export default class PhoneNumberModal extends React.Component {

	componentDidMount() {
	}

	_getCheckedIconPhoneNumber = (phoneNumber) => {
		return (
			<CheckBox
				// better name for val
		    onChange={(val) => this._onSelectPhoneNumber(phoneNumber)} 
		    checked={false}	
			/>
		);
	}

	_onSelectPhoneNumber = (selectedPhoneNumber) => {
		this.props.onSelectPhoneNumber(this.props.contactSelectedForModal, selectedPhoneNumber);
	}

	_closeModal = () =>  {
		this.props.onDismiss();
	}

	_getModalContent = (contact) => {
		return(
			<View style={styles.modalContent}>
				<Text> Select one phone number </Text>
				<View style={{width: '100%'}}>
					<List style={{flex:1}}>
						{
						 	contact.phoneNumbers.map((item, i) => (
								<ListItem
									style={{backgroundColor: 'purple'}}
									key={i}
									title={' ' + item.number + ' (' + item.label + ')'}
									hideChevron
									
									leftIcon={this._getCheckedIconPhoneNumber(item)}
									onPress={() => this._onSelectPhoneNumber(item)}
								/>
							))
						}
					</List>
				</View>
	      <Button
					onPress={this._closeModal}
					containerViewStyle={{width: '100%', marginLeft: 0, marginRight: 0}}
					title='Cancel'
				/>	           
   		</View>
		);	
	}

// because of the ooutTiming can press for the modal to reappear rather than deselect, 
// need to disable somehow
	render() { 
		if(!this.props.isModalVisible) {
			return (<View></View>);
		}

		return (
			<View>
	      <Modal 
	      	style={styles.bottomModal}
	      	isVisible={this.props.isModalVisible}
	      	onBackdropPress={this._closeModal}
	      	supportedOrientations={['portrait', 'landscape']}
	      	backdropColor='red'
	      	animationInTiming={1000}
	      	animationOutTiming={200}> 

	      	{this._getModalContent(this.props.contactSelectedForModal)}
	      </Modal>			
      </View>
		);
	}
}

const styles = StyleSheet.create({
	modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

	bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});


