import Image from "next/image";
import { User } from ".prisma/client";

interface Props {
    user: User
}

export default function Header({ user }: Props) {
    return (
        <section
            className="grid gap-5 bg-white shadow-[0px_0px_8px_0px_rgb(0,0,0,0.2)] rounded-bl-lg rounded-br-lg pb-5 overflow-hidden">
            <div className="w-full h-64">
                <Image src="https://images.unsplash.com/photo-1516464174449-3fc3cc40525f"
                       className="w-full h-full object-cover"
                       alt="Profile background image"
                       priority
                       width="0"
                       height="0"
                       sizes="100vw"/>
            </div>
            <div>
                <Image
                    src={user.image as string}
                    width={64}
                    alt={user.name as string}
                    height={64}
                    priority
                    className="mx-auto -mt-10 lg:-mt-14 xl:-mt-20 w-20 h-20 lg:w-32 lg:h-32 xl:w-40 xl:h-40 border-4 border-white rounded-full"/>

                <h1 className="w-full px-5 py-1 text-center truncate font-bold text-xl xl:text-2xl text-purple-500">{user.name}</h1>
            </div>
        </section>
    );
};