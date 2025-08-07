import React from 'react'
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div>Programa Dual</div>
  )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}