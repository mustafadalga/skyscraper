import Image from "next/image";

export default function IconAvatarGroup() {
    const avatars = [ "women/1.jpg", "women/2.jpg", "men/1.jpg", "men/2.jpg" ]
    return (
        <div className="flex -space-x-4">
            {avatars.map(avatar => (
                <Image key={avatar}
                       width={48}
                       height={48}
                       className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white rounded-full dark:border-gray-800"
                       src={`https://randomuser.me/api/portraits/${avatar}`}
                       alt="Avatar"/>
            ))}
            <div
                className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 text-xs font-medium text-white bg-purple-500 border-2 border-white rounded-full">
                +99
            </div>
        </div>
    );
};