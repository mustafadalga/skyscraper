/**
 * Enum representing the various badges that can be earned by users.
 * These badges reflect different achievements and milestones in the game.
 */
export enum Badge {
    NoviceBuilder = "novice_builder",
    FastBuilder = "fast_builder",
    Perfectionist = "perfectionist",
    SkyscraperEnthusiast = "skyscraper_enthusiast",
    NoHintsNeeded = "no_hints_needed",
    TimeLord = "time_lord",
    PuzzleExplorer = "puzzle_explorer",
    MasterPlanner = "master_planner",
    PuzzleSolver = "puzzle_solver",
    StreakBuilder = "streak_builder",
    SeasonedBuilder = "seasoned_builder",
    PuzzleMaestro = "puzzle_maestro",
    PuzzleVirtuoso = "puzzle_virtuoso",
    PuzzleAdept="puzzle_adept",
    PuzzleLegend = "puzzle_legend",
    PuzzleOlympian = "puzzle_olympian",
    PuzzleHero="puzzle_hero",
    PuzzleImmortal = "puzzle_immortal"
}

/**
 * Enum representing the various difficulty levels in the game.
 * These are used to categorize puzzles and tailor the game experience.
 */
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

/**
 * Enum representing directions in the game grid.
 * Used for hint directions.
 */
export enum Direction {
    TOP = "top",
    LEFT = "left",
    RIGHT = "right",
    BOTTOM = "bottom"
}

/**
 * Enum representing different time frames for statistical analysis.
 * Used for filtering and sorting leaderboards or achievements.
 */
export enum TimeFrame {
    All,
    ThisMonth,
    ThisWeek
}