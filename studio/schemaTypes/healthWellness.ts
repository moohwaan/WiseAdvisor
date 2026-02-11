import { defineField, defineType } from 'sanity'

export const healthWellness = defineType({
    name: 'healthWellness',
    title: 'Health & Wellness',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Preventive Health', value: 'preventive' },
                    { title: 'Workout Program', value: 'workout' },
                    { title: 'Longevity Planning', value: 'longevity' },
                    { title: 'Nutrition', value: 'nutrition' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulty Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'beginner' },
                    { title: 'Intermediate', value: 'intermediate' },
                    { title: 'Advanced', value: 'advanced' },
                ],
            },
            hidden: ({ document }) => document?.category !== 'workout',
        }),
        defineField({
            name: 'equipment',
            title: 'Equipment Needed',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => document?.category !== 'workout',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube or Vimeo link for workout/guide',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
    ],
})
