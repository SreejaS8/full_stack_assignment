import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_PLAYERS,
  EMPTY_ANSWERS,
  EMPTY_PLAYER_STATE,
  LOCKED_PLAYERS,
  UNLOCKED_PLAYERS,
} from '../constants/game.js';
import { generateQuestion } from '../utils/questionGenerator.js';
import { getFinalWinner, getPlayerAccuracy, getRopeOffset } from '../utils/scoring.js';

const initialState = {
  players: DEFAULT_PLAYERS,
  difficulty: 'easy',
  totalRounds: 7,
  currentRound: 0,
  scores: { player1: 0, player2: 0 },
  streaks: { player1: 0, player2: 0 },
  question: null,
  status: 'idle',
  locks: UNLOCKED_PLAYERS,
  answers: EMPTY_ANSWERS,
  submissions: EMPTY_PLAYER_STATE,
  roundStartedAt: null,
  history: [],
  winner: null,
  lastRoundWinner: null,
  shakeKey: 0,
};

function resolvePlayingRound(current, winnerId = null, submission = null) {
  if (current.status !== 'playing') return current;

  const nextScores = winnerId
    ? { ...current.scores, [winnerId]: current.scores[winnerId] + 1 }
    : current.scores;
  const nextStreaks = winnerId
    ? {
        player1: winnerId === 'player1' ? current.streaks.player1 + 1 : 0,
        player2: winnerId === 'player2' ? current.streaks.player2 + 1 : 0,
      }
    : { player1: 0, player2: 0 };
  const submissions = submission
    ? { ...current.submissions, [submission.playerId]: submission }
    : current.submissions;
  const roundRecord = {
    round: current.currentRound,
    question: current.question,
    winner: winnerId,
    submissions,
    responseTime: submission?.responseTime ?? null,
  };
  const finalWinner =
    current.currentRound >= current.totalRounds
      ? getFinalWinner(nextScores, current.players)
      : null;

  return {
    ...current,
    scores: nextScores,
    streaks: nextStreaks,
    submissions,
    history: [...current.history, roundRecord],
    status: finalWinner ? 'finished' : 'roundResult',
    winner: finalWinner,
    lastRoundWinner: winnerId,
    locks: LOCKED_PLAYERS,
    shakeKey: current.shakeKey + 1,
  };
}

export default function useGameEngine() {
  const [state, setState] = useState(initialState);

  const beginRound = useCallback(() => {
    setState((current) => ({
      ...current,
      status: 'playing',
      roundStartedAt: Date.now(),
      locks: UNLOCKED_PLAYERS,
      answers: EMPTY_ANSWERS,
      submissions: EMPTY_PLAYER_STATE,
      lastRoundWinner: null,
    }));
  }, []);

  const startMatch = useCallback((config) => {
    setState({
      ...initialState,
      players: { player1: config.player1, player2: config.player2 },
      difficulty: config.difficulty,
      totalRounds: config.totalRounds,
      currentRound: 1,
      question: generateQuestion(config.difficulty),
      status: 'countdown',
    });
  }, []);

  const setAnswer = useCallback((playerId, value) => {
    setState((current) => ({
      ...current,
      answers: { ...current.answers, [playerId]: value },
    }));
  }, []);

  const resolveRound = useCallback((winnerId = null, submission = null) => {
    setState((current) => resolvePlayingRound(current, winnerId, submission));
  }, []);

  const submitAnswer = useCallback(
    (playerId) => {
      setState((current) => {
        if (current.status !== 'playing' || current.locks[playerId]) return current;

        const rawAnswer = current.answers[playerId];
        const numericAnswer = Number(rawAnswer);
        const responseTime = (Date.now() - (current.roundStartedAt ?? Date.now())) / 1000;
        const isCorrect = numericAnswer === current.question.answer;
        const submission = { playerId, value: rawAnswer, isCorrect, responseTime };

        if (isCorrect) {
          return resolvePlayingRound(current, playerId, submission);
        }

        const locks = { ...current.locks, [playerId]: true };
        const submissions = { ...current.submissions, [playerId]: submission };
        const allLocked = locks.player1 && locks.player2;

        if (allLocked) {
          return resolvePlayingRound({ ...current, locks, submissions }, null, submission);
        }

        return {
          ...current,
          locks,
          submissions,
        };
      });
    },
    [],
  );

  const timeoutRound = useCallback(() => {
    resolveRound(null);
  }, [resolveRound]);

  const nextRound = useCallback(() => {
    setState((current) => {
      if (current.status !== 'roundResult') return current;

      return {
        ...current,
        currentRound: current.currentRound + 1,
        question: generateQuestion(current.difficulty),
        status: 'countdown',
        locks: LOCKED_PLAYERS,
        answers: EMPTY_ANSWERS,
        submissions: EMPTY_PLAYER_STATE,
      };
    });
  }, []);

  const resetMatch = useCallback(() => {
    setState(initialState);
  }, []);

  const stats = useMemo(() => {
    const fastestRound = state.history
      .filter((round) => round.responseTime !== null)
      .sort((a, b) => a.responseTime - b.responseTime)[0];

    return {
      fastestResponder: fastestRound?.winner ? state.players[fastestRound.winner] : 'N/A',
      fastestTime: fastestRound?.responseTime ?? null,
      accuracy: {
        player1: getPlayerAccuracy(state.history, 'player1'),
        player2: getPlayerAccuracy(state.history, 'player2'),
      },
      completedRounds: state.history.length,
    };
  }, [state.history, state.players]);

  const ropeOffset = useMemo(
    () => getRopeOffset(state.scores, state.totalRounds),
    [state.scores, state.totalRounds],
  );

  return {
    ...state,
    stats,
    ropeOffset,
    beginRound,
    nextRound,
    resetMatch,
    setAnswer,
    startMatch,
    submitAnswer,
    timeoutRound,
  };
}
