<div align="center">
  [![GitHub version](https://badge.fury.io/gh/kevashcraft%2FEagleLogger.svg)](https://badge.fury.io/gh/kevashcraft%2FEagleLogger)

  [![Coverage Status](https://coveralls.io/repos/github/kevashcraft/EagleLogger/badge.svg?branch=master)](https://coveralls.io/github/kevashcraft/EagleLogger?branch=master)

  [![Build Status](https://travis-ci.org/kevashcraft/EagleLogger.svg?branch=master)](https://travis-ci.org/kevashcraft/EagleLogger)

  [![dependencies Status](https://david-dm.org/kevashcraft/EagleLogger/status.svg)](https://david-dm.org/kevashcraft/EagleLogger)

  [![NSP Status](https://nodesecurity.io/orgs/kevin-ashcraft/projects/532a8985-116a-4bef-a051-3b9af62034ac/badge)](https://nodesecurity.io/orgs/kevin-ashcraft/projects/532a8985-116a-4bef-a051-3b9af62034ac)
</div>

# EagleLogger

An amateur radio net logging web application built with Vue, Vuetify, and SocketIO.

## Getting Started

* [Initialize the Database](#initialize-database)
* [Install Dependencies](#install-dependencies)
* [Launch Dev Environment](#launch-dev-environment)

### Initialize Database

The schema is located in `/src/api/db` and can be imported with the `init` script which will create the database and user (defaulted to eaglelogger), import the schema from `./schema` and can also retrieve the FCC database data (fccdata=true) or import some dummy dev data (devdata=true).

Example:

`fccdata=true devdata=true ./init`

### Install Dependencies

The dependencies are installed with npm and can be installed with `npm install`

### Launch Dev Environment

The development environment is controlled with npm scripts to build, watch, and run the api and the site. Launch the entire environment with `npm run dev` which will host a site at [http://localhost:8080](http://localhost:8080).

## Database Schema

### Application Tables

The database has the following tables to track the primary application:

* Callsigns (callsigns) - All of the callsigns to ever checkin to a net or login to the program.
* Net Types (nettypes) - Information about the different types of nets (name, freq, etc.)
* Nets (nets) - Instances of a Net Types
* Checkins (checkins) - List of callsigns to checkin to each Net (callsign_id, net_id many-to-many lookup table)
* Users (users) - Callsigns to register with the application (passwords & email addresses)

### FCC Tables

[FCC database schema](http://wireless.fcc.gov/uls/documentation/pa_ddef50.pdf)

Files to be downloaded and parsed: EN.dat and HD.dat. Use the script at `/src/api/db/fccdata` to download and import the data.

TODO: Add a script to import the daily transaction logs to keep the database updated.
