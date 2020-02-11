import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fafafa'
    },
    headerContainer: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
    },
    infoDisp: {
        flex: 17,
        backgroundColor: '#f0f0f0',
    },
    buttons: {
        flex: 13,
        backgroundColor: '#f0f0f0',
    },
    surface: {
        height: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    text: {
        alignItems: 'center',
        marginTop: 30
    }
});