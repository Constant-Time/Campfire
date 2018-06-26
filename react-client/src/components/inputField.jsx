import React from 'react';

class InputField extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    	return (
					<div>
            	<textarea id="NewStoryText" rows="5" cols="50" onChange={this.props.handleChange}></textarea>
                <p>Characters Left: {this.props.chars_left}</p>
            </div>
        );
    }
};

export default InputField;
