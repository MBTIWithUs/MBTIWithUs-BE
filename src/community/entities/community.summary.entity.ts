import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { Community } from "./community.entity";

@ViewEntity({
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select("community.id", "id")
        .addSelect("community.creatorId", "creatorId")
        .addSelect("community.isAnonymous", "isAnonymous")
        .addSelect("community.title", "title")
        .addSelect("community.summary", "summary")
        .addSelect("community.thumbnail", "thumbnail")
        .addSelect("community.tag", "tag")
        .addSelect("community.views", "views")
        .addSelect("community.likes", "likes")
        .addSelect("community.createdAt", "createdAt")
        .addSelect("community.updatedAt", "updatedAt")
        .addSelect("community.deletedAt", "deletedAt")
        .from(Community, "community")
})
export class CommunitySummary {

    @ViewColumn()
    id: number;
    @ViewColumn()
    creatorId: number;
    @ViewColumn()
    isAnonymous: boolean;

    @ViewColumn()
    title: string;
    @ViewColumn()
    tag: string;
    @ViewColumn()
    summary: string;
    @ViewColumn()
    thumbnail: string;

    @ViewColumn()
    views: number;

    @ViewColumn()
    likes: number;

    @ViewColumn()
    createdAt: string;
    @ViewColumn()
    updatedAt: string;
    @ViewColumn()
    deletedAt: string;
}