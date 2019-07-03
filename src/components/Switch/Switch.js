import React, { Component } from "react";
import MaterialSwitch from "@material/react-switch";
import "./styles.scss";

class Switch extends Component {
    handleChange = ({ target }) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(target.checked);
        }
    };

    render() {
        const { checked } = this.props;
        return <MaterialSwitch className='material-switch' checked={checked} onChange={this.handleChange} />;
    }
}

export default Switch;
