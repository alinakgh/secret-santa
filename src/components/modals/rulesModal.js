import React from 'react';
import {Text, View} from 'react-native';
import {Card, CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal'


export default class RulesModal extends React.Component {
	state = {
		isPairsAllowed: false
	}

	componentDidMount() {
		//this.setState({isPairsAllowed: this.props.rules.isPairsAllowed});
	}

	render() {
		return (
			<Modal 
	      	//style={styles.bottomModal}
	      	isVisible={this.props.isVisible}
	      	onBackdropPress={this.props.onDismiss()}
	      	supportedOrientations={['portrait', 'landscape']}
	      	//backdropColor='red'
	      	animationInTiming={200}
	      	animationOutTiming={200}> 

	     	<Card title="Rules of the draw">
		     	<CheckBox 
						title="Allow Pairs"
						checked={this.state.isPairsAllowed}
						containerStyle={{padding: 0, margin: 0}}
						onPress={() => this.setState({isPairsAllowed: !this.state.isPairsAllowed})}
					/>
	     	

	     	<Button title="Save" onPress={() => this.props.onSaveRules(this.state.isPairsAllowed)} />
	     	</Card>

	     </Modal>
		);
	}
}