import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';

import Modal from 'react-native-modal';

export default class EditContactModal extends React.Component {

	state = {
		editAlias: ''
	}

	render() {
		if(!this.props.isVisible) {
			return (<View></View>);
		}

		return (
			<View>
	      <Modal 
	      	style={styles.bottomModal}
	      	isVisible={this.props.isVisible}
	      	onBackdropPress={this.props.onDismiss()}
	      	supportedOrientations={['portrait', 'landscape']}
	      	//backdropColor='red'
	      	animationInTiming={1000}
	      	animationOutTiming={200}> 

	      	<View style={styles.modalContent}>
	      		<Text> Edit name {this.props.contactDetails.alias}</Text>
	      		<TextInput
			        style={{height: 40, width: '100%'}}
			        onChangeText={(text) => this.setState({editAlias: text})}
			        placeholder={this.props.contactDetails.alias}
			        value={this.state.editAlias}
			        keyboardType='default'
      			/>
	      	</View>

	      	<Button
					  large
						onPress={() => this.props.onEdit(this.state.editAlias)}
						containerViewStyle={{width: '100%', marginLeft: 0}}
						title='Save changes'
					/>
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
});