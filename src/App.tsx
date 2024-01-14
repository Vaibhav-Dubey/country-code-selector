import CountryCode from './CountryCode';
import countries from './assets/countries.json'

function App() {
  return (
    <div>
     <CountryCode countries={countries} />
    </div>
  );
}

export default App;
