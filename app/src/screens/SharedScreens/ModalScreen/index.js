import React, {Component} from 'react';
import { View, Button, Alert } from 'react-native'
import { Portal, Text, Provider } from 'react-native-paper';
import Modal from '../../../components/NavigationComponents/Modal'
import styles from './styles'

class ModalScreen extends Component {
    state = { showConfirmation: false };
  
    handleSubmit = value => {
      this.setState({ showConfirmation: true, value: value });
    };
  
    // Handler for when the user confirms their choice in the modal
    handleConfirm = () => {
      // …
    };
  
    // Handler for when the user cancels the confirmation dialog
    handleCancel = () => {
      this.setState({ showConfirmation: false });
    };
    
    yeet = () => {
      Alert.alert("yeet");
    }
  
    render() {
      return (
        <Modal message={'Sign up in ' + this.props.teacherName} confirm={()=>this.yeet()}/>
      );
    }
}

export default ModalScreen