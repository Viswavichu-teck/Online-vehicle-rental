import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import Spinner from '../components/Spinner';
import { Row, Col } from 'antd';
import moment from "moment";
import DefaultLayout from '../components/DefaultLayout';  // Import DefaultLayout

const UserBookings = () => {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.bookingsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    return (
        <DefaultLayout>  {/* Wrap the content in DefaultLayout */}
            {loading && <Spinner />}
            <h3 className="text-center mt-2">My Bookings</h3>
            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>
                    {bookings
                        .filter((booking) => booking.user === user._id)
                        .map((booking) => (
                            <Row gutter={16} className="bs1 mt-3 text-left" key={booking._id}>
                                <Col lg={6} sm={24}>
                                    <p><b>{booking.car.name}</b></p>
                                    <p>Total hours: <b>{booking.totalHours}</b></p>
                                    <p>Rent per hour: <b>{booking.car.rentPerHour}</b></p>
                                    <p>Total amount: <b>{booking.totalAmount}</b></p>
                                </Col>
                                <Col lg={12} sm={24}>
                                    <p>Transaction Id: <b>{booking.transactionId}</b></p>
                                    <p>From: <b>{moment(booking.bookedTimeSlots.from).format('MMM DD yyyy HH:mm')}</b></p>
                                    <p>To: <b>{moment(booking.bookedTimeSlots.to).format('MMM DD yyyy HH:mm')}</b></p>
                                    <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                                </Col>
                                <Col lg={6} sm={24} className='text-right'>
                                    <img
                                        style={{ borderRadius: 5 }}
                                        src={booking.car.image}
                                        alt={booking.car.name}
                                        height="140"
                                        className="p-2"
                                    />
                                </Col>
                            </Row>
                        ))}
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default UserBookings;
