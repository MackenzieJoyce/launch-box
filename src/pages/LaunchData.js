import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LaunchData() {
    const [launchData, setLaunchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getApiData = () => {
        return (
            axios
                .get('https://fdo.rocketlaunch.live/json/launches/next/5')
                .then(response => {
                    setLaunchData(response.data.result)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setError(true)
                    setLoading(false)
                })
        )
    }

    useEffect(() => {
        getApiData()
    }, [])

    return (
        <>
        </>
    )
}