import authInfo from '../../auth_config.json';

export const environment = {
  production: true,
  apiUrl: 'http://52.231.35.207/dev/v1',
  apiNewUrl: 'https://hanul.koreacentral.cloudapp.azure.com/hanul/prod/',
  auth: {
    domain: authInfo.domain,
    clientId: authInfo.clientId,
    redirectUri: window.location.origin,
    audience: authInfo.audience,
  },
  dev: {
    serverUrl: authInfo.serverUrl,
  },
  firebaseConfig : {
    apiKey: "AIzaSyD3M9as-O7tgpnZmuEa4a-FLLrS1SH_NOw",
    authDomain: "hanul-mobile.firebaseapp.com",
    projectId: "hanul-mobile",
    storageBucket: "gs://hanul-mobile.appspot.com",
    messagingSenderId: "413943940947",
    appId: "1:413943940947:web:b1d8892cf0f3fa4eff03a6",
    measurementId: "G-D2RLCNT0XT"
  },
  firebaseConfigTest: {
    apiKey: 'AIzaSyD_jk9wxqrtLfkBxYrtvozxF4m4d8xFdyE',
    authDomain: 'upload-image-hanul.firebaseapp.com',
    projectId: 'upload-image-hanul',
    storageBucket: 'upload-image-hanul.appspot.com',
    messagingSenderId: '595753935663',
    appId: '1:595753935663:web:19a650620530d6206d37da',
    measurementId: 'G-S9BPVK3SGJ',
  },

};
