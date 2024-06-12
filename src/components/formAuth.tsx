"use client"

import React, { useState } from 'react'
import FormSignup from './formSignup'
import FormLogin from './formLogin'

export const FormAuth = () => {
    const [toggle, setToggle] = useState(false);


    const handleToggle = () => {
        setToggle(!toggle);
    }


    return toggle ? <FormLogin handleChange={handleToggle} /> : <FormSignup handleChange={handleToggle} />
}