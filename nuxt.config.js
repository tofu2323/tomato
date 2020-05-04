export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1.0",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "stylesheet",
        href:
          "cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxt/typescript-build",
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "@nuxtjs/firebase",
  ],
  firebase: {
    config: {
      production: {
        apiKey: "AIzaSyBmc-XcKWtxmsrIZulfxHpShYpVlrDZs2g",
        authDomain: "tomato-pr.firebaseapp.com",
        databaseURL: "https://tomato-pr.firebaseio.com",
        projectId: "tomato-pr",
        storageBucket: "tomato-pr.appspot.com",
        messagingSenderId: "593068855406",
        appId: "1:593068855406:web:5e7180ba1eec1e42aa567f",
        measurementId: "G-X6MEXT69VF",
      },
      development: {
        apiKey: "AIzaSyAOfX83RcsdmECQICH3nct0C_c3g59-Li0",
        authDomain: "tomato-g.firebaseapp.com",
        databaseURL: "https://tomato-g.firebaseio.com",
        projectId: "tomato-g",
        storageBucket: "tomato-g.appspot.com",
        messagingSenderId: "255370996664",
        appId: "1:255370996664:web:10b978d9ec9d5e1050fd4d",
        measurementId: "G-2KPV98LFC3",
      },
    },
    // customEnv: false,
    // onFirebaseHosting: false,
    services: {
      auth: true,
      // auth: {
      // persistence: 'local',
      // initialize: {
      //   onAuthStateChangedMutation: "SET_AUTH_USER",
      //   onAuthStateChangedAction: null,
      // },
      // ssr: {
      //   // !! NEVER deploy a service account file to github or to a publicly accessible folder on your server !!
      //   credential: '~/assets/firebase/serviceAccount.json',
      //   ignorePaths: [
      //     '/api/',
      //     // /[^/]+/sub-path\//
      //   ],
      //   // Experimental Feature, use with caution.
      //   serverLogin: {
      //     sessionLifetime: 60 * 60 * 1000, // one hour
      //     loginDelay: 50 // minimal recommended delay
      //   }
      // },
      firestore: true,
      // functions: {
      //   location: 'us-central1', // Default
      //   emulatorPort: 12345
      // },
      // storage: true,
      // realtimeDb: true,
      // performance: true,
      analytics: true,
      // remoteConfig: {
      //   settings: {
      //     fetchTimeoutMillis: 60000, // Default
      //     minimumFetchIntervalMillis: 43200000 // Default
      //   },
      //   defaultConfig: {
      //     welcome_message: "Welcome"
      //   }
      // },
      // messaging: {
      //   createServiceWorker: true
      // }
      // }
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
