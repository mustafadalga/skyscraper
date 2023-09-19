import React from 'react';
import Header from "@/(app)/_components/badges/Header";
import getBadges from "@/(app)/_actions/getBadges";
import Badges from "@/(app)/_components/badges/Badges";
import BadgesError from "@/(app)/_components/badges/BadgesError";
import { Badge } from ".prisma/client";
import { cloneDeep } from "lodash";
const Page = async () => {
    const badgesData = await getBadges();
    let badges: Badge[] = [];
    if (badgesData.status) {
        badges = cloneDeep(badgesData.data as Badge[]);
        badges.sort((a, b) => b.priority - a.priority);
    }
    return (
        <article className="container mx-auto p-10">
            <Header/>
            {badgesData.status ? <Badges badges={badges}/> : <BadgesError/>}
        </article>
    );
};

export default Page;