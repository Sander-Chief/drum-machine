import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

// drum arrays
const drumOne = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Heater-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Heater-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Heater-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Heater-4_1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Heater-6',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Dsc_Oh',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: 'Kick n Hat',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Cev H2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
	},
];

const drumTwo = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Chord-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Chord-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Chord-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Light',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Dry Ohh',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Bld H1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: 'Punchy Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Side Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Brk Snr',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
	},
];

// Redux
const defaultState = {
	display: 'standby',
	drumSet: drumOne,
};

const displayAction = val => {
	return {
		type: 'DISPLAY',
		value: val,
	};
};

const drumSetAction = () => {
	return {
		type: 'DRUMCHANGE',
	};
};

const displayReducer = (state = defaultState.display, action) => {
	if (action.type === 'DISPLAY') {
		return action.value;
	} else {
		return state;
	}
};

const drumSetReducer = (state = defaultState.drumSet, action) => {
	if (action.type === 'DRUMCHANGE' && state === drumOne) {
		return drumTwo;
	} else if (action.type === 'DRUMCHANGE' && state === drumTwo) {
		return drumOne;
	} else {
		return state;
	}
};

const rootReducer = combineReducers({
	displayReducer,
	drumSetReducer,
});

const store = createStore(rootReducer);

const mapStateToProps = state => {
	return {
		display: state.displayReducer,
		drumSet: state.drumSetReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		newDisplay: display => dispatch(displayAction(display)),
		newDrumSet: drumSet => dispatch(drumSetAction(drumSet)),
	};
};

store.subscribe(() => console.log(store.getState()));

// React
class Btn extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKey);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKey);
	}

	handleKey = e => {
		if (e.keyCode === this.props.keyCode) {
			this.playSound();
		}
	};

	playSound = () => {
		let sound = document.getElementById(this.props.keyTrigger);
		sound.currentTime = 0;
		sound.play();
		this.props.newDisplay(this.props.id);
	};

	handleClick = e => this.playSound(e);

	render() {
		return (
			<div
				className='btn btn-primary drum-pad'
				id={this.props.id}
				onClick={this.handleClick}
			>
				{this.props.keyTrigger}
				<audio
					className='clip'
					id={this.props.keyTrigger}
					src={this.props.src}
				/>
			</div>
		);
	}
}

const Button = connect(
	null,
	mapDispatchToProps
)(Btn);

class BtnTbl extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const drumArr = this.props.drumSet.map((drumObj, i) => {
			return (
				<Button
					keyCode={drumObj.keyCode}
					id={drumObj.id}
					src={drumObj.url}
					keyTrigger={drumObj.keyTrigger}
					key={i}
				/>
			);
		});

		return <div id='buttons'>{drumArr}</div>;
	}
}

const ButtonTable = connect(
	mapStateToProps,
	mapDispatchToProps
)(BtnTbl);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
		};
	}

	switchSet = () => {
		this.props.newDrumSet();
	};

	render() {
		return (
			<div id='drum-machine'>
				<p id='display'>{this.props.display}</p>
				<ButtonTable />
				<div id='switch' className='btn btn-warning' onClick={this.switchSet}>
					Set
				</div>
			</div>
		);
	}
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

class AppWrapper extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Container />
			</Provider>
		);
	}
}

ReactDOM.render(<AppWrapper />, document.getElementById('app'));

module.hot.accept();
