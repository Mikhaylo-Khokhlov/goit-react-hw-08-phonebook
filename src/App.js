import Filter from './components/Filter';
import Section from './components/Section';
import AppBar from './components/AppBar';
import HomeView from './components/HomeView/HomeView';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Switch } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from './redux/contacts/contacts-selector';
import { authOperations } from './redux/auth';
import {
  addContact,
  fetchContacts,
} from './redux/contacts/contacts-operations';

const ContactForm = lazy(() => import('./components/ContactForm'));
const ContactList = lazy(() => import('./components/ContactList'));

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  const filter = useSelector(getFilter);
  useEffect(() => dispatch(fetchContacts()), [dispatch]);

  const addContacts = ({ name, number }) => {
    const identicalName = findForbiddenName(name);
    const newContact = {
      name,
      number,
    };
    if (identicalName === false) {
      dispatch(addContact(newContact));
    } else {
      alert(name + ' is already in contacts');
    }
  };

  const findForbiddenName = name => {
    let forbiddenName = false;
    for (let i = 0; i < contacts.length; i += 1) {
      const normalizeContactsName = contacts[i].name.toLowerCase();
      const normalizeName = name.toLowerCase();
      if (normalizeContactsName === normalizeName) {
        return (forbiddenName = true);
      } else {
        forbiddenName = false;
      }
    }
    return forbiddenName;
  };

  const getFindContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const findContact = getFindContact();

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
              <ContactForm onSubmit={addContacts} />
              <h2>Contacts</h2>
              <Filter />
              <ContactList contacts={findContact} />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Section>
    </>
  );
}
