import cn from './Select.css';
import React, {Component} from 'react';
import without from 'lodash/array/without';
import isEqual from 'lodash/lang/isEqual';
import map from 'lodash/collection/map';
import Checkbox from '../Checkbox';


export default class Select extends Component {
  static propTypes = {};

  static defaultProps = {
    previewCount: 4,
    disabled: false
  };

  constructor(props) {
    super(props);

    let value = props.defaultValue ? props.defaultValue : [];
    value = value.filter(item => {
      const ids = props.children.map(child => child.props.value);
      return ids.indexOf(item) !== -1;
    });

    this.state = {
      opened: false,
      value: value
    };
  }

  componentDidMount() {
    // here must be recursive dom walk
    const dropDownTargets = [
      this.refs.button,
      ...this.refs.button.children,
      this.refs.menu,
      ...this.refs.menu.children,
      ...map(this.refs.menu.children, child => child.children[0]),
      ...map(this.refs.menu.children, child => child.children[0] && child.children[0].children[0]),
      ...map(this.refs.menu.children, child => child.children[0] && child.children[0].children[1])
    ];

    document.addEventListener('click', (e) => {
      if (dropDownTargets.indexOf(e.target) === -1) {
        this.hideMenu();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state.value, prevState.value)) {
      const value = this.props.multiple ? this.state.value : this.state.value[0];
      this.props.onUpdate({
        [this.props.name]: value
      });
    }

    if (!isEqual(this.props.value, prevProps.value)) {
      const value = this.props.value.filter(item => {
        const ids = this.props.children.map(child => child.props.value);
        return ids.indexOf(item) !== -1;
      });

      this.setState({
        value: value
      });
    }
  }

  hideMenu() {
    this.setState({
      opened: false
    });
  }

  showMenu() {
    this.setState({
      opened: true
    });
  }

  toggleMenu() {
    this.state.opened
      ? this.hideMenu()
      : this.showMenu();
  }

  handleClickButton(e) {
    e.preventDefault();
    if(this.props.disabled) {
      return;
    }
    this.toggleMenu();
  }

  handleCLickItem(id) {
    this.selectValue(id);
    this.toggleMenu();
  }

  handleCheckItem(id, e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.value.indexOf(id) === -1) {
      this.selectValue(id);
    } else {
      this.unSelectValue(id);
    }
  }

  unSelectValue(id) {
    this.setState({
      value: without(this.state.value, id)
    });
  }

  selectValue(id) {
    const value = this.props.multiple ? [...this.state.value, id] : [id];
    this.setState({
      value: value
    });
  }

  getValueName(items) {
    const value = items.filter((item) => {
      return this.state.value.indexOf(item.id) !== -1;
    });

    const result = value.length <= this.props.previewCount
      ? value.map(obj => obj.preview).join(', ').trim()
      : `${this.props.emptyLabel} (${this.state.value.length})`;

    return result;
  }

  render() {
    const items = this.props.children.map(child => {
      return {
        id: child.props.value,
        name: child.props.children,
        preview: child.props.preview
      };
    });

    const stateValue = this.state.value.filter(item => item !== undefined);
    const disabledStyle = this.props.disabled ? {
      background: '#eee'
    } : {};

    return (
      <div className={cn.root} style={this.props.style} ref="root">
        <select className={cn.select}>
          {this.props.children}
        </select>

        <a className={cn.button}
                disabled={this.props.disabled}
                onClick={this.handleClickButton.bind(this)}
                ref="button"
                style={{...this.props.buttonStyle, ...disabledStyle}}>
          <span style={{marginRight: 5}}>
            {stateValue.length > 0 ? this.getValueName(items) : this.props.emptyLabel}
          </span>
        </a>

        <ul className={cn.menu}
            ref="menu"
            style={{display: this.state.opened ? 'block' : 'none', ...this.props.menuStyle}}>
          {items.map(item => {
            return this.props.multiple ?
              <li key={item.id}
                  onClick={this.handleCheckItem.bind(this, item.id)}>
                <Checkbox checked={this.state.value.indexOf(item.id) !== -1}>
                  {item.name}
                </Checkbox>
              </li> :
              <li key={item.id}
                  onClick={this.handleCLickItem.bind(this, item.id)}>
                {item.name}
              </li>;
          })}
        </ul>
      </div>
    );
  }
}
