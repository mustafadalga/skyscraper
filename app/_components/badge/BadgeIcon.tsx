import {
    FaRegStar, FaStopwatch, FaCity,
    FaHistory, FaCompass, FaChessQueen, FaPuzzlePiece,
    FaFire, FaMedal, FaCrown, FaStar,
    FaBook, FaTrophy, FaAward, FaShieldAlt,
    FaInfinity,
    FaLightbulb
} from 'react-icons/fa';
import { MdVisibility } from "react-icons/md"
import { Badge } from "@/_enums";

interface Props {
    badgeID: string,
    className: string
}

const BadgeIcon = ({ badgeID, className }: Props) => {
    switch (badgeID) {
        case Badge.NoviceBuilder:
            return <FaRegStar className={className}/>;
        case Badge.FastBuilder:
            return <FaStopwatch className={className}/>;
        case Badge.Perfectionist:
            return <FaLightbulb className={className}/>;
        case Badge.SkyscraperEnthusiast:
            return <FaCity className={className}/>;
        case Badge.NoHintsNeeded:
            return <MdVisibility className={className}/>;
        case Badge.TimeLord:
            return <FaHistory className={className}/>;
        case Badge.PuzzleExplorer:
            return <FaCompass className={className}/>;
        case Badge.MasterPlanner:
            return <FaChessQueen className={className}/>;
        case Badge.PuzzleSolver:
            return <FaPuzzlePiece className={className}/>;
        case Badge.StreakBuilder:
            return <FaFire className={className}/>;
        case Badge.SeasonedBuilder:
            return <FaMedal className={className}/>;
        case Badge.PuzzleMaestro:
            return <FaCrown className={className}/>;
        case Badge.PuzzleVirtuoso:
            return <FaStar className={className}/>;
        case Badge.PuzzleAdept:
            return <FaBook className={className}/>;
        case Badge.PuzzleLegend:
            return <FaTrophy className={className}/>;
        case Badge.PuzzleOlympian:
            return <FaAward className={className}/>;
        case Badge.PuzzleHero:
            return <FaShieldAlt className={className}/>;
        case Badge.PuzzleImmortal:
            return <FaInfinity className={className}/>;
        default:
            return <span>Unknown Badge</span>;
    }
};

export default BadgeIcon;
