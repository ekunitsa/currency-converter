import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ResultTable({data}) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const arr = Object.entries(data)
                        .map((e) => ( { code: e[0], value: e[1] } ))
                        .sort((a,b) => a.code.localeCompare(b.code));

        setResult(arr);
    }, [data]);

    if (Object.keys(data).length === 0) {
        return false;
    }

    return (
        <div className="w-full overflow-auto">
            <table className="table-auto w-full max-w-2xl listTable m-auto">
                <thead>
                    <tr>
                        <th className="max-w-xs">Literal code</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item) => (
                        <tr key={item.code}>
                            <td>{item.code}</td>
                            <td>{Number(item.value.value).toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ResultTable.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ResultTable;
