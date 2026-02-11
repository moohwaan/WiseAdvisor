import { defineField, defineType } from 'sanity'

export const macroInsights = defineType({
    name: 'macroInsights',
    title: 'Macro Insights',
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
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'weekNumber',
            title: 'Week Number',
            type: 'number',
            description: 'e.g., 42',
        }),
        defineField({
            name: 'keyIndicators',
            title: 'Key Indicators',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Indicator Name (e.g. GDP, Inflation)' },
                        { name: 'value', type: 'string', title: 'Current Value' },
                        {
                            name: 'trend',
                            type: 'string',
                            title: 'Trend',
                            options: {
                                list: [
                                    { title: 'Up', value: 'up' },
                                    { title: 'Down', value: 'down' },
                                    { title: 'Stable', value: 'stable' },
                                ],
                            },
                        },
                        { name: 'insight', type: 'text', title: 'Start Analyst Comment', rows: 2 },
                    ],
                },
            ],
        }),
        defineField({
            name: 'analysis',
            title: 'Detailed Analysis',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
            ],
        }),
        defineField({
            name: 'charts',
            title: 'Charts / Infographics',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true, caption: true } }],
        }),
        defineField({
            name: 'actionableAdvice',
            title: 'Actionable Advice',
            type: 'text',
            description: 'Key takeaways for investors',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'publishedAt',
        },
        prepare(selection) {
            const { date } = selection
            return { ...selection, subtitle: date && `Published: ${new Date(date).toLocaleDateString()}` }
        },
    },
})
