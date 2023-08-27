import { BadgeLevelDetails } from "@/_types";


export const difficulties = [
    {
        label: "Easy",
        value: "easy",
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "Hard",
        value: "hard",
    },
];

export const dimensions = [
    {
        "label": "3 X 3",
        "value": 3
    },
    {
        "label": "4 X 4",
        "value": 4
    },
    {
        "label": "5 X 5",
        "value": 5
    },
    {
        "label": "6 X 6",
        "value": 6
    },
    {
        "label": "7 X 7",
        "value": 7
    },
    {
        "label": "8 X 8",
        "value": 8
    },
    {
        "label": "9 X 9",
        "value": 9
    },
    {
        "label": "10 X 10",
        "value": 10
    },
    {
        "label": "11 X 11",
        "value": 11
    },
    {
        "label": "12 X 12",
        "value": 12
    }
]

export const badgeLevelDetails: BadgeLevelDetails = {
    "novice_builder": {
        "difficulty": "easy",
        "dimension": 3
    },
    "fast_builder": {
        "difficulty": "medium",
        "dimension": 4
    },
    "perfectionist": {
        "difficulty": "medium",
        "dimension": 5
    },
    "skyscraper_enthusiast": {
        "difficulty": "medium",
        "dimension": 5
    },
    "no_hints_needed": {
        "difficulty": "hard",
        "dimension": 5
    },
    "time_lord": {
        "difficulty": "medium",
        "dimension": 5
    },
    "puzzle_explorer": {
        "difficulty": "medium",
        "dimension": 5
    },
    "master_planner": {
        "difficulty": "hard",
        "dimension": 6
    },
    "the_visionary": {
        "difficulty": "hard",
        "dimension": 7
    },
    "the_high_scorer": {
        "difficulty": "hard",
        "dimension": 7
    },
    "seasoned_builder": {
        "difficulty": "hard",
        "dimension": 8
    },
    "puzzle_maestro": {
        "difficulty": "hard",
        "dimension": 9
    },
    "puzzle_virtuoso": {
        "difficulty": "hard",
        "dimension": 10
    },
    "puzzle_legend": {
        "difficulty": "hard",
        "dimension": 11
    },
    "puzzle_olympian": {
        "difficulty": "hard",
        "dimension": 11
    },
    "puzzle_immortal": {
        "difficulty": "hard",
        "dimension": 12
    }
}