import React, { useEffect, useState } from 'react'
import { SideBar } from '../components/SideBar'
import { PostItem } from '../components/PostItem'
import { PopularPostBar } from '../components/PopularPostBar'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'
import { useDispatch } from 'react-redux'

export const MainPage = () => {
	const { posts, popularPosts } = useSelector(state => state.post)
	const [enabled, setEnabled] = useState(true)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch])

	if (!posts.length) {
		return (
			<div className='text-xl text-center text-white py-10'>
				Постов не существует.
			</div>
		)
	}
	return (
		<div className='box-border max-w-7xl  flex bg-slate-100 py-2'>
			<div className='w-full flex flex-col xl:flex-row xl:flex-[1_1_auto]'>
				<div className='flex justify-center xl:flex-[20%]'>
					<SideBar />
				</div>
				<div className='flex xl:flex-[55%] flex-col justify-center items-center'>
					{posts?.map((post, idx) => (
						<PostItem key={idx} post={post} />
					))}
				</div>
				<div className='xl:flex-[25%]'>
					<div className='xl:col-span-3 lg:col-span-4 rounded-3xl '>
						<div className='mb-2 px-3 text-center bg-white p-2 rounded-xl flex items-center drop-shadow-md'>
							<div className='mr-2'>
								<svg
									viewBox='0 0 384 512'
									id='IconChangeColor'
									height='20'
									width='20'
								>
									<path
										d='M384 319.1C384 425.9 297.9 512 192 512s-192-86.13-192-192c0-58.67 27.82-106.8 54.57-134.1C69.54 169.3 96 179.8 96 201.5v85.5c0 35.17 27.97 64.5 63.16 64.94C194.9 352.5 224 323.6 224 288c0-88-175.1-96.12-52.15-277.2c13.5-19.72 44.15-10.77 44.15 13.03C215.1 127 384 149.7 384 319.1z'
										id='mainIconPathAttribute'
										fill='#ff0000'
									></path>
								</svg>
							</div>
							<div className='flex justify-between w-full items-center'>
								<span className='text-sm'>Популярные посты</span>
								<label className='inline-flex relative items-center cursor-pointer'>
									<input
										type='checkbox'
										className='sr-only peer'
										checked={enabled}
										readOnly
									/>
									<div
										onClick={() => {
											setEnabled(!enabled)
										}}
										className="w-7 h-2 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full after:content-[''] after:absolute after:-top-1 after:left-[0px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"
									></div>
								</label>
							</div>
						</div>
						{enabled && (
							<div className='flex flex-col'>
								{popularPosts?.map((post, idx) => (
									<PopularPostBar key={idx} post={post} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
