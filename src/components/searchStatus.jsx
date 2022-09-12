function SearchStatus({ length }) {

	const endOfWordByNumber = (number, forOne = '', forTwo = '', forFive = '') => {
		number = Math.abs(number) % 100;

		if (number > 10 && number < 20) {
			return forFive;
		}

		number = number % 10;

		if (number === 1) {
			return forOne;
		}

		if (number >= 2 && number <= 4) {
			return forTwo;
		}

		return forFive;
	}

	const renderPhrase = (number) => {
		return (
			<h1>
				<span className={`badge bg-${number === 0 ? 'danger' : 'primary'}`}>
					{
						number === 0 ?
							<>Никто с тобой не тусанет</> :
							<>{number} {endOfWordByNumber(number, 'человек тусанет', 'человека тусанут', 'человек тусанут')} с тобой сегодня</>
					}
				</span>
			</h1>)
	}

	return (
		<>
			{renderPhrase(length)}
		</>
	)



}

export default SearchStatus;