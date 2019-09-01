import React from 'react';

export default props => (
    <table className="table">
        <thead>
        <tr>
            <th onClick={props.onSort.bind(null, 'id')}>
                ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'name')}>
                Name {props.sortField === 'name' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'date')}>
                Date {props.sortField === 'date' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'count')}>
                Count {props.sortField === 'count' ? <small>{props.sort}</small> : null}
            </th>
        </tr>
        </thead>
        <tbody>
        { props.data.map(item =>(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.count}</td>
            </tr>
        ))}
        </tbody>
    </table>
)