import React, { Suspense }  from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import './index.css';
import App from './App';



i18n
.use(initReactI18next)
.use(LanguageDetector)
.use(HttpApi)
.init({
  supportedLngs:['en','bn','fr','ar'],
  // resources: {
  //   en: {
  //     translation: {
  //       "Welcome to React": "Welcome to React and react-i18next"
  //     }
  //   },
  //   bn: {
  //     translation: {
  //       "Welcome to React": "রিয়েক্ট প্রোজেক্ট এ আপনাকে স্বাগতম"
  //     }
  //   }
  // },
  // lng: document.querySelector("html").lang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['path','cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'querystring', 'subdomain'],
    caches: ['localStorage', 'cookie'],
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/translation.json',
  },
  // react:{
  //   useSuspense: false
  // }
});

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
  );

reportWebVitals();
