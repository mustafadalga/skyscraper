import BadgeIcon from "./BadgeIcon";

interface Props {
    id: string,
    name: string
}

export default function Badge({ id, name }: Props) {
    return (
        <div className="grid place-items-center gap-2.5">
            <BadgeIcon badgeID={id} className="text-2xl lg:text-3xl xl:text-4xl text-purple-500"/>
            <h5 className="text-center mt-auto text-[10px] sm:text-xs lg:text-sm xl:text-base font-medium text-gray-500">{name}</h5>
        </div>
    );
};