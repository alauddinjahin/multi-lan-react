import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "flag-icon-css/css/flag-icons.min.css"
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { BsGlobe } from "react-icons/bs"
import cookies from 'js-cookie';
import { useEffect } from 'react';



const languages = [
  {
    code: 'en',
    name:'English',
    country_code:'gb',
  },
  {
    code: 'bn',
    name:'বাংলাদেশ',
    country_code:'bd',
  },
  {
    code: 'ar',
    name: 'العربية',
    country_code:'sa',
    dir: 'rtl',
  },
  {
    code: 'fr',
    name:'Francais',
    country_code:'fr',
  },
];

function App() {

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

  const { t } = useTranslation();
  const releaseDate = new Date("2021-03-07");
  const timeDiff = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title    = t('app_title')
  }, [currentLanguage, t])

  return (
    <div className="App">
      <h2>{t('welcome_message')}</h2>
      <p>{t('days_since_release', { number_of_days })}</p>

      <DropdownButton
        variant="link"
        title={<BsGlobe/>}
        id="input-group-dropdown-1"
      >
        <Dropdown.Item>
        <span>{t('language')}</span>
        </Dropdown.Item>
        {
          languages.map(({code, name, country_code})=>(
            <Dropdown.Item key={country_code} 
            onClick={() => i18next.changeLanguage(code)}
              disabled={code === currentLanguageCode}
            >
              <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
              {name}</Dropdown.Item>
          ))
        }
      </DropdownButton>
    </div>
  );
}

export default App;
