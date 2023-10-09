import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Form({ btnText, label, placeholder, onSubmit, id }) {
    const [data, setData] = useState({ text: '' });
    const memory = useSelector((state) => state.forms)

    // read information from redux and place it
    useEffect(() => {
        const currentFormById = memory.find(x => x.id === id);
        const memoryText = currentFormById.text;

        if (memoryText !== '') {
            const memoryItem = { text: memoryText };

            onSubmit(memoryItem);
            setData(memoryItem);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
    <form className="w-full max-w-2xl m-auto" id={id} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 sm:w-1/2">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="from"
                >
                    {label}
                </label>
                <input
                    className="appearance-none text-base block w-full text-gray-700 border-gray-200 rounded py-3 px-4 border focus:outline-none focus:border-gray-500"
                    id="from"
                    name="text"
                    type="text"
                    value={data.text}
                    onChange={(e) => handleChange(e)} placeholder={placeholder}
                />
            </div>
            <div className="w-full mt-6 px-3 sm:w-1/2">
                <input
                    className="bg-transparent text-base w-full hover:bg-orange-500 inline-block text-black hover:text-white font-semibold py-3 px-4 border border-orange-500  hover:border-transparent rounded cursor-pointer"
                    type="submit"
                    value={btnText}
                />
            </div>
        </div>
    </form>
    )
}

Form.defaultProps = {
    placeholder: '...',
};

Form.propTypes = {
    btnText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default Form;
