import React, { useState, useEffect } from 'react';
import { useTracked } from 'state';
import Player from './Player';
import interact from 'interactjs';

type Props = any;

const Players: React.FC<Props> = () => {
  const [{ teams, formations, activeTeamId }]: any = useTracked();
  const team = teams.find((t) => t.id === activeTeamId);
  const formation = team ? formations.find((f) => f.id === team.formationId) : null;

  // state to track player positions
  const [playerPositions, setPlayerPositions] = useState<{ [key: number]: { x: number; y: number } }>({});

  // initialize positions on team/formation change
  useEffect(() => {
    if (!team || !formation) return;

    const positions: any = {};
    team.players.forEach((p, i) => {
      positions[p.id] = {
        x: team.home ? formation.positions[i].x : 100 - formation.positions[i].x,
        y: team.home ? formation.positions[i].y : 100 - formation.positions[i].y,
      };
    });
    setPlayerPositions(positions);
  }, [team, formation]);

  // setup dragging
  useEffect(() => {
    if (!team) return;

    team.players.forEach((player) => {
      interact(`#player-${player.id}`)
        .draggable({
          listeners: {
            move(event) {
              setPlayerPositions((prev) => ({
                ...prev,
                [player.id]: {
                  x: prev[player.id].x + (event.dx / window.innerWidth) * 100,
                  y: prev[player.id].y + (event.dy / window.innerHeight) * 100,
                },
              }));
            },
          },
        });
    });
  }, [team]);

  if (!team || !formation) return null;

  return (
    <>
      {team.players.map((p, i) => (
        <Player
            {...p}
            id={p.id}
            x={playerPositions[p.id] ? playerPositions[p.id].x : 0}
            y={playerPositions[p.id] ? playerPositions[p.id].y : 0}
            color={team.color}
            i={i}
        />
      ))}
    </>
  );
};

export default Players;
