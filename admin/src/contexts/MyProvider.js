import React, { Component } from 'react';
import MyContext from './MyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { // global state
      // variables
      token: '',
      userName: '',

      rowSelectionModel: [],
      setRowSelectionModel: this.setRowSelectionModel,
      setToken: this.setToken,
      setUserName: this.setUserName,
      SetnotifySuccess: this.SetnotifySuccess,
      SetnotifyWarning: this.SetnotifyWarning,
    };
  }
  setRowSelectionModel = (value) => {
    this.setState({ rowSelectionModel: value });
  }
  setToken = (value) => {
    this.setState({ token: value });
  };
  setUserName = (value) => {
    this.setState({ userName: value });
  };
  SetnotifySuccess = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  SetnotifyWarning = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })



  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MyContext.Provider>
    );
  }
}
export default MyProvider;