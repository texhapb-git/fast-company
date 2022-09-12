function Quality({ quality }) {
	return (
		<span className={`me-2 mb-2 badge bg-${quality.color}`}>{quality.name}</span>
	)
}

export default Quality;