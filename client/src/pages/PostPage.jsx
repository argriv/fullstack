import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
	createComment,
	getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
	const input = React.useRef(null)

	const handleClick1 = () => {
		input.current.focus()
	}
	const [open, setOpen] = React.useState(false)

	const [post, setPost] = useState(null)
	const [comment, setComment] = useState('')

	const { user } = useSelector(state => state.auth)
	const { comments } = useSelector(state => state.comment)
	
	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()

	const removePostHandler = () => {
		try {
			dispatch(removePost(params.id))
			toast('Пост был удален')
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = () => {
		try {
			const postId = params.id
			dispatch(createComment({ postId, comment }))
			setComment('')
		} catch (error) {
			console.log(error)
		}
	}
	
	const fetchComments = useCallback(async () => {
		try {
			dispatch(getPostComments(params.id))
		} catch (error) {
			console.log(error)
		}
	}, [params.id, dispatch])
	
	const fetchPost = useCallback(async () => {
		const { data } = await axios.get(`/posts/${params.id}`)
		setPost(data)
	}, [params.id])
	
	useEffect(() => {
		fetchPost()
	}, [fetchPost])
	
	useEffect(() => {
		fetchComments()
	}, [fetchComments])
	
	if (!post) {
		return (
			<div className='text-xl text-center text-white py-10'>Загрузка...</div>
		)
	}
	return (
		<article
			onClick={() => setOpen(false)}
			className='relative w-full break-inside py-6 rounded-lg flex flex-col bg-clip-border drop-shadow-md '
		>
			<div
				className='absolute top-auto w-9 h-[92%] -left-10 text-black bg-white hover:text-slate-600
			shadow-xl focus:ring-4 focus:outline-none0 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center'
			>
				<svg
					aria-hidden='true'
					className='w-10 h-10 rotate-180'
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					></path>
				</svg>
				<Link to='/' className='absolute w-full h-full left-0' />
			</div>
			<div className='flex items-start flex-row p-6 bg-white rounded-lg'>
				<div className='flex-[0_1_50%] pr-4'>
					{post.imgUrl && (
						<div className='flex justify-between mb-1 max-w-2xl '>
							<Link to='/' className='flex'>
								<img
									className='max-w-full '
									src={`http://localhost:3002/${post.imgUrl}`}
									alt=''
								/>
							</Link>
						</div>
					)}
					<p className='mb-4'>{post.text}</p>
					<h2 className='text-3xl'>{post.title}</h2>
				</div>
				<div className='w-full flex-[0_1_50%] flex justify-between flex-col min-h-[510px] '>
					<div className='flex flex-col'>
						<div className='flex mb-4 justify-between '>
							<div className='flex'>
								<Link to='/' className='inline-block mr-4'>
									<div className='rounded-full max-w-none w-12 h-12 flex items-center justify-center shrink-0 bg-blue-300 text-sm'>
										{post.username.trim().toUpperCase().split('').slice(0, 2)}
									</div>
								</Link>
								<div className='flex flex-col'>
									<Link to='/' className='inline-block text-lg font-bold '>
										{post.username}
									</Link>

									<Moment
										className='text-slate-500'
										date={post.createdAt}
										format='D MMM YYYY'
									/>
								</div>
							</div>
							<div className='relative' onClick={e => e.stopPropagation()}>
								{user?._id === post.author && (
									<>
										<button
											onClick={() => setOpen(!open)}
											id='dropdownMenuIconHorizontalButton'
											data-dropdown-toggle='dropdownDotsHorizontal'
											className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:outline-none'
											type='button'
										>
											<svg
												className='w-6 h-6'
												aria-hidden='true'
												fill='currentColor'
												viewBox='0 0 20 20'
											>
												<path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
											</svg>
										</button>
										{open && (
											<div
												id='dropdownDotsHorizontal'
												className='absolute z-10 w-44 right-0	 bg-white rounded divide-y divide-gray-100 shadow'
											>
												<ul
													className='py-1 text-sm text-gray-700 dark:text-gray-200'
													aria-labelledby='dropdownMenuIconHorizontalButton'
												>
													<li>
														<Link
															to={`/${params.id}/edit`}
															className='block py-2 px-4 hover:bg-gray-100'
														>
															Редактировать
														</Link>
													</li>
													<li>
														<button
															onClick={removePostHandler}
															className='py-2 px-4 hover:bg-gray-100 w-full text-start'
														>
															Удалить
														</button>
													</li>
												</ul>
											</div>
										)}
									</>
								)}
							</div>
						</div>
						<div className='flex items-center flex-wrap justify-between w-full mb-2'>
							<span
								onClick={handleClick1}
								className='text-gray-400 inline-flex items-center leading-none text-sm bg-slate-100 p-2 rounded-3xl cursor-pointer'
							>
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
						{comments?.map((cmt, index) => (
							<CommentItem key={index} cmt={cmt} />
						))}
					</div>
					<form onSubmit={e => e.preventDefault()} className='relative w-full'>
						<input
							value={comment}
							onChange={e => setComment(e.target.value)}
							ref={input}
							className='pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 placeholder:text-slate-600 font-medium pr-20 rounded-3xl focus:outline-none'
							type='text'
							placeholder='Write Link comment'
						/>
						<button
							onClick={handleSubmit}
							className='flex absolute right-3 top-2/4 -mt-3 items-center'
						>
							<svg
								className='fill-blue-500 cursor-pointer'
								style={{ width: '24px', height: '24px' }}
								viewBox='0 0 24 24'
							>
								<path d='M2,21L23,12L2,3V10L17,12L2,14V21Z'></path>
							</svg>
						</button>
					</form>
				</div>
			</div>
		</article>
	)
}
