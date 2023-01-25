import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const MyRequestsModal = (props) => {
    const { show, setShow, id } = props;

    const history = useNavigate();
  
    const handleClose = () => setShow(false);

    const changePage = () => {
        history(`/store/details/${id}`);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Excluir ou Ir Para a Discussão do Disco</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir ou ir para a discussão do disco?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
          Cancelar
                </Button>
                <Button variant="danger" >
          Excluir
                </Button>
                <Button onClick={ changePage } variant="primary" >
          Ir Para a Discussão do Disco
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

MyRequestsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    setShow: PropTypes.func.isRequired,
};

export default MyRequestsModal;
