import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/features/auth/authSlice'
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { status } = useSelector(state => state.auth)
	const isAuth = useSelector(checkIsAuth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = () => {
		try {
			dispatch(loginUser({ username, password }))
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (status) {
			toast(status)
		}
		console.log(status)
		if (isAuth) {
			navigate('/')
		}
	}, [status, isAuth, navigate])
	return (
		<div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
			<div className='sm:w-full p-10 m-auto drop-shadow-md bg-white rounded-3xl max-w-lg '>
				<div className='flex items-center justify-center flex-col'>
					<div className='mb-1'>
						<svg width='70' height='70' viewBox='0 0 32 32'>
							<g
								transform='matrix(.05696 0 0 .05696 .647744 2.43826)'
								fill='none'
								fillRule='evenodd'
							>
								<circle r='50.167' cy='237.628' cx='269.529' fill='#00d8ff' />
								<g stroke='#00d8ff' strokeWidth='24'>
									<path d='M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44-59.046-20.182-94.61-52.103-94.61-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z' />
									<path d='M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z' />
									<path d='M180.82 289.482C147.075 231.2 124.1 172.195 114.51 123.227c-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z' />
								</g>
							</g>
						</svg>
					</div>
					<h1 className='text-2xl font-bold text-gray-700'>Авторизация</h1>
				</div>
				<form className='mt-6' onSubmit={e => e.preventDefault()}>
					<div className='mb-2'>
						<label
							htmlFor='email'
							className='block text-sm font-semibold text-gray-700'
						>
							Username:
						</label>
						<input
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>
					<div className='mb-2'>
						<label
							htmlFor='password'
							className='block text-sm font-semibold text-gray-700'
						>
							Password:
						</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>
					<div className='mt-6'>
						<button
							onClick={handleSubmit}
							className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-400 focus:outline-none focus:bg-sky-400'
						>
							Войти
						</button>
					</div>
				</form>

				<p className='mt-8 text-xs font-light text-center text-gray-700'>
					{' '}
					У вас ещё нет аккаунта?{' '}
					<Link
						to='/register'
						className='font-medium text-sky-500 hover:underline'
					>
						Зарегистрироваться
					</Link>
				</p>
			</div>
		</div>
	)
}
