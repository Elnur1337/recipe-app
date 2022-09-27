//Libraries
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { hash } = require('bcryptjs');
const { lookup } = require('geoip-lite');
const { writeFileSync } = require('fs');

//Database config
const database = require('../database/dbConfig');

dayjs.extend(customParseFormat);

const registerUser = async (req, res) => {
    const { firstName, lastName, username, password, email, phonePrefix, phoneNumber, birthYear, birthMonth, birthDay } = req.body;
    let phone = '';
    if (firstName.length < 2 || firstName.length > 100) {
        return res.status(422).json({errorMsg: 'First name must be at least 2 characters long!'});
    }
    for (let counter = 0; counter < firstName.length; counter++) {
            const asciiCode = firstName.charCodeAt(counter);
            if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                return res.status(422).json({errorMsg: "First name can only contain letters, space character and symbols (-, .,')!"});
            } 
        }
    if (lastName.length < 2 || lastName.length > 100) {
            return res.status(422).json({errorMsg: 'Last name must be at least 2 characters long!'});
        }
    for (let counter = 0; counter < lastName.length; counter++) {
            const asciiCode = lastName.charCodeAt(counter);
            if (asciiCode !== 32 && asciiCode !== 39 && asciiCode !== 45 && asciiCode !== 46 && asciiCode !== 352 && asciiCode !== 353 && asciiCode !== 268 && asciiCode !== 269 && asciiCode !== 262 && asciiCode !== 263 && asciiCode !== 272 && asciiCode !== 273 && asciiCode !== 381 && asciiCode !== 382 && !(asciiCode > 64 && asciiCode < 91) && !(asciiCode > 96 && asciiCode < 123)) {
                return res.status(422).json({errorMsg: "Last name can only contain letters, space character and symbols (-, .,')!"});
            } 
        }
    if(username.length < 2 || username.length > 20) {
            return res.status(422).json({errorMsg: 'Username must be between 2 and 20 characters!'});
        }
    if (password.length < 8) {
            return res.status(422).json({errorMsg: 'Password must be at least 8 characters long!'});
        }
    const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailRegex)) {
        return res.status(422).json({errorMsg: 'Email addres is not valid!'});
    }
    if (phoneNumber.length > 0) {
            if (phoneNumber.length < 15) {
                for (let counter = 0; counter < phoneNumber.length; counter++) {
                    const asciiCode = phoneNumber.charCodeAt(counter);
                    if (!(asciiCode > 47 && asciiCode < 58)) {
                        return res.status(422).json({errorMsg: 'Phone number can only contain numbers!'});
                    } else {
                        phone = phonePrefix + phoneNumber;
                    }
            }
            } else {
                    return res.status(422).json({errorMsg: "Phone number can't be longer then 20 characters!"});
                }
                
        }
    if (!dayjs(`${birthYear}-${birthMonth}-${birthDay}`, 'YYYY-MM-DD', true).isValid()) {
            return res.status(422).json({errorMsg: 'Date you entered is not valid!'});
        }
    const birthDate = new Date(Number(birthYear), Number(birthMonth) - 1, Number(birthDay));
    const hashedPassword = await hash(password, 10);
    const query = `INSERT INTO users(first_name, last_name, username, password, email, phone_number, birthdate) VALUES (?, ?, ?, ?, ?, ${phone.length > 0 ? phone : null}, ?)`;
    database.query(query, [firstName, lastName, username, hashedPassword, email, birthDate], err => {
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
            const timestamp = dayjs().$d.toString().slice(4, 24);
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const location = lookup(ip);
            const logsFileName = `${timestamp.split(' ')[2]}-${timestamp.split(' ')[1]}-${timestamp.split(' ')[0]}`;
            const log = `${timestamp} | ${ip === '::1' ? 'IP not available' : ip} | ${location ? `${location.city}, ${location.country}` : 'Location not available'} | Action: User registration | Parameters: firstName = ${firstName}, lastName = ${lastName}, username = ${username} and email = ${email}\n`;
            writeFileSync(`./logs/${logsFileName}.txt`, log, {flag: 'a'});
            return res.status(201).json({msg: 'Account created!'});
        }
        database.end();
    });
};
module.exports = registerUser;