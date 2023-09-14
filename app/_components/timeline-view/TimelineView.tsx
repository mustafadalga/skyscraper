"use client";
import { Chrono } from "react-chrono";
import "./chronoCustomStyles.css"
import BadgeIcon from "@/_components/badge/BadgeIcon";

interface Item {
    badgeID: string,
    title: string,
    cardDetailedText: string
}

interface Props {
    items: Item[],
    mode: "VERTICAL" | "HORIZONTAL",
    cardHeight: number
}

export default function TimelineView({ items, mode, cardHeight }: Props) {
    console.log(1, items)
    return (
        <Chrono items={items}
                mode={mode}
                theme={{
                    primary: "#a855f7",
                    secondary: "#a855f7",
                    cardForeColor: "violet",
                    titleColor: "black",
                    titleColorActive: "#a855f7",
                }}
                hideControls
                fontSizes={{
                    cardText: '0.50rem',
                    cardTitle: '0.80rem',
                    title: '0.80rem',
                }}
                cardHeight={cardHeight}>
            <div className="chrono-icons">
                {items.map(item => (
                    <BadgeIcon key={item.badgeID} badgeID={item.badgeID} className="text-white text-[8px]"/>
                ))}
            </div>
        </Chrono>
    );
};