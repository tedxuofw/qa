import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBcifW81teeTjgkWTfBklNwiKN_Sdt24RM",
    authDomain: "moonshot-2018-776d2.firebaseapp.com",
    databaseURL: "https://moonshot-2018-776d2.firebaseio.com",
    projectId: "moonshot-2018-776d2",
    storageBucket: "moonshot-2018-776d2.appspot.com",
    messagingSenderId: "32987968451"
};
firebase.initializeApp(config);
export default firebase;