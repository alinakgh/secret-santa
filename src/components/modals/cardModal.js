import React from 'react';
import {DatePickerIOS, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, Card, CheckBox, Divider, Icon, List, ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';
import Collapsible from 'react-native-collapsible'; 

import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import {getBudgetText} from './../helperFunctions'

const currencies = [
	{
		abv: "GBP",
		label: "British Pound"
	},
	{
		abv: "EUR",
		label: "Euro"
	}
]

const picturesArr = [
	{id: 0, label: 'Christmas theme'},
	{id: 1, label: 'Party theme'},
	{id: 2, label: 'Custom'},
];

export default class CardModal extends React.Component {
	state = {
		input: {
			title: '',
			date: new Date(),
			currency: "GBP",
			budget: 10,
			pictureOption: 0
		},

		isVisible: {
			datePicker: false,
			currencyPicker: false,
			pictureChoice: false
		}
	}

	componentDidMount() {
		if(this.props.currentCard !== undefined) {
			this.setState({input : {
				title: this.props.currentCard.title,
				date: new Date(Date.parse(this.props.currentCard.date)),
				currency: this.props.currentCard.currency,
				budget: this.props.currentCard.budget,
				pictureOption: this.props.currentCard.pictureOption
			}})
		}
	}

	_setTitle = (title) => {
		this.setState({input: {
			...this.state.input,
			title: title
		}});
	}

	_setDay = (date) => {
		// this might prove annoying
		if(date > new Date()) {
			this.setState({input: {
				...this.state.input,
				date: date
			}});
		}
	}

	// only be able to input digits - some sort of validation
	_setBudget = (text) => {
		this.setState({input: {
			...this.state.input,
			budget: parseInt(text)
		}});
	}

	_setPictureOption = (idx) => {
		this.setState({input: {
			...this.state.input,
			pictureOption: idx
		}});
	}

	_setCurrency = (currency) => {
		this.setState({input: {
			...this.state.input,
			currency: currency
		}});
	}

	_addToBudget = (diff) => {
		newBudget = this.state.input.budget + diff;
		if(newBudget < 0) 
			newBudget = 0;
		this.setState({input: {
			...this.state.input,
			budget: newBudget
		}});

		interval = 100;

		this.timer = setTimeout(() => this._addToBudget(diff), interval);
	} 

	timer = null;

	_stopTimer() {
    clearTimeout(this.timer);
  }

	_getAddingIcon = (iconName, addingAmount) => {
		
		return(
			<TouchableOpacity 
				onPressIn={() => this._addToBudget(addingAmount)} 
				onPressOut={() => this._stopTimer()}>

				<Icon name={iconName} type='entypo' size={35}/>

			</TouchableOpacity>
		);
	}


	_showCurrencyPicker = () => {
		getFullLabel = (currency) => {
			return currency.label.concat(" (", getSymbolFromCurrency(currency.abv), ")");
		} 	

		return (
			<Card containerStyle={styles.cardNoMargin}> 
				<TouchableOpacity style={styles.cardContent} onPress={this._toggleCurrencyPicker}>
	  			<Icon name='price-tag' type='entypo' />
	  		<Text> {getBudgetText(this.state.input.budget, this.state.input.currency)} </Text>
	  		</TouchableOpacity>

	  		<Collapsible collapsed={!this.state.isVisible.currencyPicker}>
				  <View style={{paddingTop: 30}}>
						<View style={styles.budgetAdjust}>
							
							{this._getAddingIcon("minus", -1)}

							<View style={styles.budgetView}> 
		          	<Text size='20' 
		          				style={{textAlign: 'center', fontSize: 18}}> 
		          				{ this.state.input.budget} 
		          	</Text>
		          </View>
		          
		          {this._getAddingIcon("plus", 1)}

		          <Divider />
			      </View>

						<Picker
							selectedValue={this.state.input.currency}
		  				onValueChange={(itemValue, itemIndex) => this._setCurrency(itemValue)}>

		  				{
		  					currencies.map((currency, i) => (
		  						<Picker.Item key={currency.abv} label={getFullLabel(currency)} value={currency.abv} />
		  					))
		  				}

						</Picker>
		      </View>
				</Collapsible>
			</Card>
		);
	}

	_showDatePicker = () => {
		return(
			<Card containerStyle={styles.cardNoMargin}> 
  			<TouchableOpacity style={styles.cardContent} onPress={this._toggleDatePicker}>
      		<Icon name='calendar' type='entypo'  />
      		<Text> {moment(this.state.input.date).format("DD MMM YYYY")}</Text>
					
    		</TouchableOpacity>
    		
    		<Collapsible collapsed={!this.state.isVisible.datePicker}>
    			<DatePickerIOS
	          date={this.state.input.date}
	          onDateChange={this._setDay}
	          mode='date'
	        />
  			</Collapsible>
		  </Card>
		);
	}

	_showPictureChoice = () => {
		// swapping card and touchable opacity might make it more responsive to click 

		isCustom = (idx) => {
			if(idx === 2) {
				return(
					<Icon name='camera' type='entypo' />
				);
			}
		}

		return(
			<Card containerStyle={styles.cardNoMargin}> 
				<TouchableOpacity style={styles.cardContent} onPress={this._togglePictureChoice}>
	  			<View>
	    			<Icon name='picture-o' type='font-awesome' />
	    		</View>
	    		<Text> {picturesArr[this.state.input.pictureOption].label} </Text>
	  		</TouchableOpacity>

	  		<Collapsible collapsed={!this.state.isVisible.pictureChoice}>
	  			<View>
						{
							picturesArr.map((pic, i) => (
								<Card containerStyle={{marginLeft: 0, marginRight: 0}} key={pic.id}>
									<TouchableOpacity onPress={() => this._setPictureOption(i)}
										style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}> 
										<Text> {pic.label} </Text>
										{isCustom(i)}
									</TouchableOpacity>
								</Card>
							))
						}
					</View>
	  		</Collapsible>
			</Card>
		);
	}


	_setVisibility= (datePicker, currencyPicker, pictureChoice) => {
		this.setState({isVisible : {
			datePicker: datePicker,
			currencyPicker: currencyPicker,
			pictureChoice: pictureChoice
		}});
	}

	_toggleDatePicker = () => {
		newValue = !this.state.isVisible.datePicker;
		this._setVisibility(newValue, false, false);
	}

	_toggleCurrencyPicker = () => {
		newValue = !this.state.isVisible.currencyPicker;
		this._setVisibility(false, newValue, false);
	}

	_togglePictureChoice = () => {
		newValue = !this.state.isVisible.pictureChoice;
		this._setVisibility(false, false, newValue);
	}

	_onAddCard = () => {
		newCard = {
			title: this.state.input.title,
			pictureOption: this.state.input.pictureOption,
			budget: this.state.input.budget,
			currency: this.state.input.currency,
			date: moment(this.state.input.date).format("DD MMM YYYY"),
		}

		this.props.onSaveChanges(newCard);
		this.props.onDismiss();
	}

	render() {
		if(!this.props.isVisible) {
			return (<View></View>);
		}

		getTitleValue = () => {
			if(this.state.input.title.length > 0) {
				return this.state.input.title;
			} 
			return '';
		}

		return (
			<View style={{flex:1}}>
	      <Modal 
	      	style={styles.bottomModal}
	      	isVisible={this.props.isVisible}
	      	onBackdropPress={this.props.onDismiss()}
	      	supportedOrientations={['portrait', 'landscape']}
	      	//backdropColor='red'
	      	animationInTiming={200}
	      	animationOutTiming={200}> 

	      	<Card>
		      	<ScrollView>
		      		<Card containerStyle={styles.cardNoMargin}> 
				      		<TextInput 	
				      			placeholder="Title (optional)"
				      			value={getTitleValue()}
			            	onChangeText={(text) => this._setTitle(text)}/>
			      	</Card>

			      	{this._showPictureChoice()}

		      		{this._showDatePicker()}

			      	{this._showCurrencyPicker()}
		      		
		      	
		      	</ScrollView>
	      	</Card>
	      	<Button
					  large
						onPress={() => this._onAddCard()}
						//containerViewStyle={{width: '100%', marginLeft: 0}}
						title={this.props.buttonText}
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

  cardNoMargin: {
  	marginLeft: 0, 
  	marginRight: 0,
  },

  budgetAdjust: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  },

  budgetView: {
  	marginLeft: 10,
  	marginRight: 10,
  	alignSelf: 'center',
  	width: 50,
  	marginBottom: 0,
  },
  cardContent: {
  	//flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  }
});