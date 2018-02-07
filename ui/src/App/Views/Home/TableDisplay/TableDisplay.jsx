import React from 'react';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const TableDisplay = (props) => {

  const TableFormat = {maxWidth: 1000, width: 1000, margin: 'auto', padding: 10};

  const selectRow = {
    mode: 'radio'
    // showOnlySelected: true

  };

  const cellEditProp = {
    mode: 'dbclick',
    blurToSave: true
  };

  const handleDeleteButtonClick = (onClick) =>
    onClick();

  const handleInsertButtonClick = (onClick) =>
    onClick();

  const createCustomDeleteButton = (onClick) => {

    return (
      <DeleteButton
        btnText="Delete"
        btnContextual="btn-warning"
        className="my-custom-class"
        btnGlyphicon="glyphicon-edit"
        onClick={e => handleDeleteButtonClick(onClick)} />
    );
  };

  const createCustomInsertButton = (onClick) => {

    return (
      <InsertButton
        btnText="New"
        btnContextual="btn-primary"
        className="my-custom-class"
        btnGlyphicon="glyphicon-plus"
        onClick={e => handleInsertButtonClick(onClick)} />
    );
  };

  const password = (cell, row) => {

    if (row.showPassword) {
      return (<div >{cell}

        <Button className="pull-right" bsSize="small" name="hide" bsStyle="warning" onClick={(e) => {
          props.show(e, row);
        }}> Hide </Button>
      </div>);
    }

    return (
      <div className="btn-toolbar">
        <CopyToClipboard text={cell}>
          <Button className="pull-right" bsSize="small" name="show" bsStyle="success"> Copy </Button>
        </CopyToClipboard>

        <Button className="pull-right" bsSize="small" name="show" bsStyle="info" onClick={(e) => {
          props.show(e, row);
        }}> Show </Button>

      </div>)
      ;

  };

  const username = (cell, row) => {

    return (<div >{cell}
      <CopyToClipboard text={cell}>
        <Button className="pull-right" bsSize="small" name="show" bsStyle="success"> Copy </Button>
      </CopyToClipboard>
    </div>);
  };

  const updateARow = (row, fieldName, value) => {
    const y = {};
    const x = fieldName;
    y[x] = value;
    row[x] = value;
    props.onAddRow(row);
  };

  const options = {
    deleteBtn: createCustomDeleteButton,
    insertBtn: createCustomInsertButton,
    clearSearch: true,
    exportCSVText: 'Export CVS',
    sizePerPage: 10,
    sizePerPageList: [5, 10, 15, 20],
    onCellEdit: updateARow,
    onAddRow: props.onAddRow,
    onDeleteRow: props.onDeleteRow,
    onExportToCSV: props.onExportToCSV

  };

  return (

    <div className="" style={TableFormat}>
      <BootstrapTable
        options={options}
        search={true}
        pagination
        selectRow={selectRow}
        data={props.data}
        cellEdit={cellEditProp}
        headerStyle={ {background: 'grey'} }
        insertRow
        deleteRow
        exportCSV
        striped
        hover
        condensed
        height={'auto'}
      >

        <TableHeaderColumn
          dataSort={true}
          isKey
          dataField="name"
          tdStyle={ {whiteSpace: 'pre-line'} }
         >
          Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataSort={true}
          editable={{type: 'text'}}
          dataField="username"
         
          dataFormat={username}>
          Username
        </TableHeaderColumn>

        <TableHeaderColumn
          editable={{type: 'text'}}
          dataField="password"
          dataFormat={password}
          width="175"
          tdStyle={ {whiteSpace: 'normal'} }>
          Password
        </TableHeaderColumn>

        <TableHeaderColumn
          dataSort={true}
          editable={false}
          dataField="createOn"
          hiddenOnInsert
          width="115">
          Created On
        </TableHeaderColumn>

        <TableHeaderColumn
          dataSort={true}
          editable={false}
          dataField="updatedOn"
          hiddenOnInsert
          width="115">
          Updated On
        </TableHeaderColumn>

      </BootstrapTable>
    </div>
  );
};

export default TableDisplay;

