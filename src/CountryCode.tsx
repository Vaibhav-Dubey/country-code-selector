import React, {useState, CSSProperties} from 'react'

import './CountryCode.css'

const CountryCode : React.FC<{countries: Record<string, { id: string; name: string; calling_code: string; phone_length: string }> }> = ({ countries }) =>{
    const [countryPhoneMask, setCountryPhoneMask] = useState("(000)-000-0000")
    const [countryFlagCode, setCountryFlagCode] = useState("IN")
    const [countryCallingCode, setCountryCallingCode] = useState("+91")
    const [countryName, setCountryName] = useState("")
    const [countryList, setCountryList] = useState(Object.keys(countries))
    const [maxLength, setMaxLength] = useState(10)
    const [style, setStyle] = useState<CSSProperties>({visibility: 'hidden'})

    const findKeyByValue = (obj: Record<string, any>, targetValue: any): string => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
            return key;
          }
        }
        return "null";
      };
      const onChangeCountryCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryName(e.target.value)
        setCountryList(Object.keys(countries).filter((country) => countries[country].name.toLowerCase().includes(e.target.value.toLowerCase())))
      }

      const handleOnClickCountryCode = () => {
        if(style.visibility === 'hidden'){
          setStyle({visibility: 'visible'})
        }
        else{
          setStyle({visibility: 'hidden'})
        }
      }

    // OnClick Function
    const changeCode = (c: { id: string; name: string; calling_code: string; phone_length: string }) => {
        setStyle({visibility: 'hidden'})
        setMaxLength(parseInt(c.phone_length))
        setCountryFlagCode(findKeyByValue(countries, c));
        setCountryCallingCode(c.calling_code);
        if(parseInt(c.phone_length) >7){
            const localPart = "0".repeat(parseInt(c.phone_length) - 6)
            const phoneMask = `(000)-000-${localPart}`;
            setCountryPhoneMask(phoneMask);
        }
        else{
            const localPart = "0".repeat(parseInt(c.phone_length)- 3)
            const phoneMask = `(000)-${localPart}`;
            setCountryPhoneMask(phoneMask);
        }
        setCountryName("")
    }
  return (
    <div id="app" className="wrapper">
  <div className="title">
  </div>
    <div className="container">
      <div className="card">
        <div className="phone-block">
          <input type="tel" placeholder={countryPhoneMask} maxLength={maxLength}/>
          <div className="phone" onClick={handleOnClickCountryCode}>  <span className='flag'><img alt='' src={`https://flagsapi.com/${countryFlagCode}/shiny/16.png`}/></span>{countryCallingCode}
            <div className="list-code" style={style}>
              <div className="scroll-block">
              <ul>
                <li>
                <div className="pn-search">
                  {/* Search SVG ICON - Magnifying Glass */}
                      {/* <svg className="pn-search__icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#103155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line> */}
                      {/* </svg> */}
                      <input placeholder="Search for countries" value={countryName} className="pn-search__input search" type="search" autoComplete='nope' onChange={onChangeCountryCode} />
                    </div>
                  </li>
                {countryList.map((countryCode) => {
                     const c = countries[countryCode];
                     return(
                    <li key={c.id} onClick={() => changeCode(c)} className="countryList">
                      <div>
                        <img alt='' src={`https://flagsapi.com/${countryCode}/shiny/32.png`} />
                      </div>
                      <div>
                        {c.name}
                      </div>
                      <div>
                        {c.calling_code}
                      </div>
                    </li>
                     )
                })}
              </ul>
              </div>
            </div>
          </div>
        </div>
        <button className="round" style={{marginTop: '3%'}}>Submit</button>
      </div>
    </div>
</div>
  )
}

export default CountryCode;
