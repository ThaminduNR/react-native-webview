import React, { useEffect, useState } from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WebViewForm from './WebViewForm';
import messaging from '@react-native-firebase/messaging';

function App() {


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);



  const [showWebView, setShowWebView] = useState(false);

  const openWebView = () => {
   setShowWebView(true);
   
  }

  return (
    <View style={styles.container}>    
     <TouchableOpacity onPress={openWebView}>
        <Text style={styles.text}>Open WebView</Text>
     </TouchableOpacity>
      {showWebView && <WebViewForm />}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    
    width: 200,
    height: 50,
  },

});

export default App;
