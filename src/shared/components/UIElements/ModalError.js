import React from 'react';

import Modal from './Modal';

const ModalError = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header="Случилась ошибка!"
            show={!!props.error}
        >
            <p>{props.error}</p>
        </Modal>
    );
};

export default ModalError;