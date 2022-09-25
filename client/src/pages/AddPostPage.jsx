import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

export const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [imageURL, setImageURL] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const fileReader = new FileReader()
	fileReader.onloadend = () => {
		setImageURL(fileReader.result)
	}

	const handleOnChange = e => {
		e.preventDefault()
		const file = e.target.files[0]
		setImage(file)
		fileReader.readAsDataURL(file)
	}

	const removeImage = e => {
		e.preventDefault()
		setImage('')
		setImageURL('')
	}
	const handleSubmit = () => {
		try {
			toast('Пост добавлен')
			const data = new FormData()
			data.append('title', title)
			data.append('text', text)
			data.append('image', image)
			dispatch(createPost(data))
			navigate('/')
			setImage('')
			setImageURL('')
			setTitle('')
			setText('')
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className='relative flex flex-col justify-center min-h-screen overflow-hidden py-5'>
			<div className='sm:w-full p-10 m-auto drop-shadow-md bg-white rounded-3xl max-w-2xl '>
				<form onSubmit={e => e.preventDefault()}>
					{imageURL ? (
						<div className='flex w-full m-auto flex-col mb-6'>
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
						<div className='mb-2 bg-indigo-50 text-xs mt-2  border-2 border-dotted'>
							<label
								htmlFor='file'
								className='text-lg flex items-center justify-center cursor-pointer py-2 text-gray-400'
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
							onChange={e => setText(e.target.value)}
							className='w-full   p-4 text-gray-600 bg-indigo-50 outline-none rounded-md'
						></textarea>
					</div>
					<div className='mt-6'>
						<button
							onClick={handleSubmit}
							className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-400 focus:outline-none focus:bg-sky-400'
						>
							Добавить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
