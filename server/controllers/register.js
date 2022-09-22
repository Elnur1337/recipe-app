//Libraries
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { hash } = require('bcryptjs');

//Database config
const database = require('../database/dbConfig');

dayjs.extend(customParseFormat);

const registerUser = async (req, res) => {
    const { firstName, lastName, username, password, email, phonePrefix, phoneNumber, birthYear, birthMonth, birthDay } = req.body;
    let isDataValid = true, phone = '';
    if (firstName.length < 2 || firstName.length > 100) {
        isDataValid = false;
        return res.status(422).json({errorMsg: 'First name must be at least 2 characters long!'});
    }
    if (isDataValid) {
        for (let counter = 0; counter < firstName.length; counter++) {
                const asciiCode = firstName.charCodeAt(counter);
                if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                    isDataValid = false;
                    return res.status(422).json({errorMsg: "First name can only contain letters, space character and symbols (-, .,')!"});
                } 
            }
    }
    if (isDataValid) {
        if (lastName.length < 2 || lastName.length > 100) {
                isDataValid = false;
                return res.status(422).json({errorMsg: 'Last name must be at least 2 characters long!'});
            }
    }
    if (isDataValid) {
        for (let counter = 0; counter < lastName.length; counter++) {
                const asciiCode = lastName.charCodeAt(counter);
                if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                    isDataValid = false;
                    setErrorMsg("Last name can only contain letters, space character and symbols (-, .,')!");
                    return res.status(422).json({errorMsg: "Last name can only contain letters, space character and symbols (-, .,')!"});
                } 
            }
    }
    if (isDataValid) {
        if(username.length < 2 || username.length > 20) {
                isDataValid = false;
                return res.status(422).json({errorMsg: 'Username must be between 2 and 20 characters!'});
            }
    }
    if (isDataValid) {
        if (password.length < 8) {
                isDataValid = false;
                return res.status(422).json({errorMsg: 'Password must be at least 8 characters long!'});
            }
    }
    if (isDataValid) {
        const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailRegex)) {
            isDataValid = false;
            return res.status(422).json({errorMsg: 'Email addres is not valid!'});
        }
    }
    if (isDataValid) {
        if (phoneNumber.length > 0) {
                if (phoneNumber.length < 15) {
                    for (let counter = 0; counter < phoneNumber.length; counter++) {
                        const asciiCode = phoneNumber.charCodeAt(counter);
                        if (!(asciiCode > 47 && asciiCode < 58)) {
                            isDataValid = false;
                            return res.status(422).json({errorMsg: 'Phone number can only contain numbers!'});
                        } else {
                            phone = phonePrefix + phoneNumber;
                        }
                }
                } else {
                        isDataValid = false;
                        return res.status(422).json({errorMsg: "Phone number can't be longer then 20 characters!"});
                    }
                    
            }
    }
    if (isDataValid) {
        if (!dayjs(`${birthYear}-${birthMonth}-${birthDay}`, 'YYYY-MM-DD', true).isValid()) {
                isDataValid = false;
                return res.status(422).json({errorMsg: 'Date you entered is not valid!'});
            }
    }
    if (isDataValid) {
        const birthDate = new Date(Number(birthYear), Number(birthMonth) - 1, Number(birthDay));
        const hashedPassword = await hash(password, 10);
        const query = `INSERT INTO users(first_name, last_name, username, password, email, phone_number, birthdate, premium, admin) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)`;
        database.query(query, [firstName, lastName, username, hashedPassword, email, phone, birthDate], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    const dupField = err.sqlMessage.split(' ')[5].split('.')[1].substring(0, err.sqlMessage.split(' ')[5].split('.')[1].length - 1);
                    let error;
                    if (dupField === 'username') {
                        error = 'Account with that username already exists!';
                    } else if (dupField === 'email') {
                        error = 'Account with that email already exists!';
                    } else {
                        error = 'Account with that phone number already exists!';
                    }
                    return res.status(409).json({errorMsg: error});
                }
            } else {
                return res.status(201).json({msg: 'Account created!'});
            }
        });
        database.end();

    }
};
module.exports = registerUser;