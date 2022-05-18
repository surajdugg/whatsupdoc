import React, { FC, useEffect, useRef, useState } from "react";
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

const SignaturesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
`;

const SignatureCol = styled.div`
  padding: 1rem;
  width: 50%;
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

const SignatureCardStyle = styled.div`
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: 4px;

  &:hover {
    box-shadow: 0 0 0 3px var(--primary);
  }

  img {
    max-width: 100%;
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
  const signatures = localStorage.getItem("signatures")
    ? JSON.parse(localStorage.getItem("signatures"))
    : [];
  const [signatureOpen, setSignatureOpen] = useState<boolean>(false);

  const openSignatureView = () => {
    setSignatureOpen(true);
  };

  return (
    <>
      <Title>
        <h2>Signature</h2>
        <RiCloseLine onClick={onClose} />
      </Title>
      {!signatures.length || signatureOpen ? (
        <SigPad signatures={signatures} onClose={onClose} />
      ) : (
        <>
          <SignaturesWrap>
            {signatures.map((signature: any, index: number) => (
              <SignatureCard
                key={index}
                index={index}
                signature={signature}
                onClose={onClose}
              />
            ))}
          </SignaturesWrap>
          <SignatureButtons>
            <Button style={{ marginLeft: "auto" }} onClick={openSignatureView}>
              Add New Signature
            </Button>
          </SignatureButtons>
        </>
      )}
    </>
  );
};

const SigPad: FC<any> = ({ signatures, onClose }) => {
  const canvasRef = useRef<any>(null);
  let signaturepad: any;

  const handleFinishSignature = () => {
    localStorage.setItem(
      "signatures",
      JSON.stringify([...signatures, signaturepad.toDataURL()])
    );
    onClose();
  };

  const handleClearPad = () => {
    signaturepad.clear();
  };

  useEffect(() => {
    if (canvasRef.current) {
      signaturepad = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        penColor: "rgb(0, 0, 0)",
      });
    }
  }, []);

  return (
    <>
      <SignatureWrapper>
        <canvas ref={canvasRef} height={250} width={658} />
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

const SignatureCard: FC<any> = ({ signature, index, onClose }) => {
  const handleSelectSignature = () => {
    localStorage.setItem("selectedSignature", index);
    onClose();
  };

  return (
    <SignatureCol>
      <SignatureCardStyle onClick={handleSelectSignature}>
        <img src={signature} />
      </SignatureCardStyle>
    </SignatureCol>
  );
};

export default ModalComponent;
