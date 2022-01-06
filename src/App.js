import ContactsView from './components/ContactsView';
import Section from './components/Section';
import AppBar from './components/AppBar';
import HomeView from './components/HomeView/HomeView';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Switch } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from './redux/auth';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Section>
        <Switch>
          <Suspense fallback={<p>Загружаем...</p>}>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute exact path="/register" restricted>
              <RegisterView />
            </PublicRoute>
            <PublicRoute exact path="/login" redirectTo="/todos" restricted>
              <LoginView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Section>
    </>
  );
}
