import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItems } from '../../actions/ItemActions'
import { Link } from 'react-router-dom'


class Search extends Component {

    state = {
        txt: ''
    }

    onInputChange = (ev) => {
        let { value } = ev.target
        this.setState({ 'txt': value }, () => {
            this.props.loadItems({ 'txt': value })
        })
    }


    render() {
        return (

            <div className="search flex column align-center">
                <input autocomplete="off" onChange={this.onInputChange} type="text" value={this.props.searchBy} placeholder="So what is your look for tonight?" name="txt" ></input>
                <Link to={`/item/${this.state.txt}`}><button>Search</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = {
    loadItems
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
