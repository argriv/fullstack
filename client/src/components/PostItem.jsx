import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export const PostItem = ({ post }) => {

	if (!post) {
		return (
			<div className='text-xl text-center text-white py-10'>Загрузка...</div>
		)
	}
		    const avatar = post.username.trim().toUpperCase().split('').slice(0, 2)

	return (
		<article className='mb-4 max-w-2xl w-full break-inside p-6 rounded-lg bg-white flex flex-col bg-clip-border drop-shadow-md'>
			<div className='flex items-start flex-col'>
				<div className='flex mb-4'>
					<Link to='/' className='inline-block mr-4'>
						<div className='rounded-full max-w-none w-12 h-12 flex items-center justify-center shrink-0 bg-gradient-to-t from-yellow-400 to-rose-400 text-white font-semibold text-sm'>
							{avatar}
						</div>
					</Link>
					<div className='flex flex-col'>
						<Link
							to={`/${post._id}`}
							className='inline-block text-lg font-bold '
						>
							{post.username}
						</Link>

						<Moment
							className='text-slate-500'
							date={post.createdAt}
							format='D MMM YYYY'
						/>
					</div>
				</div>
				<h2 className='text-3xl'>{post.title}</h2>
				{post.imgUrl && (
					<div className='py-4'>
						<div className='flex justify-between mb-1 max-w-2xl '>
							<Link to={`/${post._id}`} className='flex'>
								<img
									className='max-w-full '
									src={`http://localhost:3002/${post.imgUrl}`}
									alt=''
								/>
							</Link>
						</div>
					</div>
				)}
				<p className='mb-4'>{post.text}</p>
				<div className='flex items-center flex-wrap justify-between w-full mb-2'>
					<span className='text-gray-400 inline-flex items-center leading-none text-sm bg-slate-100 p-2 rounded-3xl cursor-pointer'>
						<svg
							className='w-8 h-6 mr-1'
							stroke='currentColor'
							strokeWidth='2'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							viewBox='0 0 24 24'
						>
							<path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
						</svg>
						{post.comments?.length}
					</span>
					<span className='text-gray-400 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm'>
						<svg
							className='w-4 h-4 mr-1'
							stroke='currentColor'
							strokeWidth='2'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							viewBox='0 0 24 24'
						>
							<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
							<circle cx='12' cy='12' r='3'></circle>
						</svg>
						{post.views}
					</span>
				</div>
			</div>
		</article>
	)
}
