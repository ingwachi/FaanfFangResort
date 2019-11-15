import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { InputNumber } from 'antd';
import useForm from "react-hook-form";
var dateList = [];


class ShowAvailableRoom extends Component {

    state = {
        dateCheckIn: '',
        dateCheckOut: '',
        mintypeA: 10,
        mintypeB: 10,
        mintypeC: 10,
        mintypeD: 10,
        mintypeE: 10,
        mintypeF: 10,
        reserveA: 0,
        reserveB: 0,
        reserveC: 0,
        reserveD: 0,
        reserveE: 0,
        reserveF: 0,
        typeA: 0,
        typeB: 0,
        typeC: 0,
        typeD: 0,
        typeE: 0,
        typeF: 0,
        cost: 300,
    }

    onChangeRoomA = (value) => {
        console.log('changed', value);
        this.setState({ reserveA: value })
    }

    onChangeRoomB = (value) => {
        console.log('changed', value);
        this.setState({ reserveB: value })
    }

    onChangeRoomC = (value) => {
        console.log('changed', value);
        this.setState({ reserveC: value })
    }

    onChangeRoomD = (value) => {
        console.log('changed', value);
        this.setState({ reserveD: value })
    }

    onChangeRoomE = (value) => {
        console.log('changed', value);
        this.setState({ reserveE: value })
    }

    onChangeRoomF = (value) => {
        console.log('changed', value);
        this.setState({ reserveF: value })
    }

    onSubmit = () => {
        console.log(this.state.reserveA)
        console.log(dateList);
        for (let i = 0; i < dateList.length - 1; i++) {
            axios.get(`/${dateList[i]}`).then(resp => {
                this.setState({
                    typeA: resp.data.typeA - this.state.reserveA,
                    typeB: resp.data.typeB - this.state.reserveB,
                    typeC: resp.data.typeC - this.state.reserveC,
                    typeD: resp.data.typeD - this.state.reserveD,
                    typeE: resp.data.typeE - this.state.reserveE,
                    typeF: resp.data.typeF - this.state.reserveF
                })
                const { typeA, typeB, typeC, typeD, typeE, typeF } = this.state;
                axios.put(`/updateRoom/${dateList[i]}`, ({ typeA, typeB, typeC, typeD, typeE, typeF })).then(response => {
                    console.log(response)
                })
            })
        }
        const { cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF } = this.state
        axios.post('/addTempData', ({ cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF })).then(res => {
            console.log(res)
        })
        console.log('Room A Reserved :' + this.state.reserveA)
        console.log('Room B Reserved :' + this.state.reserveB)
        console.log('Room C Reserved :' + this.state.reserveC)
        console.log('Room D Reserved :' + this.state.reserveD)
        console.log('Room E Reserved :' + this.state.reserveE)
        console.log('Room F Reserved :' + this.state.reserveF)
        console.log('Cost : ', this.state.cost)
        console.log('CheckIn : ', this.state.dateCheckIn)
        console.log('CheckOut : ', this.state.dateCheckOut)
        window.location.href = "/CustomerInfo";
    }

    addAllDate = (date) => {
        console.log("Date : ", date);

        date.forEach(element => {
            dateList.push(element);
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.addAllDate(this.props.dates)
        this.show();
        this.setState({
            dateCheckIn: dateList[0],
            dateCheckOut: dateList[dateList.length - 1]
        })
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

                if (resp.data.typeC < this.state.mintypeC) {
                    this.setState({ mintypeC: resp.data.typeC })
                }

                if (resp.data.typeD < this.state.mintypeD) {
                    this.setState({ mintypeD: resp.data.typeD })
                }

                if (resp.data.typeE < this.state.mintypeE) {
                    this.setState({ mintypeE: resp.data.typeE })
                }

                if (resp.data.typeF < this.state.mintypeF) {
                    this.setState({ mintypeF: resp.data.typeF })
                }
            })
        })
    }


    // showState = () => {
    //     console.log("Room Type A Available : " + this.state.mintypeA)
    //     console.log("Room Type B Available : " + this.state.mintypeB)
    //     console.log("Room Type C Available : " + this.state.mintypeC)
    //     console.log("Room Type D Available : " + this.state.mintypeD)
    //     console.log("Room Type E Available : " + this.state.mintypeE)
    //     console.log("Room Type F Available : " + this.state.mintypeF)
    // }

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
                <div>Room Type C Available : {this.state.mintypeC}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeC} defaultValue={0} onChange={(value) => this.onChangeRoomC(value)} />
                </div>
                <div>Room Type D Available : {this.state.mintypeD}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeD} defaultValue={0} onChange={(value) => this.onChangeRoomD(value)} />
                </div>
                <div>Room Type E Available : {this.state.mintypeE}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeE} defaultValue={0} onChange={(value) => this.onChangeRoomE(value)} />
                </div>
                <div>Room Type F Available : {this.state.mintypeF}</div>
                <div>
                    จำนวนห้องที่ต้องการ <InputNumber min={0} max={this.state.mintypeF} defaultValue={0} onChange={(value) => this.onChangeRoomF(value)} />
                </div>


                {/* <Link to='/CustomerInfo'><Button onClick={(e) => this.onSubmit(e)}>Submit</Button></Link> */}
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


