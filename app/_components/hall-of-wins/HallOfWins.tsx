"use client";
import FilterGroup from "./FilterGroup";
import { Game, User } from ".prisma/client";
import { useEffect, useMemo } from "react";
import useHallOfWins from "./useHallOfWins";
import { TimeFrame } from "@/_enums";
import GameList from "./GameList";
import EmptyGameList from "@/_components/hall-of-wins/EmptyGameList";
import NoGamesForFilter from "@/_components/hall-of-wins/NoGamesForFilter";
import ModalGame from "@/_components/modals/ModalGame";
import ModalCopySharedChallenge from "@/_components/modals/ModalCopySharedChallenge";

interface Props {
    games: Game[],
    user: User
}

export default function HallOfWins({ games, user }: Props) {
    const { difficulty, dimension, timeFrame, reset, setUser } = useHallOfWins();

    const filteredGames = useMemo(() => {
        let filteredGames = games;
        if (difficulty) {
            filteredGames = filteredGames.filter(game => game.difficulty == difficulty);
        }
        if (dimension) {
            filteredGames = filteredGames.filter(game => game.dimension == dimension);
        }

        if (timeFrame == TimeFrame.All) return filteredGames;

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());

        return filteredGames.filter(game => {
            const gameDate = new Date(game.updatedAt);
            if (timeFrame === TimeFrame.ThisMonth) {
                return gameDate >= firstDayOfMonth;
            } else if (timeFrame === TimeFrame.ThisWeek) {
                return gameDate >= firstDayOfWeek;
            }
            return false
        })

    }, [ games, difficulty, dimension, timeFrame ]);

    useEffect(() => {
        setUser(user);
        return () => reset()
    }, []);

    return (
        <div className="grid">
            <FilterGroup/>
            {games.length ? (
                filteredGames.length ? <GameList games={filteredGames}/> : <NoGamesForFilter/>
            ) : <EmptyGameList/>}

            <ModalGame/>
            <ModalCopySharedChallenge/>
        </div>
    );
};