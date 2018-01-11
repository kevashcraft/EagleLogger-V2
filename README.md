# EagleLogger

An amateur radio net logging web application built with Vue, Vuetify, and SocketIO.

## Getting Started

* [Create the Database](#database-schema)
* [Install Dependencies](#dependency-modules)

### Database Schema

The schema is located in `/src/api/db` and can be imported with the `init` script which will create the database and user (defaulted to eaglelogger), import the schema from `./schema` and can also retrieve the FCC database data (fccdata=true) or import some dummy dev data (devdata=true).

Example:

`fccdata=true devdata=true ./init`

### Dependency Modules

The dependencies are installed with npm and can be installed with `npm install`

### Development Environment

The development environment is controlled with npm scripts to build, watch, and run the api and the site. Launch the entire environment with `npm run dev` which will host a site at [http://localhost:8080](http://localhost:8080).
