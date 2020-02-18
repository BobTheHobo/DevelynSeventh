import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        margin: 0,
    },
    number: {
        width: 30,
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight:40,
    },
    teacher:{
        flex: 1,
        borderColor: 'grey',
        borderLeftWidth: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
        minHeight: 40, 
    },
    split:{
        flex: 1,
        flexDirection: 'column'
    },
    name:{
        flex: 14,
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    plan:{
        flex: 13,
        textAlignVertical: 'center',
        fontSize: 13,
        margin: 0
    },
    surface:{
        flex:1,
        flexDirection: 'row', 
        alignItems: 'center',
        minHeight: 40,
        elevation: 1,
    },
    full: {
        width: 50,
        margin: 5,
    },
    fullButton: {
        width: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    count: {
        width: 40,
        alignItems: 'flex-end',
        marginEnd: 10
    },
});