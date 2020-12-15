import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  background-color: transparent;
  font-family: 'TDTDTadakTadak';
  font-size: ${(props) => (props.user ? '15px' : '20px')};
  // border: transparent;
  outline: transparent;
  text-align: left;
`;
const AnalysisStyle = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  max-width: 850px;
  height: 100%;
  padding: 40px 20px 10px 20px;
`;
const GroupBoxStyle = styled.div`
  display: grid;
  text-align: left;
`;
const KindStyle = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`;
const ImgStyle = styled.img`
  display: grid;
  width: 100%;
`;
const GroupStyle = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;
const Analysis = () => {
  const [groups, setGroups] = useState([]);
  const [images, setImages] = useState();
  const [image, setImage] = useState({
    src: '',
  });
  const [showImage, setShowImage] = useState(false);

  //그룹목록
  useEffect(() => {
    fetch('http://10.100.102.31:8000/tmember/get', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGroups(res);
      });
  }, []);

  function myDiary() {
    const user = localStorage.getItem('userNo');
    fetch('http://10.100.102.31:8000/board/analysis/my', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          console.log('mydiary');
          setImages({
            wordcloud:
              'http://10.100.102.90:7000/static/my/wordcloud' + user + '.png',
            line: 'http://10.100.102.90:7000/static/my/line' + user + '.png',
            bar: 'http://10.100.102.90:7000/static/my/bar' + user + '.png',
            pie: 'http://10.100.102.90:7000/static/my/pie' + user + '.png',
            raider:
              'http://10.100.102.90:7000/static/my/raider' + user + '.png',
          });
        }
      });
  }

  function groupDiary(props) {
    fetch('http://10.100.102.31:8000/board/analysis/group/' + props, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          setImages({
            wordcloud:
              'http://10.100.102.90:7000/static/together/wordcloud' +
              props +
              '.png',
            line:
              'http://10.100.102.90:7000/static/together/line' + props + '.png',
            bar:
              'http://10.100.102.90:7000/static/together/bar' + props + '.png',
            pie:
              'http://10.100.102.90:7000/static/together/pie' + props + '.png',
            raider:
              'http://10.100.102.90:7000/static/together/raider' +
              props +
              '.png',
          });
        }
      });
  }

  function selectGraph(props) {
    console.log('images', props);
    console.log('images.wordcloud', images.wordcloud);
    if (props === '1') {
      console.log('images.wordcloud', images.wordcloud);
      setImage({
        src: images.wordcloud,
      });
      console.log('gggg');
      console.log('image', image);
      setShowImage(true);
    } else if (props === 2) {
      setImage(images.line);
    } else if (props === 3) {
      setImage(images.bar);
    } else if (props === 4) {
      setImage(images.pie);
    } else if (props === 5) {
      setImage(images.raider);
    }
  }
  return (
    <AnalysisStyle>
      <ButtonStyle onClick={() => myDiary()}>나의 모든 일기</ButtonStyle>
      <ButtonStyle onClick={() => groupDiary('0')}>나의 일기</ButtonStyle>
      <GroupBoxStyle>
        {groups.map(({ tmno, member, together }) => (
          <ButtonStyle key={tmno} onClick={() => groupDiary(together.tno)}>
            {together.tname}
          </ButtonStyle>
        ))}
      </GroupBoxStyle>
      <div>눌러주세요</div>
      <KindStyle>
        <button onClick={() => selectGraph(1)}>wordcloud</button>
        <button onClick={() => selectGraph(2)}>line</button>
        <button onClick={() => selectGraph(3)}>bar</button>
        <button onClick={() => selectGraph(4)}>pie</button>
        <button onClick={() => selectGraph(5)}>raider</button>
      </KindStyle>
      <div>
        {showImage ? (
          <div>
            <ImgStyle src={image} alt="" />
          </div>
        ) : null}
      </div>
    </AnalysisStyle>
  );
};

export default Analysis;
