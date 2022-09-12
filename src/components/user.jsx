import Bookmark from "./bookmark";
import Quality from "./quality";

function User({ user, onDelete, onBookmarkToggle }) {
	return (
		<tr>
			<td>{user.name}</td>
			<td>
				{user.qualities.map(quality => <Quality key={quality._id} quality={quality} />)}
			</td>
			<td>{user.profession.name}</td>
			<td>{user.completedMeetings}</td>
			<td>{user.rate}/5</td>
			<td>
				<Bookmark id={user._id} bookmark={user.bookmark} onBookmarkToggle={onBookmarkToggle} />
			</td>
			<td>
				<button className='btn btn-danger' onClick={() => onDelete(user._id)}>Delete</button>
			</td>
		</tr>
	)
}

export default User;