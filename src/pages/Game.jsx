import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownOverlay from '../components/game/CountdownOverlay.jsx';
import PlayerPanel from '../components/game/PlayerPanel.jsx';
import RoundBoard from '../components/game/RoundBoard.jsx';
import PageTransition from '../components/animations/PageTransition.jsx';
import { useGame } from '../context/GameContext.jsx';
import useTimer from '../hooks/useTimer.js';
import { ROUND_SECONDS } from '../utils/gameHelpers.js';

export default function Game() {
  const navigate = useNavigate();
  const game = useGame();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (game.status === 'idle') {
      navigate('/');
    }
  }, [game.status, navigate]);

  useEffect(() => {
    if (game.status !== 'countdown') return undefined;

    setCountdown(3);
    const ticks = [2, 1];
    const timers = ticks.map((value, index) => window.setTimeout(() => setCountdown(value), (index + 1) * 800));
    const start = window.setTimeout(game.beginRound, 2500);
    return () => [...timers, start].forEach(window.clearTimeout);
  }, [game.status, game.currentRound, game.beginRound]);

  useEffect(() => {
    if (game.status !== 'roundResult') return undefined;
    const timerId = window.setTimeout(game.nextRound, 1500);
    return () => window.clearTimeout(timerId);
  }, [game.status, game.nextRound]);

  useEffect(() => {
    if (game.status !== 'finished') return undefined;

    const timerId = window.setTimeout(() => navigate('/result'), 900);
    return () => window.clearTimeout(timerId);
  }, [game.status, navigate]);

  const timer = useTimer({
    active: game.status === 'playing',
    duration: ROUND_SECONDS,
    resetKey: `${game.currentRound}-${game.status}`,
    onExpire: game.timeoutRound,
  });

  const countdownMessage =
    game.currentRound > 1
      ? game.lastRoundWinner
        ? `${game.players[game.lastRoundWinner]} won the last round`
        : 'Last round ended with no correct answer'
      : 'Get ready to pull';

  return (
    <PageTransition className="relative w-full">
      <CountdownOverlay
        message={countdownMessage}
        visible={game.status === 'countdown'}
        value={countdown}
      />
      <div className="grid min-h-[calc(100vh-2rem)] w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,0.86fr)_minmax(360px,1.1fr)_minmax(220px,0.86fr)]">
        <PlayerPanel
          accent="#0f172a"
          answer={game.answers.player1}
          disabled={game.status !== 'playing'}
          locked={game.locks.player1}
          name={game.players.player1}
          onAnswerChange={(value) => game.setAnswer('player1', value)}
          onSubmit={(event) => {
            event.preventDefault();
            game.submitAnswer('player1');
          }}
          score={game.scores.player1}
          streak={game.streaks.player1}
        />

        <RoundBoard
          currentRound={game.currentRound}
          difficulty={game.difficulty}
          lastRoundWinner={game.lastRoundWinner}
          players={game.players}
          question={game.question}
          ropeOffset={game.ropeOffset}
          shakeKey={game.shakeKey}
          status={game.status}
          timer={timer}
          totalRounds={game.totalRounds}
        />

        <PlayerPanel
          accent="#0d9488"
          align="right"
          answer={game.answers.player2}
          disabled={game.status !== 'playing'}
          locked={game.locks.player2}
          name={game.players.player2}
          onAnswerChange={(value) => game.setAnswer('player2', value)}
          onSubmit={(event) => {
            event.preventDefault();
            game.submitAnswer('player2');
          }}
          score={game.scores.player2}
          streak={game.streaks.player2}
        />
      </div>
    </PageTransition>
  );
}
