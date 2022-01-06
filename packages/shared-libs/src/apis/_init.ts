import "reflect-metadata"
import { join } from 'path'
import { Express } from 'express'
import { connect } from "../common/conn"
import cors from 'cors'

interface Config {
  dev: boolean
  apiFolder: string
  assetsFolder: string
  url: string
  jsonLimit: string
  extension: string
}

export const beforeParser = async (app: Express, config: Config) => {
  await connect()
  app.use(cors())
}

export default async (app: Express, config: Config) => {
  app.use('*', (req, res) => res.sendFile(join(config.assetsFolder, 'index.html')))
}
