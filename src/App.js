import React from 'react';
import './css/App.css';
import Restaurant from './components/Restaurant';
import firebase from '@firebase/app';
import '@firebase/firestore';
import config from './config.json';

firebase.initializeApp(config);
var database = firebase.firestore();

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            rsts: []
        }
    }

    componentDidMount() {
        database.collection('restaurants').onSnapshot(s => {
            this.setState({rsts: s.docs.map(r => r.data())});
        });
    }

    submit(e) {
        e.preventDefault();
        var form = e.target.elements;
        database.collection('restaurants').doc(form.name.value).set({
            name: form.name.value,
            type: form.type.value,
            food: form.food.value.split(','),
            cost: parseInt(form.cost.value)
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit.bind(this)}>
                    Name: <input type="text" name="name" /><br/><br/>
                    Type: <input type="text" name="type" /><br/><br/>
                    Food: <input type="text" name="food" /><br/>
                    Cost: <span id="costs">
                        <input type="radio" name="cost" id="cost5" value={5} required />
                        <label htmlFor="cost5">$</label>
                        <input type="radio" name="cost" id="cost4" value={4} required />
                        <label htmlFor="cost4">$</label>
                        <input type="radio" name="cost" id="cost3" value={3} required />
                        <label htmlFor="cost3">$</label>
                        <input type="radio" name="cost" id="cost2" value={2} required />
                        <label htmlFor="cost2">$</label>
                        <input type="radio" name="cost" id="cost1" value={1} required defaultChecked />
                        <label htmlFor="cost1">$</label>
                    </span>
                    <button type="submit">Submit</button>
                </form>

                <div>{this.state.rsts.map(r => <Restaurant {...r} key={r.name} />)}</div>
            </div>
        )
    }
}

export default App;
