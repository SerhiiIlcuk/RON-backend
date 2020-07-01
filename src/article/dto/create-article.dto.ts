import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @ApiModelProperty({
        example: 'Example Title',
        description: 'Title of article',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly title: string;

    @ApiModelProperty({
        example: 'category e.g. Siete',
        description: 'Category of the article',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @ApiModelProperty({
        example: 'status e.g. draft or publish',
        description: 'Status of the article',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiModelProperty({
        example: 'feature status of article',
        description: 'feature status of the article',
        format: 'boolean',
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly featured: boolean;

    @ApiModelProperty({
        example: 'Body example ...',
        description: 'Main part of article',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
