import React from 'react'
import { DataStory } from './DataStory'

describe('<DataStory />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DataStory />)
  })
})
