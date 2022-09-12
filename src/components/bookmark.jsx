function Bookmark({ id, bookmark, onBookmarkToggle }) {
	const cls = bookmark ? 'bi-bookmark-star-fill' : 'bi-bookmark';

	return (
		<button className="bookmark" onClick={() => onBookmarkToggle(id)}>
			<i className={`bi ${cls}`}></i>
		</button>
	)
}

export default Bookmark;