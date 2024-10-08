import { Col, Row, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        values.bookedTimeSlots = [];
        dispatch(addCar(values));
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify='center' className='mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Car</h3>
                        <hr />
                        <Form.Item name='name' label='Car name' rules={[{ required: true, message: 'Please enter the car name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='Image URL' rules={[{ required: true, message: 'Please enter the image URL' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true, message: 'Please enter the rent per hour' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true, message: 'Please enter the capacity' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true, message: 'Please enter the fuel type' }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1' type='submit'>ADD CAR</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default AddCar;
