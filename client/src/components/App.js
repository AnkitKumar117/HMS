import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignUp from './login/SignUp';



const App = () => {
    return (
        <BrowserRouter>
        <div className="ui container">
                <div>
                    <Switch>
                        <Route path="/signup" exact component={SignUp} />
                    </Switch>
                </div>
            
        </div>
        </BrowserRouter>
    );
};


export default App;