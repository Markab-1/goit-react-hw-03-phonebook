import React, { Component } from 'react';

import Container from './Container/Container';
import Section from './Section/Section';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export const App = () => {
  class PhoneBook extends Component {
    state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };

    handleFilter = e => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value });
    };

    deleteContact = id => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
    };

    formSubmitHandler = contactsItem => {
      const { name } = contactsItem;

      const compareNames = this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (compareNames) {
        alert(`${name} is already in the Contact list`);
        return;
      }

      this.setState(state => ({
        contacts: state.contacts.concat(contactsItem),
      }));
    };

    componentDidUpdate(prevProps, prevState) {
      if (this.state.contacts !== prevState.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }

    componentDidMount() {
      const contacts = localStorage.getItem('contacts');
      const parseContacts = JSON.parse(contacts);
      if (parseContacts) {
        this.setState({ contacts: parseContacts });
      }
    }

    render() {
      const { contacts, filter } = this.state;
      const normalizedFilter = filter.toLowerCase();
      const visibleContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );

      return (
        <div>
          <Section title="Phonebook">
            <Form onSubmit={this.formSubmitHandler} />
          </Section>
          <Section title="Contacts">
            <Filter value={filter} onChange={this.handleFilter} />
            <ContactList
              visibleContacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        </div>
      );
    }
  }

  return (
    <Container>
      <PhoneBook />
    </Container>
  );
};
