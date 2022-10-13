import { React } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import UsersPage from "./pages/usersPage";
import MainPage from "./pages/mainPage";

function App() {
    return (
        <div className="container mt-4 mb-4">
            <NavBar />
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/users/:userId?" component={UsersPage} />
                <Route path="/" exact component={MainPage} />
            </Switch>
        </div>
    );
}

export default App;
