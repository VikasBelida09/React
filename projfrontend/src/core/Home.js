import React from 'react'
import '../styles.css'
import {API} from '../backend'
import Base from './Base'
export default function Home() {
    console.log("API is ",API)
    return (
        <Base title="Home Page" decscription="Welcome to Tshirt Store!"> 
            <h1 className="text-white">Hello front end</h1>
        </Base>
    )
}
