import React from 'react';
import { Metadata } from "next";
import { cloneDeep } from "lodash";
import { Badge } from ".prisma/client";
import getBadges from "@/(app)/_actions/getBadges";
import Header from "@/(app)/_components/badges/Header";
import Badges from "@/(app)/_components/badges/Badges";
import BadgesError from "@/(app)/_components/badges/BadgesError";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: "Unlock Achievement Badges: Complete Guide & Criteria - Skyscraper",
    description: "Discover the exclusive range of achievement badges on Skyscraper. Learn how to unlock each badge, understand their criteria, and elevate your gaming experience today!"
}

export default async function Page() {
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