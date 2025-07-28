import { useEffect, useState, useCallback } from 'react';
import './BookingForm.styles.css';
import { submitAPI } from '../../utils/temp';
import { useNavigate, Link as LinkR } from 'react-router-dom';
import homeIcon from '../../assets/booking/home.svg';

const BookingForm = ({ availableTimes, dispatch }) => {
  const navigate = useNavigate();
  const { times } = availableTimes;

  const [bookings, setBookings] = useState({
    date: '',
    time: '17:00',
    guests: '',
    occasion: 'Birthday',
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('Bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setBookings(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const { date, time, guests, occasion } = bookings;
      if (!date || !time || !guests) {
        alert('Please fill all required fields.');
        return;
      }

      submitAPI();
      navigate('/confirmed');

      console.log(`Reservation Details:
      Date: ${date}
      Time: ${time}
      Guests: ${guests}
      Occasion: ${occasion}`);

      // Reset form
      setBookings({
        date: '',
        time: '17:00',
        guests: '',
        occasion: 'Birthday',
      });
    },
    [bookings, navigate]
  );

  return (
    <section className="booking-form">
      <LinkR to="/" aria-label="Back to Home">
        <img src={homeIcon} alt="Home" className="booking-home" />
      </LinkR>

      <div className="bookings-container">
        <h2 className="booking-header">Little Lemon</h2>
        <h2 className="booking-subheader">Chicago</h2>
        <h1 className="booking-title">Reserve a Table for Any Occasion</h1>

        <form className="form-container" onSubmit={handleSubmit} noValidate>
          {/* Date Picker */}
          <label htmlFor="res-date">Date</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={bookings.date}
            onChange={e => {
              handleChange(e);
              dispatch({
                type: 'UPDATE_TIMES',
                date: new Date(e.target.value),
              });
            }}
            required
          />

          {/* Time Picker */}
          <label htmlFor="res-time">Time</label>
          <select
            id="res-time"
            name="time"
            value={bookings.time}
            onChange={handleChange}
            required
          >
            {times.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* Guest Count */}
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            placeholder="1 - 20"
            min="1"
            max="20"
            value={bookings.guests}
            onChange={handleChange}
            required
          />

          {/* Occasion Selector */}
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={bookings.occasion}
            onChange={handleChange}
            required
          >
            <option value="Birthday">Birthday</option>
            <option value="Engagement">Engagement</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Wedding">Wedding</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="booking-button"
            disabled={!bookings.date || !bookings.guests}
          >
            Reserve Table
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
