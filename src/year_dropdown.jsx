import React from "react";
import PropTypes from "prop-types";
import YearDropdownOptions from "./year_dropdown_options";
import onClickOutside from "react-onclickoutside";
import { getYear, minYearByCalendar, maxYearByCalendar } from "./date_utils";

var WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions);

export default class YearDropdown extends React.Component {
  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired,
    yearDropdownItemNumber: PropTypes.number,
    date: PropTypes.object,
    onSelect: PropTypes.func,
    setOpen: PropTypes.func,
    calendar: PropTypes.string
  };

  state = {
    dropdownVisible: false
  };

  renderSelectOptions = () => {
    const minYear = minYearByCalendar(this.props.minDate, this.props.calendar);
    const maxYear = maxYearByCalendar(this.props.maxDate, this.props.calendar);

    const options = [];
    for (let i = minYear; i <= maxYear; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  onSelectChange = e => {
    this.onChange(e.target.value);
  };

  renderSelectMode = () => (
    <select
      value={this.props.year}
      className="react-datepicker__year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = visible => (
    <div
      key="read"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__year-read-view"
      onClick={event => this.toggleDropdown(event)}
    >
       <div
        style={{
          borderWidth: "3px 3px 0 0",
          borderStyle: "solid",
          borderColor: "#ccc",
          transform: "rotate(135deg)",
          height: "9px",
          width: "9px",
          marginLeft: this.props.calendar === "hijri" ? 0 : 6,
          marginRight: this.props.calendar === "hijri" ? 6 : 0,
        }}
      />
      {/* <span className="react-datepicker__year-read-view--down-arrow" />
      <span className="react-datepicker__year-read-view--selected-year">
        {this.props.year}
      </span> */}
    </div>
  );

  renderDropdown = () => (
    <WrappedYearDropdownOptions
      key="dropdown"
      ref="options"
      year={this.props.year}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
      minDate={this.props.minDate}
      maxDate={this.props.maxDate}
      scrollableYearDropdown={this.props.scrollableYearDropdown}
      yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      calendar={this.props.calendar}
    />
  );

  renderScrollMode = () => {
    const { dropdownVisible } = this.state;
    let result = [this.renderReadView(!dropdownVisible)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown());
    }
    return result;
  };

  onChange = year => {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  };

  toggleDropdown = event => {
    this.setState(
      {
        dropdownVisible: !this.state.dropdownVisible
      },
      () => {
        if (this.props.adjustDateOnChange) {
          this.handleYearChange(this.props.date, event);
        }
      }
    );
  };

  handleYearChange = (date, event) => {
    this.onSelect(date, event);
    this.setOpen();
  };

  onSelect = (date, event) => {
    if (this.props.onSelect) {
      this.props.onSelect(date, event);
    }
  };

  setOpen = () => {
    if (this.props.setOpen) {
      this.props.setOpen(true);
    }
  };

  render() {
    let renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return (
      <div
        className={`react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--${
          this.props.dropdownMode
        }`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
