import cn from './Checkbox.css';
import React, {Component, PropTypes} from 'react';


export default class Checkbox extends Component {
  static propTypes = {
    style: PropTypes.object,
    checkedValue: PropTypes.number,
    uncheckedValue: PropTypes.number
  };

  static defaultProps = {
    checkedValue: 1,
    uncheckedValue: 0
  };

  handleUpdate(e) {
    this.props.onUpdate({
      [this.props.name]: e.target.checked ? this.props.checkedValue : this.props.uncheckedValue
    });
  }

  render() {
    const { children, style, ...props} = this.props;

    return (
      <label style={style}>
        <input type="checkbox"
               className={cn.checkbox}
               onChange={this.handleUpdate.bind(this)} {...props} />
        <span>{children}</span>
      </label>
    );
  }
}
