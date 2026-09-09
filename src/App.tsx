import './App.css'
import Calculator from "./page/Calculator.tsx";
import { Analytics } from '@vercel/analytics/react';

function App() {

    return (
        <>
            <Calculator />
            <Analytics />
        </>
    )
}

export default App
