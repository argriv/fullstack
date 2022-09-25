import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'

import axios from '../utils/axios'

export const EditPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [oldImage, setOldImage] = useState('')
	const [newImage, setNewImage] = useState('')
	const [imageURL, setImageURL] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const fileReader = new FileReader()
	fileReader.onloadend = () => {
		setImageURL(fileReader.result)
	}

	const handleOnChange = e => {
		e.preventDefault()
		const file = e.target.files[0]
		setNewImage(file)
		fileReader.readAsDataURL(file)
	}
	const fetchPost = useCallback(async () => {
		const { data } = await axios.get(`/posts/${params.id}`)
		setTitle(data.title)
		setText(data.text)
		setOldImage(data.imgUrl)
	}, [params.id])

	const removeImage = e => {
		e.preventDefault()
		setNewImage('')
		setOldImage('')
		setImageURL('')
	}

	const submitHandler = () => {
		try {
			const updatedPost = new FormData()
			updatedPost.append('title', title)
			updatedPost.append('text', text)
			updatedPost.append('id', params.id)
			updatedPost.append('image', newImage)
			dispatch(updatePost(updatedPost))
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	return (
		<div className='relative flex flex-col justify-center min-h-screen overflow-hidden py-5'>
			<div className='sm:w-full p-10 m-auto drop-shadow-md bg-white rounded-3xl max-w-2xl '>
				<form onSubmit={e => e.preventDefault()}>
					{imageURL ? (
						<div className='flex w-1/2 m-auto flex-col mb-6'>
							<label className='text-lg flex items-center justify-center py-2 text-gray-400'>
								Фото поста:
							</label>
							<img className='rounded-md mb-6' alt='' src={imageURL}></img>
							<button
								onClick={removeImage}
								className='px-3 py-2 bg-sky-500 ring-sky-200 text-white focus:ring-4 transition duration-300 rounded-lg hover:bg-sky-400'
							>
								Удалить
							</button>
						</div>
					) : (
						<div className='flex w-full m-auto flex-col mb-6'>
							<label
								htmlFor='file'
								className='text-lg flex items-center justify-center cursor-pointer py-2 text-gray-400 bg-indigo-50 border-2 border-dotted mb-5'
							>
								Прикрепить изображение:
							</label>
							<input
								accept='image/*'
								onChange={handleOnChange}
								type='file'
								id='file'
								className='hidden'
							/>
							<img
								className='rounded-md mb-6'
								alt=''
								src={`http://localhost:3002/${oldImage}`}
							></img>
							{oldImage && (
								<button
									onClick={removeImage}
									className='px-3 py-2 bg-sky-500 ring-sky-200 text-white focus:ring-4 transition duration-300 rounded-lg hover:bg-sky-400'
								>
									Удалить
								</button>
							)}
						</div>
					)}
					<div className='mb-2'>
						<label htmlFor='title' className='block mb-2 text-lg'>
							Заголовок поста:
						</label>
						<input
							type='text'
							placeholder='Заголовок поста..'
							id='title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='w-full p-4 text-gray-600 bg-indigo-50 outline-none rounded-md'
						/>
					</div>
					<div className='mb-2'>
						<label htmlFor='description' className='block mb-2 text-lg '>
							Текст поста:
						</label>
						<textarea
							id='description'
							cols='30'
							rows='10'
							placeholder='Текст поста..'
							value={text}
							onChange={e => setText(e.target.value)}
							className='w-full   p-4 text-gray-600 bg-indigo-50 outline-none rounded-md'
						></textarea>
					</div>
					<div className='mt-6'>
						<button
							onClick={submitHandler}
							className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-400 focus:outline-none focus:bg-sky-400'
						>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
