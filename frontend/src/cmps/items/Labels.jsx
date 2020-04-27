import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


import { loadItems } from '../../actions/ItemActions'

class Labels extends Component {

    onSelectLabel = (ev) => {
        let { value } = ev.target
        console.log('onSelectLabel1', { 'labels': value });

        this.props.loadItems({ 'labels': value })
    }

    render() {
        return (
            <div className="labels">
                <Link to={`/item/winter`}> <button value="winter" onClick={this.onSelectLabel}>Winter</button></Link>
                <Link to={`/item/boho`}> <button value="boho" onClick={this.onSelectLabel}>Boho</button></Link>
                <Link to={`/item/hipster`}> <button value="hipster" onClick={this.onSelectLabel}>Hipster</button></Link>
                <Link to={`/item/accessories`}> <button value="accessories" onClick={this.onSelectLabel}>Accessories</button> </Link>
                <Link to={`/item/summer`}> <button value="summer" onClick={this.onSelectLabel}>Summer</button> </Link>
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
)(Labels);
