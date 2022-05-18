import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import SignaturePad from "signature_pad";
import { Button } from "../../containers/Styles";

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    font-size: 2rem;
  }
`;

const SignatureWrapper = styled.div`
  cursor: url("/svg/pen.svg") 10 20, auto;
  background: var(--gray-100);
  border-radius: 4px;
`;

const SignatureButtons = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;

  .muted {
    color: #000;
    background: var(--gray-100);
    border-color: var(--gray-100);
  }
`;

const ModalComponent: FC<any> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={{
        content: {
          zIndex: 9,
          top: "auto",
          bottom: "auto",
        },
      }}
      contentLabel="Signatures"
    >
      <ModalContent onClose={onClose} />
    </Modal>
  );
};

const ModalContent: FC<any> = ({ onClose }) => {
  const canvasRef = useRef<any>(null);
  let signaturepad;

  useEffect(() => {
    if (canvasRef.current) {
      signaturepad = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        penColor: "rgb(0, 0, 0)",
      });
    }
  }, []);

  const handleFinishSignature = () => {
    localStorage.setItem("signature", signaturepad.toDataURL());
    onClose();
  };

  const handleClearPad = () => {
    signaturepad.clear();
  };

  return (
    <>
      <Title>
        <h2>Signature</h2>
        <RiCloseLine onClick={onClose} />
      </Title>
      <SignatureWrapper>
        <canvas ref={canvasRef} height={250} width={700} />
      </SignatureWrapper>
      <SignatureButtons>
        <Button className="muted" onClick={handleClearPad}>
          Clear
        </Button>
        <Button onClick={handleFinishSignature}>Finish</Button>
      </SignatureButtons>
    </>
  );
};

export default ModalComponent;
