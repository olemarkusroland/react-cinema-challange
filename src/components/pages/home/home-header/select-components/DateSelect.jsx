import '../HomeHeader.css';
import { formatDate } from '@/utils/format/formatDate';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export const DateSelect = ({ screenings, selectedDate, setSelectedDate }) => {
    const handleChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const dates = Array.from(new Set(screenings
        .map(screening => dayjs(screening.date, 'DD MMM YYYY'))
        .filter(date => date.isAfter(dayjs().subtract(1, 'day'), 'day'))
        .map(date => date.format('YYYY-MM-DD'))
    )).sort();

    return (
        <FormControl className="selector">
            <InputLabel id="date-select-label">Date</InputLabel>
            <Select
                labelId="date-select-label"
                id="date-select"
                value={selectedDate}
                label="Date"
                onChange={handleChange}
                renderValue={formatDate}
                MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                        className: "selector"
                    },
                }}
            >
                {dates.map((date, index) => (
                    <MenuItem key={index} value={date}>
                        {dayjs(date, 'YYYY-MM-DD').format('ddd DD. MMM')}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

DateSelect.propTypes = {
    screenings: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            // Add other required properties here
        })
    ).isRequired,
    selectedDate: PropTypes.string.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};