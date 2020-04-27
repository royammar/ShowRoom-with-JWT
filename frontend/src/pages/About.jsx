import React, {Component} from 'react';
import { connect } from 'react-redux'

class About extends Component{

    render(){
        return(
            <div>
                About
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        //state
    };
};

const mapDispatchToProps = {
    //functions
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About);
