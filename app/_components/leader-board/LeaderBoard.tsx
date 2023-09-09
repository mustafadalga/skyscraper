"use client";
import { useMemo } from "react";
import { Button, useLeaderBoardStore } from "@/_store/useLeaderBoardStore";
import { IUser } from "./types";
import ListOptions from "./ListOptions";
import LeaderBoardList from "./LeaderBoardList";
import EmptyLeaderboardMessage from "./EmptyLeaderboardMessage";

interface Props {
    top100: IUser[]
}

const LeaderBoard = ({ top100 }: Props) => {
    const selectedOption = useLeaderBoardStore(state => state.selectedButton);

    const users = useMemo(() => {
        if (selectedOption == Button.Top100) return top100;

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());


        return top100.filter(user => {
            const userDate = new Date(user.updatedAt);
            if (selectedOption === Button.ThisMonth) {
                return userDate >= firstDayOfMonth;
            } else if (selectedOption === Button.ThisWeek) {
                return userDate >= firstDayOfWeek;
            }
            return false
        })

    }, [ selectedOption, top100 ])
    return (
        <div>
            <ListOptions/>
            <div key={new Date().getTime()} className="animate-fade-in-bottom">
                {users.length ? <LeaderBoardList top100={users}/> : <EmptyLeaderboardMessage/>}
            </div>
        </div>
    );
};

export default LeaderBoard;