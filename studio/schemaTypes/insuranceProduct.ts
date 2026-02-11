import { defineField, defineType } from 'sanity'

export const insuranceProduct = defineType({
    name: 'insuranceProduct',
    title: 'Insurance Product',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Product Name',
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
            name: 'provider',
            title: 'Insurance Provider',
            type: 'string',
            description: 'e.g., AIA, Muang Thai Life, Allianz',
        }),
        defineField({
            name: 'type',
            title: 'Insurance Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Health Insurance', value: 'health' },
                    { title: 'Life Insurance', value: 'life' },
                    { title: 'Critical Illness', value: 'ci' },
                    { title: 'Pension / Saving', value: 'pension' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'keyBenefits',
            title: 'Key Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of main selling points',
        }),
        defineField({
            name: 'coverageDetails',
            title: 'Coverage Details',
            description: 'Structured data for comparison tables',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Feature (e.g., IPD Limit)' },
                        { name: 'value', type: 'string', title: 'Value (e.g., 5MB/Year)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'brochure',
            title: 'Brochure PDF',
            type: 'file',
        }),
        defineField({
            name: 'affiliateLink',
            title: 'Affiliate / Contact Link',
            type: 'url',
        }),
    ],
})
