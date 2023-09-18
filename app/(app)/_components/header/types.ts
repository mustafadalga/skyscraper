export interface MenuState {
    isHamburgerMenuOpen: boolean;
    isUserProfileMenuOpen: boolean;
}

export interface MenuAction  {
    type: string,
    menuName: keyof MenuState;
    status?: boolean
}
