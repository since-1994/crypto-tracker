import * as React from 'react';
import styled from 'styled-components';
import './App.css';

interface BoxProps {
  bgColor: string;
}

const Box = styled.div<BoxProps>`
  background-color: ${({theme}) => theme.textColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

function App() {
  return (
    <div className="App">
      <Box bgColor="red" ></Box>
      <Circle bgColor="teal"></Circle>
    </div>
  );
}

export default App;
