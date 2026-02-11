import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Unknown project',

  projectId: 'rocd6qow',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('WiseAdvisor Content')
          .items([
            S.documentTypeListItem('macroInsights').title('Macro Insights'),
            S.divider(),
            S.documentTypeListItem('healthWellness').title('Health & Wellness'),
            S.documentTypeListItem('parentingContent').title('Parenting & Education'),
            S.divider(),
            S.documentTypeListItem('insuranceProduct').title('Insurance Products'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
