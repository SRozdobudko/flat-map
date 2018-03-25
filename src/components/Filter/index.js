import styles from './Filter.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateFilter} from '../../actions';
import Select from '../Select';



class Filter extends Component {

  handleUpdateValue(field) {
    this.props.dispatch(updateFilter(field));
  }

  render() {
    const {filter, dictionary} = this.props;
    const districts = this.props.defaultDistricts;

    return (
      <div className={styles.root} styles={{height: 100}}>
        <form>
          <div className={styles.top}>
            <Select emptyLabel="тип жилья"
                    name="type_id"
                    multiple
                    defaultValue={filter.type_id}
                    onUpdate={this.handleUpdateValue.bind(this)}>
              {dictionary.data.realty.sales.map(item =>
                <option key={item.id} value={item.id} preview={item.shortestName || item.name}>{item.name}</option>
              )}
            </Select>

            <Select emptyLabel="район"
                    name="o_d"
                    multiple
                    disabled={!districts.length}
                    defaultValue={filter.o_d}
                    value={filter.o_d}
                    onUpdate={this.handleUpdateValue.bind(this)}>
              {districts.map(item => {
                return <option key={item.id} value={item.id} preview={item.shortName}>{item.name}</option>;
              })}
            </Select>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state=>state)(Filter);
