import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment-hijri";

export default class ClearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">{`
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange }
  isClearable={true}
  placeholderText="I have been cleared!"
  calendar="hijri"
/>
`}</code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            isClearable
            placeholderText="I have been cleared!"
            calendar="hijri"
          />
        </div>
      </div>
    );
  }
}
