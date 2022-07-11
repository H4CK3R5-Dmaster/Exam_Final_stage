import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAddPosses()  {
    
        
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Ajouter possession
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajout possession</Modal.Title>
              </Modal.Header>
              <Modal.Body>ok</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                
              </Modal.Footer>
            </Modal>
          </>
        );
      
  }
export default ModalAddPosses;
