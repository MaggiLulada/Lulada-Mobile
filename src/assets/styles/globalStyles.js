import { Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const { colors } = useTheme;
export const styles = StyleSheet.create({

    // ============================ Containers ============================= //

    container: {
        flex: Platform.OS === "ios" ? 1 : 0,
        alignItems: "center",
        justifyContent: 'space-around',
    },
    containerPrincipal: {
        flex: 1,
        justifyContent: 'space-between',
    },
    containerRow: {
        width: '85%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
    },
    containerSmall: {
        alignItems: "center",
    },
    containerOnboarding: {
        flex:1, 
        paddingTop: Platform.OS === 'ios' ? '10%' : '5%',
        backgroundColor: '#fff',
    },
    containerScrollViewHorizontal:{
        marginTop:'5%',
        marginBottom:'5%',
    },

    // ============================ Fonts ============================ //

    headline: {
        fontFamily: "Montserrat-Bold",
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontSize:  30,
        textAlign:'auto',
        textAlignVertical:'auto',
        marginTop: Platform.OS === 'android' ? '12%' : '5%',
        marginBottom: Platform.OS === 'android' ? '6%' : '10%',
    },
    headlineWhite: {
        fontWeight: "bold",
        fontSize:  45 ,
        color:'#ffffff',
        textAlign:'center'
    },
    textWhite:{
        color:'#ffffff',
        fontSize: 22,
    },
    textGray: {
        fontSize:19,
        color:'#828282',
    },
    captionCenter:{
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 13,
    },

    // ============================ Colors ============================ //

    white: {
        color:'#fff',
    },
    // ============================ Widgets ============================ //

    activityIndicator: {
        alignItems: "center",
        height: 120,
    },

    logoWelcome: {
        width: Platform.OS === "ios" ? '80%' : '70%',
        resizeMode: "contain",
    },

    // ============================ Inputs ============================ //
    input: {
        backgroundColor: '#fff',
        fontSize: 16,
    },
    // ============================ Input Code Number ============================ //
    codeFieldRoot: {
        marginTop: 8,
    },
    cellRoot: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#FFBA00',
        borderBottomWidth: 2,
    },
    // ============================ Buttons ============================ //
    buttonRoundLarge: {
        width: Platform.OS === 'android' ? 250 : 300,
        height: Platform.OS === 'android' ? 250 : 300,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        borderRadius: 200,
    },
    buttonAddImage:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignItems:'center',
        width:230,
        height:230,
        marginTop: '15%',
        borderWidth: 2,
        borderColor: '#9B9B9B',
        borderStyle: 'dashed',
        borderRadius: 10,
    },

    buttonSecondaryAddImage:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignItems:'center',
        width: Platform.OS  === 'ios' ? 240 : 220,
        height: Platform.OS  === 'ios' ? 240 : 220, 
        marginTop: '1%',
        borderWidth: 2,
        borderColor: '#9B9B9B',
        borderStyle: 'dashed',
        borderRadius: 10,
    },
    // ============================ Images ============================ //

    avatarLarge: {
        width: Platform.OS === 'android' ? 200 : 220,
        height: Platform.OS === 'android' ? 200 : 220,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        borderRadius: 200,
    },
    avatarMedium: {
        width: Platform.OS === 'android' ? 120 : 150,
        height: Platform.OS === 'android' ? 120 : 150,
        borderRadius: 200,
    }
})