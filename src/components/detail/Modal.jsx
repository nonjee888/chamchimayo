import styled from "@emotion/styled";
import { forwardRef } from "react";

const Modal = forwardRef((props, ref) => {
  return (
    <Background>
      <Content>
        <ModalContainer ref={ ref }>
          { props.children }
        </ModalContainer>
      </Content>
    </Background>
  );
});

/****************************** Styled Components ******************************/
const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 120%;
  width: 100%;
  margin-top: 5%;
  position: relative;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 45vh;
  background-color: white;
  border: 1px solid whitesmoke;
  border-radius: 12px;
`;
/****************************** Styled Components ******************************/

export default Modal;