export function TaskChecklistBarProgress({ todos }) {

    let isComplite = (getUserProgress() === 100) ? 'isComplite' : ''

    function getUserProgress() {
        if (todos.length) {
            let doneTodos = todos.filter((todo) => todo.isDone === true)
            let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)

            return toPrecentage
        }
    }

    return <section className='todos-prog-bar-section'>

        <span className='todos-prog-bar-percentage'>{getUserProgress() || 0}%</span>
        <div className='todos-prog-bar-background'>
            {(getUserProgress() > 0) && <div
                className={`prog-accomplished ${isComplite}`}
                style={{
                    width: `${getUserProgress()}%`,
                }}></div>}
        </div>
    </section>

}