import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
    const [count, setCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        console.log(`${title} has been liked : ${hasLiked}`);
    },[hasLiked]);
    return (
        <div style={{ border: '1px solid #4b5362',
            padding: '20px',
            margin: '20px',
            backgroundColor: '#31363f',
            borderRadius: '10px',
            minHeight: '100px'
        }} onClick={() => setCount(count + 1)}>
            <h2>{title} <br/> {count || null}</h2>
            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
        </div>
    )
}

const App = () => {

    return (
        <div className="card-container">
            <Card title="Star Wars"/>
            <Card title="The Lion King"/>
            <Card title="Avatar"/>
        </div>)
}

export default App

