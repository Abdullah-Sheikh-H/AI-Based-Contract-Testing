import React, { useState } from "react"
import "./App.css"
import axios from "axios"
import { Configuration, OpenAIApi } from "openai"

function App() {
	const [text, setText] = useState("")
	const [response, setResponse] = useState("")
	const [isLoading, setIsLoading] = useState("")

	const option = {
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 100,
		top_p: 1,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	}
	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_API,
	})
	const openai = new OpenAIApi(configuration)

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log(process.env.REACT_APP_API)
		setIsLoading(true)
		console.log(text)
		let object = {
			...option,
			prompt: `${text}\n audit it and look for vunrabilites and security.`,
		}

		const response = await openai.createCompletion(object)

		console.log(response.data.choices[0].text)
		setResponse(response.data.choices[0].text)
		setIsLoading(false)
	}

	return (
		<div className=" App">
			<h1 className="mb-5 border-0 border-secondary bg-white d-flex m-auto justify-content-center text-dark mt-2 rounded-pill pb-2 pt-1 py-3 web-name">
				Fully Automatic Smart Contract Auditing
			</h1>
			<form className="mt-4 shadow-lg	" onSubmit={handleSubmit}>
				<textarea
					className="border border-0 rounded-top p-3 mb-0 col-12"
					placeholder="Paste your Smart Contract Code Here and click on Submit"
					value={text}
					onChange={(event) => setText(event.target.value)}
				/>
				<button
					type="submit"
					className="mt-0 border rounded-bottom rounded-top-0 border-0"
					disabled={text.length > 0 || !isLoading ? false : true}
				>
					{isLoading ? (
						<div className="loader ms-auto me-auto" style={{ height: "30px" }}>
							<svg
								className="circular-loader"
								viewBox="25 25 50 50"
								style={{ height: "30px" }}
							>
								<circle
									className="loader-path"
									cx="50"
									cy="50"
									r="20"
									fill="none"
									style={{ height: "30px" }}
								></circle>
							</svg>
						</div>
					) : (
						"Submit"
					)}
				</button>
			</form>
			<br />
			<div className="ads border border-0 bg-white mt-5 d-flex m-auto row">
				<div className="col-4 border border-dark"></div>
				<div className="col-4 border border-dark"></div>
				<div className="col-4 border border-dark"></div>
			</div>
			<br />

			<div className="output border border-0 rounded-4 bg-white p-3 mt-5 d-flex m-auto mb-3">
				{response && <p>{response}</p>}
			</div>
			<br />
		</div>
	)
}

export default App
