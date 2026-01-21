import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tag',
            title: 'Tag / Service Line',
            type: 'string',
            description: 'e.g., "AI Automation & Cold Email"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            description: 'e.g., "$136K" or "94%"',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'e.g., "Annual Savings"',
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1).max(3),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'AI Automation', value: 'AI Automation' },
                    { title: 'Marketing', value: 'Marketing' },
                    { title: 'CRM & Operations', value: 'CRM & Operations' },
                    { title: 'Development', value: 'Development' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'priority',
            title: 'Priority',
            type: 'number',
            description: 'Lower number = higher priority (appears first)',
            initialValue: 10,
        }),
        defineField({
            name: 'annualSavings',
            title: 'Annual Savings (Number)',
            type: 'number',
            description: 'Used for sorting by highest ROI. Enter raw number (e.g., 136000)',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }, { type: 'code' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'tag',
        },
    },
});
