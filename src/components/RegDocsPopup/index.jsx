import React from 'react';
import PropTypes from 'prop-types';

import RegDocs from './RegDocs';
import Modal from '../Modal';

import './styles.scss';

const RegDocsPopup = ({ instrument, regdocsUrl, isOpen, closeModal }) => (
  <Modal
    component={RegDocs}
    componentProps={{
      instrument,
      regdocsUrl,
    }}
    isOpen={isOpen}
    closeModal={closeModal}
    className="RegDocsPopup"
  />
);

RegDocsPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function to be run when the modal is closed */
  closeModal: PropTypes.func.isRequired,
  /** Instrument number ('XO-001-2018') */
  instrument: PropTypes.string.isRequired,
  /** Regdocs page for the instrument */
  regdocsUrl: PropTypes.string.isRequired,
};

RegDocsPopup.defaultProps = {
  isOpen: false,
};

export default RegDocsPopup;
