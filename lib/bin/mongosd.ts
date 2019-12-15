#!/usr/bin/env node

process.argv.map(arg => {
  if (arg === '--init') {
    console.log('Initializing')
  }
})
