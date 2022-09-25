import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
	const menu = [
		{ id: 1, text: 'Главная', to: '/' },
		{ id: 2, text: 'Мои посты', to: '/posts' },
		{ id: 3, text: 'Добавить пост', to: '/new' },
	]

	const navigate = useNavigate()

	const activeStyle = {
		background: 'rgb(241 245 249)',
		borderRadius: '100px',
		paddingTop: '7px',
		paddingBottom: '7px',
	}
	// const location = useLocation()
	const dispatch = useDispatch()
	// const navigate = useNavigate()

	const isAuth = useSelector(checkIsAuth)

	//handle click
	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из аккаунта')
		navigate('/login')
	}

	return (
		<header className='w-full bg-white px-2 drop-shadow-sm'>
			<nav className='flex py-2 items-center container mx-auto justify-between'>
				<div className='flex justify-between w-full flex-[0_1_65%]'>
					<Link to='/' className='flex items-center space-x-2'>
						<svg width='40' height='40' viewBox='0 0 32 32'>
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
					</Link>
					<div className='md:flex lg:flex space-x-3'>
						{isAuth && (
							<ul className='flex items-center space-x-4'>
								{menu.map(item => (
									<li key={item.id} className='relative group'>
										<NavLink
											style={({ isActive }) =>
												isActive ? activeStyle : undefined
											}
											to={item.to}
											className='text-slate-700 text-base px-3'
										>
											{item.text}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className='flex flex-[0_1_35%] justify-end'>
					<div className='flex items-center pr-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6 mr-2 text-blue-600'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
						<input
							type='text'
							name='name'
							placeholder='Поиск...'
							className='py-2 w-14 border-b-2 border-blue-400 outline-none focus:w-72'
						/>
					</div>
					<div className='bg-blue-600 ring-blue-400 text-white focus:ring-4 transition duration-300 rounded-3xl hover:bg-blue-700'>
						{isAuth ? (
							<button className='px-3 py-2' onClick={logoutHandler}>
								Выйти
							</button>
						) : (
							<Link className='block px-3 py-2' to={'/login'}>
								Войти
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	)
}
