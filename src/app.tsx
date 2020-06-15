import React, { useState } from 'react'
import Tauri from 'tauri/api'

import './app.css'

export function App(): React.ReactElement {
	const [rustMsg, setRustMsg] = useState('')

	return (
		<>
			<h1>Hello World from Tauri Typescript React!</h1>
			<button onClick={() => {
				Tauri.promisified({
					cmd: 'performRequest',
					endpoint: 'dummy endpoint arg',
					body: ['This', 'is', 'a', 'message', 'from', 'the', 'web']
				})
				.then(Tauri.registerResponse)
				.then(res => {
					setRustMsg(res.message)
				})
				.catch(Tauri.registerResponse)
			}}>Get a Message from Rust</button>
			{!!rustMsg && (
				<h2>{rustMsg}</h2>
			)}
		</>
	)
}