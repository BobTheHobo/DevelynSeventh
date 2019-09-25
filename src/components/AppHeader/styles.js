import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#f9f9f9',
    shadowColor: 'black',
    shadowOpacity: 3,
    elevation: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  title: {
    flex: 9,
    fontSize: 20,
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
  },
  profileImgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButton: {
    marginLeft: 10,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    alignItems: 'center'
  },
  subtitleText: {
    color: '#ddd'
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 20
  }
});