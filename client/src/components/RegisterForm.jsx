//Libraries
import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

//Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

dayjs.extend(customParseFormat);

const RegisterForm = () => {
    //Input states
    const [firstName, setFirstName] = useState({value: '', isValid: false});
    const [lastName, setLastName] = useState({value: '', isValid: false});
    const [username, setUsername] = useState({value: '', isValid: false});
    const [password, setPassword] = useState({value: '', isValid: false});
    const [email, setEmail] = useState({value: '', isValid: false});
    const [phonePrefix, setPhonePrefix] = useState('+387');
    const [phoneNumber, setPhoneNumber] = useState({value: '', isValid: false});
    const [birthDay, setBirthDay] = useState({value: '01', isValid: true});
    const [birthMonth, setBirthMonth] = useState({value: '01', isValid: true});
    const [birthYear, setBirthYear] = useState({value: '2022', isValid: true});

    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [message, setMessage] = useState({msg: '', type: ''});
    
    const isFirstNameValid = () => {
        console.log(firstName);
        if (firstName.value.length < 2 || firstName.value.length > 100) {
            setFirstName({...firstName, isValid: false});
            return setMessage({msg: 'First name must be at least 2 characters long!', type: 'error'});
        }
        for (let counter = 0; counter < firstName.value.length; counter++) {
            const asciiCode = firstName.value.charCodeAt(counter);
            if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                setFirstName({...firstName, isValid: false});
                return setMessage({msg: "First name can only contain letters, space character and symbols (-, .,')!", type: 'error'});
            }
        }
        return setFirstName({...firstName, isValid: true});
    }

    const isLastNameValid = () => {
        if (lastName.value.length < 2 || lastName.value.length > 100) {
            setLastName({...lastName, isValid: false});
            return setMessage({msg: 'Last name must be at least 2 characters long!', type: 'error'});
        }
        for (let counter = 0; counter < lastName.value.length; counter++) {
            const asciiCode = lastName.value.charCodeAt(counter);
            if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                setLastName({...lastName, isValid: false});
                return setMessage({msg: "Last name can only contain letters, space character and symbols (-, .,')!", type: 'error'});
            } 
        }
        return setLastName({...lastName, isValid: true});
    }

    const isUsernameValid = () => {
        if(username.value.length < 2 || username.value.length > 20) {
            setUsername({...username, isValid: false});
            return setMessage({msg: 'Username must be between 2 and 20 characters!', type: 'error'});
        }
        return setUsername({...username, isValid: true});
    }

    const isPasswordValid = () => {
        if (password.value.length < 8) {
            setPassword({...password, isValid: false});
            return setMessage({msg: 'Password must be at least 8 characters long!', type: 'error'});
        }
        return setPassword({...password, isValid: true});
    }

    const isEmailValid = () => {
        const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.value.match(mailRegex)) {
            setEmail({...email, isValid: false});
            return setMessage({msg: 'Email addres is not valid!', type: 'error'});
        }
        return setEmail({...email, isValid: true});
    }

    const isPhoneNumberValid = () => {
        if (phoneNumber.value.length > 0) {
            if (phoneNumber.value.length < 15) {
                for (let counter = 0; counter < phoneNumber.value.length; counter++) {
                const asciiCode = phoneNumber.value.charCodeAt(counter);
                if (!(asciiCode > 47 && asciiCode < 58)) {
                    setPhoneNumber({...phoneNumber, isValid: false});
                    return setMessage({msg: 'Phone number can only contain numbers!', type: 'error'});
                } 
            }
            } else {
                    setPhoneNumber({...phoneNumber, isValid: false});
                    return setMessage({msg: "Phone number can't be longer then 20 characters!", type: 'error'});
                }
        }
        return setPhoneNumber({...phoneNumber, isValid: true});
    }

    const isBirthDateValid = () => {
        if (!dayjs(`${birthYear.value}-${birthMonth.value}-${birthDay.value}`, 'YYYY-MM-DD', true).isValid()) {
            setBirthDay({...birthDay, isValid: false});
            setBirthMonth({...birthMonth, isValid: false});
            setBirthYear({...birthYear, isValid: false});
            return setMessage({msg: "Date you entered is not valid!", type: 'error'});
        }
        setBirthDay({...birthDay, isValid: true});
        setBirthMonth({...birthMonth, isValid: true});
        return setBirthYear({...birthYear, isValid: true});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/register', {
                firstName,
                lastName,
                username,
                password,
                email,
                phonePrefix,
                phoneNumber,
                birthYear,
                birthMonth,
                birthDay
            });
            console.log(res);
            return setMessage({msg: res.data.msg, type: 'success'});
        } catch (err) {
            return setMessage({msg: err.response.data.errorMsg, type: 'error'});  
        }
    }
    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <h2>Registration</h2>
            <div className="formControl">
                <label htmlFor="firstName">First name:*</label>
                <input type="text" name="firstName" id="firstName" className={firstName.value ? (!firstName.isValid ? 'invalidInput' : undefined) : 'input'} required value={firstName.value} onChange={(e) => setFirstName({...firstName, value: e.target.value})} onBlur={isFirstNameValid}/>
            </div>
            <div className="formControl">
                <label htmlFor="lastName">Last name:*</label>
                <input type="text" name="lastName" id="lastName" className={lastName.value ? (!lastName.isValid ? 'invalidInput' : undefined) : 'input'} required value={lastName.value} onChange={(e) => setLastName({...lastName, value: e.target.value})} onBlur={isLastNameValid}/>
            </div>
            <div className="formControl">
                <label htmlFor="username">Username:*</label>
                <input type="text" name="username" id="username" className={username.value ? (!username.isValid ? 'invalidInput' : undefined) : 'input'} required value={username.value} onChange={(e) => setUsername({...username, value: e.target.value})} onBlur={isUsernameValid}/>
            </div>
            <div className="formControl">
                <label htmlFor="password">Password:*</label>
                <div className="passwordInput">
                    <input type={isPasswordVisible ? 'text' : 'password'} name="password" id="password" className={password.value ? (!password.isValid ? 'invalidInput' : undefined) : 'input'} required value={password.value} onChange={(e) => setPassword({...password, value: e.target.value})} onBlur={isPasswordValid}/>
                    {isPasswordVisible ? <FaEye onClick={() => setIsPasswordVisible(prev => !prev)}/> : <FaEyeSlash onClick={() => setIsPasswordVisible(prev => !prev)}/>}
                </div>
            </div>
            <div className="formControl">
                <label htmlFor="email">Email:*</label>
                <input type="text" name="email" id="email" className={email.value ? (!email.isValid ? 'invalidInput' : undefined) : 'input'} required value={email.value} onChange={(e) => setEmail({...email, value: e.target.value})} onBlur={isEmailValid}/>
            </div>
            <div className="formControl">
                <label htmlFor="phoneNumber">Phone number:</label>
                <div className="phoneInput">
                    <select name="phonePrefix" id="phonePrefix" value={phonePrefix} onChange={(e) => setPhonePrefix(e.target.value)}>
                        <option value="+387">+387</option>
                        <option value="+456">+456</option>
                    </select>
                    <input type="text" name="phoneNumber" id="phoneNumber" className={phoneNumber.value ? (!phoneNumber.isValid ? 'invalidInput' : undefined) : 'input'} value={phoneNumber.value} onChange={(e) => setPhoneNumber({...phoneNumber, value: e.target.value})} onBlur={isPhoneNumberValid}/>
                </div>
            </div>
            <div className="formVerticalContainer">
                <p className="pLabel">Birth date:*</p>
                <div className="formHorizontalContainer">
                    <div className="formControl">
                        <label htmlFor="birthdateDay">Day:</label>
                        <select name="birthdateDay" id="birthdateDay" className={birthDay.value ? (!birthDay.isValid ? 'invalidInput' : undefined) : 'input'} required value={birthDay.value} onChange={(e) => setBirthDay({...birthDay, value: e.target.value})} onBlur={isBirthDateValid}>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </div>
                    <div className="formControl">
                        <label htmlFor="birthdateMonth">Month:</label>
                        <select name="birthdateMonth" id="birthdateMonth" className={birthMonth.value ? (!birthMonth.isValid ? 'invalidInput' : undefined) : 'input'} required value={birthMonth.value} onChange={(e) => setBirthMonth({...birthMonth, value: e.target.value})} onBlur={isBirthDateValid}>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="formControl">
                        <label htmlFor="birthdateYear">Year:</label>
                        <select name="birthdateYear" id="birthdateYear" className={birthYear.value ? (!birthYear.isValid ? 'invalidInput' : undefined) : 'input'} required value={birthYear.value} onChange={(e) => setBirthYear({...birthYear, value: e.target.value})} onBlur={isBirthDateValid}>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                        </select>
                    </div>
                </div>
            </div>
            <input type="submit" value="Register" />
            <p className="message">{message.msg}</p>
        </form>
    );
}
export default RegisterForm;