

export default class SimpleComponent {

	state = {
		oneProp: 12
	}

	getTrueState() {
		console.log("in getTrueState");
		this.state.oneProp = 55;
	}

}