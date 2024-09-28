// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'; // Assuming you have a Home component
import Resume from './Resume'; // Import your new Resume component

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resume" component={Resume} /> {/* Add the new route here */}
      </Switch>
    </Router>
  );
};

export default App;
