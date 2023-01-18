import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard } from '../store/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { loadCars, addCar, updateCar, removeCar } from '../store/car.actions.js'

import { GroupList } from '../cmps/group-list'

export function Board() {
	// const { boardId } = useParams()
	const boardId = 'b101'
	const board = useSelector((storeState) => storeState.boardModule.board)

	useEffect(() => {
		loadBoard(boardId)
	}, [])

	console.log('board cmp', board)

	// useEffect(() => {
	// 	loadGroups('b101')
	// }, [])

	// async function loadGroups(boardId) {
	// 	try {
	// 		groups = await boardService.queryGroup('b101')
	// 		return groups
	// 	} catch (err) {
	// 		console.log('group-list cmp failed to load groups', err)
	// 	}
	// }

	async function onRemoveGroup(groupId) {
		console.log('remove this group', groupId)
		// try {
		// 	await removeCar(carId)
		// 	showSuccessMsg('Car removed')
		// } catch (err) {
		// 	showErrorMsg('Cannot remove car')
		// }
	}

	// async function onAddCar() {
	//     const car = carService.getEmptyCar()
	//     car.vendor = prompt('Vendor?')
	//     try {
	//         const savedCar = await addCar(car)
	//         showSuccessMsg(`Car added (id: ${savedCar._id})`)
	//     } catch (err) {
	//         showErrorMsg('Cannot add car')
	//     }
	// }

	// async function onUpdateCar(car) {
	//     const price = +prompt('New price?')
	//     const carToSave = { ...car, price }
	//     try {
	//         const savedCar = await updateCar(carToSave)
	//         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
	//     } catch (err) {
	//         showErrorMsg('Cannot update car')
	//     }
	// }

	if (!board) return <h1>loadings....</h1>
	const groups = board.groups
	console.log('board', board)
	console.log('groups', groups)

	return (
		<section className="board">
			<div className="board-top-menu">
				{/* <BoardTopMenu /> */}
				<h1>Demo</h1>
				<button>Star</button>
				<span></span>
				<button>Filter</button>
				<span></span>
				<button>...</button>
			</div>
			<div className="board-main-content">
				<GroupList onRemoveGroup={onRemoveGroup} />
			</div>
			{/* <main>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <ul className="car-list">
                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <h4>{car.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button>
                        </li>)
                    }
                </ul>
            </main> */}
		</section>
	)
}
