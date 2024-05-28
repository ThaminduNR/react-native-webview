import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';


const WebViewForm = () => {
  const webviewRef = useRef(null);
  const [token, setToken] = useState(''); 
  const [canGoBack, setCanGoBack] = useState(false);
  const [navState, setNavState] = useState(null);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token:', token);
    setToken(token);
  };

  useEffect(() => {
    getToken();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navState && navState.canGoBack) {
        webviewRef.current.goBack();
        return true; 
      }
      return false; 
    });

    return () => backHandler.remove();
  }, [navState]);

  const handleNavigationStateChange = (newNavState) => {
    setNavState(newNavState);
    setCanGoBack(newNavState.canGoBack);
  };



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
        onNavigationStateChange={handleNavigationStateChange}
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
