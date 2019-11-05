import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { InputNumber } from 'antd';
var dateList = [];
class ShowAvailableRoom extends Component {

    state = {
        mintypeA: 10,
        mintypeB: 10,
        reserveA: 0,
        reserveB: 0,
        typeA: 0,
        typeB: 0
    }

    onChangeRoomA = (value) => {
        console.log('changed', value);
        this.setState({ reserveA: value })
        this.setState({ typeA: this.state.mintypeA - value })
    }

    onChangeRoomB = (value) => {
        console.log('changed', value);
        this.setState({ reserveB: value })
        this.setState({ typeB: this.state.mintypeB - value })
    }

    onSubmit = (e) => {
        console.log("eiei", dateList)
        console.log(dateList);
        for (let i = 0; i < dateList.length - 1; i++) {
            axios.get(`/${dateList[i]}`).then(resp => {
                const { typeA, typeB } = this.state;
                axios.put(`/updateRoom/${dateList[i]}`, ({ typeA, typeB })).then(response => {
                    console.log(response)
                })
            })
        }

        console.log('Room A Reserved :' + this.state.reserveA)
        console.log('Room B Reserved :' + this.state.reserveB)
    }

    addAllDate = (date) => {
        console.log("Date : ", date);

        date.forEach(element => {
            dateList.push(element);
        });
    }

    componentDidMount() {
        this.addAllDate(this.props.dates)
        this.show();

    }

    show = () => {
        dateList.forEach(date => {
            axios.get(`/${date}`).then(resp => {
                if (resp.data.typeA < this.state.mintypeA) {
                    this.setState({ mintypeA: resp.data.typeA })

                }

                if (resp.data.typeB < this.state.mintypeB) {
                    this.setState({ mintypeB: resp.data.typeB })
                }
            })
        })
    }


    showState = () => {
        console.log("Room Type A Available : " + this.state.mintypeA)
        console.log("Room Type B Available : " + this.state.mintypeB)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        return (
            <div>
                {console.log(this.props.dates)}
                <div>Room Type A Available : {this.state.mintypeA}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeA} defaultValue={0} onChange={(value) => this.onChangeRoomA(value)} />
                </div>
                <div>Room Type B Available : {this.state.mintypeB}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeB} defaultValue={0} onChange={(value) => this.onChangeRoomB(value)} />
                </div>
                {/* <Form
                    ref="form"
                    onSubmit={this.onSubmit}
                >
                    <Input
                        type="text"
                        label="Test Input"
                        onChange={(e) => { this.setState({ value: e.target.value }) }}
                        value={this.state.value}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        width={6}
                    />

                    <Button color="teal">Submit</Button>
                </Form> */}

                <Button onClick={(e) => this.onSubmit(e)}>Submit</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dates: state
    }
}

export default connect(mapStateToProps)(ShowAvailableRoom);


