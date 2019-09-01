import { connect } from 'react-redux';
import Login from './Login';
import { UserLogin_onSuccess, UserLogin_onError, UserLogin_logOut } from '../../redux/actions/UserLogin/UserLoginActions';

// const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
  UserLogin_onSuccess: data => {
    dispatch(UserLogin_onSuccess(data));
  },
  UserLogin_onError: data => {
    dispatch(UserLogin_onError(data));
  },
  UserLogin_logOut: data => {
    dispatch(UserLogin_logOut(data));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);