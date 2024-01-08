import React, { useEffect } from 'react'

export default function Signin({ appearLoginSignupm, setAppearLoginSignup }) {

    useEffect(() => {
        setAppearLoginSignup(false)
    }, [])

    return (
        <div>Signin</div>
    )
}
