import React from 'react';
import MaterialIcon from 'material-icons-react';
import ReactDOM from 'react-dom';




class Add extends React.Component {
  constructor(props) {
    super(props);
  }



  render(){
    return ReactDOM.createPortal(
      <div className="background">
        <div className="popup">
          <MaterialIcon icon="error"/>
          <button onClick={this.props.closePopup}> Cancel </button>
        </div>
      </div>,
      document.querySelector("body")
    )
  }
}
export default Add;
