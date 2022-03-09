import React from "react";
import * as s from "../styles/globalStyles";

const ModalCustom = ({ modalShow, setModalShow, content, title }) => {
    const CloseModal = () => (
        <div onClick={() => setModalShow(!modalShow)} style={{ width: 32, height: 32, float: "right" }}>
            <s.up /><s.down />
        </div>
    );

    return (
        <s.ModalBackground show={modalShow}>
            <s.ModalContainer>
                <CloseModal />
                <s.SpacerMedium />
                <s.TextTitle>{title}</s.TextTitle>
                <s.TextSubTitle>{content}</s.TextSubTitle>
            </s.ModalContainer>
        </s.ModalBackground>
    );
};

export default ModalCustom;