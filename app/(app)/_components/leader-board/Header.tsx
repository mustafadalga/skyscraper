import { GiLaurelsTrophy } from 'react-icons/gi';

const Header = () => {
    return (
        <div className="grid place-items-center gap-5 mb-6">
            <GiLaurelsTrophy className="text-orange-400 text-5xl lg:text-6xl xl:text-7xl mb-2"/>
            <h1 className="text-3xl lg:text-4xl font-semibold text-purple-600">Leader Board</h1>
        </div>
    );
};

export default Header;