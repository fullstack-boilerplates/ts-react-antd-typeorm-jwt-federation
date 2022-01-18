import { join } from 'path'
import { Express } from 'express'

interface Config {
  dev: boolean
  apiFolder: string
  assetsFolder: string
  url: string
  jsonLimit: string
  extension: string
}

export default async (app: Express, config: Config) => {
  app.use('*', (req, res) => res.sendFile(join(config.assetsFolder, 'index.html')))
}
