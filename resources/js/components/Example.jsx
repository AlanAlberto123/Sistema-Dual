import React from 'react';
import ReactDOM from 'react-dom/client';
/*CAMBIOS */
function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Programa Dual</div>

                        <div className="card-body">Viejas Chichonas</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;
if (document.getElementById('root')) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}