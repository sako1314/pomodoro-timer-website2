import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const TimerDisplay = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin: 20px;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.primary ? '#4CAF50' : '#2196F3'};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#45a049' : '#1976D2'};
  }
`;

const StatusDisplay = styled.div`
  font-size: 24px;
  margin: 20px;
`;

function App() {
  const [seconds, setSeconds] = useState(1500); // 25分 * 60秒
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('準備中');

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      setStatus('休憩時間');
      setSeconds(300); // 5分の休憩
    } else if (seconds === 300) {
      setStatus('作業時間');
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <h1>ポモドーロタイマー</h1>
      <TimerDisplay>{formatTime(seconds)}</TimerDisplay>
      <StatusDisplay>{status}</StatusDisplay>
      <ControlButtons>
        <Button primary={!isRunning} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '停止' : '開始'}
        </Button>
        <Button onClick={() => {
          setSeconds(1500);
          setIsRunning(false);
          setStatus('準備中');
        }}>リセット</Button>
      </ControlButtons>
    </Container>
  );
}

export default App;
