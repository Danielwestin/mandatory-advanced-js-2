import React from 'react';
import MaterialIcon from 'material-icons-react';
import ReactDOM from 'react-dom';




class Add extends React.Component {

  render(){
    return ReactDOM.createPortal(
      <div className="popup-background">
        <div className="popup">
          <MaterialIcon icon="error" size={75} color="#FFFFFF"/>
          <p>This movie is already deleted</p>
          <button onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>,
      document.querySelector("body")
    )
  }
}
export default Add;
