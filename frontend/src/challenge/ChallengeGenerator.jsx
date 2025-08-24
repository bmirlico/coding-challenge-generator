import 'react'
import { useState, useEffect } from 'react'
import {MCQChallenge} from './MCQChallenge.jsx'
import { useApi } from '../utils/api.js'

export function ChallengeGenerator() {
	const [challenge, setChallenge] = useState(null)
	const [isLoading, setIsloading] = useState(false)
	const [error, setError] = useState(null)
	const [difficulty, setDifficulty] = useState("easy")
	const [quota, setQuota] = useState(null)
	const { makeRequest } = useApi()

	useEffect(() => {
		fetchQuota()
	}, [])

	const fetchQuota = async () => {
		try {
			const data = await makeRequest("quota")
			setQuota(data)
		} catch (err) {
			console.log(err)
		}
	}

	const generateChallenge = async () => {
		setIsloading(true)
		setError(null)
		
		try {
			const data = await makeRequest('generate-challenge', {
				method: 'POST',
				body: JSON.stringify({difficulty})
			})
			setChallenge(data)
			fetchQuota()
		} catch (err) {
			setError(err.message || 'Failed to generate challenge')
		} finally {
			setIsloading(false)
		}
	}

	const getNextResetTime = () => {
		if (!quota?.last_reset_date) return null;
		const resetDate = new Date(quota.last_reset_date)
		resetDate.setHours(resetDate.getHours() + 24)
		return resetDate
	}

	return (
		<div className='challenge-container'>
			<h2>Coding Challenge Generator</h2>

			<div className='quota-display'>
				<p>The challenges remaining today: {quota?.quota_remaining || 0}</p>
				{quota?.quota_remaining === 0 && (
					<p>Next reset is: {getNextResetTime()?.toLocaleString()}</p>
				)}  
			</div>

			<div className='difficulty-selector'>
				<label htmlFor="difficulty">Select Difficulty</label>
				<select
					id="difficulty"
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}
					disabled={isLoading}>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</div>

			<button
				onClick={generateChallenge}
				disabled={isLoading || quota?.quota_remaining === 0}
				className='generate-button'
			>
				{isLoading ? "Generating...": "Generate Challenge"}
			</button>

			{error && (
				<div className='error-message'>
					<p>{error}</p>
				</div>
			)}

			{challenge && <MCQChallenge challenge={challenge}/>}
		</div>
	)
}