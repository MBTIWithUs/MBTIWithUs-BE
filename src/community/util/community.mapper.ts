import { CreateCommunityDto } from "../dto/create-community.dto";
import { UpdateCommunityDto } from "../dto/update-community.dto";
import { Community } from "../entities/community.entity";
import { load } from "cheerio";
import { contents } from "cheerio/lib/api/traversing";

export class CommunityMapper {

    removeAllHtmlTags(str: string): string {
        return str.replace(/<[^>]*>?/g, "")
            .replace(/[\s]+/g, " ");
    }

    findFirstImgTagSrc(str: string): string {
        const $ = load(str);
        console.log($('img'));
        console.log($('img').first());
        console.log($('img').first().attr('src'));
        let src = $('img').first().attr('src');
        return Boolean(src) ? src : null;
    }

    createDtoToEntity(createDto: CreateCommunityDto): Community {
        let entity: Community = new Community;
        entity.isAnonymous = createDto.isAnonymous;
        entity.title = createDto.title
        entity.content = createDto.content;
        entity.tag = createDto.tag;
        entity.views = 0;

        entity.summary = this.removeAllHtmlTags(createDto.content);
        entity.summary = entity.summary.length > 30 ? entity.summary.substring(0, 30) : entity.summary;
        entity.thumbnail = this.findFirstImgTagSrc(createDto.content);

        entity.createdAt = new Date().getTime() + "";
        return entity;
    }

    updateDtoToEntity(updateDto: UpdateCommunityDto, entity: Community): void {
        if (Boolean(updateDto.title)) entity.title = updateDto.title;
        if (Boolean(updateDto.content)) {
            entity.content = updateDto.content;
            
            entity.summary = this.removeAllHtmlTags(updateDto.content);
            entity.summary = entity.summary.length > 30 ? entity.summary.substring(0, 30) : entity.summary;
            entity.thumbnail = this.findFirstImgTagSrc(updateDto.content);
        }
        if (Boolean(updateDto.tag)) entity.tag = updateDto.tag;
        entity.updatedAt = new Date().getTime() + "";
    }
}