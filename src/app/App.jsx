import shortid from 'shortid';
import Section from 'common/components/Section/Section';
import ContactForm from 'features/contacts/components/ContactForm/ContactForm';
import ContactList from 'features/contacts/components/ContactList/ContactList';
import Filter from 'features/filter/Filter';
import chekExistName from 'common/services/chekExistName';
import chekExistNumber from 'common/services/chekExistNumber';
import { getContacts, getFilter } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { contactAdd, contactRemove } from 'features/contacts/contactsSlice';
import { setFilter } from 'features/filter/filterSlice';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  function addContact(values, actions) {
    const { name, number } = values;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (chekExistName(name, contacts)) {
      window.alert(name + ' is already in contacts');
    } else if (chekExistNumber(number, contacts)) {
      window.alert('Number ' + number + ' is already in contacts');
    } else {
      dispatch(contactAdd(contact));
      actions.resetForm();
    }
  }

  function deleteContact(id) {
    dispatch(contactRemove(id));
  }

  function changeFilter(evt) {
    dispatch(setFilter(evt.currentTarget.value));
  }

  function getFilteredContacts() {
    const normalizeFilterText = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilterText)
    );
  }

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDelete={deleteContact}
        />
      </Section>
    </div>
  );
}
