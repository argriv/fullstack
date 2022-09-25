import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export const CommentItem = ({ cmt }) => {
	    const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)

	return (
		<div className='pt-6'>
			<div className='media flex pb-4'>
				<Link
					className='mr-4 rounded-full max-w-none w-12 h-12 flex items-center justify-center shrink-0 bg-blue-300 text-sm'
					to={`/${cmt._id}`}
				>
					{' '}
					{avatar}
				</Link>
				<div className='media-body'>
					<div>
						<Link
							className='inline-block text-base font-bold mr-2'
							to='/'
						></Link>
						<Moment
							className='text-slate-500'
							date={cmt.createdAt}
							format='D MMM YYYY'
						/>
					</div>
					<p className='text-slate-500 '>{cmt.comment}</p>
				</div>
			</div>
		</div>
	)
}
