import React from 'react';
import TableDisplay from './TableDisplay/TableDisplay';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };

  }
  componentDidMount() {
    this.props.getData();
  }

  onAddRow = (e) => {
    this.props.onAdd(e);
  }

  onDeleteRow = (e) => {
    this.props.onDelete(e);
  }

  showPassword = (e, row) => {
    if (e.target.name === 'show') {

      row.showPassword = true;
      this.setState({showPassword: true});

    } else {
      row.showPassword = false;
      this.setState({showPassword: false});
    }
  }
  render() {

    return (
      <div>

        <TableDisplay
          data={this.props.data}
          onAddRow={this.onAddRow}
          onDeleteRow={this.onDeleteRow}
          show={this.showPassword}
          showPassword={this.state.showPassword}
        />
      </div>
    );
  }
}

export default Home;
