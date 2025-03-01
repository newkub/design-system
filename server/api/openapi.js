import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Read the OpenAPI spec file
    const openapiPath = path.resolve('public/openapi.yaml')
    const openapiContent = fs.readFileSync(openapiPath, 'utf8')
    
    // Parse YAML to JSON
    const openapiSpec = yaml.load(openapiContent)
    
    return openapiSpec
  } catch (error) {
    console.error('Error loading OpenAPI spec:', error)
    return { error: 'Failed to load OpenAPI specification' }
  }
})