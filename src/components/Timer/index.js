import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function Timer({status}) {
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setTimerIsActive] = useState(status);

    useEffect(() => {
        let interval = null;

        if (isTimerActive) {
            interval = setTimeout(() => {
                setTimer(seconds => seconds + 1);
            }, 1000);
        } else if (!isTimerActive && timer !== 0) {
            clearTimeout(interval);
        }

        return () => clearTimeout(interval);
    }, [isTimerActive, timer]);

    useEffect(() => {
        setTimer(0);
        setTimerIsActive(status);
    }, [status]);

    return (
        <div className="w-full max-w-2xl m-auto mb-4">
            Last update: <b className={ timer >= 30 ? 'text-red-500' : 'text-black' }>{ timer }</b> seconds ago
        </div>
    );
}

Timer.defaultProps = {
    status: false,
};

Timer.propTypes = {
    status: PropTypes.bool,
};

export default Timer;
