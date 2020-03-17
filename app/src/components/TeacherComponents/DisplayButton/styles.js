import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 60,
        margin: 0,
    },
    name: {
        flex: 10,
        marginLeft: 10,
        alignItems: 'flex-start', 
        justifyContent: 'center',
        height:60,
    },
    nameSplit:{
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 60,
    },
    signedUpInText:{
        width: 100,
        flexDirection: 'row',
    },
    requiredByText:{
        width: 100,
        flexDirection: 'column',
    },
    surface:{
        flex:1,
        //margin:5,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 60,
        elevation: 1,
    },
    presentButton:{
        flex: 1.2,
        margin: 6,
    },
    lateButton:{
        flex: 1.2,
        margin: 6
    },
    absentButton:{
        flex: 1.2,
        margin: 6
    },
    requireButton:{
        marginRight: 10,
    }
});