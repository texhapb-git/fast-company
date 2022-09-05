import { useState } from 'react';
import API from '../api';

function Users() {
	const [users, setUsers] = useState(API.users.fetchAll());

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

	const handleDelete = (userId) => {
		setUsers(prev => prev.filter(user => user._id !== userId));
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
		<div className='container mt-4 mb-4'>
			{renderPhrase(users.length)}
			{
				Boolean(users.length) &&
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Имя</th>
							<th scope="col">Качества</th>
							<th scope="col">Профессия</th>
							<th scope="col">Встретился, раз</th>
							<th scope="col">Оценка</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>

						{users.map(user => {
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>
										{user.qualities.map(quality => {
											return <span key={quality._id} className={`me-2 mb-2 badge bg-${quality.color}`}>{quality.name}</span>
										})}
									</td>
									<td>{user.profession.name}</td>
									<td>{user.completedMeetings}</td>
									<td>{user.rate}/5</td>
									<td>
										<button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
									</td>
								</tr>
							)
						})}

					</tbody>
				</table>
			}
		</div>
	)
}

export default Users;