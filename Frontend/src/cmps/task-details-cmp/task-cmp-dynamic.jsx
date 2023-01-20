import { useSelector } from 'react-redux'

export function TaskCmpDynamoic(props) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const members = 'Labels'
    let info
    DynamicCmp(props)

    function DynamicCmp(currProps) {
        console.log('currProps:', currProps)

        switch (currProps.cmpType) {
            case 'members':
                console.log('he:')
                console.log('board.members:', board.members)
                info = board.members
                return info

            case 'labels':
                console.log('ops:')
                console.log('board.labels:', board.labels)
                info = board.labels
                return info
        }
    }

    let data = {
        title: props.cmpType,
        txt: '',
        placeholder: `Search ${props.cmpType}`,
        optionsTitle: `Board ${props.cmpType}`,
        options: ['hi', 'bye', 'why']
    }
    console.log('data:', data)


    if (!board) return <h1 className='loading'>Loadings....</h1>

    return <div className='task-cmp-dynamoic'>
        <div className='task-cmp-dynamoic-container'>

            {/* <DynamicCmp cmpType={props} /> */}
            {/* <p>{lal.id}</p> */}

            <p className='cmp-dynamoic-title'>{data.title}</p>
            <hr />
            <input type="text"
                className='cmp-dynamoic-input'
                name="txt"
                id="txt"
                placeholder={data.placeholder}
                // onChange={handleChange}
                defaultValue={data.txt} />

            <h3 className='small-headline cmp-dynamoic-options-title'>{data.optionsTitle}</h3>

            <ul className='cmp-dynamoic-options-list clean-list'>
                {data.options.map(opt =>
                    <li key={opt} className="cmp-dynamoic-option">
                        {opt}
                    </li>
                )}
            </ul>
        </div>
    </div>


}