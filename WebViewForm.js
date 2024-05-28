import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
// import Snackbar from 'react-native-snackbar';


const WebViewForm = () => {
  const webviewRef = useRef(null);
  const [token, setToken] = useState(''); 

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token:', token);
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);



  const handleMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Message from webView:', data);

    if (data?.type === 'LOGIN') {
      webviewRef.current.postMessage(
        JSON.stringify({type: 'FCM_TOKEN', payload: token}),
      );
     
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://shopping-demo.surge.sh?type=mobile`,
        }}
        ref={webviewRef}
        onMessage={handleMessage}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default WebViewForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
