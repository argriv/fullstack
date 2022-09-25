import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
	const menu = [
		{ id: 1, text: 'Главная', to: '/' },
		{ id: 2, text: 'Мои посты', to: '/posts' },
		{ id: 3, text: 'Добавить пост', to: '/new' },
	]

	return (
		<aside className='mb-6 rounded-lg drop-shadow-md max-h-full h-96 bg-white p-5 lg:p-2 w-full'>
			<div className='relative w-full lg:hidden mb-3'>
				<input
					type='search'
					id='search-dropdown'
					className='block w-full px-4 py-2  bg-white border rounded-2xl focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40'
					placeholder='Поиск...'
					required
				/>
				<button
					type='submit'
					className='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-2xl border border-blue-700'
				>
					<svg
						aria-hidden='true'
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						></path>
					</svg>
					<span className='sr-only'>Search</span>
				</button>
			</div>
			<nav>
				<ul className='flex lg:flex-wrap lg:flex-col lg:align-center'>
					{menu.map(item => (
						<li className='mb-0.5' key={item.id}>
							<Link
								to={item.to}
								className='text-slate-500 flex p-2  rounded-3xl  hover:bg-slate-100'
							>
								{item.text}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}
