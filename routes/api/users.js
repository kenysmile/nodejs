const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');


// @route  GET api/users
// @desc   Test route
// @access Public

router.post(
    '/', 
    [check('name','Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);       
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { name, email, password } = req.body;
        try {
            console.log('1111111111')
            let user = await User.findOne({ email });
            console.log(user)
            if(user) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] })
            }
            console.log('222222')
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            
            user = new User({
                name,
                email,
                avatar,
                password,
            });
            console.log('33333333333333')

            const salt = await bcrypt.genSalt(10);
            
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            console.log('44444444444')
            jwt.sign(
                payload, 
                config.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                console.log(res.json({ token }))
                return res.json({ token });
            }
            );
 

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }); 

module.exports = router;