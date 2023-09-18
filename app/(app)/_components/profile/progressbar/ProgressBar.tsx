import { CSSProperties } from "react";
import progressBar from "./progressbar.module.css"
import BadgeIcon from "@/(app)/_components/badge/BadgeIcon";
import { IUpcomingBadge } from "@/(app)/_utilities/calculateUpcomingBadge";

interface Props {
    badge: IUpcomingBadge
}

const IconChevron = () => {
    return <svg className="absolute text-white h-3 w-full left-0 top-full" x="0px" y="0px"
                viewBox="0 0 255 255" xmlSpace="preserve">
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
    </svg>
}

export default function ProgressBar({ badge }: Props) {
    const progressBarStyle = {
        '--progress-bar-width': `${badge.percent}%`,
        "--percent": `${badge.percent - 5}%`,
        "--badge-icon-color": `${badge.percent == 100 ? "#ffffff" : "#a855f7"}`,
        "--percent-margin-left": `${badge.percent > 98 ? badge.percent - 8 : badge.percent - 5}%`

    } as CSSProperties;

    return (
        <div
            style={progressBarStyle}
            className={`${progressBar.progressBar} group flex items-center relative w-full bg-gray-200 h-6 rounded-lg after:absolute after:h-full after:bg-gradient-to-r after:from-purple-200 after:to-purple-700 after:rounded-lg`}>

            <span
                className={`${progressBar.percent} absolute z-20 top-1/2 -translate-y-1/2 text-xs text-white`}>%{Math.round(badge.percent)}</span>
            <BadgeIcon badgeID={badge.id}
                       className={`${progressBar.badgeIconColor} group absolute z-10 right-1.5 top-1/2 -translate-y-1/2 text-sm`}/>
            <div
                className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition absolute bottom-full h-3 w-full">
                <div
                    className="absolute right-0 bottom-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 text-xs py-3 px-4 min-w-fit">

                    <ul className="grid gap-1.5">
                        <li>
                            <span className="font-semibold text-gray-700">Name:</span>
                            <span className="text-gray-500"> {badge.name} </span>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-700">Description:</span>
                            <span className="text-gray-500"> {badge.description} </span>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-700">Criteria:</span>
                            <span className="text-gray-500"> {badge.criteria} </span>
                        </li>
                    </ul>

                    <IconChevron/>
                </div>
            </div>

        </div>
    );
};