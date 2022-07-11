import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormComponent  from './FormComponent'
function Modals()  {
    
        
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Ajouter utilisateur
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajout utilisateur</Modal.Title>
              </Modal.Header>
              <Modal.Body><FormComponent/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                
              </Modal.Footer>
            </Modal>
          </>
        );
      
  }
export default Modals;
