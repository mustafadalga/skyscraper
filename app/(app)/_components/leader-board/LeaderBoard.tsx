"use client";
import { useMemo } from "react";
import useLeaderBoardStore from "./useLeaderBoardStore";
import { IUser } from "./types";
import ListOptions from "./ListOptions";
import LeaderBoardList from "./LeaderBoardList";
import NoLeadersForFilter from "./NoLeadersForFilter";
import { TimeFrame } from "@/(app)/_enums";

interface Props {
    top100: IUser[]
}

const LeaderBoard = ({ top100 }: Props) => {
    const { timeFrame } = useLeaderBoardStore();

    const users = useMemo(() => {
        if (timeFrame == TimeFrame.All) return top100;

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());


        return top100.filter(user => {
            const userDate = new Date(user.updatedAt);
            if (timeFrame === TimeFrame.ThisMonth) {
                return userDate >= firstDayOfMonth;
            } else if (timeFrame === TimeFrame.ThisWeek) {
                return userDate >= firstDayOfWeek;
            }
            return false
        })

    }, [ timeFrame, top100 ])
    return (
        <div className="grid">
            <ListOptions/>
            <div key={new Date().getTime()} className="overflow-x-auto animate-fade-in-bottom">
                {users.length ? <LeaderBoardList top100={users}/> : <NoLeadersForFilter/>}
            </div>
        </div>
    );
};

export default LeaderBoard;