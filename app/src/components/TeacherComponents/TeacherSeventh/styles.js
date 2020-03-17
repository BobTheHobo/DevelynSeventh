import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    flist: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 5,
        marginLeft: 5,
        paddingBottom: 15,
        borderColor: 'grey',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingTop: 10,
    },
    signedUpIn: {
        fontSize: 15,
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        elevation: 1
    },
    label:{
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        marginEnd: 3
    },
    labelText:{
        fontSize: 10,
        marginHorizontal: 6.4
    },
});