import { generateComponent } from '../src/utils/component-generator'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const componentName = process.argv[2]
if (!componentName) {
  console.error('Please provide a component name')
  process.exit(1)
}

const template = {
  name: componentName,
  description: `${componentName} component`,
  props: {
    variant: 'string',
    size: 'string'
  },
  events: ['click'],
  slots: ['default']
}

const { component, test, story } = generateComponent(template)

// Create component directory
const componentDir = path.join(__dirname, '../src/components', componentName)
fs.mkdirSync(componentDir, { recursive: true })

// Write files
fs.writeFileSync(path.join(componentDir, `${componentName}.vue`), component)
fs.writeFileSync(path.join(componentDir, `${componentName}.test.ts`), test)
fs.writeFileSync(path.join(componentDir, `${componentName}.stories.ts`), story)

console.log(`Generated component ${componentName} with test and story files`)