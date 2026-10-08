'use client'
import { useState } from 'react'

import '@fontsource/roboto'
import {
  JBrowseLinearGenomeView,
  useCreateViewState,
} from '@jbrowse/react-linear-genome-view2'
import makeWorkerInstance from '@jbrowse/react-linear-genome-view2/esm/makeWorkerInstance'

import { assembly, tracks, view } from './config'

const genes = [
  { name: 'CYP2C19', loc: '10:94,762,681..94,855,547' },
  { name: 'BRCA2', loc: '13:32,315,086..32,400,266' },
]

export default function App() {
  const state = useCreateViewState({
    assembly,
    tracks,
    view,
    makeWorkerInstance,
  })
  const [snapshot, setSnapshot] = useState('')
  if (!state) {
    return null
  }
  return (
    <>
      <h1>JBrowse 2 linear genome view with Next.js</h1>
      <JBrowseLinearGenomeView viewState={state} />
      <h3>Code</h3>
      <p>
        The code for this app is at{' '}
        <a href="https://github.com/GMOD/jbrowse-react-linear-genome-view-nextjs-demo">
          https://github.com/GMOD/jbrowse-react-linear-genome-view-nextjs-demo
        </a>
        .
      </p>
      <h3>Control the view</h3>
      <p>Each button navigates the view to that gene.</p>
      {genes.map(({ name, loc }) => (
        <button
          key={name}
          onClick={() => {
            state.session.view.navToLocString(loc).catch((e: unknown) => {
              console.error(e)
            })
          }}
        >
          {name}
        </button>
      ))}
      <h3>See the state</h3>
      <p>
        The button below shows the current session, which includes the region
        the view is showing and which tracks are open. Pass this object back as{' '}
        <code>session</code> to restore it.
      </p>
      <button
        onClick={() => {
          setSnapshot(JSON.stringify(state.session, undefined, 2))
        }}
      >
        Show session
      </button>
      <textarea value={snapshot} readOnly rows={20} cols={80} />
    </>
  )
}
