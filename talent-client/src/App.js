import React, { useEffect } from 'react';
import CsvToJson from './components/csvToJson/CsvToJson';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ContentHome from './components/ContentHome/index';
import Footer from './components/Footer/index';
import Nav from './components/Nav/index';
import CardsContainer from './components/CardsContainer';
import Dashboard from './components/Dashboard';
import RecruiterFolder from './components/RecruiterFolder';
import RecruiterCreate from './components/RecruiterCreate';
import { getAllCandidates } from './redux/candidatesReducer/Action.js';
import FoldersCrud from './components/Folders/index';
import Folder from './components/Folders/folder';
import { getAllFolders } from './redux/foldersReducer/Action';
import { getAllRecruiters } from './redux/recruitersReducer/Action';
import { getAllUsers } from './redux/usersReducer/Action';
import { getAllSkills } from './redux/skillsReducer/Action';
import './App.css';

function App() {
  const dispatch = useDispatch();

  // ===  FETCH ALL CANDIDATES FROM DB TO SAVE THEM ON REDUX STORE === future implementation may consider paginating
  // to lower loading times if candidate number is too high...
  useEffect(() => {
    dispatch(getAllCandidates());
    dispatch(getAllFolders());
    dispatch(getAllRecruiters());
    dispatch(getAllUsers());
    dispatch(getAllSkills());
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/panel" render={() => <Dashboard />} />
        <Route
          path="/panel/candidates"
          render={() => <Dashboard componentToRender={'candidates'} />}
        />
        <Route
          path="/panel/skills"
          render={() => <Dashboard componentToRender={'skills'} />}
        />
        <Route
          path="/panel/folders"
          render={() => <Dashboard componentToRender={'folders'} />}
        />
        <Route
          path="/"
          render={({ location }) => (
            <Nav location={location.pathname.slice(0, 9)} />
          )}
        />
      </Switch>
      <Route exact path="/" render={() => <ContentHome />} />
      <Route path="/folder/:id" render={() => <Folder />} />
      <Route
        exact
        path="/"
        render={({ location }) => (
          <CardsContainer location={location.pathname} />
        )}
      />
      <Route exact path="/csv" component={CsvToJson} />
      <Route exact path="/recruiters/add" render={() => <RecruiterCreate />} />
      <Route exact path="/dossier/:uuid">
        <RecruiterFolder render={({ match }) => match.params.uuid} />
      </Route>
      <Switch>
        <Route path="/panel" />
        <Route path="/" render={() => <Footer />} />
      </Switch>
      {/* <Route path="/panel" render={() => <Menu />} /> */}
    </div>
  );
}
export default App;
