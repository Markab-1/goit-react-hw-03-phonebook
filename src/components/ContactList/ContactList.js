import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ visibleContacts, onDeleteContact }) => {
  return (
    <div>
      {visibleContacts && (
        <ul className={s.list}>
          {visibleContacts.map(({ id, name, number }) => (
            <li key={id} className={s.item}>
              <span className={s.contactsName}>{name}: </span>
              <span className={s.number}>{number}</span>
              <button
                type="button"
                onClick={() => onDeleteContact(id)}
                className={s.btn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
