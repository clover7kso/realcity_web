import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Modal from "./Modal";
import moment from "moment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  margin-top: 20px;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
  white-space: nowrap;
  margin-right: 5px;
`;
const NoticeIndex = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
  margin-right: 10px;
`;

const NoticeTitle = styled.div`
  text-decoration: none;
  color: black;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Roboto;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
`;

const ModalContent = styled.div`
  font-size: 14px;
  color: black;
  margin-bottom: 4px;
`;

const ModalTitle = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const ModalDate = styled.div`
  font-size: 11px;
  color: grey;
  margin-bottom: 10px;
`;

export default () => {
  const HOME_NOTICE = gql`
    query homeNotice {
      homeNotice {
        id
        title
        content
        createdAt
      }
    }
  `;
  const { data, loading } = useQuery(HOME_NOTICE, {
    notifyOnNetworkStatusChange: true,
  });
  const [showIndex, setShowIndex] = useState(0);

  const Tick = () => {
    if (!loading && data !== undefined) {
      if (showIndex !== data.homeNotice.length - 1) setShowIndex(showIndex + 1);
      else setShowIndex(0);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(false);
  const openModal = (idx) => {
    setClickedIndex(idx);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const timer = setInterval(Tick, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [Tick]);

  return (
    <Wrapper>
      {loading || data === undefined || data.homeNotice.length === 0 ? null : (
        <InnerWrapper onClick={() => openModal(showIndex)}>
          <Title>공지클릭</Title>
          <NoticeIndex>
            [{showIndex + 1}/{data.homeNotice.length}]
          </NoticeIndex>
          <NoticeTitle>{data.homeNotice[showIndex].title}</NoticeTitle>
        </InnerWrapper>
      )}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <ModalDate>
            {moment(new Date(data.homeNotice[clickedIndex].createdAt)).format(
              "YYYY년 MM월 DD일 hh:mm:ss"
            )}
          </ModalDate>
          <ModalTitle>{data.homeNotice[clickedIndex].title}</ModalTitle>
          {data.homeNotice[clickedIndex].content !== undefined
            ? data.homeNotice[clickedIndex].content
                .split("\\n")
                .map((item, idx) => {
                  return (
                    <ModalContent key={idx}>
                      {item}
                      <br />
                    </ModalContent>
                  );
                })
            : null}
        </Modal>
      )}
    </Wrapper>
  );
};
